(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var matrix = [];

    for (var i = 0; i < 128; i++) {
      var hash = knot(lines[0] + "-" + i);
      var row = [];
      for (var j = 0; j < hash.length; j++) {
        part = parseInt(hash[j], 16).toString(2).split("");
        while (part.length < 4) part.unshift("0");
        row = row.concat(part);
      }
      matrix.push(row.map((i) => (i == "0" ? "." : "#")));
    }

    var groups = 0;
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == "#") {
          fill(matrix, i, j, groups);
          groups++;
        }
      }
    }

    return groups;
  }

  function fill(m, i, j, n) {
    m[i][j] = n;
    if (i > 0 && m[i - 1][j] == "#") fill(m, i - 1, j, n);
    if (j > 0 && m[i][j - 1] == "#") fill(m, i, j - 1, n);
    if (i < m.length - 1 && m[i + 1][j] == "#") fill(m, i + 1, j, n);
    if (j < m[i].length - 1 && m[i][j + 1] == "#") fill(m, i, j + 1, n);
  }

  function knot(word) {
    var n = 256;
    var arr = [];

    for (var i = 0; i < n; i++) arr[i] = i;

    var lengths = word.split("").map((i) => i.charCodeAt(0));
    lengths = lengths.concat(Utils.readNums("17, 31, 73, 47, 23", ", "));
    var pos = 0;
    var skip = 0;

    for (var round = 0; round < 64; round++) {
      for (var length of lengths) {
        var arr2 = [];
        for (var i = pos; i < pos + length; i++) {
          arr2.push(arr[i % arr.length]);
        }
        arr2.reverse();
        for (var i = pos; i < pos + length; i++) {
          arr[i % arr.length] = arr2.shift();
        }
        pos = (pos + length + skip) % arr.length;
        skip++;
      }
    }

    var dense = [];
    var xor = 0;
    for (var i = 0; i < n; i++) {
      xor = xor ^ arr[i];
      if (i % 16 == 15) {
        dense.push(xor);
        xor = 0;
      }
    }

    var hex = dense
      .map((i) => i.toString(16))
      .map((i) => (i.length == 1 ? "0" + i : i));
    return hex.join("");
  }

  var dataset = [];

  dataset.push({
    input: `flqrgnkx`,
    output: 1242
  });

  dataset.push({
    input: `oundnydw`,
    output: 1164
  });

  Utils.check(solve, dataset, "14b");
})();
