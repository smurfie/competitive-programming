(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var serial = parseInt(lines[0]);
    var matrix = Utils.matrix(300, 300, 0);

    for (var x = 0; x < 300; x++) {
      for (var y = 0; y < 300; y++) {
        var id = x + 10;
        var power = id * (id * y + serial);
        power %= 1000;
        power = Math.floor(power / 100);
        power -= 5;
        matrix[x][y] = power;
      }
    }

    var max = -Infinity;
    var maxx = -1;
    var maxy = -1;

    for (var x = 0; x < 298; x++) {
      for (var y = 0; y < 298; y++) {
        var sum =
          matrix[x][y] +
          matrix[x][y + 1] +
          matrix[x][y + 2] +
          matrix[x + 1][y] +
          matrix[x + 1][y + 1] +
          matrix[x + 1][y + 2] +
          matrix[x + 2][y] +
          matrix[x + 2][y + 1] +
          matrix[x + 2][y + 2];
        if (sum > max) {
          max = sum;
          maxx = x;
          maxy = y;
        }
      }
    }

    return maxx + "," + maxy;
  }

  var dataset = [];

  dataset.push({
    input: `18`,
    output: "33,45"
  });

  dataset.push({
    input: `42`,
    output: "21,61"
  });

  dataset.push({
    input: `7403`,
    output: "235,48"
  });

  Utils.check(solve, dataset, "11a");
})();
