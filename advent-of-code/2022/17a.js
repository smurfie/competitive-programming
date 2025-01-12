(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var max = 0;
    var board = [["#", "#", "#", "#", "#", "#", "#"]];
    var pieces = [
      [
        [3, 2],
        [3, 3],
        [3, 4],
        [3, 5]
      ],
      [
        [3, 3],
        [4, 2],
        [4, 3],
        [4, 4],
        [5, 3]
      ],
      [
        [3, 2],
        [3, 3],
        [3, 4],
        [4, 4],
        [5, 4]
      ],
      [
        [3, 2],
        [4, 2],
        [5, 2],
        [6, 2]
      ],
      [
        [3, 2],
        [3, 3],
        [4, 2],
        [4, 3]
      ]
    ];

    var i = 2022;
    var line = lines[0];
    var pos = 0;
    var pieceNum = 0;
    while (i--) {
      var piece = pieces[pieceNum++];
      pieceNum %= pieces.length;
      while (board.length < max + 8) {
        board.push([".", ".", ".", ".", ".", ".", "."]);
      }
      var piecePos = [];
      for (var block of piece) {
        piecePos.push([max + block[0] + 1, block[1]]);
      }
      var fixed = false;
      while (!fixed) {
        var left = line[pos++] === "<";
        pos %= line.length;
        var newPiecePos = [];
        for (var block of piecePos) {
          newPiecePos.push([block[0], block[1] + (left ? -1 : 1)]);
        }
        var possible = true;
        for (var block of newPiecePos) {
          if (
            block[1] < 0 ||
            block[1] > 6 ||
            board[block[0]][block[1]] === "#"
          ) {
            possible = false;
          }
        }
        if (possible) {
          piecePos = newPiecePos;
        }

        newPiecePos = [];
        for (var block of piecePos) {
          newPiecePos.push([block[0] - 1, block[1]]);
        }
        for (var block of newPiecePos) {
          if (board[block[0]][block[1]] === "#") {
            fixed = true;
          }
        }
        if (fixed) {
          for (var block of piecePos) {
            board[block[0]][block[1]] = "#";
            max = Math.max(max, block[0]);
          }
        } else {
          piecePos = newPiecePos;
        }
      }
    }

    return max;
  }

  var dataset = [];

  dataset.push({
    input: `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`,
    output: 3068
  });

  dataset.push({
    input: `>><>>><<<>>><<>>>><<<>>>><<><>>><<<<>><<<><<<>><<<<>><<>>>><<>><<<><>><><<<>><<<<>>>><<>>><><<>>><<><<<<>>><<>>><>><<<<>><<<<>><<><<>>>><<<>>><<>>>><<<><><><<>>>><<>><<>><>>><<<>><<>>><<<<>>><><<<><<<<><<<<><<<<>>>><>>>><<<>>>><>>><>>><<<<>>><<<<><<<<>>><>>>><<>>>><<<<>>>><<<><<><<<>>>><>>><<<<>>><<<><<>>><<<<>>>><<<>><>><>><<<<>>>><><>>>><<<<>>>><<><<<<><<<<>>>><<>>><<>><<<><<<><<<<>>><<<>>><<>>>><<<>>>><>>>><<<>><<<>>><<<<>>><<>>><<<<>><<>>>><><<<<>>><><>><>><<<>>><<<>><>>>><<<<>>><<<<>>><<<<>><<<<>>><<>>>><>>>><<<>>><<<<><<<>><><<<<>>>><<<>><<<<>>>><<>><<<><<<<><<<<>>>><<<>>>><<>><><<<>><<>>>><<<>><<<>>>><>>>><><<<<><><<>>><<<>><<>>>><<<>><<>>>><<>>><<<<><<<><<>><<<>><>><<<>>>><><>>>><<<><>>>><<<>>>><<>><<>><<<<><<<>>><<<>><<<<>>><>><<>>><<<<>>>><<<><<><<>><<<<>>><<><<<<>>><>>><<>>><<>><<><><<>>>><<><<<<>>><<<<>>><<<<>>>><<>>>><>><<<<>><<<<>>><>><<<>>>><<><<<>>>><<>>><<>><<<<>><<<><<<<>>><<><<<<>>>><<>>><<<>>>><<<>><<<>>>><>>>><>>><>>><>>><>>><<>>><<><<<<>><<>><<>><>>>><<<<>>><<><<>>>><<<><<>>><<><<<>>><<>><>><<><<<>>><<>>>><<<<>><<><<>><>>>><><<<<>>>><<><<><<>><<<<>><<<><<>>>><<<<>>><>><<>>><>><<<<>><<>>><><<<>>><<<>>>><>>><<<>>><><<<><<<><<<>><>>>><<><<>>><<<<>>>><<>>><<>>>><<<<>>><<>><<<<>><<<<>>><><<><<<>><<>>><><>>>><<<><>>>><<>>>><<<>>><<>><>>>><>><<>>>><<<<>><<<>><<>><>>><<<<>>>><><<<<>>><<<<>>><>>><<<<>>>><>>><<<<>>>><><<>>><<><<<>>><<<>>><>>><<>>>><><<<<>><<>>>><<>>>><<>>><<>><<><>>>><<>>>><<<<>>><<<<><<<<><<>>><<<>><<<>>>><<><<<<>>>><<<<>>>><<<>>><><<<>>><<<>><<<>><<<<>>><<>>><<>><<<>>>><<<<>><><><<<>>>><<<>>><<>>>><<>>>><<<><><<<>>>><<<>>><>><<<>>>><<<<><<<<>>>><<<>>><<>><>>><<>><>>>><<>>><<>><<<>>><><<<>><<<>><><><<<<><<<<><<<<>><>>>><<>>><>><<<>>>><<>><<<>>><<>><<<>>><>>><<<>>>><>><<>><<<>><>><<>>>><>>>><<<><<<<>><>>>><>>>><>>><<<><<>>>><<>>>><<<<><<>>>><<<<><<>>>><<>>><<>><<<>><<>>><><<<<><>>>><>>><<<>><<<<><>>><<<<>>><>>>><><<>>>><<<<>>>><>><>>>><<<<><<<<>>>><>>>><<<>>><><<><<>>>><<<>><<<<><<<<>>><<>>><<<<>>>><<<<>><><<>>><>><<<>>><<>><<>>><><<>><<<<>>>><<<><<<<>>>><<><<<>>>><<<<><<>>>><>>>><<<<>>>><>>>><<<>><><<<>><<<<><<<>><>>><<<<>><<<<>>><<>><>>><><<<<>>><<><<<<>>>><>>><>><<<<><<<>>><>><<<>><<<><<>><>><<<<>>><<<>>><><>>>><><>><<<>>><<><<>>>><<<>>>><><>>><<<><<>><><<<><<>>>><<<>><<><>><<<>><<<<>>><<>>><<>><<<>><><<>>><<>>>><<<>><>><<>>>><<<>>>><<>>><<>>>><<>>><>><>><<<>>><<>>>><>><<>>>><<<<>><<<><<<<>><>>><<>>><<<<><<<>><><<<<>><<><<<>><<<>><>>>><<><>><<<<>>>><>>>><<><><<<<>>>><<<>>>><<<>><<><<<<>>>><<<<>><<<>>>><<<<>>>><<>><<<<>>>><>>><<><<<>>>><<>>><>>>><>><>><>><<>>>><<<><>><<<>>>><<<<>>>><<<<><<<>><><<><<>>>><<<<>><<<<>><><<<<>>>><<<<>><><<>>>><<>><<>>>><<><<><<<><<>>><<><<<><<><<<>>>><<<<>>><><<<<><<>>>><>><<<>>>><<>>><<>>><>>><>>>><<<>>><<>><<>>>><<<>>>><<<<>><<<>><<<><<<><><<<<>>><<>>><<<>><<>>>><><<<<>><<<<>>>><<<<>>><<<<><<>><<>>><<<<><<<><<<<>><<<>><<<><<<>><<<>><<<<>>>><<<>>><>>><<<<>><<<>><<<>>><>>>><<<<>><<<<><<><>><>><<><<<>>>><<<<><<>>><><<<<>><<<>>>><<<<>>><<>>>><<>>>><<<>>><<>>>><<>><>>><<><<<<>>><<<<>><<<<>><<<<>>><<<<><<><><<<><>><<<<>><<<>>>><<<<>>>><<<<>>><<><<><>><<>><<><<<<><<><>><>><<<>><<>>><>>>><<<><<<>><<<>>>><<>>><<>>>><<<<>>><<<<>><<<<>>>><<>><>>><><>><<<<>>>><<<>><<>>><<<>>>><>>>><<<<>>><<>>>><<<><<<<>>>><<><>>>><<<>>>><<><<<<>><<<<>><<><<<<>>>><<<>>>><<<<>><<>><>><<><<>>>><<>>>><<><<>><<<<>>><<<<>>>><>>><<<><>>>><<<>><<<>>><<>>><<<<>>>><><<<<>><>><<>>><<<>>>><<<<>><><>><<<<><<<<>>><<<<>>>><<<>>><<<<>>>><<>>>><<<><<>>><<>>><<<><>><>>>><<<<>>><<<<>>>><<<>><<>>><>>>><<<<>>><<>>>><<<>>>><<<><<<<>><>>><<><><<<>><<<>>><<><<<<>>>><<<<><<<<><<<>>>><<<<><<>><<<<>><<>>>><>><<<<><>>><<<><<<><<>>>><>><<<><<<<><<>>>><<>><<<<>>>><<>><<<<>><<<>><<><>>><>><<><<>>><<><<<<>><><<>>><<<>>><>>><<>>><<<><<<>>>><<<<>>><<<<>>>><<<<>>><<<<>>><<<>>>><<<>><<>><<<<>>>><<<<><<>>>><<>>><<<><<><<>>><<<<>>><<<<><<<>>><>>><<<>>>><>>><<>>><<>>>><>>><<<>>><<<><<<<>><<><<<>>><<<>>><<>>>><<><<>>><<><<<<>>>><<<>><<<<>>><<<<>>><>>>><><<<>><<<<>>>><>><<<>>><<>>>><<<<><<<>>><<<>>><><>>>><>><<<>>><<<<><<<>><<<<>>>><<<<><><<>><><>><<<><<<<><<<>>><<>>>><<<>>><<>>><<>>><<>>><<<>>>><<><<>>>><<<<>>>><<<>><<<><<<<>>><<>>>><<<<>>>><<><<>>><<>><<<>>>><<<>>>><>><<<<>>>><>>>><>>><<<<>><<<<>>><<<><<<>>><<<>><<<>><<<><>>><>><<<<>><<<<>>>><<>><<>><<<>>>><<<>><<<<>>><<>>>><<<<><><<<>>><>>><<<<>>><<>>><<<<>><<<>>><<<<>><>>>><<>>><><<<>>>><<<<>>>><>><<<>>>><<<>>>><>><>>><<<>>>><><>>>><<<<><>>><<<>><<<<>>><<<>>><<><<>>>><<<><<<><<<>>><<<><>><>>><><<<<>>><<<<>>><>>>><<<<>>>><>>><<<>>><>>><>>><<<><<><<><<<<><<<<>>>><<<>>>><<<>>>><<<<><<<><<>>>><>>>><<<>><<<>>><<>><<<<><><>><<><<<>>><<<<>>>><><<><<<>><>>>><<<<>>>><<>>><<<<><<<>>>><<>>><<<<>>>><<<<>><<>>><<<>>>><<<<>><<<><<>><>><<>><>><<>>><<>>>><<<<>><<><<<><<<<>><<<<>><>>><><<<<>><<>><<<<>><<<>>><><<<><<<>>><<><<<<>><<<<>>><<><<>><><<<<><<<>><<<><<<<>>><<<<><<>>><<<>>><<<>><<<<><<>>>><<<<>>><<<<>>><<<<><>>>><<><>><>>><<>>>><><<<><><>>><<<<><<><<<>>><>>><><<<><<>><>>><<<<>><<<>>><<>>>><<>>>><>>>><<<>>><>><<<<>><<<>>><<<>>>><>>><<><<><<<<>>>><<<><>>>><<>>>><<<>>>><<>>>><>><<<<>>>><<><<<<>>>><<>><<<>>>><>><<><<<<>><>>>><<<<>><<>>><<<<>><<<<>>><<<<>>><<>><<<<><><<<>>>><<>>>><<<>>><<<><<<>>><<<>>><<>>><><<<>>><<>><<>>>><><<<<>>><<<>><<><<>>>><<<><<><<<<>><><><<>>>><<<<>>><<<<>><<><<><>>>><<<>>><<<>>>><<<>>><<<<>>>><<<<>>><<<<><<><<<<>>><>>><<<<><>>><>>>><<>>><<>>>><<<<>>><<<>>><<<<><<>>>><>>><<<>>><<<<><><<>>><<<>>><<<>><<<>>>><<<><<>>>><<>>><>><<<>>>><<>>><<>><<<>>>><<><<<<>>>><<>>>><<<<><<>>><<>><>>>><<<>>><<<><<<><<<>>>><<>>>><<>>>><<<<>>><><<<>>>><<<<>><<>>>><><>><<<>><<<<>><>>>><><<<>>>><>><<<<>>><<<<>><<<>><<>>>><>>><<<>>>><>>>><>>>><<>><<<<>>>><<><<<<>>>><><<><>><<<>>><>>>><<>>><<<>><<<>>>><<><<<<><<<>>>><<<<>><<>><<>><<>>>><>>><<<>>><<<><<<<>>>><>>><>><<>>>><>>>><<<<>><<<>>>><<<>><<<<>>><<>><<><<>>>><>><>>><><<>><<><<><<<>>><<<>><>><<<<>>><<<<>>>><<<<><>>>><<>>>><<<<>><<<<>><<<>>>><>><<<>>><<<<>>>><<<<>>><<<><><<><<<<>><<<<><<>><<<<>>>><>><>>>><<<>><<>><<<<>>><<<<><<<><>><>>>><>><>>><<>>>><<<<>><<>>>><<<<>>><<<>><>><<<<>>><<<<>>><<><<<<>>>><<<<>>><<<>>><>><<<><<>>>><<>><<<<>><<<>><><<<>>><<<>><<<<>>>><><<<>>>><<<<>><<<<>>>><<<<>>><<<><>>><<<<>>><>><>>><<>><<><<<>>>><><<<<>>>><<<<>>><<<<>>><<>><>><<>><<<>>><<<<>>><<>>><<<>>><<<<><>>>><>>><<<<>>><<<><>><<>>><<>><<>>>><>>><<<<>><<>><<<>><><<><>><<<<>>><<<<><<>>><>>>><<>><<<>><<>>><<>>>><<<><<<><<<<>><<<>><<>>><><>><<<><<><>>>><<<>>>><<<>>>><>><<><<<<><<<<>>>><<<>>><<><<<<>>><<<>><<>><>>><<>><<<>>>><><><<<>><>>>><<>>>><>>><<<>><>>>><<<<>><<<<><<<<>><<<<>><<<<>>>><<<<>>><<<><<<<>>>><<>>>><<<>><<>>>><<<>>><<<>>><<>><<<>><<<<><<<>><><>>><<><<>>>><<>>><>>><<<>><<><<><<<>>>><<<<><<<><<<<>><<<<><<<>><<>>><<<<>>>><<<>>>><<><<>>>><><<<>><><>>>><<<<>>><><><<<>>>><<<><<<><<>>><<>><<<>><<<>>>><<<>><<>><<<<>><<>>><><<<<><<><<>><<<>>>><<<><<<>>>><<>><<<<>><<<<><<<>>>><<<<>><<<><<<<>>>><>>>><<<><<><><<<><<<>>><<>>><<<<><<>>>><<<>>><<<<>>><<><<>><<>>>><><<<<>>>><><>>><<<>>><<>>><<<<>>>><<<<>><<<>>>><>>><<>>>><>><<<>><<<><<<<>>><>><<<>><<>>>><<><<<>><<><<<><<<<>>>><><<>>>><<<>>><<<<>><>>>><<>><>>><<<<>>><<<<><<<<>><<<<>><<<><<<<><>>>><><<<>>>><<>><<>>><><<<>>><><<<<><>><<<>>>><<><<<<>>>><<<><<<>>>><>>><<<><<<<>>>><<<<><>>><<<>>><<>><<><<<<>>><<<<>>><><>>><<<<><<>>><<>><<<><>><<<<>>><<>><<<>>><<<<>>><<<>>><<<><<<<><<<<>><<><<<>>><<>><<<>><><<<>>>><<><<>>><<<>>>><<>><<<<>>>><>>><<<<><><<<<>><>>><<<>>><<<>>><<<>><>>>><>>><<<<><<<>><>>>><<<>>><><<><>>><<<>>>><>><<<>><<<<><>><<>>><<<><>>><<<>><><<<<>>>><<<><<<>><>><<<>>><>>>><<<>>><<>>>><<<>>>><>>>><<<<>>><<><<>><<<<>>>><>>><<<><<<<>>>><<<>>><<>>><<<>><<<<>>><<<<><>>>><<>>>><<>>><<>><<<<>><<<>>><<<>>>><<<<>>>><>>><><<>>>><<<>>><<><><<>>>><<<>>>><<>><<<<>><<<<>>><<<><<<><<><<<><<<>>>><<<<>>><<<<>><<<<>><<<<>>>><<<><<>><<>>>><<>>><<<<>>>><<<>>>><><>>>><<<<>>>><<<<>><<<>>><<<<>><<<>>><<<<><<<><<<<>>><<<>>><<>>>><>>>><<<<><<<<>><<>>>><<<<><>>><><<>>><>>>><<<>>>><<<<><<><<<<><><<<<><<<<>>>><<<<>>><<<>>><<<<>>>><<<<>><>>>><<>><<>><<>><<<>><>>><>><>><<><>><<<>>><<<>>><>>><<>><<<><>><<>><<<>><<<>><>>>><>>>><<<>><>>>><<>>>><>><<>>>><>><<<<>><<>>><<<<>>><<>><<<>>>><<>><<>><<<<><<<><<<<>>><>>><<>><>><<<>><<<>>><>>>><<>>>><>>><<>>>><><>><<>><<<<><<>>>><<<><<>>>><<>><<<>>>><>><<>>>><>>><><><<<><>><<><>><<<><<<<>>><<>>>><><<>>>><<>>><<>>>><<<<>>>><>>><><>><>>><><<<<>>>><<<<>>><<<<>>>><<>>>><<>>>><<<>>>><<<<>>>><<<>>><<<>>>><<<<><<<>>><<<<><<>>><<>>>><<<<>><>>>><<><><<<<><<<>>><<<>><<><<<<>>>><<>><><<<>>>><<<>>><<<<>>><>>><<<<>>>><<<<>>><<><<>>>><<<><>>>><<<<>>><>><>>>><<<<>><<>>>><>><<<>><<>>><<<<><<<>>><<<><>>><<<><><<<>>><<<>>>><><>>><<<><<<<>>><>>><>><<<><<<<>>><>>>><<<<>>><<<<>>><<<>><<>>><<<<>>>><<>><<<<>><>>><<<>><>><<<<><<<<>><<<><<<>>>><><>><<>>>><<<<><<<>>>><<<<>><<>>><<<><>>>><<<<><><>>>><<>>><<<>>><<<<>>>><<>>><><<<>>><<>>>><<<<>>><<<<>><><<<<>>>><<<<>><<<><<><<<<>>><<<<><<>><<<>>><<<>>><><>>><<<>>><<>><<<>>><<<<>><>>><>>>><>>><<<<>>><>>><<><<<<>>>><<<<>>><<<<>>>><<<>>><>>><>><<<>>>><>>><<<<>>>><<<<>>><<<<>>>><<<>><<<>><<>><>><<<<>>><>>>><<<<>><<<<><<<<>>><>><>><<<>>>><<<><>>><<><<<<>>>><<<<>><<<<>>>><<<>><<<><<<>>>><<<<><<<>><><<<<>>>><<>>>><<<<>>><<>>><>>><<><<<<><<<><<><<<<>>><>>>><<<<><<<<>>>><<<<>>><<>>>><<>>>><>>>><<><<<<><>><<>>>><<<>>><<<<>><<>>><<<>>>><<<>><<<<>><<<><>>><><<<>>><<<>>><<<><<>><<<>><<<>>>><<>><<>>><<<>><>>>><<>>><<<<><><<<>>><<>>><>><<<<>>><<<>>><<>><<<<><<>>><<>>>><<>><>>><<<<><<<<><<<><<<<>>><<>>><<<<>>><<>>>><>>>><<<<>>>><<<>><<<>><<<><>><>>>><<<><<<>>><>>><<<><<>>>><>>>><>>><><<<>>>><<<>>><>><<>>>><<>>><<>>>><<<<>>>><<>>>><<>>><<<>><<<<>>><><<<>>><<<><<<><<<>>>><>>>><><<>>>><<<>><><<<<>>>><<<<>>><<<<>><>><>>>><<<><><>>><<<>>><<<>>>><<>>>><<<<>>><><<>>>><>>><<><<<>>>><<<>>>><<<>>>><>>><>>>><>>><>>><>>><<<<><>>><<<>>><>><<<>>><>>>><<<<>>><<>>>><<><<>>><<><<<<>>><<>>><<><<<<>>><<>><<>>>><<<>>>><<<><><<<<><<<><<><>><<<<>><<>><<<<>><<>>>><<<>>>><<<<>>>><>>>><<<<>><<<>>>><<>>>><<><<>>><<<<><>>>><<<>>>><<<<><<<<>><>>><<<>>><<<<><>><<<><<>>><<>>>><<<><<<>><<<>>><<<>>><<<<>>><<<<>>>><<<>>>><<<><<<<>><<<<>>><<<>><<<>>><>>><<>><>>>><>>>><<<>>><<<>>>><<>>><<<><><<<>>>><<<><<<<>>><<<>>>><><<>>><<>>><<<>>><<<<>>><<<>>>><<<>>>><>>>><<<><<><>>>><<>>>><<<<>><<<><<<<>>><>`,
    output: 3153
  });

  Utils.check(solve, dataset, "17a");
})();
