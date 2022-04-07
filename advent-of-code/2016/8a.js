(() => {
  var wide = 50;
  var tall = 6;

  function solve(input) {
    var lines = Utils.read(input);

    var matrix = Utils.matrix(tall, wide, false);

    for (var i = 0; i < lines.length; i++) {
      apply(matrix, lines[i]);
    }

    return count(matrix);
  }

  function apply(matrix, instruction) {
    var parts = instruction.split(" ");
    if (parts[0] == "rect")
      rect(
        matrix,
        parseInt(parts[1].split("x")[0]),
        parseInt(parts[1].split("x")[1])
      );
    else if (parts[1] == "row")
      row(matrix, parseInt(parts[2].split("=")[1]), parseInt(parts[4]));
    else if (parts[1] == "column")
      column(matrix, parseInt(parts[2].split("=")[1]), parseInt(parts[4]));
  }

  function rect(matrix, y, x) {
    for (var i = 0; i < x; i++) {
      for (var j = 0; j < y; j++) {
        matrix[i][j] = true;
      }
    }
  }

  function row(matrix, x, n) {
    var newRow = [];
    for (var i = 0; i < wide; i++) {
      newRow[(i + n) % wide] = matrix[x][i];
    }
    for (var i = 0; i < wide; i++) {
      matrix[x][i] = newRow[i];
    }
  }

  function column(matrix, x, n) {
    var newColumn = [];
    for (var i = 0; i < tall; i++) {
      newColumn[(i + n) % tall] = matrix[i][x];
    }
    for (var i = 0; i < tall; i++) {
      matrix[i][x] = newColumn[i];
    }
  }

  function count(matrix) {
    var num = 0;
    for (var i = 0; i < tall; i++) {
      for (var j = 0; j < wide; j++) {
        if (matrix[i][j]) num++;
      }
    }
    return num;
  }

  var dataset = [];

  dataset.push({
    input: `rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`,
    output: 6
  });

  dataset.push({
    input: `rect 1x1
rotate row y=0 by 20
rect 1x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 3
rect 2x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 3
rect 2x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 4
rect 2x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 3
rect 2x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 5
rect 1x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 6
rect 5x1
rotate row y=0 by 2
rect 1x3
rotate row y=2 by 8
rotate row y=0 by 8
rotate column x=0 by 1
rect 7x1
rotate row y=2 by 24
rotate row y=0 by 20
rotate column x=5 by 1
rotate column x=4 by 2
rotate column x=2 by 2
rotate column x=0 by 1
rect 7x1
rotate column x=34 by 2
rotate column x=22 by 1
rotate column x=15 by 1
rotate row y=2 by 18
rotate row y=0 by 12
rotate column x=8 by 2
rotate column x=7 by 1
rotate column x=5 by 2
rotate column x=2 by 1
rotate column x=0 by 1
rect 9x1
rotate row y=3 by 28
rotate row y=1 by 28
rotate row y=0 by 20
rotate column x=18 by 1
rotate column x=15 by 1
rotate column x=14 by 1
rotate column x=13 by 1
rotate column x=12 by 2
rotate column x=10 by 3
rotate column x=8 by 1
rotate column x=7 by 2
rotate column x=6 by 1
rotate column x=5 by 1
rotate column x=3 by 1
rotate column x=2 by 2
rotate column x=0 by 1
rect 19x1
rotate column x=34 by 2
rotate column x=24 by 1
rotate column x=23 by 1
rotate column x=14 by 1
rotate column x=9 by 2
rotate column x=4 by 2
rotate row y=3 by 5
rotate row y=2 by 3
rotate row y=1 by 7
rotate row y=0 by 5
rotate column x=0 by 2
rect 3x2
rotate column x=16 by 2
rotate row y=3 by 27
rotate row y=2 by 5
rotate row y=0 by 20
rotate column x=8 by 2
rotate column x=7 by 1
rotate column x=5 by 1
rotate column x=3 by 3
rotate column x=2 by 1
rotate column x=1 by 2
rotate column x=0 by 1
rect 9x1
rotate row y=4 by 42
rotate row y=3 by 40
rotate row y=1 by 30
rotate row y=0 by 40
rotate column x=37 by 2
rotate column x=36 by 3
rotate column x=35 by 1
rotate column x=33 by 1
rotate column x=32 by 1
rotate column x=31 by 3
rotate column x=30 by 1
rotate column x=28 by 1
rotate column x=27 by 1
rotate column x=25 by 1
rotate column x=23 by 3
rotate column x=22 by 1
rotate column x=21 by 1
rotate column x=20 by 1
rotate column x=18 by 1
rotate column x=17 by 1
rotate column x=16 by 3
rotate column x=15 by 1
rotate column x=13 by 1
rotate column x=12 by 1
rotate column x=11 by 2
rotate column x=10 by 1
rotate column x=8 by 1
rotate column x=7 by 2
rotate column x=5 by 1
rotate column x=3 by 3
rotate column x=2 by 1
rotate column x=1 by 1
rotate column x=0 by 1
rect 39x1
rotate column x=44 by 2
rotate column x=42 by 2
rotate column x=35 by 5
rotate column x=34 by 2
rotate column x=32 by 2
rotate column x=29 by 2
rotate column x=25 by 5
rotate column x=24 by 2
rotate column x=19 by 2
rotate column x=15 by 4
rotate column x=14 by 2
rotate column x=12 by 3
rotate column x=9 by 2
rotate column x=5 by 5
rotate column x=4 by 2
rotate row y=5 by 5
rotate row y=4 by 38
rotate row y=3 by 10
rotate row y=2 by 46
rotate row y=1 by 10
rotate column x=48 by 4
rotate column x=47 by 3
rotate column x=46 by 3
rotate column x=45 by 1
rotate column x=43 by 1
rotate column x=37 by 5
rotate column x=36 by 5
rotate column x=35 by 4
rotate column x=33 by 1
rotate column x=32 by 5
rotate column x=31 by 5
rotate column x=28 by 5
rotate column x=27 by 5
rotate column x=26 by 3
rotate column x=25 by 4
rotate column x=23 by 1
rotate column x=17 by 5
rotate column x=16 by 5
rotate column x=13 by 1
rotate column x=12 by 5
rotate column x=11 by 5
rotate column x=3 by 1
rotate column x=0 by 1`,
    output: 123
  });

  Utils.check(solve, dataset, "8a");
})();
