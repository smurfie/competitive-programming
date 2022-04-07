(() => {
  function solve(input) {
    var arr = input.split("").map((i) => parseInt(i));
    var dict = {};
    var moves = 10000000;
    var n = 1000000;
    for (var i = 0; i < arr.length - 1; i++) {
      dict[arr[i]] = arr[i + 1];
    }
    dict[arr[arr.length - 1]] = arr.length + 1;
    for (var i = arr.length + 1; i < n; i++) {
      dict[i] = i + 1;
    }
    dict[n] = arr[0];
    var current = arr[0];

    for (var i = 0; i < moves; i++) {
      var a = dict[current];
      var b = dict[a];
      var c = dict[b];
      var j = current - 1;
      if (j == 0) j = n;
      while (j == a || j == b || j == c) {
        j--;
        if (j == 0) j = n;
      }
      var tmp = dict[j];
      dict[j] = a;
      dict[current] = dict[c];
      dict[c] = tmp;

      current = dict[current];
    }

    return dict[1] * dict[dict[1]];
  }

  var dataset = [];

  dataset.push({
    input: `389125467`,
    output: 149245887792
  });

  dataset.push({
    input: `784235916`,
    moves: 100,
    output: 418819514477
  });

  Utils.check(solve, dataset, "23b");
})();
