(() => {
  function solve(input, rows) {
    var lines = Utils.read(input);

    var row = lines[0].split("").map((i) => i == ".");
    var count = 0;

    for (var i = 0; i < rows - 1; i++) {
      count += row.reduce((a, b) => (b ? a + 1 : a), 0);
      row = generate(row);
    }
    count += row.reduce((a, b) => (b ? a + 1 : a), 0);

    return count;
  }

  function generate(row) {
    var newRow = [];
    for (var i = 0; i < row.length; i++) {
      var left = i == 0 || row[i - 1];
      var right = i == row.length - 1 || row[i + 1];
      newRow[i] = left == right;
    }
    return newRow;
  }

  var dataset = [];

  dataset.push({
    input: `.^^^.^.^^^^^..^^^..^..^..^^..^.^.^.^^.^^....^.^...^.^^.^^.^^..^^..^.^..^^^.^^...^...^^....^^.^^^^^^^`,
    rows: 400000,
    output: 19999535
  });

  Utils.check(solve, dataset, "18b");
})();
