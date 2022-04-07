(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var snd = 0;
    var registers = {};
    var found = false;

    for (var i = 0; i >= 0 && i < lines.length && !found; i++) {
      var line = lines[i];
      var words = line.split(" ");
      switch (words[0]) {
        case "snd":
          snd = number(registers, words[1]);
          break;
        case "set":
          registers[words[1]] = number(registers, words[2]);
          break;
        case "add":
          registers[words[1]] += number(registers, words[2]);
          break;
        case "mul":
          registers[words[1]] *= number(registers, words[2]);
          break;
        case "mod":
          registers[words[1]] %= number(registers, words[2]);
          break;
        case "rcv":
          if (number(registers, words[1]) != 0) found = true;
          break;
        case "jgz":
          if (number(registers, words[1]) > 0) {
            i += parseInt(number(registers, words[2])) - 1;
          }
          break;
      }
    }

    return snd;
  }

  function number(registers, id) {
    return isNaN(id) ? (registers[id] ? registers[id] : 0) : parseInt(id);
  }

  var dataset = [];

  dataset.push({
    input: `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`,
    output: 4
  });

  dataset.push({
    input: `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 618
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`,
    output: 3423
  });

  Utils.check(solve, dataset, "18a");
})();
