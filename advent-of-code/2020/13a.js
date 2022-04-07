(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var timestamp = parseInt(lines[0]);
    var hours = lines[1]
      .split(",")
      .filter((i) => i != "x")
      .map((i) => parseInt(i));

    var min = Infinity;
    var id = -1;
    for (var hour of hours) {
      if (hour - (timestamp % hour) < min) {
        min = hour - (timestamp % hour);
        id = hour;
      }
    }

    return min * id;
  }

  var dataset = [];

  dataset.push({
    input: `939
7,13,x,x,59,x,31,19`,
    output: 295
  });

  dataset.push({
    input: `1000508
29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,467,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,19,x,x,x,x,x,x,x,x,x,x,x,443,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41`,
    output: 333
  });

  Utils.check(solve, dataset, "13a");
})();
