(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var map = lines.map((i) => i.split(""));
    var states = [[0, 1]];
    var arrows = [];

    // Right(0), Down(1), Left(2), Up(3)
    for (var i = 0; i < map.length; i++) {
      for (var j = 0; j < map[0].length; j++) {
        switch (map[i][j]) {
          case ">":
            arrows.push({ i, j, dir: 0 });
            break;
          case "v":
            arrows.push({ i, j, dir: 1 });
            break;
          case "<":
            arrows.push({ i, j, dir: 2 });
            break;
          case "^":
            arrows.push({ i, j, dir: 3 });
            break;
        }
      }
    }

    var it = 0;
    var state = 0;
    while (true) {
      var newArrows = [];
      var newStates = [];
      var dict = {};

      for (var { i, j, dir } of arrows) {
        switch (dir) {
          case 0:
            j++;
            break;
          case 1:
            i++;
            break;
          case 2:
            j--;
            break;
          case 3:
            i--;
            break;
        }
        if (i === 0) {
          i = map.length - 2;
        }
        if (j === 0) {
          j = map[0].length - 2;
        }
        if (i === map.length - 1) {
          i = 1;
        }
        if (j === map[0].length - 1) {
          j = 1;
        }
        newArrows.push({ i, j, dir });
        dict[i + "," + j] = true;
      }

      var dict2 = {};
      for (var [i, j] of states) {
        if (i === map.length - 1) {
          if (state === 0) {
            state = 1;
            newStates = [[i, j]];
            break;
          } else if (state === 2) {
            return it;
          }
        }
        if (i === 0 && state === 1) {
          state = 2;
          newStates = [[i, j]];
          break;
        }
        if (!dict[i + "," + j] && !dict2[i + "," + j]) {
          newStates.push([i, j]);
          dict2[i + "," + j] = true;
        }
        if (
          i > 0 &&
          map[i - 1][j] != "#" &&
          !dict[i - 1 + "," + j] &&
          !dict2[i - 1 + "," + j]
        ) {
          newStates.push([i - 1, j]);
          dict2[i - 1 + "," + j] = true;
        }
        if (
          map[i][j - 1] != "#" &&
          !dict[i + "," + (j - 1)] &&
          !dict2[i + "," + (j - 1)]
        ) {
          newStates.push([i, j - 1]);
          dict2[i + "," + (j - 1)] = true;
        }
        if (
          i < map.length - 1 &&
          map[i + 1][j] != "#" &&
          !dict[i + 1 + "," + j] &&
          !dict2[i + 1 + "," + j]
        ) {
          newStates.push([i + 1, j]);
          dict2[i + 1 + "," + j] = true;
        }
        if (
          map[i][j + 1] != "#" &&
          !dict[i + "," + (j + 1)] &&
          !dict2[i + "," + (j + 1)]
        ) {
          newStates.push([i, j + 1]);
          dict2[i + "," + (j + 1)] = true;
        }
      }
      arrows = newArrows;
      states = newStates;
      it++;
    }
  }

  var dataset = [];

  dataset.push({
    input: `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`,
    output: 54
  });

  dataset.push({
    input: `#.########################################################################################################################
#<^^^^v^><<v<v.v<>><^><v<vv^vv<^^.^v^.v.<<<<v.vv<.>^^><v.^>v^>^>^^v>>v^^^.<v<>v<>.<>v^^^^^^>>^^.^^>>vv><^v<^.<v><^^v^<<<>#
#<>>>^^v^>v>v>^^^^.<<<>><^^>>^^<>v^v^v>^v>v>^vv.vvv>v<^^<<v>v^^><^>.>^^^.><^^<v.<^^>.v<vv<^>^<<<<v^vv>>>>v^.^v.>>>^v.>.v>#
#.v^v>vv.v<<^v>^<^v<.v<<.>>^vv<.^v^<^^>^<vv^vv>><^vv<<v>^^^vvv<v.><^.<v<^>>>.^<^<.v<^<^v>><^^^><^>>v^<^<v>^>>v^v<><^vv<v<#
#>.>>^<^v>v^.><^^.>.^>v>^^><vv>v><.^v<>^<<vvvv.<>>>^v.v<vv>.v..v^>><<v.^.^^v>^^v<v>>>^v<vvv.<^^<<>^>^.>v^^>^v<^v^v<>.<v<<#
#<v^^>v>vvvv<^^.^<^v><v<>v^>v<^<^^^<>^<<v<^>^^.<^v^^<<>.>vvv^^^v<v.^^^^<<<>^v^><^>v>><^.<^^^<>^v^v>^^v>>v>v<v><>v.^><v>>>#
#<^v>..>^>vv>v<<v>.v>vv>v^v<<<<<<<<v^^<v<.v.^<>>^>^^<>^^<>v<v.<^<.vvvvv>v^.^><<v>v<>>v.v.v^^>v<^v<^>v^v><<.<^^>v^vv<^^vv>#
#>v^^v^v>.<.^vv.^<<<<.<v>>v>>v^<.<><>v><<<^.<>v><.v^<v><<.><<<^^vv>^>v<<<>^<.^v>vv^<<^.>^<^^v<<vvvvv><^>v>^.>>>.v^.v^vv<>#
#<<<>>...v^^>^v<^v>>><<<>>vv^^<^^>^v<.>v^.>>v<<v>>>>^><.>v^.^vv><v^<.^v<^v<<<.^v^^^^<>^v>^>>>vv^<<.^>>v><vvvv<>v^<>><v<v>#
#>.>><vvv<<>v<><^><v>>.^<>.>^v^.<^.<>^>v^.><<^>><v><>..v<>^^<^.>><<^<<^<.^>^.vv^^>^.^>^.v^>v<>^^vv<.<>>><<^v>v<<>>v><^^<>#
#<<>.v<<<>^.vv<^v>.>^<><>v^.v<>v<>>vv<<.^^<<>^>>.><v<^<v^.>^vvv<vv.^^.^><v^v^v^<>v.vv>v>.>v.vv<<v^<>^^^^<v^^^.>v.vv^<..><#
#>.<<<v<>vv>>^v>vvv<^<>.vvv^<^>v<>^^<v^..><.<^<><>^^^^<^>.<v^>>v>^>v>^<><<v>v>v<^^<v>v>v>><>^v<.^v^><v^^<v^>v><..^.v<^<v>#
#>>^<^<v<<^vv>^^<>^<<>.<<v<^v^^v>.vv<><<v>^<>^><v^>.>>v^^<^^^^>v^^^^vv<>>><<^^<<><<<>v^<v^v<^.<>>>>^v>^><<<^^><vv<<<^<.<>#
#<^>.vv>>^.v.>^^v>.^<>>^<<..<v><^><><^v<v<^v^>^^^>v<^^.<>v.<<v<vv.>v^^<^<>>>vvv<^<^v><v>v>v^>..^<v<vv<<^^^v>.^><v<>^>><>>#
#>^<><<>^<<v><^>v^.v><>.<<^>>.<^^<v<<^>.>v.>v>><^^<>vv<<<>v.<vv><v<<.<>v<<.vv<><>>^vv<>v>vv^.<v<v<>><.v^v><.v^.v^v>>v>>v<#
#<<>><^^<v.v<<vv>>.<>v>>^^<^v.<v^<vv.vvv<><<<^v.^^<.><v<v<..v^>v^.^v^>v<>^v<<^<>vvv><>>v^^^>v<<<>.^<vv^>^>v^v^^.><<.>>^^>#
#<^.v^>^v>^<^><<^v^>v^<><<^^^v<<^.v^v<>^.>.v<<<v^vv^^v.<v<^^<^v^.><^^>v.<v<<^^<vv<>>>.<>^.^v>v>v><^><<<>.^^<>v.<.v><><v><#
#><<^>^<v<>^^^vv^>>.vv>vvv^v^>^^>v<<>^^^^>^>v<>>v^v>v><>.^vv^<>>>><<<>^>^.>..vv>^^^<^>v<>>^v><v<>^vv>v>^^vv<><^>^^^..>>>>#
#><vv^<v^^>><<v<v.<.v^..v><^v<<>^v>.^><v><^^v^<^<v><vvv^^v^><^v.><vv><^>^<v^v><v<.>^><^<<<v>>>v<><.^<^>^v<<^^>.<>vv<^.<v>#
#<.^^>><>><>><><>^.^>.vv^>>><<><vvvvv^v<<^^>.^..>><<<v>>.<>v<^<vv<^^.v^>>v<>vv^>vv<^<><<.vv><.<^^><>.vv<<><v>><>v<vvvv^.>#
#<v<<.^..v<>v><v<>>^<<.><^<v<^vv>vv>>v>^^<^^^>v^^>><^v<^.<<^^v<^v>>^.^<v.<>^v<^v^>v><v<>>^.>v.>>v>.>^v<>v<v>v<v<.>vv><.>>#
#<v^vv>>v<<.<v^<<.>^<^v<>v^^<>.v^>^v<v>>>vv>^^>>>v<<<><<^^.>>^><>^<v<>>.v>^>v^^>^^>>>v>v^>>v>^^.v>.vvv>.v<>.^^<<<^vv^>^^>#
#>v^^.v^<.<^v<>.^<><>^^^.v.<<.^<^v<vv^v^>v^>^v.^.v^>vvv<^<>^>^^v>v>v^.v^^>^>>^>^v^>^v^^.><^.^^>^^<^><>>^>.>.^^^v<<<v.>v>.#
#<v><>v<^^<><<vv.v><v>.vv^><.v^.<v^v.><>^<>.^<<vvv^vv^>v.^v>.><^^<.>>vvv><^<^<v>v<^v.^^><>>>.<^^<v<v^^.^v<^>^<v^<>>v>>>><#
#><^^v>>>vv>^<<<<>>v>vv<vv<>>>><v>.v<<.<>><v^.<>.<<^vv>^><v<^>^<<v^<^><>>.v<^vv<vv<><^<>.vv^v^^<>>vvv<>^<v<<v<<v^<v<^>^^>#
#<v..<.vv<v<>vvv^..v>^v^><^<^>>^.v^^<><>>v^>><><<v<v>><^^^v>vv><<^<.>>>v<v.><>v><>>^^<<.>>.><>vv>.^^vv>>>^vv^<^>^<^<^<<^>#
########################################################################################################################.#`,
    output: 883
  });

  Utils.check(solve, dataset, "24b");
})();
