(() => {
  function solve(input) {
    var lines = Utils.read(input);

    return (
      slope(lines, 1, 1) *
      slope(lines, 1, 3) *
      slope(lines, 1, 5) *
      slope(lines, 1, 7) *
      slope(lines, 2, 1)
    );
  }

  function slope(lines, i1, j1) {
    var j = 0;
    var sum = 0;
    for (var i = i1; i < lines.length; i += i1) {
      j += j1;
      j %= lines[i].length;
      if (lines[i][j] == "#") sum++;
    }
    return sum;
  }

  var dataset = [];

  dataset.push({
    input: `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`,
    output: 336
  });

  dataset.push({
    input: `......#...........#...#........
.#.....#...##.......#.....##...
......#.#....#.................
..............#.#.......#......
.....#.#...##...#.#..#..#..#..#
.......##...#..#...........#...
.......#.##.#...#.#.........#..
..#...##............##......#.#
.......#.......##......##.##.#.
...#...#........#....#........#
#............###.#......#.....#
..#........#....#..#..........#
..#..##....#......#..#......#..
........#......#......#..#..#..
..#...#....#..##.......#.#.....
.....#.#......#..#....#.##.#..#
......###.....#..#..........#..
.#................#.#..........
.........#..#...#......##......
##...#....#...#.#...#.##..#....
...##...#....#.........###.....
.#.#....#.........##...........
....#.#..#..#...........#......
..#..#.#....#....#...#.........
..........##.....#.##..........
..#.#....#..##......#.#.....##.
..#...#.##......#..........#...
......#....#..#.....#.....#...#
#.#...##.#.##.........#..#.....
...#.#.#.........#.....#.#.#...
..#.........#...............#..
#..##.....#.........#....#.....
...#....##..##...........##..#.
......##.................#.#...
##.......#....#.#.#.....#......
....#.#...#.................##.
#...#.........##.....#.........
#....#.###..#.....##.#....#....
#..#....#...#....#.#.#.........
.......#...........#....#.....#
#...#.............#........#...
.......#.....#...#..#.........#
.##.....##.....##.......#......
....##...##.......#..#.#.....#.
.##.........#......#........##.
.......#...#...###.#..#........
..#..###......##..##...........
.#..#......##..#.#.........#...
...#.......#........#...#.#....
...#....#..#....#.....##.......
............#......#..........#
.#.......#......#.#....#..#.#..
##.........#.#.#..........#....
....##.....#...................
.......#..#........#...........
....##.#..#......###.......#...
....#....#...#.#......#...#...#
.......#.....##..#....#...#....
#...#........#.........#..##...
...........##.........#.#...#..
....................#....#.##..
.#..#..#.........#....#..#..##.
......................#........
..###....#.......#.....###.##..
......#......#.......#.....#..#
.....#...#.##...#......#....#..
.....#.....##.............#....
....#......##..#....#.......#..
.##....#..##......###....#..#..
...###.#.............##...#.#..
.....#.....#.....#...#..#.#....
..#.#.....###......#.......#...
..........#.##......#.........#
..##..#.......................#
........#......#............#..
#..#..#..#.#......#..#....#....
...##......#.............#....#
...........#..#..##.......#....
.....#.........#.#..#..........
##...#.......#.#....#..#..#....
#.#.#...........#.##.#.#..###..
#..#...........#.........##....
............#.#..............#.
.#....#....##.#...........#..#.
....#...#..#...#....#....#.....
....#....#...#..#......#.......
.#.#.........#.......#.##......
.#..##...#........#...........#
##...#..#...#...#.....#...#....
....###.#..#.......##.#..#...#.
...##.......####...##.#........
#....#....#.#............#..#..
#.#.#...#...................##.
##......#...........#..........
#..#..#....#.#...#......#......
.##...#.....#...#........#.....
..#............#..............#
###........#..#....#...#......#
###..##......#.##...........#..
........#......#..#.....#......
...#..........#..#...........#.
....#..#..#....#........#....#.
.#.................#####..##..#
.....#...##..#..........#.##...
..#..............#...####......
.....#.##..................#.#.
...#.#..#..#........#..........
...........#....#.#..#.........
.....##.......#......#..#.#.#..
...#.............##...#........
...............#.......##.##.##
.....#........#........#.#..#..
...#..#.........#...##...###...
...#.#.............###.#.....#.
.#..........#......###.#.#.....
....##..##.............###.....
..#..#.#...##...#.......##.....
..........###........#.....#.#.
#.#....#..#..#......#...#...#..
.........#......##.......#.#..#
...#.....#.........##..#..#....
.....##.#..##.##..##...........
...#.#.##....#..#..#......#..#.
#....#....#.............#...##.
#......#..#.####.#.##.#....##..
##.#.#....##..................#
.....##......#.......##.......#
..#......#.#..#...##......##...
..#....##....#.........#..##...
.###.....#....##...........#...
.........#......#.#........#...
...#...#..#.#....######.#..#...
###......#.#.#.........##.#....
.....#...#.........#...#.......
....#.............#.#.........#
..##...#...#.......#......#....
.....#...#.#...#...#..#........
.#......#......................
...###..#..#....#...##.#.......
.#.#.....##...#...#.....#...##.
.....###..###....##............
.....##....#..#.....#.##.......
#........#.........#...#..#....
...#.#.........#..#.......#.#..
....#.#....##.....#..........#.
.#..#....#..#.#..#..#.........#
#...#....#..............#......
.........#.....#.##...##...###.
.....#....##............#..#...
.....#.#...........#..#....#...
.#..........#...#......#.....#.
.#...........#.....#..#........
..............#......##...#..#.
...#.........#..#....#..##...##
..##...#..................#....
#.....#.................#......
...#......#..#..........#.#....
......#..#.....#.....##...#..#.
......#........#..........#....
...##.##....#..##.#..........#.
..........#..#.#.##............
..##........................#..
.....#.#.#......#....#....##...
#....#.........#........#......
.##.......#...#...#........##..
....##......#....#.#..........#
..#.......#..............#.....
.....#......#.#...#..#.#.#....#
.....#..#........#.##.##.......
##........#..........#.........
.....#..##....#.#......###..##.
#.#...##.........#.#.....#..#..
#....#.#...#........#.....#..#.
........................#......
....###......#............#...#
...#..##......#..##.........#..
.............#...#......#..#..#
....#......#....#...........#..
..#.#.####.#.....##........#..#
#..#...#..#..#.......#.#..#....
..#..#..#....#.#.........##..#.
.......#......#.#............#.
...#.............#.#.....#.....
...#.#.........##...#.#.......#
........#...#...........##...#.
..........#....#......#....##..
..........#...........#........
...#..#...#..........#......#..
......#......#....#.....#..#.#.
........##.................#..#
.#........#.#...........#......
#...#........#.#.#.....#.#.#...
.........#........#..#..#....#.
##........#..........#....#..#.
.#.##...........#..#.#..##....#
.......#.#....#..#......#......
..#.....#........##..#......###
..#...#..................#....#
......#...#..#.##.......#......
........#...#.#................
.........#............#........
..#.....##....#.#..##..........
#.....#..........#....#........
....#.#...#...##....#.....##...
..#.#.......#.............#...#
...##..............#......#....
#......#...#................##.
.#.#...#.#..#..................
...##.......#...........#.#.#..
#......#.#.#........#.##...####
.......#..#.#.........#.#.##..#
..............#....#.........#.
...........#.#..#....##......#.
#.............#...##..#.......#
.........#............#...#.##.
.......#.........#.#.....#..#..
........................#.#.##.
#......#.#......#.........#....
...#.......#.......#.....#.....
#..#....#................#...#.
........#.#..##......#.........
#..#...##....##....##.........#
.......#...#...###.............
#.#..#........#.#.#............
#.....#........##.........#.#..
.#..........#....#.#....###....
.#.....#...#.#........#..#.##..
...#.##......#..#.............#
..##..#.#...................#..
.....#....#...#.#...#...#......
.....#..#.#....#.#.............
#.#....#.#.##..###..........#..
........#.#.............#..#...
.........#.......#.............
.##.#............##...#........
......#................#.......
...............#..#...........#
...#.......#...#.##.....#....#.
##..##..#..........#...........
.##.#.......#...#..#...#...#...
....#..#...........#....#.##...
.#........#........#....#......
.......#...#.##.#..#.#..#......
.#..#......#....#...##....#.#..
......#...##.#.....##.###.....#
.#....#..#......#...#.#.....#..
#............#....##...##.##...
#...#.#....#...#.......##...##.
#...........#.##..#....#.....#.
...#..#...#.........#.......#..
.#....#.....#............#.#..#
.#.....#.#...#.#....##......###
..#..#.#.#...#..#.............#
...#...#..#....#........#...##.
.......#.....#...##...........#
#.##.................#...##...#
..............##........#.....#
............#...#..#.......#.#.
#.#.....#.........#...#......#.
#.###..#......#..#..#...#.....#
.....#.......#.................
........#..#......#.#...#......
#.......#..#........#...#..#...
..#...#.......##.............#.
#.......#.......##...#.........
.........#....#.#..##.....#...#
..#.....#.#.......#....#.......
...#.......#.....#..##.#..#....
....#.......#.#.#..............
.#..#......#........#.#..##..##
....#...#.##.#...#....##...#...
#..##..#.....#.......#.........
....#..#..#.#............#.....
#.......##...##..##............
...............................
....#.......#.##...#.....#.#...
...#........#....#.#..#..#.....
##.......#.....##.#.#....#....#
#.............#...........#.##.
#...........#.#..........#.....
#..#....#....#.#.........#.#...
......#.#.#..#.#.#.............
...#.....#........##....#......
..#...#...#.#.......#......#...
.##........#...#..#..........#.
..#...........#..##.....##.....
............#..#.#...#.....#...
..........#....##.......#......
....#....#.................#..#
....#...............#.........#
..#.#...#......#..........##...
.....#...........#.........#..#
.......#.....##.....#.#........
.#.#..........#....#...........
.#..##....#........#....#......
....#.#..#.......#..#.........#
..#....#.....#......#..#.......
......#........#.......#...#.#.
.......#.......#....#.....##...
....##........#..#...#.#..#...#
.#......#...........##....#....
##....##......#.......#.......#
.##....#.##......#.......##..#.
...#..#.#.#.......#..#.###.....
..........##....#..#.##........
...#........###.#..#........#..
.....#....#..##....#.....#....#
#..........#..........#.#....#.
..#....#.....#..............#..
#..................#......#.##.
.#...#.#.....#.........##......
...#...........#.....#......#..
......#.....#.#..##......##....
...#....###..#.....#..#..##..##
......#.......##..#..#.........
#..#.#....#.#..#..........##.#.
..#..#..##..#.#.#.#.....#......
..#.#...#..#.....###.#.........
##.#.#......#........#.####....
.............#..#..#....#......
...##..........#.......#.#....#
..#.....................#......
..#..#...##...#.##........#....`,
    output: 2224913600
  });

  Utils.check(solve, dataset, "3b");
})();
