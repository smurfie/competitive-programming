(() => {
  function solve(input, word) {
    var lines = Utils.read(input);
    word = word.split("");

    for (var line of lines) {
      instruction = line.split(" ");
      if (instruction[0] == "swap") {
        if (instruction[1] == "position") {
          word = swapPosition(
            word,
            parseInt(instruction[2]),
            parseInt(instruction[5])
          );
        } else {
          word = swapLetter(word, instruction[2], instruction[5]);
        }
      }

      if (instruction[0] == "rotate") {
        if (instruction[1] == "left") {
          word = rotateLeft(word, parseInt(instruction[2]));
        } else if (instruction[1] == "right") {
          word = rotateRight(word, parseInt(instruction[2]));
        } else {
          word = rotateLetter(word, instruction[6]);
        }
      }

      if (instruction[0] == "reverse") {
        word = reverse(
          word,
          parseInt(instruction[2]),
          parseInt(instruction[4])
        );
      }
      if (instruction[0] == "move") {
        word = move(word, parseInt(instruction[2]), parseInt(instruction[5]));
      }
    }

    return word.join("");
  }

  function swapPosition(word, x, y) {
    var tmp = word[x];
    word[x] = word[y];
    word[y] = tmp;
    return word;
  }

  function swapLetter(word, x, y) {
    return swapPosition(word, word.indexOf(x), word.indexOf(y));
  }

  function rotateLeft(word, x) {
    var newWord = [];
    for (var i = 0; i < word.length; i++) {
      newWord[(i - x + word.length) % word.length] = word[i];
    }
    return newWord;
  }

  function rotateRight(word, x) {
    var newWord = [];
    for (var i = 0; i < word.length; i++) {
      newWord[(i + x) % word.length] = word[i];
    }
    return newWord;
  }

  function rotateLetter(word, x) {
    var times = word.indexOf(x) + 1;
    if (times > 4) times++;
    return rotateRight(word, times);
  }

  function reverse(word, x, y) {
    if (x < y) {
      swapPosition(word, x, y);
      reverse(word, x + 1, y - 1);
    }
    return word;
  }

  function move(word, x, y) {
    var letter = word.splice(x, 1);
    word.splice(y, 0, letter[0]);
    return word;
  }

  var dataset = [];

  dataset.push({
    input: `swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`,
    word: "abcde",
    output: "decab"
  });

  dataset.push({
    input: `swap position 2 with position 7
swap letter f with letter a
swap letter c with letter a
rotate based on position of letter g
rotate based on position of letter f
rotate based on position of letter b
swap position 3 with position 6
swap letter e with letter c
swap letter f with letter h
rotate based on position of letter e
swap letter c with letter b
rotate right 6 steps
reverse positions 4 through 7
rotate based on position of letter f
swap position 1 with position 5
rotate left 1 step
swap letter d with letter e
rotate right 7 steps
move position 0 to position 6
swap position 2 with position 6
swap position 2 with position 0
swap position 0 with position 1
rotate based on position of letter d
rotate right 2 steps
rotate left 4 steps
reverse positions 0 through 2
rotate right 2 steps
move position 6 to position 1
move position 1 to position 2
reverse positions 2 through 5
move position 2 to position 7
rotate left 3 steps
swap position 0 with position 1
rotate based on position of letter g
swap position 5 with position 0
rotate left 1 step
swap position 7 with position 1
swap letter g with letter h
rotate left 1 step
rotate based on position of letter g
reverse positions 1 through 7
reverse positions 1 through 4
reverse positions 4 through 5
rotate left 2 steps
swap letter f with letter d
swap position 6 with position 3
swap letter c with letter e
swap letter c with letter d
swap position 1 with position 6
rotate based on position of letter g
move position 4 to position 5
swap letter g with letter h
rotate based on position of letter h
swap letter h with letter f
swap position 3 with position 6
rotate based on position of letter c
rotate left 3 steps
rotate based on position of letter d
swap position 0 with position 7
swap letter e with letter d
move position 6 to position 7
rotate right 5 steps
move position 7 to position 0
rotate left 1 step
move position 6 to position 2
rotate based on position of letter d
rotate right 7 steps
swap position 3 with position 5
move position 1 to position 5
rotate right 0 steps
move position 4 to position 5
rotate based on position of letter b
reverse positions 2 through 4
rotate right 3 steps
swap letter b with letter g
rotate based on position of letter a
rotate right 0 steps
move position 0 to position 6
reverse positions 5 through 6
rotate left 2 steps
move position 3 to position 0
swap letter g with letter b
move position 6 to position 1
rotate based on position of letter f
move position 3 to position 2
reverse positions 2 through 7
swap position 0 with position 4
swap letter e with letter b
rotate left 4 steps
reverse positions 0 through 4
rotate based on position of letter a
rotate based on position of letter b
rotate left 6 steps
rotate based on position of letter d
rotate left 7 steps
swap letter c with letter d
rotate left 3 steps
move position 4 to position 6
move position 3 to position 2
reverse positions 0 through 6`,
    word: "abcdefgh",
    output: "gbhcefad"
  });

  Utils.check(solve, dataset, "21a");
})();
