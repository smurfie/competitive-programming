(() => {
  var type;
  var dict;
  var xEnd;
  var yEnd;
  var min;
  var states;

  function solve(input) {
    var lines = Utils.read(input);

    var depth = parseInt(lines[0].split(" ")[1]);
    xEnd = parseInt(lines[1].split(" ")[1].split(",")[0]);
    yEnd = parseInt(lines[1].split(" ")[1].split(",")[1]);

    var m = Utils.matrix(1500, 1500, 0);
    var el = Utils.matrix(1500, 1500, 0);
    type = Utils.matrix(1500, 1500, 0);

    for (var i = 0; i < m.length; i++) {
      for (var j = 0; j < m[i].length; j++) {
        if ((i == 0 && j == 0) || (i == yEnd && j == xEnd)) m[i][j] = 0;
        else if (i == 0) m[i][j] = j * 16807;
        else if (j == 0) m[i][j] = i * 48271;
        else m[i][j] = el[i - 1][j] * el[i][j - 1];

        el[i][j] = (m[i][j] + depth) % 20183;
        type[i][j] = el[i][j] % 3;
      }
    }

    states = new PriorityQueue(
      (a, b) =>
        a.d +
        Math.abs(a.x - xEnd) +
        Math.abs(a.y - yEnd) +
        (a.d == 1 ? 0 : 7) -
        (b.d + Math.abs(b.x - xEnd) + Math.abs(b.y - yEnd) + (b.d == 1 ? 0 : 7))
    );
    min = Infinity;
    dict = {};

    tryAddState(0, 0, 1, 0);

    while (states.size() > 0) {
      var state = states.pop();
      if (state.x == xEnd && state.y == yEnd && state.tool == 1)
        min = Math.min(min, state.d);
      if (state.x > 0)
        tryAddState(state.x - 1, state.y, state.tool, state.d + 1);
      if (state.y > 0)
        tryAddState(state.x, state.y - 1, state.tool, state.d + 1);
      tryAddState(state.x + 1, state.y, state.tool, state.d + 1);
      tryAddState(state.x, state.y + 1, state.tool, state.d + 1);
      tryAddState(state.x, state.y, (state.tool + 1) % 3, state.d + 7);
      tryAddState(state.x, state.y, (state.tool + 2) % 3, state.d + 7);
    }

    return min;
  }

  function tryAddState(x, y, tool, d) {
    var s = x + "," + y + "," + tool;
    if (
      type[y][x] != tool &&
      (dict[s] == undefined || dict[s] > d) &&
      d + Math.abs(x - xEnd) + Math.abs(y - yEnd) + (d == 1 ? 0 : 7) < min
    ) {
      dict[s] = d;
      states.add({
        x,
        y,
        tool,
        d
      });
    }
  }

  var dataset = [];

  dataset.push({
    input: `depth: 510
target: 10,10`,
    output: 45
  });

  dataset.push({
    input: `depth: 4848
target: 15,700`,
    output: 976
  });

  Utils.check(solve, dataset, "22b");
})();
