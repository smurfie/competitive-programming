(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var registersA = { p: 0 };
    var registersB = { p: 1 };
    var iA = 0;
    var iB = 0;
    var queueA = [];
    var queueB = [];
    var sent = 0;
    var waitingA = false;
    var waitingB = false;

    while (!waitingA || !waitingB) {
      var line = lines[iA];
      var words = line.split(" ");
      switch (words[0]) {
        case "snd":
          queueB.push(number(registersA, words[1]));
          break;
        case "set":
          registersA[words[1]] = number(registersA, words[2]);
          break;
        case "add":
          registersA[words[1]] += number(registersA, words[2]);
          break;
        case "mul":
          registersA[words[1]] *= number(registersA, words[2]);
          break;
        case "mod":
          registersA[words[1]] %= number(registersA, words[2]);
          break;
        case "rcv":
          if (queueA.length > 0) {
            registersA[words[1]] = queueA.shift();
            waitingA = false;
          } else {
            waitingA = true;
          }
          break;
        case "jgz":
          if (number(registersA, words[1]) > 0) {
            iA += parseInt(number(registersA, words[2])) - 1;
          }
          break;
      }
      line = lines[iB];
      words = line.split(" ");
      switch (words[0]) {
        case "snd":
          queueA.push(number(registersB, words[1]));
          sent++;
          break;
        case "set":
          registersB[words[1]] = number(registersB, words[2]);
          break;
        case "add":
          registersB[words[1]] += number(registersB, words[2]);
          break;
        case "mul":
          registersB[words[1]] *= number(registersB, words[2]);
          break;
        case "mod":
          registersB[words[1]] %= number(registersB, words[2]);
          break;
        case "rcv":
          if (queueB.length > 0) {
            registersB[words[1]] = queueB.shift();
            waitingB = false;
          } else {
            waitingB = true;
          }
          break;
        case "jgz":
          if (number(registersB, words[1]) > 0) {
            iB += parseInt(number(registersB, words[2])) - 1;
          }
          break;
      }
      if (!waitingA) iA++;
      if (!waitingB) iB++;
    }

    return sent;
  }

  function number(registers, id) {
    return isNaN(id) ? (registers[id] ? registers[id] : 0) : parseInt(id);
  }

  var dataset = [];

  dataset.push({
    input: `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`,
    output: 3
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
    output: 7493
  });

  Utils.check(solve, dataset, "18b");
})();
