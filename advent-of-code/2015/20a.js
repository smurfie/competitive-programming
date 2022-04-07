(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var limit = parseInt(lines[0]);

    var fact = 1;
    var num = 1;
    var sum = sumDivider(num);

    while (sum < limit) {
      fact++;
      num *= fact;
      sum = sumDivider(num);
    }

    sum = 0;
    var advance = factorial(Math.floor(fact / 2));
    for (var i = num / fact; sum < limit; i += advance) {
      sum = sumDivider(i);
      if (sum >= limit) return i;
    }
  }

  function factorial(num) {
    if (num == 1) return 1;
    else return num * factorial(num - 1);
  }

  function sumDivider(num) {
    var sum = 0;
    for (var i = 0; i <= Math.sqrt(num); i++) {
      if (num % i == 0) {
        sum += i;
        var div = num / i;
        if (div != i) sum += div;
      }
    }
    return sum * 10;
  }

  var dataset = [];

  dataset.push({
    input: `150`,
    output: 8
  });

  dataset.push({
    input: `34000000`,
    output: 786240
  });

  Utils.check(solve, dataset, "20a");
})();
