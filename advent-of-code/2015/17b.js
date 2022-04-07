(() => {
  function solve(input, liters) {
    var lines = Utils.read(input);

    containers = lines.map((i) => parseInt(i));

    return combinations(liters, containers, 0, Infinity)[0];
  }

  function combinations(size, containers, howMany, min) {
    if (howMany > min) return [0, min];

    var count = 0;
    for (var i = 0; i < containers.length; i++) {
      if (size == containers[i]) {
        if (howMany == min) count++;
        else {
          min = howMany;
          count = 1;
        }
      } else if (size > containers[i]) {
        var [countTmp, minTmp] = combinations(
          size - containers[i],
          containers.slice(i + 1),
          howMany + 1,
          min
        );
        if (minTmp < min) {
          min = minTmp;
          count = countTmp;
        } else {
          count += countTmp;
        }
      }
    }
    return [count, min];
  }

  var dataset = [];

  dataset.push({
    input: `20
15
10
5
5`,
    liters: 25,
    output: 3
  });

  dataset.push({
    input: `43
3
4
10
21
44
4
6
47
41
34
17
17
44
36
31
46
9
27
38`,
    liters: 150,
    output: 17
  });

  Utils.check(solve, dataset, "17b");
})();
