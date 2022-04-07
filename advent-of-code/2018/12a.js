(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var pots = lines[0].split(" ")[2];
    var dict = {};
    var generations = 20;
    var iniPos = 0;

    for (var i = 2; i < lines.length; i++) {
      var words = lines[i].split(" ");
      dict[words[0]] = words[2];
    }

    for (var i = 0; i < generations; i++) {
      var pots2 = "";
      var first;
      iniPos -= 2;
      var key = ".....";
      for (var j = -2; j < pots.length + 2; j++) {
        key = key.substring(1);
        key += j + 2 < pots.length ? pots[j + 2] : ".";
        pots2 += dict[key] || ".";
      }
      var ini = pots2.indexOf("#");
      var end = pots2.lastIndexOf("#");
      pots = pots2.substring(ini, end + 1);
      iniPos += ini;
    }

    return pots
      .split("")
      .reduce((a, b, i) => a + (b == "#" ? i + iniPos : 0), 0);
  }

  var dataset = [];

  dataset.push({
    input: `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`,
    output: 325
  });

  dataset.push({
    input: `initial state: #..#####.#.#.##....####..##.#.#.##.##.#####..####.#.##.....#..#.#.#...###..#..###.##.#..##.#.#.....#

.#.## => #
.###. => #
#..#. => .
...## => .
#.##. => #
....# => .
..##. => #
.##.. => .
##..# => .
.#..# => #
#.#.# => .
#.... => .
.#### => #
.##.# => .
..#.. => #
####. => #
#.#.. => .
.#... => .
###.# => .
..### => .
#..## => #
...#. => #
..... => .
###.. => #
#...# => .
..#.# => #
##... => #
##.## => .
##.#. => .
##### => .
.#.#. => #
#.### => #`,
    output: 1447
  });

  Utils.check(solve, dataset, "12a");
})();
