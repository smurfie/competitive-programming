(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var discs = [];

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].split(" ");
      var disc = {
        positions: parseInt(line[3]),
        start: parseInt(line[11])
      };
      disc.start = (disc.start + i + 1) % disc.positions;
      discs.push(disc);
    }
    discs.push({ positions: 11, start: (0 + discs.length + 1) % 11 });

    var n = -1;
    var found = false;

    while (!found) {
      n++;
      var found = true;
      for (var i = 0; i < discs.length && found; i++) {
        found &= (discs[i].start + n) % discs[i].positions == 0;
      }
    }

    return n;
  }

  var dataset = [];

  dataset.push({
    input: `Disc #1 has 13 positions; at time=0, it is at position 1.
Disc #2 has 19 positions; at time=0, it is at position 10.
Disc #3 has 3 positions; at time=0, it is at position 2.
Disc #4 has 7 positions; at time=0, it is at position 1.
Disc #5 has 5 positions; at time=0, it is at position 3.
Disc #6 has 17 positions; at time=0, it is at position 5.`,
    output: 3903937
  });

  Utils.check(solve, dataset, "15b");
})();
