(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var num = parseInt(lines[0]);

    var x = 0;
    var y = 0;
    var grid = { "0,0": 1 };
    var actual = 1;

    while (actual <= num) {
      while (actual <= num && -x >= y) {
        y++;
        actual = calc(grid, x, y);
        grid[x + "," + y] = actual;
      }
      while (actual <= num && x < y) {
        x++;
        actual = calc(grid, x, y);
        grid[x + "," + y] = actual;
      }
      while (actual <= num && -x < y) {
        y--;
        actual = calc(grid, x, y);
        grid[x + "," + y] = actual;
      }
      while (actual <= num && x > y) {
        x--;
        actual = calc(grid, x, y);
        grid[x + "," + y] = actual;
      }
    }

    return actual;
  }

  function calc(grid, x, y) {
    return (
      g(grid, x - 1, y - 1) +
      g(grid, x - 1, y) +
      g(grid, x - 1, y + 1) +
      g(grid, x, y - 1) +
      g(grid, x, y + 1) +
      g(grid, x + 1, y - 1) +
      g(grid, x + 1, y) +
      g(grid, x + 1, y + 1)
    );
  }

  function g(grid, x, y) {
    return grid[x + "," + y] || 0;
  }

  var dataset = [];

  dataset.push({
    input: `800`,
    output: 806
  });

  dataset.push({
    input: `277678`,
    output: 279138
  });

  Utils.check(solve, dataset, "3b");
})();
