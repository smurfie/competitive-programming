(() => {
  function solve(input) {
    var lines = Utils.read(input);

    return 0;
  }

  var dataset = [];

  dataset.push({
    input: `abcdef`,
    output: 609043
  });

  dataset.push({
    input: `pqrstuv`,
    output: 1048970
  });

  Utils.check(solve, dataset, "1a");
})();
