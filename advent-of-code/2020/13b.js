(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var timestamp = parseInt(lines[0]);
    var hours = lines[1].split(",");

    var mods = [];
    for (var i = 0; i < hours.length; i++) {
      if (hours[i] != "x") {
        var n = parseInt(hours[i]);
        mods.push([n, (n * n - i) % n]);
      }
    }

    var times = 1;
    var inc = 1;
    for (var mod of mods) {
      while (times % mod[0] != mod[1]) times += inc;
      inc *= mod[0];
    }
    return times;
  }

  var dataset = [];

  dataset.push({
    input: `939
  7,13,x,x,59,x,31,19`,
    output: 1068781
  });

  dataset.push({
    input: `939
17,x,13,19`,
    output: 3417
  });

  dataset.push({
    input: `939
67,7,59,61`,
    output: 754018
  });

  dataset.push({
    input: `939
67,x,7,59,61`,
    output: 779210
  });

  dataset.push({
    input: `939
67,7,x,59,61`,
    output: 1261476
  });

  dataset.push({
    input: `939
1789,37,47,1889`,
    output: 1202161486
  });

  dataset.push({
    input: `1000508
  29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,467,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,19,x,x,x,x,x,x,x,x,x,x,x,443,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41`,
    output: 690123192779524
  });

  Utils.check(solve, dataset, "13b");
})();
