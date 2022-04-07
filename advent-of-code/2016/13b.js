(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var favorite = parseInt(lines[0]);

    var state = {
      x: 1,
      y: 1,
      visited: {}
    };

    var all = {};

    var states = [state];

    while (states.length > 0) {
      state = states.shift();
      state.visited[state.x + "," + state.y] = true;
      all[state.x + "," + state.y] = true;
      if (Object.keys(state.visited).length <= 50) {
        if (
          state.x > 0 &&
          !state.visited[state.x - 1 + "," + state.y] &&
          !wall(state.x - 1, state.y, favorite)
        ) {
          var newState = Utils.duplicate(state);
          newState.x--;
          states.push(newState);
        }
        if (
          state.y > 0 &&
          !state.visited[state.x + "," + (state.y - 1)] &&
          !wall(state.x, state.y - 1, favorite)
        ) {
          var newState = Utils.duplicate(state);
          newState.y--;
          states.push(newState);
        }
        if (
          !state.visited[state.x + 1 + "," + state.y] &&
          !wall(state.x + 1, state.y, favorite)
        ) {
          var newState = Utils.duplicate(state);
          newState.x++;
          states.push(newState);
        }
        if (
          !state.visited[state.x + "," + (state.y + 1)] &&
          !wall(state.x, state.y + 1, favorite)
        ) {
          var newState = Utils.duplicate(state);
          newState.y++;
          states.push(newState);
        }
      }
    }
    return Object.keys(all).length;
  }

  function wall(x, y, favorite) {
    var n = x * x + 3 * x + 2 * x * y + y + y * y + favorite;
    return (n.toString(2).match(/1/g) || []).length % 2 == 1;
  }

  var dataset = [];

  dataset.push({
    input: `1362`,
    output: 138
  });

  Utils.check(solve, dataset, "13b");
})();
