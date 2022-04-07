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
    var maxsize = 1;
    var sums = Utils.duplicate(matrix);

    for (var x = 0; x < 300; x++) {
      for (var y = 0; y < 300; y++) {
        var sum = sums[x][y];
        if (sum > max) {
          max = sum;
          maxx = x;
          maxy = y;
          maxsize = size;
        }
      }
    }

    for (var size = 2; size < 301; size++) {
      for (var x = 0; x < 301 - size; x++) {
        for (var y = 0; y < 301 - size; y++) {
          var sum = sums[x][y];
          for (var i = 0; i < size; i++) {
            sum += matrix[x + i][y + size - 1];
            if (i != size - 1) sum += matrix[x + size - 1][y + i];
          }
          sums[x][y] = sum;
          if (sum > max) {
            max = sum;
            maxx = x;
            maxy = y;
            maxsize = size;
          }
        }
      }
    }

    return maxx + "," + maxy + "," + maxsize;
  }

  var dataset = [];

  dataset.push({
    input: `18`,
    output: "90,269,16"
  });

  dataset.push({
    input: `42`,
    output: "232,251,12"
  });

  dataset.push({
    input: `7403`,
    output: "285,113,11"
  });

  Utils.check(solve, dataset, "11b");
})();
