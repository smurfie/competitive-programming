(() => {
  function solve(input) {
    var word = nextPass(input);

    while (notValid(word)) {
      word = nextPass(word);
    }

    word = nextPass(word);
    while (notValid(word)) {
      word = nextPass(word);
    }

    return word;
  }

  function nextPass(word) {
    var i = word.length - 1;
    var pass = "";
    var increment = true;
    while (i >= 0) {
      if (increment) {
        var nextLetter = String.fromCharCode(word.charCodeAt(i) + 1);
        if (nextLetter != "{") {
          increment = false;
        } else {
          nextLetter = "a";
        }
        pass = nextLetter + pass;
      } else {
        pass = word[i] + pass;
      }
      i--;
    }
    return pass;
  }

  function notValid(word) {
    if (word.indexOf("i") != -1) return true;
    if (word.indexOf("o") != -1) return true;
    if (word.indexOf("l") != -1) return true;

    var stair = false;
    for (var i = 2; i < word.length; i++) {
      if (
        word.charCodeAt(i - 2) + 1 == word.charCodeAt(i - 1) &&
        word.charCodeAt(i - 1) + 1 == word.charCodeAt(i)
      ) {
        stair = true;
      }
    }
    if (!stair) return true;

    var doubles = 0;
    for (var i = 1; i < word.length; i++) {
      if (word[i] == word[i - 1]) {
        doubles++;
        i++;
      }
    }

    return doubles < 2;
  }

  var dataset = [];

  dataset.push({
    input: `cqjxjnds`,
    output: "cqkaabcc"
  });

  Utils.check(solve, dataset, "11b");
})();
