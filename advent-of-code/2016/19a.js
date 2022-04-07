(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var n = parseInt(lines[0]);

    // Wild guess based on experimentation
    return parseInt(n.toString(2).substring(1).concat("1"), 2);
  }

  var dataset = [];

  dataset.push({
    input: `5`,
    output: 3
  });

  dataset.push({
    input: `3018458`,
    output: 1842613
  });

  Utils.check(solve, dataset, "19a");
})();
