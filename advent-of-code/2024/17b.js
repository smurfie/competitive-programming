(() => {
  function solve(input) {
    let lines = Utils.read(input);

    let reg = [0, 0, 0];

    let program = lines[4]
      .split(": ")[1]
      .split(",")
      .map((i) => Number(i));

    let lastBitsList = { 0: true };
    let round = 0n;

    while (true) {
      // As the programs keeps looping thorugh the same instructions deleting the last 3 bits of the initial number each time,
      // the idea is find in each iteration the next 3 last bits that can give a solution.
      // For doing that in each round we will try to find 100 solutions for the first "number of loop" instructions
      // So if after the first 100 solutions found (for the first instruction) the possible last 3 bits are only 3
      // and 5 in the next iteration we will try to match 2 instructions and find 100 solutions in the form of:
      // 8n + 3 or 8n + 5 and collect the last 6 bits of that numbers. If we get for example 27 and 51, in the next
      // loop / round we will try to match 3 instructions with numbers 64n + 27 or 64n + 51
      let base = 0n;
      let multiplier = 2n ** (round * 3n);
      let list = Object.keys(lastBitsList);
      let listIndex = 0;
      let found = 0;
      lastBitsList = {};

      let lastBits = multiplier * 2n ** 3n;
      let numInstructions = round;

      while (found < 100) {
        let number = base * multiplier + BigInt(list[listIndex]);
        reg[0] = number;
        reg[1] = lines[1].split(": ")[1];
        reg[2] = lines[2].split(": ")[1];
        let i = 0;
        let jump = false;
        let j = 0;
        let nextNumber = false;

        while (i < program.length && !nextNumber) {
          let opcode = program[i];
          let arg = i + 1 < program.length ? program[i + 1] : -1;
          switch (opcode) {
            case 0:
              reg[0] >>= BigInt(combo(arg, reg));
              break;
            case 1:
              reg[1] ^= BigInt(arg);
              break;
            case 2:
              reg[1] = BigInt(combo(arg, reg)) & 7n;
              break;
            case 3:
              if (reg[0] !== 0) {
                jump = true;
                i = arg;
              }
              break;
            case 4:
              reg[1] ^= BigInt(reg[2]);
              break;
            case 5:
              let out = combo(arg, reg) & 7n;
              if (Number(out) !== program[j++]) {
                nextNumber = true;
              } else {
                if (j >= numInstructions) {
                  lastBitsList[number % lastBits] = true;
                  found++;
                }
                if (j >= program.length) {
                  return number;
                }
              }
            case 6:
              reg[1] = reg[0] >> combo(arg, reg);
              break;
            case 7:
              reg[2] = reg[0] >> BigInt(combo(arg, reg));
              break;
          }
          if (!jump) {
            i += 2;
          }
          jump = false;
        }
        if (listIndex < list.length - 1) {
          listIndex++;
        } else {
          listIndex = 0;
          base++;
        }
      }
      round++;
    }
  }

  function combo(i, reg) {
    return i < 4n ? i : reg[i - 4];
  }

  let dataset = [];

  dataset.push({
    input: `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`,
    output: "117440",
  });

  dataset.push({
    input: `Register A: 30118712
Register B: 0
Register C: 0

Program: 2,4,1,3,7,5,4,2,0,3,1,5,5,5,3,0`,
    output: 236555995274861,
  });

  Utils.check(solve, dataset, "17b");
})();
