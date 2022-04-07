(() => {
  function solve(input, minutes) {
    var arr = [];
    var min = minutes / 2;
    var max = minutes / 2;
    arr[minutes / 2] = Utils.read(input).map((i) => i.split(""));

    for (var i = 0; i < minutes; i++) {
      if (i % 2 == 0) {
        min--;
        max++;
        arr[min] = Utils.matrix(5, 5, ".");
        arr[max] = Utils.matrix(5, 5, ".");
      }
      arr = next(arr, min, max);
    }

    return count(arr, min, max);
  }

  function count(arr, min, max) {
    var sum = 0;
    for (var i = min; i <= max; i++) {
      for (var j = 0; j < 5; j++) {
        for (var k = 0; k < 5; k++) {
          if (arr[i][j][k] == "#") sum++;
        }
      }
    }
    return sum;
  }

  function next(arr, min, max) {
    var arr2 = Utils.duplicate(arr);
    for (var i = min; i <= max; i++) {
      for (var j = 0; j < 5; j++) {
        for (var k = 0; k < 5; k++) {
          if (j != 2 || k != 2) {
            var bugs = 0;
            var bug = arr[i][j][k] == "#";
            if (j == 0 && i > min && arr[i - 1][1][2] == "#") bugs++;
            if (j != 0) {
              if (j == 3 && k == 2 && i < max) {
                for (var l = 0; l < 5; l++) {
                  if (arr[i + 1][4][l] == "#") bugs++;
                }
              } else {
                if (arr[i][j - 1][k] == "#") bugs++;
              }
            }

            if (j == 4 && i > min && arr[i - 1][3][2] == "#") bugs++;
            if (j != 4) {
              if (j == 1 && k == 2 && i < max) {
                for (var l = 0; l < 5; l++) {
                  if (arr[i + 1][0][l] == "#") bugs++;
                }
              } else {
                if (arr[i][j + 1][k] == "#") bugs++;
              }
            }

            if (k == 0 && i > min && arr[i - 1][2][1] == "#") bugs++;
            if (k != 0) {
              if (j == 2 && k == 3 && i < max) {
                for (var l = 0; l < 5; l++) {
                  if (arr[i + 1][l][4] == "#") bugs++;
                }
              } else {
                if (arr[i][j][k - 1] == "#") bugs++;
              }
            }

            if (k == 4 && i > min && arr[i - 1][2][3] == "#") bugs++;
            if (k != 4) {
              if (j == 2 && k == 1 && i < max) {
                for (var l = 0; l < 5; l++) {
                  if (arr[i + 1][l][0] == "#") bugs++;
                }
              } else {
                if (arr[i][j][k + 1] == "#") bugs++;
              }
            }

            arr2[i][j][k] =
              (bug && bugs == 1) || (!bug && (bugs == 1 || bugs == 2))
                ? "#"
                : ".";
          }
        }
      }
    }
    return arr2;
  }

  function toHash(arr) {
    return arr.map((i) => i.join("")).join("");
  }

  var dataset = [];

  dataset.push({
    input: `....#
#..#.
#..##
..#..
#....`,
    minutes: 10,
    output: 99
  });

  dataset.push({
    input: `#####
.....
....#
#####
.###.`,
    minutes: 200,
    output: 2120
  });

  Utils.check(solve, dataset, "24b");
})();
