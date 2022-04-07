(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var steps = lines[0].split(", ");
    var state = {
      direction: 0, // 0 = Up, 1 = Right, 2 = Down, 3 = Left
      x: 0,
      y: 0,
      visites: { "0,0": true },
      visited: false
    };

    for (var i = 0; i < steps.length && !state.visited; i++) {
      move(state, steps[i]);
    }

    if (state.visited) return Math.abs(state.x) + Math.abs(state.y);
  }

  function move(state, step) {
    if (step[0] == "R") state.direction = (state.direction + 1) % 4;
    else state.direction = (state.direction + 3) % 4;
    var pos = parseInt(step.substring(1));
    for (var i = 0; i < pos && !state.visited; i++) {
      switch (state.direction) {
        case 0:
          state.y++;
          break;
        case 1:
          state.x++;
          break;
        case 2:
          state.y--;
          break;
        case 3:
          state.x--;
          break;
      }
      var key = state.x + "," + state.y;
      if (state.visites[key]) state.visited = true;
      else state.visites[key] = true;
    }
  }

  var dataset = [];

  dataset.push({
    input: `R8, R4, R4, R8`,
    output: 4
  });

  dataset.push({
    input: `L1, R3, R1, L5, L2, L5, R4, L2, R2, R2, L2, R1, L5, R3, L4, L1, L2, R3, R5, L2, R5, L1, R2, L5, R4, R2, R2, L1, L1, R1, L3, L1, R1, L3, R5, R3, R3, L4, R4, L2, L4, R1, R1, L193, R2, L1, R54, R1, L1, R71, L4, R3, R191, R3, R2, L4, R3, R2, L2, L4, L5, R4, R1, L2, L2, L3, L2, L1, R4, R1, R5, R3, L5, R3, R4, L2, R3, L1, L3, L3, L5, L1, L3, L3, L1, R3, L3, L2, R1, L3, L1, R5, R4, R3, R2, R3, L1, L2, R4, L3, R1, L1, L1, R5, R2, R4, R5, L1, L1, R1, L2, L4, R3, L1, L3, R5, R4, R3, R3, L2, R2, L1, R4, R2, L3, L4, L2, R2, R2, L4, R3, R5, L2, R2, R4, R5, L2, L3, L2, R5, L4, L2, R3, L5, R2, L1, R1, R3, R3, L5, L2, L2, R5`,
    output: 161
  });

  Utils.check(solve, dataset, "1b");
})();
