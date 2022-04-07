(() => {
  function solve(input) {
    var i = 0;

    while (!SparkMD5.hash(input + i).startsWith("00000")) {
      i++;
    }

    return i;
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

  dataset.push({
    input: `yzbqklnj`,
    output: 282749
  });

  Utils.check(solve, dataset, "4a");
})();
