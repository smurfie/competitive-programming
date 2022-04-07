(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var depth = parseInt(lines[0].split(" ")[1]);
    var x = parseInt(lines[1].split(" ")[1].split(",")[0]);
    var y = parseInt(lines[1].split(" ")[1].split(",")[1]);

    var m = Utils.matrix(y + 1, x + 1, 0);
    var el = Utils.matrix(y + 1, x + 1, 0);
    var type = Utils.matrix(y + 1, x + 1, 0);

    for (var i = 0; i < m.length; i++) {
      for (var j = 0; j < m[i].length; j++) {
        if ((i == 0 && j == 0) || (i == y && j == x)) m[i][j] = 0;
        else if (i == 0) m[i][j] = j * 16807;
        else if (j == 0) m[i][j] = i * 48271;
        else m[i][j] = el[i - 1][j] * el[i][j - 1];

        el[i][j] = (m[i][j] + depth) % 20183;
        type[i][j] = el[i][j] % 3;
      }
    }

    var sum = type.reduce((a, b) => a + b.reduce((a, b) => a + b, 0), 0);
    return sum;
  }

  var dataset = [];

  dataset.push({
    input: `depth: 510
target: 10,10`,
    output: 114
  });

  dataset.push({
    input: `depth: 4848
target: 15,700`,
    output: 11359
  });

  Utils.check(solve, dataset, "22a");
})();
