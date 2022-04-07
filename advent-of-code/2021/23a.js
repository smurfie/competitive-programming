(() => {
  var best = 0;
  var size = 2;
  var dict = {};
  // Distances from hall to cave
  var d = [
    [2, 1, 1, 3, 5, 7, 8],
    [4, 3, 1, 1, 3, 5, 6],
    [6, 5, 3, 1, 1, 3, 4],
    [8, 7, 5, 3, 1, 1, 2]
  ];
  // Paths from hall to cave
  var path = [
    [[1], [], [], [2], [3, 2], [4, 3, 2], [5, 4, 3, 2]],
    [[1, 2], [2], [], [], [3], [4, 3], [5, 4, 3]],
    [[1, 2, 3], [2, 3], [3], [], [], [4], [5, 4]],
    [[1, 2, 3, 4], [2, 3, 4], [3, 4], [4], [], [], [5]]
  ];
  function solve(input) {
    var lines = Utils.read(input);
    var caves = [[], [], [], []];
    var cavesCompleted = [0, 0, 0, 0];
    var hall = [0, 0, 0, 0, 0, 0, 0];
    best = Infinity;

    for (var i = 3; i >= 2; i--) {
      caves[0].push(c2i(lines[i][3]));
      caves[1].push(c2i(lines[i][5]));
      caves[2].push(c2i(lines[i][7]));
      caves[3].push(c2i(lines[i][9]));
    }

    for (var i = 0; i < caves.length; i++) {
      for (var j = 0; j < caves[i].length; j++) {
        if (caves[i][j] - 1 == i) {
          cavesCompleted[i]++;
        } else {
          break;
        }
      }
    }

    var state = {
      caves,
      cavesCompleted,
      hall,
      points: 0
    };

    var states = new PriorityQueue((a, b) => a.points - b.points);
    states.add(state);

    while (!states.isEmpty()) {
      var el = states.pop();
      var h = hash(el);
      if (!dict[h]) {
        dict[h] = true;
        addMoves(states, el);
      }
    }
    return best;
  }

  function addMoves(states, state) {
    var { caves, cavesCompleted, hall, points } = state;
    if (cavesCompleted.find((i) => i != size) == undefined) {
      if (points < best) best = points;
      return;
    }

    for (var i = 0; i < caves.length; i++) {
      if (caves[i].length > cavesCompleted[i]) {
        var el = caves[i].pop();
        for (var j = i + 1; j >= 0; j--) {
          if (hall[j] != 0) break;
          var state2 = Utils.duplicate(state);
          state2.hall[j] = el;
          state2.points += 10 ** (el - 1) * (size - caves[i].length + d[i][j]);
          states.add(state2);
        }
        for (var j = i + 2; j < hall.length; j++) {
          if (hall[j] != 0) break;
          var state2 = Utils.duplicate(state);
          state2.hall[j] = el;
          state2.points += 10 ** (el - 1) * (size - caves[i].length + d[i][j]);
          states.add(state2);
        }
        caves[i].push(el);
      }
    }
    for (var j = 0; j < hall.length; j++) {
      var el = hall[j];
      if (el == 0) continue;
      var i = el - 1;
      if (caves[i].length > cavesCompleted[i]) continue;
      var free = true;
      for (var p of path[i][j]) {
        if (hall[p] != 0) {
          free = false;
          break;
        }
      }
      if (!free) continue;
      var state2 = Utils.duplicate(state);
      state2.hall[j] = 0;
      state2.points += 10 ** (el - 1) * (size - cavesCompleted[i] + d[i][j]);
      state2.cavesCompleted[i]++;
      states.add(state2);
    }
  }

  function hash(state) {
    return (
      state.hall.join("") +
      ";" +
      state.caves[0].join("") +
      ";" +
      state.caves[1].join("") +
      ";" +
      state.caves[2].join("") +
      ";" +
      state.caves[3].join("") +
      ";" +
      state.cavesCompleted.join("")
    );
  }

  function c2i(c) {
    switch (c) {
      case "A":
        return 1;
      case "B":
        return 2;
      case "C":
        return 3;
    }
    return 4;
  }

  var dataset = [];

  dataset.push({
    input: `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`,
    output: 12521
  });

  dataset.push({
    input: `#############
#...........#
###C#A#D#D###
  #B#A#B#C#
  #########`,
    output: 10526
  });

  Utils.check(solve, dataset, "23a");
})();
