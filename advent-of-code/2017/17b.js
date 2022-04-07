(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var steps = parseInt(lines[0]);
    var arrLength = 1;
    var pos = 0;
    var out = 0;

    for (var i = 0; i < 50000000; i++) {
      pos = (pos + steps) % arrLength;
      arrLength++;
      if (pos++ == 0) out = i + 1;
    }

    return out;
  }

  var dataset = [];

  dataset.push({
    input: `394`,
    output: 10150888
  });

  Utils.check(solve, dataset, "17b");
})();
