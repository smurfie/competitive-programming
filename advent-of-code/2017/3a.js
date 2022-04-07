(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var num = parseInt(lines[0]);

    var i = 1;
    var j = i * i;
    var distance = 0;

    while (j < num) {
      i += 2;
      j = i * i;
      distance++;
    }

    while (j > num) j -= i - 1;

    distance += Math.abs(num - j - (i - 1) / 2);

    return distance;
  }

  var dataset = [];

  dataset.push({
    input: `1`,
    output: 0
  });

  dataset.push({
    input: `12`,
    output: 3
  });

  dataset.push({
    input: `23`,
    output: 2
  });

  dataset.push({
    input: `1024`,
    output: 31
  });

  dataset.push({
    input: `277678`,
    output: 475
  });

  Utils.check(solve, dataset, "3a");
})();
