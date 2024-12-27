(() => {
  function solve(input) {
    let lines = Utils.read(input);
    // We add # in the borders to avoid having to deal with range issues
    let numPad = [
      ["#", "#", "#", "#", "#"],
      ["#", "7", "8", "9", "#"],
      ["#", "4", "5", "6", "#"],
      ["#", "1", "2", "3", "#"],
      ["#", "#", "0", "A", "#"],
      ["#", "#", "#", "#", "#"],
    ];
    let keyPad = [
      ["#", "#", "#", "#", "#"],
      ["#", "#", "^", "A", "#"],
      ["#", "<", "v", ">", "#"],
      ["#", "#", "#", "#", "#"],
    ];

    let keypads = 25;

    let pathsNumpad = calcPaths(numPad);
    let pathsKeypad = calcPaths(keyPad);

    let levels = new Array(keypads);
    levels[0] = {};
    let buttons = ["<", ">", "^", "v", "A"];

    for (let i = 0; i < buttons.length; i++) {
      levels[0][buttons[i]] = {};
      for (let j = 0; j < buttons.length; j++) {
        levels[0][buttons[i]][buttons[j]] =
          pathsKeypad[buttons[i]][buttons[j]][0].length + 1;
      }
    }

    for (let i = 1; i < keypads; i++) {
      levels[i] = {};
      for (let j = 0; j < buttons.length; j++) {
        levels[i][buttons[j]] = {};
        for (let k = 0; k < buttons.length; k++) {
          levels[i][buttons[j]][buttons[k]] = calcPath(
            levels[i - 1],
            pathsKeypad[buttons[j]][buttons[k]]
          );
        }
      }
    }

    let sum = 0;
    for (let line of lines) {
      let tmp =
        calcPath(levels[keypads - 1], pathsNumpad["A"][line[0]]) +
        calcPath(levels[keypads - 1], pathsNumpad[line[0]][line[1]]) +
        calcPath(levels[keypads - 1], pathsNumpad[line[1]][line[2]]) +
        calcPath(levels[keypads - 1], pathsNumpad[line[2]][line[3]]);
      sum += Number(line.substring(0, 3)) * tmp;
    }

    return sum;
  }

  function calcPaths(pad) {
    let paths = {};
    for (let i = 1; i < pad.length - 1; i++) {
      for (let j = 1; j < pad[i].length - 1; j++) {
        if (pad[i][j] !== "#") {
          paths[pad[i][j]] = calcPathsAux(pad, i, j);
        }
      }
    }
    return paths;
  }

  function calcPathsAux(pad, i, j) {
    let paths = {};
    let queue = [[i, j, ""]];
    while (queue.length > 0) {
      let [x, y, path] = queue.shift();
      let dest = pad[x][y];
      if (
        dest !== "#" &&
        (!paths[dest] || path.length <= paths[dest][0].length)
      ) {
        if (!paths[dest]) {
          paths[dest] = [];
        }
        paths[dest].push(path);
        queue.push([x + 1, y, path + "v"]);
        queue.push([x - 1, y, path + "^"]);
        queue.push([x, y + 1, path + ">"]);
        queue.push([x, y - 1, path + "<"]);
      }
    }

    return paths;
  }

  function calcPath(level, paths) {
    let min = Infinity;
    for (let path of paths) {
      path = "A" + path + "A";
      let total = 0;

      for (let i = 0; i < path.length - 1; i++) {
        total += level[path[i]][path[i + 1]];
      }
      min = Math.min(min, total);
    }

    return min;
  }

  let dataset = [];

  dataset.push({
    input: `029A
980A
179A
456A
379A`,
    output: 154115708116294,
  });

  dataset.push({
    input: `129A
974A
805A
671A
386A`,
    output: 258369757013802,
  });

  Utils.check(solve, dataset, "21b");
})();
