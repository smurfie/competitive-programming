(() => {
  function solve(input, iterations) {
    var word = input;

    for (var i = 0; i < iterations; i++) {
      var word2 = "";
      var j = 1;
      var letter = word[0];
      var times = 1;

      while (j < word.length) {
        if (word[j] == letter) times++;
        else {
          word2 += times + letter;
          letter = word[j];
          times = 1;
        }
        j++;
      }
      word2 += times + letter;
      word = word2;
    }
    return word.length;
  }

  var dataset = [];

  dataset.push({
    input: `1`,
    iterations: 5,
    output: 6
  });

  dataset.push({
    input: `3113322113`,
    iterations: 40,
    output: 329356
  });

  Utils.check(solve, dataset, "10a");
})();
