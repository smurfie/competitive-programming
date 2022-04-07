(() => {
  var registers;

  function solve(input) {
    var lines = Utils.read(input);
    registers = [0, 0, 0, 0, 0, 0];
    var ip = 0;
    var registerIp = -1;

    var operations = {
      addr,
      addi,
      mulr,
      muli,
      banr,
      bani,
      borr,
      bori,
      setr,
      seti,
      gtir,
      gtri,
      gtrr,
      eqir,
      eqri,
      eqrr
    };

    if (lines[0].split(" ")[0] == "#ip") {
      registerIp = parseInt(lines[0].split(" ")[1]);
      lines.shift();
    }

    while (ip >= 0 && ip < lines.length) {
      var line = lines[ip];

      if (registerIp > -1) registers[registerIp] = ip;

      var a = parseInt(line.split(" ")[1]);
      var b = parseInt(line.split(" ")[2]);
      var c = parseInt(line.split(" ")[3]);
      operations[line.split(" ")[0]](a, b, c);

      if (registerIp > -1) ip = registers[registerIp];
      ip++;
    }

    return registers[0];
  }

  function addr(a, b, c) {
    registers[c] = registers[a] + registers[b];
  }

  function addi(a, b, c) {
    registers[c] = registers[a] + b;
  }

  function mulr(a, b, c) {
    registers[c] = registers[a] * registers[b];
  }

  function muli(a, b, c) {
    registers[c] = registers[a] * b;
  }

  function banr(a, b, c) {
    registers[c] = registers[a] & registers[b];
  }

  function bani(a, b, c) {
    registers[c] = registers[a] & b;
  }

  function borr(a, b, c) {
    registers[c] = registers[a] | registers[b];
  }

  function bori(a, b, c) {
    registers[c] = registers[a] | b;
  }

  function setr(a, b, c) {
    registers[c] = registers[a];
  }

  function seti(a, b, c) {
    registers[c] = a;
  }

  function gtir(a, b, c) {
    registers[c] = a > registers[b] ? 1 : 0;
  }

  function gtri(a, b, c) {
    registers[c] = registers[a] > b ? 1 : 0;
  }

  function gtrr(a, b, c) {
    registers[c] = registers[a] > registers[b] ? 1 : 0;
  }

  function eqir(a, b, c) {
    registers[c] = a == registers[b] ? 1 : 0;
  }

  function eqri(a, b, c) {
    registers[c] = registers[a] == b ? 1 : 0;
  }

  function eqrr(a, b, c) {
    registers[c] = registers[a] == registers[b] ? 1 : 0;
  }

  var dataset = [];

  dataset.push({
    input: `#ip 0
seti 5 0 1
seti 6 0 2
addi 0 1 0
addr 1 2 3
setr 1 0 0
seti 8 0 4
seti 9 0 5`,
    output: 6
  });

  dataset.push({
    input: `#ip 1
addi 1 16 1
seti 1 1 3
seti 1 9 5
mulr 3 5 2
eqrr 2 4 2
addr 2 1 1
addi 1 1 1
addr 3 0 0
addi 5 1 5
gtrr 5 4 2
addr 1 2 1
seti 2 6 1
addi 3 1 3
gtrr 3 4 2
addr 2 1 1
seti 1 6 1
mulr 1 1 1
addi 4 2 4
mulr 4 4 4
mulr 1 4 4
muli 4 11 4
addi 2 6 2
mulr 2 1 2
addi 2 2 2
addr 4 2 4
addr 1 0 1
seti 0 3 1
setr 1 4 2
mulr 2 1 2
addr 1 2 2
mulr 1 2 2
muli 2 14 2
mulr 2 1 2
addr 4 2 4
seti 0 0 0
seti 0 4 1`,
    output: 1764
  });

  Utils.check(solve, dataset, "19a");
})();
