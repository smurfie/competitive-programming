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
      // The only instruction where the register 0 is read is #28: eqrr 3 0 1
      // If register[0] == register[3] the program will end
      var line = lines[ip];
      if (ip == 28) break;
      if (registerIp > -1) registers[registerIp] = ip;

      var a = parseInt(line.split(" ")[1]);
      var b = parseInt(line.split(" ")[2]);
      var c = parseInt(line.split(" ")[3]);
      operations[line.split(" ")[0]](a, b, c);

      if (registerIp > -1) ip = registers[registerIp];
      ip++;
    }

    return registers[3];
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
    input: `#ip 4
seti 123 0 3
bani 3 456 3
eqri 3 72 3
addr 3 4 4
seti 0 0 4
seti 0 5 3
bori 3 65536 2
seti 7637914 8 3
bani 2 255 1
addr 3 1 3
bani 3 16777215 3
muli 3 65899 3
bani 3 16777215 3
gtir 256 2 1
addr 1 4 4
addi 4 1 4
seti 27 1 4
seti 0 7 1
addi 1 1 5
muli 5 256 5
gtrr 5 2 5
addr 5 4 4
addi 4 1 4
seti 25 3 4
addi 1 1 1
seti 17 0 4
setr 1 8 2
seti 7 7 4
eqrr 3 0 1
addr 1 4 4
seti 5 5 4`,
    output: 2792537
  });

  Utils.check(solve, dataset, "21a");
})();
