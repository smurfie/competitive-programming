(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var count = 0;

    for (var i = 0; i < 128; i++) {
      var hash = knot(lines[0] + "-" + i);
      for (var j = 0; j < hash.length; j++)
        count = parseInt(hash[j], 16)
          .toString(2)
          .split("")
          .reduce((a, b) => a + parseInt(b), count);
    }

    return count;
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
    output: 8108
  });

  dataset.push({
    input: `oundnydw`,
    output: 8106
  });

  Utils.check(solve, dataset, "14a");
})();
