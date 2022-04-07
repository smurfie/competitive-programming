(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var muls = 0;
    var registers = {};

    for (var i = 0; i >= 0 && i < lines.length; i++) {
      var line = lines[i];
      var words = line.split(" ");
      switch (words[0]) {
        case "set":
          registers[words[1]] = number(registers, words[2]);
          break;
        case "sub":
          registers[words[1]] -= number(registers, words[2]);
          break;
        case "mul":
          registers[words[1]] *= number(registers, words[2]);
          muls++;
          break;
        case "jnz":
          if (number(registers, words[1]) != 0) {
            i += parseInt(number(registers, words[2])) - 1;
          }
          break;
      }
    }

    return muls;
  }

  function number(registers, id) {
    return isNaN(id) ? (registers[id] ? registers[id] : 0) : parseInt(id);
  }

  var dataset = [];

  dataset.push({
    input: `set b 67
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`,
    output: 4225
  });

  Utils.check(solve, dataset, "23a");
})();
