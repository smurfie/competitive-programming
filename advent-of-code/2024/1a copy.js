(() => {
  function solve(input) {
    let lines = Utils.read(input);

    return 0;
  }

  let dataset = [];

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
