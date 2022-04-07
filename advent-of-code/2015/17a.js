(() => {
  function solve(input, liters) {
    var lines = Utils.read(input);

    containers = lines.map((i) => parseInt(i));

    return combinations(liters, containers);
  }

  function combinations(size, containers) {
    var count = 0;
    for (var i = 0; i < containers.length; i++) {
      if (size == containers[i]) count++;
      else if (size > containers[i]) {
        count += combinations(size - containers[i], containers.slice(i + 1));
      }
    }
    return count;
  }

  var dataset = [];

  dataset.push({
    input: `20
15
10
5
5`,
    liters: 25,
    output: 4
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
    output: 1638
  });

  Utils.check(solve, dataset, "17a");
})();
