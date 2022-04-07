(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var n = 256;
    var arr = [];

    for (var i = 0; i < n; i++) arr[i] = i;

    var lengths = lines[0].split("").map((i) => i.charCodeAt(0));
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
    input: ``,
    output: "a2582a3a0e66e6e86e3812dcb672a272"
  });

  dataset.push({
    input: `AoC 2017`,
    output: "33efeb34ea91902bb2f59c9920caa6cd"
  });

  dataset.push({
    input: `1,2,3`,
    output: "3efbe78a8d82f29979031a4aa0b16a9d"
  });

  dataset.push({
    input: `1,2,4`,
    output: "63960835bcdc130f0b66d7ff4f6a5a8e"
  });

  dataset.push({
    input: `206,63,255,131,65,80,238,157,254,24,133,2,16,0,1,3`,
    output: "20b7b54c92bf73cf3e5631458a715149"
  });

  Utils.check(solve, dataset, "10b");
})();
