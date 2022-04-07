(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var nPlayers = parseInt(lines[0].split(" ")[0]);
    var nMarbles = parseInt(lines[0].split(" ")[6]);

    var iPlayer = 0;
    var arr = [0];
    var points = {};
    var current = 0;

    for (var i = 1; i < nMarbles + 1; i++, iPlayer = (iPlayer + 1) % nPlayers) {
      if (i % 23 == 0) {
        points[iPlayer] = (points[iPlayer] || 0) + i;
        var pos = current - 7;
        if (pos < 0) pos += arr.length;
        points[iPlayer] += arr.splice(pos, 1)[0];
        current = pos % arr.length;
      } else {
        var pos = (current + 1) % arr.length;
        arr.splice(pos + 1, 0, i);
        current = pos + 1;
      }
    }

    var max = 0;
    for (var key in points) max = Math.max(max, points[key]);

    return max;
  }

  var dataset = [];

  dataset.push({
    input: `9 players; last marble is worth 25 points`,
    output: 32
  });

  dataset.push({
    input: `10 players; last marble is worth 1618 points`,
    output: 8317
  });

  dataset.push({
    input: `13 players; last marble is worth 7999 points`,
    output: 146373
  });

  dataset.push({
    input: `17 players; last marble is worth 1104 points`,
    output: 2764
  });

  dataset.push({
    input: `21 players; last marble is worth 6111 points`,
    output: 54718
  });

  dataset.push({
    input: `30 players; last marble is worth 5807 points`,
    output: 37305
  });

  dataset.push({
    input: `468 players; last marble is worth 71843 points`,
    output: 385820
  });

  Utils.check(solve, dataset, "9a");
})();
