(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var p1Pos = parseInt(lines[0].split(" ")[4]) - 1;
    var p2Pos = parseInt(lines[1].split(" ")[4]) - 1;
    var p1Turn = [];
    var p2Turn = [];
    for (var i = 0; i < 31; i++) {
      p1Turn[i] = [];
      p2Turn[i] = [];
      for (var j = 0; j < 31; j++) {
        p1Turn[i][j] = [];
        p2Turn[i][j] = [];
        for (var k = 0; k < 10; k++) {
          p1Turn[i][j][k] = [];
          p2Turn[i][j][k] = [];
          for (var l = 0; l < 10; l++) {
            p1Turn[i][j][k][l] = 0;
            p2Turn[i][j][k][l] = 0;
          }
        }
      }
    }
    p1Turn[0][0][p1Pos][p2Pos] = 1;
    var p1Wins = 0;
    var p2Wins = 0;
    for (var i = 0; i < 31; i++) {
      for (var j = 0; j < 31; j++) {
        for (var k = 0; k < 10; k++) {
          for (var l = 0; l < 10; l++) {
            if (i < 21 && j < 21 && p1Turn[i][j][k][l] != 0) {
              p2Turn[i + 1 + ((k + 3) % 10)][j][(k + 3) % 10][l] +=
                p1Turn[i][j][k][l];
              p2Turn[i + 1 + ((k + 4) % 10)][j][(k + 4) % 10][l] +=
                3 * p1Turn[i][j][k][l];
              p2Turn[i + 1 + ((k + 5) % 10)][j][(k + 5) % 10][l] +=
                6 * p1Turn[i][j][k][l];
              p2Turn[i + 1 + ((k + 6) % 10)][j][(k + 6) % 10][l] +=
                7 * p1Turn[i][j][k][l];
              p2Turn[i + 1 + ((k + 7) % 10)][j][(k + 7) % 10][l] +=
                6 * p1Turn[i][j][k][l];
              p2Turn[i + 1 + ((k + 8) % 10)][j][(k + 8) % 10][l] +=
                3 * p1Turn[i][j][k][l];
              p2Turn[i + 1 + ((k + 9) % 10)][j][(k + 9) % 10][l] +=
                p1Turn[i][j][k][l];
            }
            if (i < 21 && j < 21 && p2Turn[i][j][k][l] != 0) {
              p1Turn[i][j + 1 + ((l + 3) % 10)][k][(l + 3) % 10] +=
                p2Turn[i][j][k][l];
              p1Turn[i][j + 1 + ((l + 4) % 10)][k][(l + 4) % 10] +=
                3 * p2Turn[i][j][k][l];
              p1Turn[i][j + 1 + ((l + 5) % 10)][k][(l + 5) % 10] +=
                6 * p2Turn[i][j][k][l];
              p1Turn[i][j + 1 + ((l + 6) % 10)][k][(l + 6) % 10] +=
                7 * p2Turn[i][j][k][l];
              p1Turn[i][j + 1 + ((l + 7) % 10)][k][(l + 7) % 10] +=
                6 * p2Turn[i][j][k][l];
              p1Turn[i][j + 1 + ((l + 8) % 10)][k][(l + 8) % 10] +=
                3 * p2Turn[i][j][k][l];
              p1Turn[i][j + 1 + ((l + 9) % 10)][k][(l + 9) % 10] +=
                p2Turn[i][j][k][l];
            }
            if (i >= 21) p1Wins += p2Turn[i][j][k][l];
            if (j >= 21) p2Wins += p1Turn[i][j][k][l];
          }
        }
      }
    }

    return Math.max(p1Wins, p2Wins);
  }

  var dataset = [];

  dataset.push({
    input: `Player 1 starting position: 4
Player 2 starting position: 8`,
    output: 444356092776315
  });

  dataset.push({
    input: `Player 1 starting position: 1
Player 2 starting position: 6`,
    output: 157253621231420
  });

  Utils.check(solve, dataset, "21b");
})();
