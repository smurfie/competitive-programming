(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var dict = {};
    var iterations = 10000;
    var bursts = 0;

    var i = 0;
    var j = 0;
    for (var line of lines) {
      j = 0;
      for (var char of line) {
        if (char == "#") dict[i + "," + j] = true;
        j++;
      }
      i++;
    }

    var x = (i - 1) / 2;
    var y = (j - 1) / 2;
    var d = 0;

    for (var i = 0; i < iterations; i++) {
      var infected = dict[x + "," + y];
      d = d + (infected ? 1 : 3);
      d %= 4;
      if (infected) delete dict[x + "," + y];
      else {
        dict[x + "," + y] = true;
        bursts++;
      }
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
    output: 5587
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
    output: 5538
  });

  Utils.check(solve, dataset, "22a");
})();
