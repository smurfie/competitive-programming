(() => {
  function solve(input) {
    var numbers = input.split(",").map((i) => parseInt(i));
    var n = 30000000;
    // Here I learnt the importance of declaring the size of the array
    var dict = new Array(n);
    var last;

    for (var i = 0; i < numbers.length; i++) {
      last = dict[numbers[i]];
      dict[numbers[i]] = i;
    }

    var newNumber = numbers[numbers.length - 1];
    for (var i = numbers.length; i < n; i++) {
      if (last != undefined) {
        newNumber = i - 1 - last;
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
    output: 175594
  });

  dataset.push({
    input: `1,3,2`,
    output: 2578
  });

  dataset.push({
    input: `2,1,3`,
    output: 3544142
  });

  dataset.push({
    input: `1,2,3`,
    output: 261214
  });

  dataset.push({
    input: `2,3,1`,
    output: 6895259
  });

  dataset.push({
    input: `3,2,1`,
    output: 18
  });

  dataset.push({
    input: `3,1,2`,
    output: 362
  });

  dataset.push({
    input: `16,11,15,0,1,7`,
    output: 37312
  });

  Utils.check(solve, dataset, "15b");
})();
