(() => {
  function solve(input, n) {
    var lines = Utils.read(input);
    var arr = [];

    for (var i = 0; i < n; i++) arr[i] = i;

    var lengths = Utils.readNums(lines[0], ",");
    var pos = 0;
    var skip = 0;

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

    return arr[0] * arr[1];
  }

  var dataset = [];

  dataset.push({
    input: `3,4,1,5`,
    n: 5,
    output: 12
  });

  dataset.push({
    input: `206,63,255,131,65,80,238,157,254,24,133,2,16,0,1,3`,
    n: 256,
    output: 9656
  });

  Utils.check(solve, dataset, "10a");
})();
