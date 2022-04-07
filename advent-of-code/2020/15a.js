(() => {
  function solve(input) {
    var numbers = input.split(",").map((i) => parseInt(i));
    var dict = {};
    var last;
    var n = 2020;

    for (var i = 0; i < numbers.length; i++) {
      last = dict[numbers[i]];
      dict[numbers[i]] = i;
    }

    var newNumber = numbers[numbers.length - 1];
    for (var i = numbers.length; i < n; i++) {
      if (last != undefined) {
        newNumber = dict[newNumber] - last;
      } else {
        newNumber = 0;
      }
      last = dict[newNumber];
      dict[newNumber] = i;
    }

    return newNumber;
  }

  var dataset = [];

  dataset.push({
    input: `0,3,6`,
    output: 436
  });

  dataset.push({
    input: `1,3,2`,
    output: 1
  });

  dataset.push({
    input: `2,1,3`,
    output: 10
  });

  dataset.push({
    input: `1,2,3`,
    output: 27
  });

  dataset.push({
    input: `2,3,1`,
    output: 78
  });

  dataset.push({
    input: `3,2,1`,
    output: 438
  });

  dataset.push({
    input: `3,1,2`,
    output: 1836
  });

  dataset.push({
    input: `16,11,15,0,1,7`,
    output: 662
  });

  Utils.check(solve, dataset, "15a");
})();
