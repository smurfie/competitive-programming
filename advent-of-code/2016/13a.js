(() => {
  function solve(input, x, y) {
    var lines = Utils.read(input);

    var favorite = parseInt(lines[0]);

    var end = {
      x,
      y
    };

    var state = {
      x: 1,
      y: 1,
      visited: {}
    };

    var states = [state];
    var found = false;

    while (states.length > 0 && !found) {
      state = states.shift();
      if (state.x == end.x && state.y == end.y) {
        found = true;
        console.log(state);
        return Object.keys(state.visited).length;
      } else {
        state.visited[state.x + "," + state.y] = true;
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
  }

  function wall(x, y, favorite) {
    var n = x * x + 3 * x + 2 * x * y + y + y * y + favorite;
    return (n.toString(2).match(/1/g) || []).length % 2 == 1;
  }

  var dataset = [];

  dataset.push({
    input: `10`,
    x: 7,
    y: 4,
    output: 11
  });

  dataset.push({
    input: `1362`,
    x: 31,
    y: 39,
    output: 82
  });

  Utils.check(solve, dataset, "13a");
})();
