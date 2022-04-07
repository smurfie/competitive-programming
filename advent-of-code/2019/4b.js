(() => {
  function solve(input) {
    var ini = input.split("-")[0];
    var end = parseInt(input.split("-")[1]);

    var sum = 0;
    if (complies(ini)) sum++;

    while (parseInt(ini) <= end) {
      ini = next(ini);
      if (complies(ini)) sum++;
    }

    return sum;
  }

  function complies(num) {
    if (num.length != 6) return false;
    var double = false;
    var reps = 1;
    var a = num[0];
    for (var i = 1; i < num.length; i++) {
      if (num[i] < a) return false;
      if (num[i] == a) reps++;
      else {
        if (reps == 2) double = true;
        reps = 1;
      }
      a = num[i];
    }
    if (reps == 2) double = true;
    return double;
  }

  function next(num) {
    return (parseInt(num) + 1).toString();
  }

  var dataset = [];

  dataset.push({
    input: `359282-820401`,
    output: 316
  });

  Utils.check(solve, dataset, "4b");
})();
