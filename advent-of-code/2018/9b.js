(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var nPlayers = parseInt(lines[0].split(" ")[0]);
    var nMarbles = parseInt(lines[0].split(" ")[6]) * 100;

    var iPlayer = 0;
    var arr = { 0: { next: 0, previous: 0 } };
    var points = {};
    var current = 0;

    for (var i = 1; i < nMarbles + 1; i++, iPlayer = (iPlayer + 1) % nPlayers) {
      if (i % 23 == 0) {
        points[iPlayer] = (points[iPlayer] || 0) + i;
        for (var j = 0; j < 7; j++) current = arr[current].previous;
        points[iPlayer] += current;
        var next = arr[current].next;
        var previous = arr[current].previous;
        delete arr[current];
        arr[next].previous = previous;
        arr[previous].next = next;
        current = next;
      } else {
        current = arr[current].next;
        var next = arr[current].next;
        arr[i] = { next: next, previous: current };
        arr[current].next = i;
        arr[next].previous = i;
        current = i;
      }
    }

    var max = 0;
    for (var key in points) max = Math.max(max, points[key]);

    return max;
  }

  var dataset = [];

  dataset.push({
    input: `468 players; last marble is worth 71843 points`,
    output: 3156297594
  });

  Utils.check(solve, dataset, "9b");
})();
