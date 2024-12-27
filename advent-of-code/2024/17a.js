(() => {
  function solve(input) {
    let lines = Utils.read(input);

    let reg = [0, 0, 0];
    reg[0] = Number(lines[0].split(": ")[1]);
    reg[1] = Number(lines[1].split(": ")[1]);
    reg[2] = Number(lines[2].split(": ")[1]);
    let program = lines[4]
      .split(": ")[1]
      .split(",")
      .map((i) => Number(i));
    let i = 0;
    let jump = false;
    let out = [];

    while (i < program.length) {
      let opcode = program[i];
      let arg = i + 1 < program.length ? program[i + 1] : -1;
      switch (opcode) {
        case 0:
          reg[0] >>= combo(arg, reg);
          break;
        case 1:
          reg[1] ^= arg;
          break;
        case 2:
          reg[1] = combo(arg, reg) & 7;
          break;
        case 3:
          if (reg[0] !== 0) {
            jump = true;
            i = arg;
          }
          break;
        case 4:
          reg[1] ^= reg[2];
          break;
        case 5:
          out.push(combo(arg, reg) & 7);
          break;
        case 6:
          reg[1] = reg[0] >> combo(arg, reg);
          break;
        case 7:
          reg[2] = reg[0] >> combo(arg, reg);
          break;
      }
      if (!jump) {
        i += 2;
      }
      jump = false;
    }

    return out.join(",");
  }

  function combo(i, reg) {
    return i < 4 ? i : reg[i - 4];
  }

  let dataset = [];

  dataset.push({
    input: `Register A: 10
Register B: 0
Register C: 0

Program: 5,0,5,1,5,4`,
    output: "0,1,2",
  });

  dataset.push({
    input: `Register A: 2024
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
    output: "4,2,5,6,7,7,7,7,3,1,0",
  });

  dataset.push({
    input: `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
    output: "4,6,3,5,6,3,5,2,1,0",
  });

  dataset.push({
    input: `Register A: 30118712
Register B: 0
Register C: 0

Program: 2,4,1,3,7,5,4,2,0,3,1,5,5,5,3,0`,
    output: "1,7,6,5,1,0,5,0,7",
  });

  Utils.check(solve, dataset, "17a");
})();
