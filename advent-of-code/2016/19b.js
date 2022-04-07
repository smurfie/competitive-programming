(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var n = parseInt(lines[0]);

    return calculate(n, 1);
  }

  // Found with some hardcoded values generated
  function calculate(n, exp) {
    if (n == 1) return 1;
    if (n <= (exp * 2) / 3) return n - exp / 3;
    if (n <= exp) return exp - 2 * (exp - n);
    if (n > exp) return calculate(n, exp * 3);
  }

  var dataset = [];

  dataset.push({
    input: `5`,
    output: 2
  });

  dataset.push({
    input: `3018458`,
    output: 1424135
  });

  Utils.check(solve, dataset, "19b");
})();
