(() => {
  function solve(input) {
    var i = 0;

    while (!SparkMD5.hash(input + i).startsWith("000000")) {
      i++;
    }

    return i;
  }

  var dataset = [];

  dataset.push({
    input: `yzbqklnj`,
    output: 9962624
  });

  Utils.check(solve, dataset, "4b", "This one takes a while... (~20 sec.)");
})();
