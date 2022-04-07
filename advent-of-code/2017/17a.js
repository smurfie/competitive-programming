(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var steps = parseInt(lines[0]);
    var arr = [0];
    var pos = 0;

    for (var i = 0; i < 2017; i++) {
      pos = (pos + steps) % arr.length;
      arr.splice(++pos, 0, i + 1);
    }

    return arr[pos + 1];
  }

  var dataset = [];

  dataset.push({
    input: `3`,
    output: 638
  });

  dataset.push({
    input: `394`,
    output: 926
  });

  Utils.check(solve, dataset, "17a");
})();
