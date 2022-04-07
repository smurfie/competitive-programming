(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var registers = {
      a: 0,
      b: 0,
      c: 0,
      d: 0
    };

    for (var i = 0; i < lines.length; i++) {
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
          registers[words[2]] = number(registers, words[1]);
          break;
        case "jnz":
          if (number(registers, words[1]) != 0) {
            i += parseInt(words[2]) - 1;
          }
          break;
      }
    }

    return registers["a"];
  }

  function number(registers, id) {
    return isNaN(id) ? registers[id] : parseInt(id);
  }

  var dataset = [];

  dataset.push({
    input: `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`,
    output: 42
  });

  dataset.push({
    input: `cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 16 c
cpy 17 d
inc a
dec d
jnz d -2
dec c
jnz c -5`,
    output: 318083
  });

  Utils.check(solve, dataset, "12a");
})();
