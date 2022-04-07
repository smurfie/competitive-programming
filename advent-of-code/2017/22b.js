(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var dict = {};
    var iterations = 10000000;
    var bursts = 0;

    var i = 0;
    var j = 0;
    for (var line of lines) {
      j = 0;
      for (var char of line) {
        if (char == "#") dict[i + "," + j] = 2;
        j++;
      }
      i++;
    }

    var x = (i - 1) / 2;
    var y = (j - 1) / 2;
    var d = 0;

    for (var i = 0; i < iterations; i++) {
      var state = dict[x + "," + y] || 0;

      switch (state) {
        case 0:
          d += 3;
          break;
        case 2:
          d++;
          break;
        case 3:
          d += 2;
          break;
      }
      d %= 4;
      state = (state + 1) % 4;
      if (state == 2) bursts++;
      dict[x + "," + y] = state;

      switch (d) {
        case 0:
          x--;
          break;
        case 1:
          y++;
          break;
        case 2:
          x++;
          break;
        case 3:
          y--;
          break;
      }
    }

    return bursts;
  }

  var dataset = [];

  dataset.push({
    input: `..#
#..
...`,
    output: 2511944
  });

  dataset.push({
    input: `.....###..#....#.#..##...
......##.##...........##.
.#..#..#.#.##.##.........
...#..###..##.#.###.#.#.#
##....#.##.#..####.####..
#..##...#.##.##.....##..#
.#.#......#...####...#.##
###....#######...#####.#.
##..#.####...#.#.##......
##.....###....#.#..#.##.#
.#..##.....#########.##..
##...##.###..#.#..#.#...#
...####..#...#.##.#..####
.#..##......#####..#.###.
...#.#.#..##...#####.....
#..###.###.#.....#.#.###.
##.##.#.#.##.#..#..######
####.##..#.###.#...#..###
.........#####.##.###..##
..#.##.#..#..#...##..#...
###.###.#.#..##...###....
##..#.#.#.#.#.#.#...###..
#..#.#.....#..#..#..##...
........#######.#...#.#..
..##.###.#.##.#.#.###..##`,
    output: 2511090
  });

  Utils.check(solve, dataset, "22b");
})();
