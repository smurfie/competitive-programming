(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var arr = lines[0].split("	").map((i) => parseInt(i));
    var dict = {};

    var steps = 0;
    var found = add(arr, dict, steps);

    while (found == 0) {
      var max = -1;
      var pos = -1;
      steps++;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
          pos = i;
          max = arr[i];
        }
      }

      var j = arr.length;
      var i = (pos + 1) % arr.length;
      arr[pos] = 0;

      while (j > 0) {
        var n = Math.ceil(max / j);
        arr[i] += n;
        max -= n;

        j--;
        i = (i + 1) % arr.length;
      }

      found = add(arr, dict, steps);
    }

    return found;
  }

  function add(arr, dict, steps) {
    var s = JSON.stringify(arr);
    if (dict[s]) return steps - dict[s];
    dict[s] = steps;
    return 0;
  }

  var dataset = [];

  dataset.push({
    input: `0	2	7	0`,
    output: 4
  });

  dataset.push({
    input: `10	3	15	10	5	15	5	15	9	2	5	8	5	2	3	6`,
    output: 2765
  });

  Utils.check(solve, dataset, "6b");
})();
