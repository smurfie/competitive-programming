(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var m = new Matrix(lines.map((i) => i.split("").map((j) => parseInt(j))));

    var sum = 0;
    for (var t = 0; t < 100; t++) {
      m.applyAllFun((i) => i + 1);
      sum += flashes(m);
    }

    return sum;
  }

  function flashes(m) {
    var count = 0;
    var prev = -1;
    while (prev != count) {
      var m2 = new Matrix(Utils.duplicate(m.m));
      prev = count;
      for (var i = 0; i < m2.h; i++) {
        for (var j = 0; j < m2.w; j++) {
          if (m2.m[i][j] == 10) {
            m.m[i][j] = 11;
            count++;
          } else if (m2.m[i][j] < 10) {
            m.m[i][j] = Math.min(m.m[i][j] + m2.countAdj(i, j, 10, true), 10);
          }
        }
      }
    }
    m.applyAllFun((i) => (i > 9 ? 0 : i));
    return count;
  }

  var dataset = [];

  dataset.push({
    input: `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`,
    output: 1656
  });

  dataset.push({
    input: `4585612331
5863566433
6714418611
1746467322
6161775644
6581631662
1247161817
8312615113
6751466142
1161847732`,
    output: 1571
  });

  Utils.check(solve, dataset, "11a");
})();
