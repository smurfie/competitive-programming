(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var state = {
      pass: lines[0],
      path: "",
      x: 0,
      y: 0
    };
    var states = [state];
    var gridX = 4;
    var gridY = 4;
    var longest;

    while (states.length > 0) {
      var state = states.shift();
      if (state.x == gridX - 1 && state.y == gridY - 1) longest = state;
      else
        for (newState of generate(state, gridX, gridY)) states.push(newState);
    }

    return longest.path.length;
  }

  function generate(state, gridX, gridY) {
    var hash = SparkMD5.hash(state.pass + state.path);
    var states = [];
    if (state.y > 0 && isOpen(hash[0])) {
      var newState = Utils.duplicate(state);
      newState.y--;
      newState.path += "U";
      states.push(newState);
    }
    if (state.y < gridY - 1 && isOpen(hash[1])) {
      var newState = Utils.duplicate(state);
      newState.y++;
      newState.path += "D";
      states.push(newState);
    }
    if (state.x > 0 && isOpen(hash[2])) {
      var newState = Utils.duplicate(state);
      newState.x--;
      newState.path += "L";
      states.push(newState);
    }
    if (state.x < gridX - 1 && isOpen(hash[3])) {
      var newState = Utils.duplicate(state);
      newState.x++;
      newState.path += "R";
      states.push(newState);
    }

    return states;
  }

  function isOpen(s) {
    return s == "b" || s == "c" || s == "d" || s == "e" || s == "f";
  }

  var dataset = [];

  dataset.push({
    input: `ihgpwlah`,
    output: 370
  });

  dataset.push({
    input: `kglvqrro`,
    output: 492
  });

  dataset.push({
    input: `ulqzkmiv`,
    output: 830
  });

  dataset.push({
    input: `qzthpkfp`,
    output: 448
  });

  Utils.check(solve, dataset, "17b");
})();
