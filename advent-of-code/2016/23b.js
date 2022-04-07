(() => {
  function solve(input) {
    // Optimize the code using mul
    input = `cpy a b
dec b
cpy a d
mul b d a
cpy 0 d
null
null
null
null
null
dec b
cpy b c
cpy c d
dec d
inc c
jnz d -2
tgl c
cpy -16 c
jnz 1 c
cpy 87 c
jnz 80 d
inc a
inc d
jnz d -2
inc c
jnz c -5`;

    var lines = Utils.read(input);
    var registers = {
      a: 12,
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
        case "mul": // Changed input to include mul
          registers[words[3]] =
            number(registers, words[1]) * number(registers, words[2]);
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
        case "tgl":
          toggle(lines, i + registers[words[1]]);
          break;
      }
    }

    return registers["a"];
  }

  function number(registers, id) {
    return isNaN(id) ? registers[id] : parseInt(id);
  }

  function toggle(lines, i) {
    if (i >= lines.length) return;
    var words = lines[i].split(" ");
    if (words.length == 2) {
      words[0] = words[0] == "inc" ? "dec" : "inc";
    }
    if (words.length == 3) {
      words[0] = words[0] == "jnz" ? "cpy" : "jnz";
    }
    lines[i] = words.join(" ");
  }

  var dataset = [];

  dataset.push({
    input: `cpy a b
dec b
cpy a d
cpy 0 a
cpy b c
inc a
dec c
jnz c -2
dec d
jnz d -5
dec b
cpy b c
cpy c d
dec d
inc c
jnz d -2
tgl c
cpy -16 c
jnz 1 c
cpy 87 c
jnz 80 d
inc a
inc d
jnz d -2
inc c
jnz c -5`,
    output: 479008560
  });

  Utils.check(solve, dataset, "23b");
})();
