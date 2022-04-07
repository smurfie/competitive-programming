(() => {
  function solve(input) {
    var arr = Utils.read(input).map((i) => i.split(""));

    var dict = {};
    var hash = toHash(arr);

    while (!dict[hash]) {
      dict[hash] = true;
      arr = next(arr);
      hash = toHash(arr);
    }

    return bio(arr);
  }

  function bio(arr) {
    var arr2 = toHash(arr).split("");
    var sum = 0;
    var exp = 1;
    for (var i = 0; i < arr2.length; i++) {
      if (arr2[i] == "#") sum += exp;
      exp *= 2;
    }
    return sum;
  }

  function next(arr) {
    var arr2 = Utils.duplicate(arr);
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        var bugs = 0;
        var bug = arr[i][j] == "#";
        if (i > 0 && arr[i - 1][j] == "#") bugs++;
        if (j > 0 && arr[i][j - 1] == "#") bugs++;
        if (i < 4 && arr[i + 1][j] == "#") bugs++;
        if (j < 4 && arr[i][j + 1] == "#") bugs++;
        arr2[i][j] =
          (bug && bugs == 1) || (!bug && (bugs == 1 || bugs == 2)) ? "#" : ".";
      }
    }
    return arr2;
  }

  function toHash(arr) {
    return arr.map((i) => i.join("")).join("");
  }

  var dataset = [];

  dataset.push({
    input: `....#
#..#.
#..##
..#..
#....`,
    output: 2129920
  });

  dataset.push({
    input: `#####
.....
....#
#####
.###.`,
    output: 13500447
  });

  Utils.check(solve, dataset, "24a");
})();
