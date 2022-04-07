(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var j = -1;
    var found = false;
    while (!found) {
      j++;
      var registers = {
        a: j,
        b: 0,
        c: 0,
        d: 0
      };
      var dict = {};
      var next = 0;

      var another = false;
      for (var i = 0; i < lines.length && !another && !found; i++) {
        var line = lines[i];
        var words = line.split(" ");
        switch (words[0]) {
          case "inc":
            registers[words[1]]++;
            break;
          case "dec":
            registers[words[1]]--;
            break;
          case "cpy":
            if (isNaN(words[2]))
              registers[words[2]] = number(registers, words[1]);
            break;
          case "jnz":
            if (number(registers, words[1]) != 0) {
              i += parseInt(number(registers, words[2])) - 1;
            }
            break;
          case "out":
            if (number(registers, words[1]) == next) {
              next = (next + 1) % 2;
              if (dict[JSON.stringify(registers)]) found = true;
              else dict[JSON.stringify(registers)] = true;
            } else {
              another = true;
            }
            break;
        }
      }
    }

    return j;
  }

  function number(registers, id) {
    return isNaN(id) ? registers[id] : parseInt(id);
  }

  var dataset = [];

  dataset.push({
    input: `cpy a d
cpy 7 c
cpy 365 b
inc d
dec b
jnz b -2
dec c
jnz c -5
cpy d a
jnz 0 0
cpy a b
cpy 0 a
cpy 2 c
jnz b 2
jnz 1 6
dec b
dec c
jnz c -4
inc a
jnz 1 -7
cpy 2 b
jnz c 2
jnz 1 4
dec b
dec c
jnz 1 -4
jnz 0 0
out b
jnz a -19
jnz 1 -21`,
    output: 175
  });

  Utils.check(solve, dataset, "25a");
})();
