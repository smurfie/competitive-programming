(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var rope = [...Array(10)].map(() => [0, 0]);
    var dict = {};

    for (var line of lines) {
      var dir = line.split(" ")[0];
      var steps = Number(line.split(" ")[1]);
      for (var i = 0; i < steps; i++) {
        switch (dir) {
          case "U":
            rope[0][1]++;
            break;
          case "D":
            rope[0][1]--;
            break;
          case "L":
            rope[0][0]--;
            break;
          case "R":
            rope[0][0]++;
            break;
          default:
            console.error("Error!");
        }
        for (var j = 1; j < 10; j++) {
          if (rope[j - 1][0] == rope[j][0] + 2) {
            rope[j][0]++;
            if (rope[j - 1][1] > rope[j][1]) {
              rope[j][1]++;
            } else if (rope[j - 1][1] < rope[j][1]) {
              rope[j][1]--;
            }
          } else if (rope[j - 1][0] == rope[j][0] - 2) {
            rope[j][0]--;
            if (rope[j - 1][1] > rope[j][1]) {
              rope[j][1]++;
            } else if (rope[j - 1][1] < rope[j][1]) {
              rope[j][1]--;
            }
          }
          if (rope[j - 1][1] == rope[j][1] + 2) {
            rope[j][1]++;
            if (rope[j - 1][0] > rope[j][0]) {
              rope[j][0]++;
            } else if (rope[j - 1][0] < rope[j][0]) {
              rope[j][0]--;
            }
          }
          if (rope[j - 1][1] == rope[j][1] - 2) {
            rope[j][1]--;
            if (rope[j - 1][0] > rope[j][0]) {
              rope[j][0]++;
            } else if (rope[j - 1][0] < rope[j][0]) {
              rope[j][0]--;
            }
          }
        }
        dict[rope[9][0] + "," + rope[9][1]] = true;
      }
    }
    return Object.keys(dict).length;
  }

  var dataset = [];

  dataset.push({
    input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
    output: 1
  });

  dataset.push({
    input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
    output: 36
  });

  dataset.push({
    input: `U 2
L 2
U 1
R 2
D 2
L 1
R 1
U 2
D 1
L 2
D 2
R 2
D 1
L 1
U 2
D 2
R 1
U 1
L 1
D 1
L 1
R 2
U 1
D 2
U 2
D 1
L 1
D 1
L 2
R 2
D 2
R 1
D 2
R 1
D 2
R 1
U 2
L 1
U 2
R 2
D 2
U 1
R 1
L 2
D 1
L 1
R 1
D 2
R 2
L 1
R 2
U 1
L 2
R 1
D 1
R 2
U 2
R 2
L 1
U 2
R 1
L 1
U 2
R 2
D 2
U 1
L 2
D 2
R 1
L 2
D 2
L 2
R 1
L 1
U 2
D 1
U 1
D 1
L 1
D 2
U 1
L 2
R 2
D 1
U 1
D 2
L 2
D 1
R 1
U 2
D 2
L 2
R 2
U 1
D 1
U 1
L 1
D 2
R 1
D 2
U 1
D 2
U 2
L 2
R 2
D 2
R 1
U 2
R 2
L 2
U 1
L 3
U 3
D 1
U 2
R 1
U 3
R 2
U 3
D 1
R 1
U 2
D 2
U 2
D 2
R 2
U 3
D 1
L 1
R 2
U 2
L 3
U 3
D 2
L 3
U 3
R 2
D 3
L 3
U 2
D 2
U 3
R 1
D 1
R 2
U 3
D 3
R 3
D 2
L 3
D 2
R 3
D 1
R 2
U 1
D 3
R 2
D 1
U 3
L 1
U 2
L 1
R 3
D 1
L 1
D 1
R 2
U 2
R 1
D 1
R 2
D 1
R 3
L 3
U 1
R 2
U 1
L 1
D 1
U 3
D 1
L 1
R 1
U 1
D 3
U 1
R 3
U 1
L 1
D 2
R 2
U 1
R 1
L 2
R 1
U 2
L 3
R 3
L 1
R 3
D 3
U 3
R 1
U 2
L 2
D 2
R 3
L 2
R 3
U 1
L 1
R 2
D 2
R 3
U 2
D 3
R 2
L 1
D 3
R 2
L 3
U 2
L 1
U 2
R 1
U 2
D 1
L 2
U 3
R 1
U 4
R 1
U 4
R 1
L 1
D 3
L 3
R 3
U 4
L 1
R 2
D 4
U 2
L 3
U 1
R 4
D 1
L 1
U 4
D 4
L 3
R 2
D 4
R 4
D 1
U 2
L 4
U 3
D 2
L 4
D 2
L 4
U 2
D 4
L 1
D 2
U 4
L 2
U 1
D 3
U 4
D 2
L 1
R 2
L 4
U 4
L 3
R 4
D 3
R 4
D 2
L 3
U 2
L 3
U 1
D 3
L 4
R 2
D 2
L 1
U 2
R 2
L 1
D 2
U 3
L 1
U 1
L 4
U 4
L 2
R 1
U 1
R 4
L 4
D 2
L 4
D 4
L 3
U 4
D 4
L 2
U 1
L 1
R 1
L 4
U 4
L 2
D 1
R 2
D 2
L 2
R 2
L 1
U 3
L 1
U 2
D 2
R 2
D 3
L 4
R 2
L 3
R 3
U 3
L 5
U 1
D 3
L 1
U 5
L 3
U 4
L 4
R 5
D 5
R 1
L 3
D 1
U 5
R 3
U 4
D 4
U 1
D 4
U 4
R 4
U 4
R 4
U 5
R 3
D 3
L 1
D 3
U 4
R 2
U 2
R 2
U 2
L 3
R 4
L 2
D 5
U 4
D 4
L 4
R 4
U 5
R 1
D 4
L 4
U 1
L 2
U 3
D 1
R 5
U 4
D 5
L 5
D 2
L 1
U 3
D 4
R 4
L 2
R 4
D 3
R 5
L 4
R 1
D 3
L 2
R 5
D 3
R 1
U 1
L 5
D 1
U 4
L 2
U 4
D 5
L 4
D 5
L 2
D 3
R 5
L 2
D 1
R 5
D 1
L 2
U 1
D 1
L 3
R 4
L 1
D 1
U 3
D 1
R 2
D 5
R 3
D 5
L 2
D 2
U 5
D 3
R 5
D 3
R 4
U 2
L 5
R 2
D 5
R 1
U 5
R 6
D 6
U 2
R 3
L 2
U 4
R 1
D 6
L 3
U 5
R 2
L 6
U 1
D 5
L 3
R 3
U 5
L 1
R 3
U 3
L 3
R 6
D 6
L 3
U 2
R 1
L 4
R 5
L 6
R 4
D 6
U 6
L 6
U 2
L 4
D 6
R 2
D 2
R 3
D 2
L 1
U 4
R 4
D 1
R 2
L 1
D 5
L 6
U 6
D 2
L 2
D 1
U 3
D 1
L 4
U 5
R 6
U 5
L 2
R 6
D 5
R 3
L 4
U 6
L 3
D 6
L 4
R 5
L 5
R 4
D 4
L 5
R 3
U 6
D 6
L 3
D 6
U 1
D 5
L 5
R 3
L 4
R 1
L 1
U 3
D 6
U 6
R 2
D 1
U 2
L 1
R 5
U 1
L 5
U 3
R 3
D 3
L 4
D 6
U 1
R 5
L 3
U 5
R 2
U 5
L 3
D 6
R 6
D 2
R 5
U 3
D 6
U 7
R 7
L 7
U 2
L 6
U 2
R 5
L 7
U 2
D 5
U 2
R 2
U 2
L 1
D 5
U 5
R 2
U 6
R 2
D 3
R 1
D 4
L 3
R 5
U 7
D 6
U 5
D 2
L 5
U 5
L 5
R 7
U 3
L 7
U 7
L 3
U 5
D 7
L 4
D 6
L 2
U 7
D 1
L 6
R 6
D 7
U 5
L 2
D 7
U 1
D 5
L 2
U 2
D 1
U 7
R 1
D 3
L 4
D 5
R 4
L 6
R 1
L 1
D 2
R 5
U 4
L 2
D 7
R 1
U 3
L 2
U 3
L 2
U 6
D 1
U 3
L 2
U 4
R 3
L 7
D 7
R 6
L 1
R 3
U 1
R 3
D 5
R 2
U 4
R 1
U 1
L 6
D 7
U 5
D 1
R 2
U 1
L 6
R 6
U 6
D 1
U 4
D 4
U 4
L 2
D 5
U 4
R 4
U 7
D 4
U 5
D 5
U 8
L 6
U 5
L 1
D 5
R 1
D 7
L 8
U 4
R 7
U 7
D 4
L 4
U 7
D 1
R 4
L 2
U 2
R 7
L 1
R 2
L 2
R 1
L 3
D 7
L 3
D 7
U 6
L 1
D 4
U 2
D 8
R 4
D 2
R 7
L 8
U 5
L 7
U 5
R 1
D 4
R 8
L 2
R 7
L 4
U 6
R 3
D 6
L 8
R 5
U 5
R 1
D 3
U 8
R 3
D 5
L 1
D 2
R 8
D 3
R 6
L 2
R 1
U 5
R 5
U 7
L 3
R 3
L 8
D 5
L 2
D 3
L 5
D 6
L 5
U 2
R 3
U 5
R 7
D 2
U 5
R 2
D 3
L 5
R 1
U 7
L 5
D 5
R 4
U 6
D 8
R 2
D 4
L 3
R 4
D 1
L 7
U 8
L 3
U 6
D 6
L 4
D 1
U 6
L 4
R 2
L 5
D 5
L 5
D 6
R 2
U 1
L 7
R 4
D 9
U 1
L 3
D 7
L 9
D 3
U 9
L 6
D 6
U 5
D 5
R 2
D 8
R 2
D 1
U 9
D 7
R 2
D 3
U 1
L 3
D 5
R 3
L 6
D 7
U 2
R 8
U 2
L 6
D 4
L 5
R 5
L 6
D 5
L 1
U 8
D 1
L 9
D 6
R 5
D 4
U 2
R 9
D 1
U 4
D 1
U 7
L 4
R 4
D 8
U 3
R 7
L 1
D 4
L 9
U 7
L 6
R 2
L 6
D 4
L 8
U 8
L 2
R 1
L 9
D 9
L 2
U 7
L 5
D 2
U 1
L 6
D 6
L 1
R 8
D 3
R 8
L 6
U 7
D 9
U 7
L 7
D 4
R 8
D 3
R 9
L 1
U 4
L 2
R 9
L 3
D 9
R 7
D 3
U 4
D 9
R 4
L 6
U 9
D 7
U 8
D 7
L 1
R 2
U 3
D 7
U 5
R 4
L 8
D 9
L 1
U 9
L 1
D 1
L 2
U 2
R 8
D 6
L 4
U 9
L 3
R 9
U 4
L 5
R 6
U 6
D 6
L 5
D 4
L 9
R 1
L 3
D 8
L 1
R 2
D 8
U 10
L 1
D 8
L 4
U 7
D 4
R 10
D 5
L 5
U 10
R 3
U 6
L 10
R 2
U 5
R 7
L 5
R 6
U 4
D 8
U 8
D 7
R 8
U 3
D 7
R 4
D 4
L 8
R 2
U 9
R 1
L 7
R 6
D 2
U 9
R 4
D 9
R 7
D 6
U 3
L 4
D 9
L 9
D 8
L 4
R 4
U 6
D 2
U 3
D 1
L 1
R 10
L 1
D 2
R 4
U 6
L 3
D 4
L 4
D 1
L 9
D 8
R 5
D 3
U 2
D 9
R 10
D 10
R 10
U 5
D 4
R 4
D 4
L 8
D 4
R 10
D 9
L 8
D 1
R 1
D 8
L 1
D 8
R 4
U 8
R 4
U 4
L 4
U 8
D 4
L 8
D 3
U 3
R 5
D 9
L 10
R 8
U 5
L 4
U 8
R 6
D 3
L 8
U 11
D 4
R 3
L 5
D 10
U 11
D 2
L 5
D 4
R 4
D 5
R 11
L 7
U 9
R 6
L 7
D 6
R 4
D 4
U 9
R 6
D 2
U 3
D 8
L 6
U 6
R 11
U 10
R 6
L 5
R 4
D 1
L 10
R 5
U 4
R 3
D 4
U 9
R 8
D 4
U 11
L 2
D 9
U 5
R 3
D 4
R 6
U 11
R 4
D 2
L 1
R 1
U 4
L 5
U 9
L 8
R 6
D 11
L 4
D 5
L 11
D 7
U 11
D 3
U 3
L 5
R 9
D 2
L 9
R 7
L 3
D 7
L 10
D 1
L 5
U 8
D 1
L 5
U 11
D 8
R 6
D 9
U 2
D 11
R 8
U 5
D 6
R 1
U 7
D 10
L 8
D 2
L 7
D 9
R 12
U 11
R 8
D 9
R 1
D 10
L 3
R 10
D 9
L 2
R 3
D 6
L 12
U 3
R 2
U 11
R 8
L 12
D 9
R 10
L 2
D 6
L 8
U 4
R 5
U 8
L 11
R 7
D 3
L 2
R 2
U 4
R 12
L 8
U 1
R 5
L 9
D 7
R 9
D 8
L 2
R 12
L 5
D 6
R 10
U 11
R 12
L 9
D 5
L 7
U 7
R 9
L 10
R 11
U 11
D 8
L 3
U 10
D 1
R 11
L 7
R 5
L 11
D 6
U 5
D 5
U 12
D 7
L 1
R 3
D 8
L 10
R 2
D 10
R 12
U 10
R 7
U 12
R 11
U 5
D 12
R 6
D 1
U 2
L 8
R 7
D 12
U 5
R 10
L 2
R 3
D 10
U 2
L 8
D 6
R 12
L 5
R 7
U 1
R 2
L 5
D 1
U 12
L 2
U 6
D 8
U 3
D 11
L 5
R 6
L 10
U 9
D 6
R 5
L 4
R 6
L 9
D 12
U 7
L 2
D 6
L 1
U 1
R 7
L 13
D 8
U 4
L 5
D 11
U 12
R 5
U 7
D 5
L 4
D 9
L 9
U 1
L 9
U 1
L 2
U 13
L 2
R 11
L 7
R 8
U 11
D 13
U 10
R 5
U 5
L 6
R 7
D 5
L 1
R 5
U 6
D 13
U 4
L 10
U 6
L 3
U 7
R 6
U 4
L 11
U 7
L 6
R 13
U 10
R 11
D 11
U 9
D 2
U 4
R 9
L 11
R 7
U 1
L 5
U 8
D 5
L 12
U 3
D 7
L 2
R 6
L 4
D 12
U 5
R 12
L 13
D 6
U 3
L 11
R 4
L 3
R 8
U 12
D 11
U 3
R 10
U 12
L 7
D 10
R 1
U 5
L 1
U 13
D 12
U 1
L 2
R 12
D 13
R 2
D 6
L 12
U 10
R 14
U 14
R 2
D 4
L 10
R 7
U 14
L 5
D 7
L 12
R 2
D 9
R 8
D 2
R 4
U 5
L 9
R 13
L 14
R 1
U 8
R 12
U 10
D 2
R 5
U 8
D 4
U 9
D 3
R 5
D 7
L 8
R 11
D 2
U 11
L 4
R 2
U 2
D 10
U 14
L 3
R 3
D 3
R 14
L 2
R 6
D 9
U 1
L 14
R 9
L 7
R 10
U 7
L 14
R 11
L 11
D 10
R 11
U 13
L 2
D 7
L 4
D 10
L 10
R 12
D 7
R 14
L 13
D 8
R 5
L 12
D 6
R 5
D 3
U 6
L 10
D 6
R 8
U 9
R 4
D 7
R 6
D 12
R 5
D 6
L 14
U 12
L 10
U 14
D 12
L 12
R 2
U 14
R 14
D 11
R 14
U 12
D 2
U 10
R 4
U 7
D 9
U 10
D 12
U 8
D 10
L 3
R 8
L 5
D 2
R 6
L 1
D 8
U 3
L 4
U 3
R 5
L 10
D 10
U 14
D 2
U 3
R 13
L 7
R 12
L 10
R 14
D 4
L 10
R 3
U 14
L 2
D 15
R 14
D 2
R 14
L 12
D 10
R 3
D 2
L 3
R 3
D 5
L 2
R 1
L 5
D 14
L 8
R 10
L 14
D 8
L 8
D 8
R 15
D 12
U 7
D 13
L 13
U 4
L 7
U 13
R 7
U 12
R 1
D 7
R 5
L 10
R 11
L 15
D 13
L 8
D 12
U 15
L 11
R 10
U 13
R 12
U 6
R 11
D 13
R 8
D 15
L 2
D 5
U 11
R 5
L 13
D 4
R 15
D 13
R 10
L 10
U 1
R 11
U 3
R 5
D 11
U 5
R 6
U 6
D 14
L 2
R 14
U 2
R 1
L 11
U 15
R 2
D 10
L 5
D 3
U 4
D 9
U 2
L 13
R 2
D 7
R 15
D 1
U 9
R 15
L 5
D 4
L 10
D 16
U 8
R 11
L 12
U 5
L 16
R 1
D 10
R 11
L 16
D 4
U 8
D 7
U 13
D 3
R 5
U 9
R 6
U 12
D 4
U 15
L 5
U 15
L 6
U 12
R 8
L 3
R 2
U 3
L 3
R 10
L 11
U 6
D 11
L 4
R 6
D 8
U 14
L 5
D 13
R 13
D 9
L 10
D 16
R 14
L 6
D 7
U 2
L 11
D 14
R 4
U 6
R 7
L 13
U 6
L 8
D 13
R 4
U 13
L 15
U 16
L 8
D 14
L 3
R 7
D 3
U 9
D 7
U 12
R 4
D 3
U 11
D 7
L 9
U 6
L 5
U 12
D 6
R 5
D 9
U 14
D 9
R 6
U 16
R 11
U 16
L 15
R 15
U 10
L 13
D 12
R 4
D 5
L 5
U 1
D 11
R 10
U 7
R 13
U 6
L 6
D 5
R 13
U 13
D 3
U 11
L 4
R 5
U 4
D 5
L 17
R 2
L 12
R 10
L 17
U 1
R 11
D 12
L 10
U 8
L 15
R 8
U 9
L 17
D 13
L 5
R 7
L 1
D 8
R 6
D 1
U 3
D 10
R 6
L 6
U 15
R 1
U 17
L 17
R 4
U 4
R 10
U 12
L 5
D 12
R 14
D 17
R 1
U 1
R 9
U 2
D 4
R 17
L 9
D 5
U 2
L 7
D 8
R 11
U 12
D 13
R 16
L 15
D 15
L 2
R 10
D 16
R 13
D 2
R 6
D 16
L 8
D 2
L 10
U 7
L 14
R 16
L 5
D 5
R 10
L 2
U 13
R 10
L 9
U 1
L 10
R 10
U 14
D 6
R 11
D 4
R 12
D 4
L 1
D 14
L 2
U 3
L 15
U 9
D 12
R 13
D 14
R 5
L 6
D 14
R 14
L 16
R 7
U 7
L 14
R 11
U 9
D 11
U 9
L 10
R 13
L 4
R 12
U 15
R 9
D 10
U 3
R 7
U 1
R 6
D 17
U 16
D 4
R 12
U 3
R 18
D 17
L 8
U 11
D 6
L 9
R 17
L 14
D 1
L 2
D 6
U 13
L 3
R 18
D 4
L 13
U 7
D 6
U 11
L 11
U 8
R 10
L 15
U 4
D 6
R 18
U 17
R 16
D 11
U 5
R 16
L 5
D 16
U 1
R 9
L 10
U 7
R 17
U 8
L 7
R 14
L 11
R 9
D 8
R 9
U 1
R 14
L 15
U 6
L 4
R 3
L 15
U 15
D 17
U 12
D 14
R 13
U 11
D 10
U 16
L 8
R 11
U 6
D 11
U 9
R 15
L 12
U 6
L 13
U 12
R 3
U 16
L 2
U 15
L 15
R 4
D 5
R 8
D 9
L 8
U 7
R 2
D 10
L 12
R 1
U 11
R 17
U 18
D 6
L 12
U 2
R 2
U 14
D 17
L 7
R 12
U 13
D 18
L 8
R 4
U 10
R 10
L 8
U 4
L 1
U 15
L 6
D 6
L 10
R 12
D 2
R 10
U 16
L 12
D 1
R 11
D 10
U 19
R 7
D 18
U 1
D 7
R 3
U 19
R 12
U 5
L 11
U 8
D 12
R 2
D 16
U 14
R 14
D 1
U 17
L 15
D 8
L 18
D 2
L 14
U 10
L 17
D 2
U 14
L 17
U 15
R 18
L 11
R 15
U 4
L 8
D 10
L 17
U 13
R 1
L 10
U 16
R 9
L 4
D 13
R 13
U 10
R 12
L 14
U 10
D 5
R 18
L 8
D 8
R 5
D 19
U 10
R 8
U 12
R 12
D 6
U 7
L 2
U 5
L 6
R 1
D 16
R 16
U 15
R 2
D 15
R 2
D 10
L 4
D 8
R 17
D 6
R 7
U 10
R 8
D 16
R 3
D 17
R 11
D 18
L 3
R 11
D 8
R 14
D 7
U 14
R 12
L 2
R 18
L 6
R 2
D 3
R 18`,
    output: 2658
  });

  Utils.check(solve, dataset, "9b");
})();
