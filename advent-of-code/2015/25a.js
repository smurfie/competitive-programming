(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var x = parseInt(lines[0].split(" ")[16]);
    var y = parseInt(lines[0].split(" ")[18]);

    var pos = calculatePos(x, y);
    var arr = [20151125];

    while (arr.length < pos) {
      arr.push((arr[arr.length - 1] * 252533) % 33554393);
    }

    return arr[arr.length - 1];
  }

  function calculatePos(x, y) {
    return sum(y + x - 1) + 1 - x;
  }

  function sum(n) {
    return (n * (n + 1)) / 2;
  }

  var dataset = [];

  dataset.push({
    input: `To continue, please consult the code grid in the manual.  Enter the code at row 1, column 6.`,
    output: 33511524
  });

  dataset.push({
    input: `To continue, please consult the code grid in the manual.  Enter the code at row 6, column 6.`,
    output: 27995004
  });

  dataset.push({
    input: `To continue, please consult the code grid in the manual.  Enter the code at row 2978, column 3083.`,
    output: 2650453
  });

  Utils.check(solve, dataset, "25a");
})();
