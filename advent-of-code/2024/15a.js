(() => {
  function solve(input) {
    let lines = Utils.read(input);
    let matrix = [];

    let i = 0;
    let x = 0;
    let y = 0;
    while (lines[i].length > 0) {
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === "@") {
          x = i;
          y = j;
        }
      }
      matrix.push(lines[i].split(""));
      i++;
    }
    i++;

    let mov = "";
    while (i < lines.length && lines[i].length > 0) {
      mov += lines[i];
      i++;
    }

    for (let i = 0; i < mov.length; i++) {
      let end;
      switch (mov[i]) {
        case "<":
          end = y - 1;
          while (matrix[x][end] === "O") {
            end--;
          }
          if (matrix[x][end] === ".") {
            while (end <= y) {
              matrix[x][end] = matrix[x][end + 1];
              end++;
            }
            matrix[x][y] = ".";
            y--;
          }
          break;
        case ">":
          end = y + 1;
          while (matrix[x][end] === "O") {
            end++;
          }
          if (matrix[x][end] === ".") {
            while (end >= y) {
              matrix[x][end] = matrix[x][end - 1];
              end--;
            }
            matrix[x][y] = ".";
            y++;
          }
          break;
        case "^":
          end = x - 1;
          while (matrix[end][y] === "O") {
            end--;
          }
          if (matrix[end][y] === ".") {
            while (end <= x) {
              matrix[end][y] = matrix[end + 1][y];
              end++;
            }
            matrix[x][y] = ".";
            x--;
          }
          break;
        case "v":
          end = x + 1;
          while (matrix[end][y] === "O") {
            end++;
          }
          if (matrix[end][y] === ".") {
            while (end >= x) {
              matrix[end][y] = matrix[end - 1][y];
              end--;
            }
            matrix[x][y] = ".";
            x++;
          }
          break;
      }
    }

    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j] === "O") {
          sum += 100 * i + j;
        }
      }
    }

    return sum;
  }

  let dataset = [];

  dataset.push({
    input: `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`,
    output: 2028,
  });

  dataset.push({
    input: `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`,
    output: 10092,
  });

  dataset.push({
    input: `##################################################
#...O.#O#O..OO.O.#..O....O...#.O....OOO.O.O...#..#
#O.O.OO.##O.....O....#....#.O#O...O.....O...O..#.#
#.O..OOO..OO.O..O..##O..O....OO..O..OO..#..O.....#
#...O...OO............#...OO....O.#O...O....OO..##
#....#O.O....O.OO....OO..#OOO.OO...O.O.........O.#
#.......O.#O...O.#.O#O..OOO.O..#.O.#........#..O.#
#..O.....O...O....#......O.##OOO#...O.#.........O#
#.#OO.O...#OOO#...O...#O.....OOO..O.........##..O#
#O.O.OO.#O....OO.OO.............#..O.OO.....O..O.#
#..OO...OOO..#....OO.OOO..O.......O.#..#..#....O.#
#.O.......O.....O.O.O.O.................#OOOOO.#.#
#.#O....#.O#O....O#....OO...OO.O.....O.....#.O##.#
#.#O.#..O.OOO.......O.OO#...O.O.O.#O.....O..O#...#
#..O#...O.O....O.............OOOO....OO.O..#.....#
#.O#.OO#O.O..O#OOO...#......#.......O...OOO#.OO..#
#...OO.O.O.O#..OO#....O#.OOO.OO#O......#.#.O.OO..#
#...O....O#O..O..O.#..OO....O.O.O......#..OO.#.O.#
#O.O#OO.OO.O.#...............O....O........OO....#
#.....O......O...O.O.O.OOO...O..OO.OOO.OO.OO..#..#
#.##...O....O.......OO..#OOO.....O....O#.........#
#.OO..O.O...#O..OOO..O..O..O......O........#..OOO#
#OOO...OOOO#...OO....OO.....O#...O....O.OO..OO...#
#..O...O...#.O.##OO.......OOO#...OO....O..O..O...#
#..O.#O.#O...#.OO.......@O.....O....#...O....O.O.#
#...OO.OOO...O.O..O.....O.O...O.O.OOO.#.OOO.O#...#
#.....OO.O...O.O#O...........O....OO#...#..O.#OO.#
#.O....O..O..O..#OO#.........OO.#..#....O...OO.OO#
#...O#.OO.O....OO............O.O.O..#.......O...O#
#.....O#.....O.....O...O.O..OOO..OOO...#.....OOO.#
#..O....#.O...O......O..OOO.O...O.O..O..OOOOOO#..#
#O#.O.O..#.....O...O..O...O..OOO.O..OO....O.O..O.#
#.#.O..O.O.....#...O.O...OO.OO..#O.O......O..O.OO#
##..O.O...............#.....OO...O...#O.O.....O..#
#..O.O..#.#..O...O..O..........#.O#O.....O..#..#.#
#..#....O.##...OO..O.....O...OO.O#....#O..O#O...O#
#O.O...O#O.O.....#.O...O...O.......#.#OO....O.O#.#
#.#O...O..O....O...O.............#..O.#.#.#......#
#.#...O..#.#...#OO.....O..OO......O...OO.........#
#....OOOO...O.....O.OOO......O.##..O...O.O.O.O.O.#
#....O.O..#...O.O.....#OO.OO.....#...O#O#......O.#
#...#.O......O..O..#...O##OO.#...#.O.........O..O#
#O.OO..O....OOO...O.O.OO.#........O.OO#O..#.O.#.O#
##..#.....O.#O....O#.........O.O....O..O..O..O.#.#
#..OO...O.....O.O.....O..OO..O.OO..OO.OO.O...OO..#
#..............O#OO......##..#OO#...#.O#.OO..O...#
#OO..O....O#.O..O..O......OOO.....#.O.......OO...#
#.O.#O.#.#.O.........O#..O........O.O.#.OO.......#
#........OOOO....OO..O#.O..O.##OO..O...OOOO.OO...#
##################################################

^<<<^^^vv>^^<^^^v<<^^<<>^>>vv^>^vv<><vvv<vv>><v>v<>^^v^>v^<<>><<<v<<^>>>v>>^^vvv>vvv<v>vv>><v<<<<v^^>>^>vvvv<<>v^>vv<<<v^vv><>^^^<v>^^<vv>v>>>>>>v<><^<>^<^^><<^vv<vv<><^^>v>^^v^v^^^^>^^<v^v>^><^>>v>vvv<^<v>v>^v><^^<<^v>v^>^^v>^<<^^>vv^vv>^>vvv<>v<<>^v>vvv><>^<v>^>>vv>>vv<^>^<>v<^<>>^<^>v>>>vvvv<><<>v<>^><>>v>^<><v>v><v<>vv>>><v>v><v^^>vv^<>v^^^<vvv<^<<vv^<^vv<v<>v<<>^>>^>v>v<v<v><>v>v<><v>^^v<^>^v><>><^v<<<v^<^><^<^vv^^<^<^>^v><^^>^<<<v>><>vvv<v<<vv>>v>^<v^>v<^>v^v>v<^^^v^^vv<^^v>v^>^vv^^^v>>>vv^<^^>><<^^^v^>>>>^^v<vvv>v>^<^><v<<>>>v<><^<^<><>^<^^^><>v^v<><vv>>>v^^^^v^v<>^<<^>>^^vvvv<v^v^<<>v<^<<><v>v^<<^v<<v^v<>^<>>>v>><vvv>^<^^^>^v>v<v^>vvvvv^><v><v>>>>><^>>>vv^vv^<>>>^v><vv<^v>>>>v<v^>>^^<^<<v^<v<^<<>><<^><<vv^v^^<^<><v><^<^><v^^v<<^v><v><><<>><v<<^v^<<^<>vvvv^<^^^<<>^>><<<<><^^^^<^><v><^<^^^<v><v>v<^<^^^^<>>vv^v>^v>>><^<v>v^v^vv<<>^^^vvvv<<vv<>^^vv<<vvv<v^v^<>v<<^^^>><vv>^^<>>v^v^v<^^<v^vvvv^<>^<v^^^v>^^vv^^^^v><vv<<<>^<v^v^>>vvv^>>^v>><v>^>><^<^<<>^>v>>v^^vv>^><^v<vv><<>^><<^><v><
>^<v^^>^<<v^^^v><>><<v>^<^v<^v^^^^^<<>^v^^>^v^^v>v^^<<>>v<><^^<>>>^v<^v<>vv>v><v>><>v^v>vvv<><^vv<^v>><<^v<^>v<^<<>^vv<><v<><<<<^v^^v^><^v^>v<<><^^^^^<>v^>v<>v>>v^>>vv<v><vvv<vvv<v>>v>>^>^^v<^v^>^><^vv<^>^>^><v>>^^<<v>v^><<<<^^<<v>>>^><>^<v>><<^><<><<^<^^^<<>^^vv<>vv><>v^><<v^^v^>v>>>^<^<v>v>^^<^<^v^v^<v<>^v<>><><>v^v^v>vvv<<<^<^v>^<^><>>><<^v>><<<<^^vv^^^<<^>^vv<<^v^vv^v>^><>v^v><<>><>>v^^>v^>><>^vv^^^^>^v>^><^><^vv>>v^<^<>>>v><v>v>><<^>v<<<^>^>^>^<><^^^<^>>>^<vv><v^vv>^<<>^^^><^<<v^^<v>v>v^><vv<v<<vv^^<>><v><vvvv^^<<<v^<>>^>^<^^<^<^v^<v^<>^^<vv>^v<<>^v>><^>>vv<^<vv<><v^<<^><^<vv^>v><^<v<>>^vv^<v<>v<vv^>^<vv>>v^<<>v<><<>v<>>>^v>^<v^<^^<v^^>vv><v^<^vv><<^>>>^>>><><^v^v>^^vv>>^<v<vv>><<v^><<>>v>^^><^>>v><<vvv<<^v^<>v<>><v^>v><^v>v<^^<>^>^><<>>^>>>^<vv^^v>v>^^<v^^<v<>v>v<v^>^^^>>><<>>^v<vv>^>vvv>>v><v<v^^<>vv^<<<v>^<<^v>^><v<>>^^<<^v^>v>>v<>vv<^v>>v^>^<^^^<<^v<^v<^<^v^vv<<>^v><<>^<<>v^>>>>>>^vv>>^<^<^>>v^>>^v<v><^v<>>^^vvvv^<<>v>>><^vv^><^vv><>v<<vvv^^>vv><^^>^^<<>>v>v<>>^<v^<v^^v^<<<>^^
>^^^<v<^v<^^><<<^>v>><v<>vv>><v^v^^>^^<^<<<v<^>v<<^<<<<<^>^v>v>v><vv>^vv><><><^^v^><<<>vvv^<^<><<^^v>vv>>v^^<^v><v><>vvv^><<<>v^>^<>>^<<<^<v>^v><^<^<>vv<<>^^<^^vv^><v^^vvvvv>^^<^<<^v^^<<v>^vv<^<vv<>>v>>^<^>><>><^^>vvv>vv^v^v><><>^v^>>vv>v^v^<^><^>^>^^^^><><^>^^>^>^<<<>>^>^v>v<v<^vv><v^^>>v<^<<<<>v><<v^^<v>>^<^<<>>v>>><>v>>><v><^<<<v^<v<v^^v<^^v^<<>>v>^^><>^^<>>vv<<<<>><^v<><^^<v^>^>>>>^>><>v<v><>^v<<><><<>v^>^v>^<v>><^^v>vvv^v^v^><>^v><v^v<>><<^v><v<^v<^<v^v<v><^^<vv<v>><<><<<^^^^^v^<v^^vv>^>v^v>^v<<^vv^<^^<^>^<>><>v<>^>v<<>>v>>v<<^^^^^<^<v>vv>><^v^vv<<vv^^<^v^<><<<v><><v><<<>v<><<v><^<<v>v^<<^><^<^>vv^^<<^<>v>>^^<^>vv>v<><v>v^<>>^>><^><^<^>v>v>^vv^^<^v^><<>>>^<<>v^>vv>v<>><>v^>>^^<v>^^v^^<<><^^v<^^v^v^<><v<^v>^><>v>^^<<v<v<v^v^v<<^^>>>>^^^v<>^><^><v^<^><>v>^>>^>^><<>><^v>v>v>vv<>^^^v^><v<<^^^^v>>vv<>vvv><><^>^><^^v<v>^>^^vvv^>^><^><<^v^vvv>v<^<vv^>^v^^><v^<^^^>^vv<^>>>v<v>>vv<<<^^<v<<<^vvvvv^v<<<v^<<<><>v<<<^><<^v<>v><vv<^>v>^<^<>^<>^<^^v<<<^v>v>>^v^>>^<v<^^v<v^^vvv>v^<^v<vv^^><><v^<^
>^v^^<vv>v<<>^^<><^><v<vv<<^^>>v^^><><^>vv<^>v<^<^>v^<vv^<>>>v^vv^><>v>>>>>>>^^^v<vv>v<>><<v^<^v^v^vv><<>v<<><><^vv>^v>^<^<<v^>^<>^<v^v^^^^<<^>>^vv^>>^<vv<^>vv^<<>>^<^<vv^>v^^v^>><<><>>^>vv<v>>>^>>^<>>v>v<^^v>^^^v<>>^<vv<<v^^^v><^<<v<^^^<^><^^vv<vv>v><v><><vv<>><<<>^<<<^^>v<<^<vvv>v>>v^>v<v<v><<<v^^v<^v^<^<^><<^vv^><v^>>><v>^>^<>>vv^^>^^v<v>^^<vv<v<vv><<<><vv^<<v>^><v>v<<>^v^><<<^>vv^vv<^^^v><^><v^<^<>^v><v^v^^^^>^^<^v^><v>^^^>><^^^v>v>vv<<^<^v<^<vvvv^vv<vv<^^^^^v<<^<<<v^v^>><>v^>v>v>^<^<^>>>v<<v^>>^vvv<<^^<^^>^v<>^^>^<<>v^v^>>^vvv>><v^>>^v>^>>^v>^^v>^><v^<<vv><>^><^>^>v>^^^><v<v<<>>v<>>^v<>v^>vv>v^>^v<v>>^>><v><<<v>v<^<<>vv>^^^v<<<><v^>vv^<<>v^><>vvvv^^>>><^^v^vv<^>>>><^<^^>><^>v><^^^<>vvvv^<<<v>><v^^<<^^><^^^<<><<<vv<^^<v^<vv^>^^>>v<^^<><><^>^v>>>v^>><v<vv>^>^^><><^v<>>v>^^v^vv>vv><>vv<<^<>v>v>v<^>^^^v^>v^^><^^^v><>v^^<>>>^<v^^>>^<<v<<^^v^<<><>^^>>v>>><v<^>v^>^v<<<>^>^><<<>v^^>>>v^v^v<v^>vvv^<>>v>^^^<>><>>^>^^^^<>^v<>>v^<>>>>v<^>^^v><^^^<v<<v^<^^<^^^^<>^<<vv>^vv^^<><^v^><v^>>^><^<<v>
^^<v<vv><<<>^^^^<<^>><vv>^>v^v<v^v<<>>^vv><>v^>>>><^>v<v<v^<><<<<<v^<<^><v^>v<^^<>^vv<<^^>>>^^vv<^>>>^v><><><^v>^^>>^>v<vv<v^vv<^>^v>vvv>v>>^>><<>v>^v><><><<<>v^>^^^><^>><^vv><>^v^v^>>vv^<>>v<<^>v><<^vv>>>>v><><<<<^<<>v<<v>vv^<<>>^^>^^v^>>^^<v>>v><v<>v><^^<v>>v>v^v^^<^v<vvvvv<^v^>>v^><>><^<v^<<>v^<><<>^<^<^><>v^>^<<<^<^<^vv<^<<v<v^^v<<>^<^^<^<<v>^>><^^v><v>><vv>>^<v^^v<^^vv^><^^>^<<vv><>^vv^^^^>v^^vv^>^^>v><^>vv<>v<^<^<vv^^>^<<>v<v>v<v^v>v^>><>v>^<><^><<<^>^v^<^^>^<>><<<^v>v^>v<^v^<vv<>>v>>>v>^>v>^v><<vv<><^><<><^<>>v<v^^^>vvv<^<<v>^<v^v^<vv<^>>>^^>v^v^^><^v>v^<><v>><vv>v>^^vv^<^>vv<^>>^<<v<><>v<^v>v>^>^>v<^v>^v<<v^^^>>^<^><<<>>v>^v>^v<v<v<vv^v<>^^v>^<<<<^^<^>^<>>^vv>v<^^vv>><^vv<>v>>v<>^>>>>><^^<^<>vv^>^<v><<^>vvvv^>v^v^<^^^v><>v<v^^^v>^><v>>v>vv>^^<^^v>^^<><>>vvvvvv<>vv>>^<^v>^><<^>^>v^v<^vv^<>v><^<<^vv^><v<vv<^>><vvv>>^^^>v<<v^<>vv<v^v<<<^>><v<<>v<^<<^<<>v<^>v^^<^<^^vv^^^^^^vv>><<^^>>>>>>^^>^<>^<vv>><<>><<v>>v^^v<^^^<^<^vv^<v<^<<>>>v<v>v>v<v<>^<v^v>>^^v<<<>^^><^^v<>>v<<<^v><v<vv<v>>
^^>vv^^^>v^vv^^<<v^v<<^^^vv^v<><>>>>^v^v>^^<<<^>>>v^>v>>>v<>v^>^^><>>>^>>>^<>vv<<v>v^^v<v^^>>v^>><<^v<vvv^^v>><<vv^>>>^v^v<>><^<^<v^<<v^^>^v<<<>>^^>^>>v><v^^v>>v>^<>^^v>vv<v>^<^>^v>>^><<^<><vv<>><<>v>>><>^v^^v<^>>v>vv^v<<vv>^v^v^>v^>>><>^^^vvv^^^>>>>^^<^v^<><v>v^^vvv>><<<vv>><v>v><><v^><v^^v<<<^<^^^>v>><<^^^<v>v><<<><<>v^^<<<<^^v<^<<>^<vv<^>^>^<<^<^^>v^v<><vvvv>vv<vvv<>^<<v^^<<<>^><<^v<v^^v<><v<v>v^><v>vv>^vv>><>>>>v>>>><<<><v><^><>>v><<>^>^>^^^v^vv^>^^<^>>>>>><<^<v<v^v<<>>^>><<>v>v^v>^<>>>^^<v<<vv<^<v^<<v<v>v>v<<<<^<v<>v^<<<v>v<vv<^v>v>^>v<v<^><<>v<v^<>v^v^^<>v>v^>v^^^<>>vv>>>>v<^^>^>^^<^^^>v<<v^><v<^vvv^v>^v>v<>v^v<v>>vv<^^vvv^vv^<v^>^>^>v>vv^>v<v>^<v>^<>v<<<>>v><>^^v><^v^v<v><<>^><<^<vv>vv>><<>><<><^<>^<^<v<<v>>^v<^^<<<>^^<vv<<v^<^v^>>^^v>^>v<>v><<<>v>^v>^vv^^^><<>v^v>>^v^v<v^<<<^<<^><><v>^<<^>v<><>><<v^<<>><<>v>vvv^^>^<<<><>>><><>>^<<<^v^>>>>^><v>><v^^^v><<^vv><>^v>^^>^^vv^v>>vv<>>^><v<v^<<<>>^>^v>v<vvv<>v>^<^<v>v^>><v^<<<v<^v<^vvv>v<^><<<<<<<<v^>><^>>v><vvvv><v^<<>^>^vvv>>>v<v<<v<
v>>>>v<^v>^>vv>>>><^^>><>v>><^^^><>v^^<>><>>^<>^^^><v<><^><<^vvvvv>>^v>^v<<v^><v>^<<<<^<>^<v^>>^^^>v^<^>^<v><<<>>v<v^^v<<>>v^<>>^v<>>^>^<>>vv><<<<>>v<v><<><>>vv<>^v^vv><^>^^^<^><><<v<><<><vv^^><<v^<^^><v^>>>^<^v^^>v^<v<<v^v<vv<>^^^><<v<<>>^>><^^v>v<><><v<v<<>^<><<v^^<^<vvv><v>><><^>^>^v<vvvv>>^<><^v><^<>><v<>v<<>v>^><v^<^v<v^vvvv^>v<>^<<>vvv><<>^^<^>^^<<<^^>^v<vv<v^^<v<^v>>v^>^<^<v^<<<>>^^^^v>>>><v>vvvv>><^<^><>>>vv<>v^<^^<v<v><>vv>v>v^v>v>>>v<^vv^^<>v>v^v<>^vv<<v>>^>^v^vv^<v^vv>v^vv^>v>^^^>vv>>><>v>>^^<^^>^>vv<^>vv>^>^v>>^v<>v>v>>^>^<<^v<<^><^v<v^^<^vv<<<><^v^>>vvv^^^>>>>^>vv<<v>>>>v<<^^<><vv<v<<v>v>^<><^^v<<v<^v<v<^<<><v^v<^<<v^<<v<<^<v>^<>><<>^>^^>>v<v<<>^v^^v<vv<<<>><v<>^<vv>v>v<^v<^^^v<>^>><^>^<^><vv<<^>vv<^^^vv><<^v<<vv^v^v^v^>v>v>^vv<>>^<^^v^^><<<><v^^^<v<<>v^<^>v<>^^vv<<>vvvv^^^<>>v<<<<v<<<v^>vv>^^<^>>v<>>>><^<><<v>^>^<v>><<^^>v<>vvv>v>>^>v>^>>^><<^>^<<^v>><<^<<^<<v>^<>v<<<<^><><^^^<><^v<<v<<^v<>><^<vv><vv>^^v^v>v^<^^>v^>>^>^>^^v^v^^><<v<<>vv^vvvv^v^<v>>^vv^^v<<v<<<v>v>^vvv><>>
^^^<v^>v>^vv>>^v>>vv<>^^<^v>^><v>vv^v<^^^vv>>^vv><<^<><^<^^>vv>v>^>v^<>v^v^>^v<<vv>^v<v^<vv<<^<>>>^^^^>v>vv>^>^>^^^^^>>v<<>>^>>vvvvv>vv<vv>^>><^v^>^vv^<v^^^^v<v<<<<vv^v><^><<<^^^^^<^v>vv^^^><<^><>^<^v>^>>v<>v<^>^v<<^<^v^vv<v^v<vvv<^v^<^>^^^v^<v<<^^v><>><^^<^v<>>^<v>^v^<v><<<^v^<>^vv><v^>^vv^v^^^<v>><<^<>vv><><<>^>v<v<<v>v<>^<v<vv^<^^v>^v>>^^<<v^<v<v>v^>^^><v^v^^v><^^v<><><^>v>v^>>v>>^>^<>><^^<<>>^v><^<^>^^>^<<>><<^><>>^^v^^^v^vvvv^^>>v>><>^<vv<^v^^^>>v<v<>><><vv<^^<^<v<<<<<>v><vv>vv>v><>>^v><<^^<v>v^>^^^<^>v<>v<>>>>^vv<>v^v^^^>^<^>^<<><v^<<><<vv^^v<<<^<^vvv>>><^>vv>v<v>>v>v>v^v<>v>v^^v>^>><^vv<<^><<>^vv>v<>^>>vv>v^>>^>^><^vv<<^<^v>><^<^<v<>^v><v<^^v>v<v<^<^<vvv>v^^v<>v>>^^>^>v<>>v^^<><v^^v^^vv<><<><>vvv<^>^vv^<v><v<<<^^vvv^<^>vv^^^<^<v>^^v<^^>v^vvv^<vv^v>v^<<<v^<<<<<v<>>^<v^>v>^<v>^>^<^v>^<^^<<v<>v>v^v<^<<><>vv^vv<v>>><^v>v^<>><v>^v>v<<^>^v<>v>vv>>^vv^v^<v<>>>v^vvv^^>v><^v<^^<<v^^v<^v^^v<^><<<<><>^>^vv>v^>>^<>vv>><^v<>><<<v^vvv^<^>v<<^vv>v<<>^>^<v>>^^^^><><>v<^v<^>^<v<<>vv<>><>^>^<>^<^
<^>>>v<^>v>^><v<>^>>v>v><^v<<<v^<^<v>^>>^<^^^^<v^vvv>^^<^^vv<^^>^<^^v<<<v^v>v>v<^><<<>vvv>v<v>><>^^vv<^<<<v>>v>^^^^>><v^<<v<<<><><v^<v^<>v^v^><v><v<<v<v>v^<v^<><<v>^vv^v^<>^<<<v<^^<vv>v^^<<v>v<>>>^<^><>>v<>^>^v^vvvvvvv<v<<<^><v><v<><v<v>^<v><><>>^^vv<>^v^<^><<^<^vv>>>^^>v<><><^v><>^<vv>>^v<vv>v^^v^>v^<<>><^<^^<>vv<^<<<>vvvvv>>^><v><><^>^>>^^<v<v><>vv<vvv<<^>^vv<^>v<<vv<<>^^><>><<^^<>^v<<^<v^>^v<>vvv<^>^^>>^v^<^>^>vv<v>v^v>v<>vv^v^^<^<v>>v<v><^vv>v<<><^v^v>><^^<v<^^<>^<^^^<^>><^v^>vv>>^>^>>vv>>v<^<^<<>^^>^v^v^vv>v>^><<><<^v>^v>v<<>^><>v>^<^>^<>><<>vv<^^^vv><^^v<^^<v>>^v><vv<>^^v<v<<><v<>vv<^<>>>vv^>><v>>>>^<>v><>^>><v>>v^<<^><<^^>vvv^^^>v<vv>v<^>>vv<v<>>v^^>v>>><<v^>>^vv><^^<>v>v>^<^^^v^<^v^>><v><v<<>^<<<v>>><^^>>v>v^^v^vvv>>vv>>v^v>v<>vv>v<v<^vv<^^>^^<^vvv<>>^v<vv>^<><^v^^v^><<vv>v^><v>^>^<<v<^<>^>v<v>v<<v>>>v<vvv^><^v>>><<><v>v^^><^><<v>vv^^<<<^>>^<<^v><v^<>><><^v<<v<>vv><>^><^v<vv^><^><<<^vv<v<>>^<<<<v>>^^^<v^>>><>><vvv^^vvv<>><>>><^^>>^^<^v<v^<<<<>><vv><<vv>v>>>^^v<>v^v<<v<^vv><^v<>
^>v>^^>>^<vvvvv>vvv<^<v^<<v<^^<>^v<<^>v^>v<v>>v><^^v<><v^v^v^<>>vv<<^<v><^^<^><>><^^>v^^v>^<>vv^v^v<^v<<<vv^>>>>^^vvv^>>vvvv<<><<>>^v<^>vv<>>>^<v^vvvv<>>^>vv<>v<^^v^>>v<v^<>v<><<>v^>^v^^>^<^v^<>v^<^<>^<>^^>v>v<>v<<>>^v>>><vv>vv>^>v><v<^v<<vvvv<v<v>><<^>>vv^^v<<<^v^<v<v<vvv<>^vv><^>v<vv<^^^><vvvv<<>>>>^vv^v>^<<<>^>^<<v^^>^vv>v^><vv>>v<^^v^v^<<<^><<<^<^>><>vv><^^>v>>^<v^>v<v><^v^>>>v>^<^<^>>v<v^^>v^<>>^^v<<><<v<v^^^v^<^<v^^<<>v><^^>vvv^><vv^^v^<<>v>><^v^<vv>vv^^v>v<^<^>^vv^v<<^^<><>><>^vv<>><^^v^<<^<^>>v>v^v>v><^^<<^><<<>>^^<><v<^v><><v<>^<<v<<>^^v>^<><><><>>vv^<vv<v<vvv<<^<v^v<v^^<>^vv<^>>v^^><^<^<<v>>>><<<>^<v<v<<>^v><>^>v>>vv^<<<<vv^^^v<<<><^<<v<>vvv<^>>vvv<<><>^<v<v^^<^^v><<>>>^<vv<v<<<>>>v^<<<v>><>><<vv>>v^>v<>><>vv^^<v>v<>>^><^v>>^^^>>><vv<v>^v<><^>>^<<>v<^^>><<<^^<><><>^vvvv<<<>vv>>v<>>v<vv<^><><><<<<><<^^v>>>><<^^v><vv>^v><<^<><^vv>>>><<><<<vv><^<>v^>^<<^v>^<<<^<<>>>^>>>^v^>>v^vv^><^<>v^<^>^<^^vv>^<v>^>>^>>v<^v>^>><v<<<v>v><><<>v<>>vv>vvvv<v^<^v><^v><^vv^><>><v>v^^v^^vvvv>v<^>v>>
<<^><<>>v^<><>vv<<^<><<v<<vvv^v<<v>>><>^^<v<^<^>^>><<>^v<>>^><<v><^<>>v>v>^<^v<<^>^vvv>>>vv>vv>vvv^v^^vv>^^^<<^>v><^>>v<<^v<v^<><vvvv><v>vvv<^vvv<<<<>v^><^v>><v^>^^v><v>vv^>v>v^v>v^^^<^>>>vv>vv<vvv><>^><v<><v<><<^<<<<><<v^>>>v><^vv>v>>v<^^<>v><>^><>v<vvv<<<^v>v><v^^^^v^>>v><v^<vv<>^<^<^>>>^vv^<v>v<<^><><>>v<v<><v<<^^v<^<<<vv<<>>v>>^<<>>v><<<>>>v^^<>^>>>^<^v>vv^><<^><^>>vv^<<>v^<^v>^^^^<<><^>^><^^^^<^vv<v^^v<<v^vvvv>vvv^vv<v>v<>^vvvv>v^v><>>>^<^<><<<<v<<>v>^vvv^><^vv^v<>v^v>>>>v^<>vv><>v^v<<v>>><v>v>vv^^><><^v^>>vvv^^>v^v<<>>>v<^v<^^v<<vv^><vv>^<v>v^<v>><>^><vvv^vv>>v>v<v<>vv^v<>>^>v><^<^>v>^>^^^v<<>^^^v><>>^<^<v>>v<<>v^^v<<^v^<<v<>vv>><^vv>^<v^v^<<^><<^^<><>^<^<<v<v>vv<^<vv^<><v^><^<v>><><^v><vv<<^v^^>>v>^^>>v>>vv>^>vv^>v^^<>>>>^<>>>v^^^^>vv><^<^^^<><v>^^v>><v^^<^>>>v^><><^<^>^<v^>v^vv<v<^^v<<v^>v^>>^>vv^^v<>><^>>^^<^v^<v<^v>><v^>v<>^vvv^v^^^v>>>vv>>>><>>^><v^><<>^^><><>v>^v<^vv<>^vv<<vvv<<v<>>v>>^v><<<><^^><<v^vv<>^><>v^<<v>vvvv^<<vv<v<v>^>>>^<^<>>v>><<><<^><<>^<^>v<>>>vv^<vvvv<<>><<>
<vvv<v>^<<>>v^v^^^<<vv<<<v^>>>^>^><>v>>^^>vv>^<><<^v^<<<v<v^>v^v>^v>>>v<^>^^>v><>^<<^v>^>>^^<>^<v^<^vv><<>v><^vv>>^v>>^^v<><^><^^v>v^v>>v><<<^v<^><^<^<<^<<>^><^v>>>v^<>>v>^^^<v<>v<<<><^^^v<v>v>^^>^><>><<^><>vv>^^>><<<<^<<v^>v<<v<>>>>>v>vvvv<>^>v^>v>>^<<^^v>><>v>^>>v^<vv<<<v>v^^<>>vv^v><^>^vv<>^<>v>>^v>v>v>v><^v<^^><v<<^>>>vv^^>vvv>vv>vv<^v<<v><><^>v<^v^vv<<>><v^^^vvv<v>v>^><<v>v^v>>^^>^^>>>^v<v^>>^v><^>^vv>^v^>v><>v<v>^^^^<^v>^>^^^>v>v><^><^v^^^>v>v<>v<v>vv<<^vv^^v<><vv>><^>>>^<>vvv<^v>v<v<<<^vv^<^<<<<><<v^<v<>^v^>v>v^^v^>>^v><^^v><vv^<v<^<^v^vvv><^<<>^>vv^^v<^^v<vv<^<<v<^^^<^v^v><^>>^^>v<^^<^<^^<^>v^vv>>v>vv^<^v><^^><<<<v^>v^v<v<<^^v<^^v<v^vv<>v^>vv<v<^><^v<v<v><^vv<<vv<<^v>vv>><^v^<<><^>>>v<^v<vv^^<<<>><>v<^^^<v<^^^^<<v>v^^vv>>^^>^<^<<<vv^<<>^^<><^^<><^^><v<<v<><^v<>>^^>>>v^^^<>^<<<<><^^<vv>^v^^>vv^<>^^^<<<<^^><><>v^^>>>^>v>vv^<v^<><v^<<>><<v^<<v>>^>v>>vvv><<v<>^v^vvv<<^<><<<<v^v>v<<^^>v<vv<^^^vv^<^vv>^<>^<^v^<<v^>^vv<>>vv^>v^<>><><><><^v^>v<<vvv>>^v>v><<v<><vv^>>>^^><<<^^^^v<>v^<>>>
^vv>>>><v^v<><v>^<<vv>^<^>v>^<^v^v<^v>><v^>><<><>^<v<v<>^<v><v<><<<v><^>>^^>v<<v<<v^vv^>^^>>>^<<v^v>v^vv>vv>>vv<^^<><<^^^<<v>>v^>>^>><v<v^v<^>>v<^<vv>v^vv^<<<v<^<<<><v>^^v>^v^>>vv^v<>v^v<<<^^^>^v^vv^^>>>^>v<><^><<v<>>^v<^v<<^<<><>>^vv>^^>>>v>v<<vvv^v<>vv>^>>v<<>^vv<<<>vv><>>^<^<>^^^v^^v^v^<<^>v<^<<^><>v^<<<v<><<<vv>^>>>v^v<><v>^v>v>v^^vv^vv^>^^^>^v^<^v>>><^vvv<^>^<^vv><v<<>>^^^>v>v<>v^v<v^^<^^vv>>v^<^v^<>vv<<v<>>vv>^><<>^^>>^>^v<^>^<>><>v>v<^^^<<^<>><^^v>>^>v<v<^>^^vv>>^<>>><<v>^^^<^>^^^>v^>>^^><>v^^v^^^^><<><^^<v^>>^>vv<^>vv>><>v<^>>^<^v><v^<<vv>^<vvv^<<^^v^>^v<vv>^><<<<>v>^>>vv>^>v^>^v>^<v^>>>v^^<^<v<<^<v<><v<vv^v>^^vvvv^v>^v<v>^>^^^vvvv^>^>v^>>vv>^<v^<^v><<v^>>^>^>^>^^^v><v><<>v>^>^^v>>>^>><>>^<^v<vvv^^<>>vv^^v^^v<<<v>^<^>vv>>v<^<^vv>>^^>v<>v><v^>v><<>^v>^v<<^<<>v^><v^>^^^><><vvv^<^^^^>v^v^<^^v><^>vv^>>>><<^<><v>^><><<>v^v^<<<^^<<<v^^>^^v>><>><v^>^<v>^^<^^<v>v^<>>^><^<^>v^vv<^<>^<<v><<<>>^>v^v>>^^v>v><v^<^^^v>>v<^<^v>^<>v>v<<>>>v<<<^>v^^<<^v<<v><^vv^>>^>>^<<v<v>^<^<^>^^^v><^>>v<vv<<
^<v^<<^<vv^^v^v>><v>>v<>v>^><>^v>>v<>v<v^<<><>^v<<><^>vv<><^>>v><vvv<><^^<^v<<^^^<^<<>><^>^v><^<<>^^>v>vv^>^vv>><v<<^<<<<^<v^vvvvv><^^<^^>^^><>>^><>vv<^>^<<>v<^^v>><<<^v<^^>>^<^>v<vv^><^vv<>^^>v<>^v><<^<><>^vvv<^<v>^^>^^v<^><<v^>v<<<^^v<v<v>v<^>>v^v>^^^<^^<v>>><<<<^v<>vv<v<v^v<v>^^v<^>v>v^>v<^>^^<><v<v<^^v^^>>^^><>^^v<v^^>^^v>^>v^v>>^v^v^>v<^><>>>^<vv^^<^>^<v^>^<><<vv><^^^<>v^v<v>^^v>^v><^>>vv><<v<<<>v<vv<<^>><>>^<^^>^<<vv^^><<v>><>><>v^^^>^<^v<^<^v^v^v>^<^^>^^v<^><<<v>>>^vv>>v>v<v<><<vv<vv<^v^<>^<>vv^^^v^v^v^<>>>v<vv>>>^>><^<<^>vvv<^>>>>>>>v^>>^^>>^v>^>^>v^>^^^^<^>>v^>v^<v><v^^<^^v>><><<^^^<v^<v>v<^<><<>^<<v<^<v<<<>v><>vv^<v>v>>v>>^>^<>>^>^><^^v^v^^<^>^^<v>v^<^<<>^<>><<v<v><^^>v><^>^v<^>v^<v<><<>><><<^^v>>v>^<^v<v^>v>><^^^^v>^<v>>>^>v^^<v>><vvv<<^^<vvvv<^v^v>^v^><v>><<^^^<<v><^^<>v><<<v<>v^^<v<^^<vv^^>><>v^v<^^>v>>>v<^<><^><<<vvv><><v^v^<>>v<<v<<v^<^><>^v^vv<>v<^<<^<^>v><^<v^^^<^^v^<^<v^^^^vv^^^<><^><vvv>^>>v^<v^^><v^^v^<<<<<<<v<^^v>vv^^^<v<>vv^^v>>>vv<<vv>vv>^v>^><v^^^>>v>><>^v^<><>>
v^v>^<>><<<<>>>>v<v^^v^<^v><<>^>><>^<v>v<>vvv^>><vv>^v<<<>vv>^<v^^<^^<><>v^<>v^>><>v<^><<>^<v<v<^<<v<<<^v<<v<>v<<^^<v^v><^vv^^v<><^<>v<<<<^>><><v<<>^^^<>>^^^<v>>v^<<^>^<vvv<^<v<><v^<<<<^><v<v<v<<v<<v^<v>vv>^^v><>v><>><<<v^^vv<><^<>vv>^^v>^>v<vvv<v^v^^<^v^v^<^vvv>>^v><v<<<>^><<<^^<^>v>vv>v>vvv><<^<<vv<>v>^<v<><<<>>^vv>^v<v>^<>>>^<vv^v>><v<<><^>^^>v>>>^v<>^><><^v^^<^<>^<v^v<v<<<><^>vv^v^><v<^<<<^>vv^><<^^<^>><v^<>>v<><<<><v^^v>>^v^v<v^^>>^^>>>>v><<>^v^^>^>v^^<>>>^^<v^<v><>>>v^<^>^v<^v<^>^><<>vv<v^>^>><vv<v<vvv>^v<>^>^^v^>^<^^v>v<v>>^<<>><<<<^vvv^v^^>vv><<^v^^<>>^<<<^<v><<<<>>><^^<>v^v^vv^<<<<<^>><><^^<<v^v^^>^vv><>^><<>^vv<v<<^^>>v^v><>>>v<v<^v^^>><v<^v^^^vvv<>v><<v^<<vv<<^>>v<^v<vv^v^>^<<<>v^>>>>^>^><<><vv^^v><^^^v^^^<<><<<^^>^>^v>><<><^<>vvv>v^>^^><^>v>><^v^vv^>>^^>>v>v<<>^^<<<v<>>^vv>^v^>>v<<>><<<>^>>^>^vv<>^^^vv<<<vvv^<vv^^<<v^^^^<^^v^v>vv>v<v^^vv^<v<>vv>>>^<^^>>^^<><v<v><vv^vv<>^vv<^vvv^>vvv<v<v^v>>><v><<vv^<^vv<^^vv<^>>^>>><^>v^vv^v<^^^>>><vvv>v>vvv>v^v<vv^<v^vv^^<>v^>v^^^^^<<v<><>
v^<>^v>^>v<^>^<^<v^^^vv^<^<<<<<<^^^<v^<>>>vv^<>>vvvvv<>vv>vv<v<><^<<^^>^vv<<v><v^^^<<v><<^^vv<^^>>><<<>^><<^^<>vv^>^>^vvv^v><vv^v>^^<v^^^^<>^<v<>^<^>v<>>>^>^^v<<>><v><><vv>v<>>v^vv<>vv^^v<>^v^>^^^^^^<>><v>>^<^<v><^vv^<>>>>^^><v<^v<^^^>v<<vv><><><<<vv^<<^<>>>^><vv>vv^<>>v^<^vv^v^^^><v^vv>><^>^<^>>>>v>vvv^^^>vvv^>>>v<<<>^^<<<^<^<v^>><^<<>vv>^v><^^^v<<>>>^><vvv<>>^v^<^<^^><>^^^<^^<>^^vv<^v><^>>v^>^>v^<vv>>>>vv><^^<^vv<^<^^v>>v^^<v>>>^v<v^>^^>^v>>v<>^>^<^<^^^^<^>>^>v<v>^^><>>^<v^vv><^v<>><<>^<<><<v>v>^^<v>>>>v^><>^^<>>vv<^>^v>>v><<v>^v><^>v<<v^>v<<<<>^v<^<<>^><v^<v<^>^v^<^^^><<^<vvv>v>><<v>v>v><^v<^<^>^>^><<<>^>^>^<^v>v^^><<>^vvv^<<vv^<^<v<>v<vvv>^<><>>><<<>v<^>>>v><>><vv<v>^v^v><<<>vvv>^^<^^<v>^>>v<^><^v<>v^v>^^<<<^>v>^v<>v^^<^<>><<v<v>v<<v^>v^<^^<<<<v^v><>v>vv^^^>^vv>>>>v>vv^<v^><<^<^>>v^^v<<>v><^v>^v<<><><v<^>v^v^vv^<^v<<<^>><v^>^>><v<>>^^vv><<<^<<v<^>^>^<>^>v<^>v<^<^^<>v<<v><v>^^><<<><><<<><^>vv<^^>>^<<v^<^<^>^^v>v<^^v><v><^^v>>^>>vv^^v>^>>>v<<v>>^<^v^^><v<><v<>>v>v^v>v<^^>v^><v<<v><>^
<>>>^<^<<v<>^<v^^^^vv^<>>^v<v^vv^>>^vv>^<v>^vvvvv>^>^<<vv>>vvvv^><^<><<<v^>v<>^>^>v<vv<<v>v^vv^>vv^v>>^vvv<>^<<v^<v>>^<v^<^v>v^><^^^>v^<<^^<<vvv>v<<^>v^v>^^vv<^<<<vvv><>>v^<^^><v<^v<>^>v>v<<<^<^^^>^>vv<<<><^v<>^<v^<vv^^v>v^^v>>^<vv<>^>^>>^^<v>v^<<>^>>v^v<>><<vv^><<>^<^>^<v>^>>vvv^<vv^^^><vvv<v^v^<>>^^v>>^^<<<><>v^v><<>>^vvvv<vv<v^>>>v>v><<>>^v^^>v<<^v><<^v<^vv>v^<<<^v<><^>^>v^><<<v<^<<<^><<v>><^^v>><<>v<v<^<v>^^<<v^v<>>>>v>v^>^^^v<v<<v><^^^^^^<>vv><v<^<v>>^<v<<<v<v^<^><>>v>v<^^^vv<^v^<v<><>>>^><^<<<vv^>><^>>v<>v<>^<>v^<^><<><^<><<v^<>v>^<>^><v^><<^>^<<v><<<>><>v><<>v<^>v<v<<^^<<<^<>>>^>>^>v^>^<>>><<><^>^^>^vv<^><^<^<<>vv<<<^v<^^<<^<v><<<^<<^vv>v^v>^v<^>^vvv><vvvv>v<>>^^vvvvv^^v<v<<><><<>^>>>vv<^^v>^<vv^<>v^v<>>>>>>^>>v<^<>><<<^v>>v^<vv><>><<^<^^^>v<v^><>v^>>vv><^vv>vv>v^^><<>vv>v>>^>v<v^v>>^^v<^>><>^vvv>^>>^<v<v^^v^^><>>>^<>v^<><^><v^v<^^>>^<>><v><v^<><^^^v>^^^>^><<v^vv>>v>v^vv<v^v>>><<>^^v><<v<v<vv>><^><vv<>v>^<<^>^vvv^>>>>vv<<v<<>v^^>>^vvvv>v>^^^<<<^v<^>>v><^v^v^v><<<^^<^<^^v<^>><^v^
^<v^^v^<><>^<^^^^v<vvvv<>>v^v<v<<>>^^<<v>v<<v<v>>><^>v^^v>>v^^v^v^>>><<^<>v^v>^^^v^^>^>><^>>v^><v^v><^>>>vvv><v>v<><^<v<<>^<<><^<^><^^<<^<v<>^><^><^><<>v>><>v^>vvvv><<^><v>^^<v>><v><>^v<^^<>^v>v^>^<^v>^^>^>^^v>^>>v<v>><^^>>v><<<^v^>>^vvv<^v>vv<v^<v^vv^<<^^v^^v^^>>>^<>v>^<>v^>^vv>^<^>>vv><vv><vv<<^<>v^>^v^^<><<<v<<<><<>v^v^v<v<>>><^<v^<^>v<<^><>>vvv<^>>vv>v^<^^<^^<>>^<<^><^<^v>v^v<<>v^^^^<>v>>^v^<<^<v^v>^><>>><>><v<<^<>v^<^^^>^^v^^<<>^v<<><>^v>>^v<<^>^v^v<v<^^^v>><v<^><v^v<>v<<^<vv^<><vv><>>^>>^>>>^^^v^v>vvvvv>>^>>v^>v<>v><><><>v>v^>v>vv^^<^>^><^<v^^v><>v<<<^v>>^>vv>v<v^<^v<^v<><vv<^^^<<v>v<v^v^>>v<^v^^^v<v>^<^^><v>v^<<<>^<v>>^<vvv^v^^><v^>>>vv>>^<^>vv><v^^><<>v^v^^>v^^>^v<<vv><^><^^>^^<^<<>>^>v<vv^><^vv^vv^^vv>^>^><>><<^><<^<><^^<<^<><v>v^^^^><vv>^vvv<<v<>^^><<^vv<^>^<^<<<v<^vv<>>v<vv^>^^<^<>^>^><^>>^<^>>v<>v^^vv<<vv^>v<><>><^>^><<<>>^v<>>v^^^>v^^<^>^^v>><<>v^<vv<>^^^<>^^<>>>v^>^vv<>vv><vvv^><v>><^<v>>>v<<v>^><<v<>v><vv<v^vv<^>><>^v^^^>>>>^^v>v>^>>^v><v>^<<<v^>v<>v<v<v^v^>><^>>^>>v^^>v
v<<>v<<v><<>vv^v><<^<v><^^<>>>><vv>>v<vv^v>v^vv<^^><^v^^>^vv>v>^<><<^<>>v^>>>^^>^^<v><v^>><^><<^v>v><v<v^>^>^^>v>><>^<<<<v^>>v^v>vv><v<v>^^>v><^>v^vv<v^>><<^><^^v><^<<>v^^vv<<>>^^<^vv^<<^>>^v^><v^^>>^^vv^>v<v>><vv<v<<<v<>><^>>^<<^<>^>>>v>v^v>v>^^>vv^<v>>><v^<><<v^>v^^<>><<v^^v>v^vv>>>><v>v<<<<^>^^^v>vv>v>v<v>^^<v^^^^<>^<<v^>^<>^<>v<vv<>v^v>v>v>^v<>^v<<^><^v>v^v<v>>>>vv>v^>v<<^vv^<>^<^v^vvv>>v><<^>v>v>vv>^<^>>^<^v><v<<^<v<>^v<>^^>><>^>v><<^^v^v^v<<<<v><v>>>>>^^<>>v<>^>^<v>>>v^^v^>>v>^<<<<<><<vv>vv>>>><^>>vv^^^<^<><^>^<vv>><<^^^>^<v<><v<^>v<^<^>vv^vv<^<v<^<>^v^>>>v>>v^<<>^v<^^^>^v<v>>><<>vv<<>>>>v><<><v^<<^<><^^vvv<<<<^^>^<>><>^v^><<><^^<<^<>^^>v^<<>>^v^^>><<^vvv<^>><>^^<<>^<^>>>^^<>^<<<<>><v<v^<^>^<v<^>>>^v^v^^v<><<<v>>v^^vv>v>v<>>v>><v<>>>^v><v^>^v^<<><>^^<>>>vv>^<>^^vv<<^v<v<^>>><<><v^vv^vv<>^>^>>>v>v><<v^>^>><v><<^^><^>^<vv><<v<>v^<>v>^^<<>>v>^^^^v>>><v>^>v<^^^<<v><vv<v>vvv<>vv>vv^><^<<v<>>^v<<^^v^>v<>>>^^vvv^<^<>^>>^<>^<<><^>>v>>>v<<><<v>v>^^^>>v<<>>>vv>>^^>><><>>^<vv>v^>>>>v>>vvv<>
<<><><^^>v>><<^^vvv>^<>>><v>^v>^^^v^<v>>v>>^<^^<<<<v<>>vvv>^^>>vv><><>^>>><><^<^v^vv>>v<v<<^v>>>v^>v<><^^v>>^v^v<>><><vv>>v<<>vv^^^>v^<<v<<^v^^v^v<<^>>^vv^^v><><<<<^>>vv^^<v<<<><<<^^^v^vv^<<><v^^v^v^^>^v<<>^v>^>^<^^<<>>^v^>v<<>^>v>><<>vv>>^^v><^<^<>>^^>^^^<v<^>><^^>v<^<>v^^<>>v>^v<<v<<^>^>v><<>>^<>>v<<><>^vv<vv<><v<^v>vv<>>vvv^<<>v<>>>v^^^^^^<^^>v>^<^^>vv>vv<v<^v^>^^<v^^>^>v^v>^^<vvv>v^v^^v^>v^<>^<v>v>vv<<^v^<^^>>v^^v><><^><<^vv^v^>>^>>>vv^<^^v<>>^^^v<<v^^><v<v^vv<v>^><<>v<vvv><>vv^>vvvv<v<v>>>^v^<<^v>^^^>v<v^>>vvvv><>^^vv^^v>^>vv^vv^<v^<^^vv^^^><<>vv^v>^vv<v>^v<<^<^^>>vvv>v><^<>><vv^<<>vv^v^<^>^<<vv^<<^v><^<<v>^v><vv^<^^>v>vvv<><^v<vvv<>><^^<^>^v<^><<^v<^^^<>^>v^^>^^vv><^<>>v^v>v^>v<<^<>>vv>^v><^v^<^<v^vv<^^>v>>^<vv<<vvv^><vv<v>>v<^>>v^<^v<v<<v^>><vv><>v^v<<^v<v<>^><^^v^<^^>>>v<^<v<<v<>><^<^^vv<<v>><<<v<<>^vv^<>><>^^<v><>^^v<v>vv>^<>^<<>^^v<^^<<^v<<^^><^v<v>vvvvv>^v<^^>>>>^vvv<v>^><v^<><>^<<<^^^<<>vvv>><^^<<^^v^>v^<^v<>v><v^^^v>v>>>vv>^>>v<v>v><><^v^>v<>^<^^v>^<>>^<v>^>^^v>v^v<^^>><<>`,
    output: 1527563,
  });

  Utils.check(solve, dataset, "15a");
})();