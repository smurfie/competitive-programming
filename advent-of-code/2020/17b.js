(() => {
  function solve(input) {
    var mat = [];
    mat[0] = Utils.read(input).map((i) => i.split(""));

    for (var i = 0; i < 6; i++) {
      mat = step(mat);
    }

    return count(mat);
  }

  function step(mat) {
    var mat2 = [];
    for (var i = -1; i < mat.length + 1; i++) {
      mat2[i + 1] = [];
      for (var j = -1; j < mat[0].length + 1; j++) {
        mat2[i + 1][j + 1] = [];
        for (var k = -1; k < mat[0][0].length + 1; k++) {
          mat2[i + 1][j + 1][k + 1] = [];
          for (var l = -1; l < mat[0][0][0].length + 1; l++) {
            var count = adj(mat, i, j, k, l);
            var el = ".";
            if (
              i >= 0 &&
              i < mat.length &&
              j >= 0 &&
              j < mat[i].length &&
              k >= 0 &&
              k < mat[i][j].length &&
              l >= 0 &&
              l < mat[i][j][k].length
            ) {
              el = mat[i][j][k][l];
            }
            mat2[i + 1][j + 1][k + 1][l + 1] =
              (el == "#" && (count == 2 || count == 3)) ||
              (el == "." && count == 3)
                ? "#"
                : ".";
          }
        }
      }
    }
    return mat2;
  }

  function count(mat) {
    var sum = 0;
    for (var i = 0; i < mat.length; i++) {
      for (var j = 0; j < mat[0].length; j++) {
        for (var k = 0; k < mat[0][0].length; k++) {
          for (var l = 0; l < mat[0][0][0].length; l++) {
            if (mat[i][j][k][l] == "#") sum++;
          }
        }
      }
    }
    return sum;
  }

  function adj(mat, x, y, z, a) {
    var sum = 0;
    for (var i = -1; i <= 1; i++) {
      var x1 = i + x;
      if (x1 >= 0 && x1 < mat.length) {
        for (var j = -1; j <= 1; j++) {
          var y1 = j + y;
          if (y1 >= 0 && y1 < mat[x1].length) {
            for (var k = -1; k <= 1; k++) {
              var z1 = k + z;
              if (z1 >= 0 && z1 < mat[x1][y1].length) {
                for (var l = -1; l <= 1; l++) {
                  var a1 = l + a;
                  if (a1 >= 0 && a1 < mat[x1][y1][z1].length) {
                    if (
                      (i != 0 || j != 0 || k != 0 || l != 0) &&
                      mat[x1][y1][z1][a1] == "#"
                    )
                      sum++;
                  }
                }
              }
            }
          }
        }
      }
    }
    return sum;
  }

  var dataset = [];

  dataset.push({
    input: `.#.
..#
###`,
    output: 848
  });

  dataset.push({
    input: `..#..##.
#.....##
##.#.#.#
..#...#.
.###....
######..
.###..#.
..#..##.`,
    output: 1792
  });

  Utils.check(solve, dataset, "17b");
})();
