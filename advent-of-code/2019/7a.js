(() => {
  function solve(input) {
    var permutations = [];
    for (var i1 = 0; i1 < 5; i1++) {
      for (var i2 = 0; i2 < 5; i2++) {
        if (i2 == i1) continue;
        for (var i3 = 0; i3 < 5; i3++) {
          if (i3 == i2 || i3 == i1) continue;
          for (var i4 = 0; i4 < 5; i4++) {
            if (i4 == i3 || i4 == i2 || i4 == i1) continue;
            for (var i5 = 0; i5 < 5; i5++) {
              if (i5 == i4 || i5 == i3 || i5 == i2 || i5 == i1) continue;
              permutations.push([i1, i2, i3, i4, i5]);
            }
          }
        }
      }
    }
    var max = -Infinity;
    for (var per of permutations) {
      var tmp = sim(input, [per[0], 0]);
      tmp = sim(input, [per[1], tmp]);
      tmp = sim(input, [per[2], tmp]);
      tmp = sim(input, [per[3], tmp]);
      tmp = sim(input, [per[4], tmp]);
      max = Math.max(max, tmp);
    }

    return max;
  }

  function sim(input, inputArr) {
    var program = input.split(",").map((i) => parseInt(i));
    var inputId = 0;
    var i = 0;
    var last = 0;

    var opcode = program[i] % 100;
    while (opcode != 99) {
      var mode1 = Math.floor(program[i] / 100) % 10;
      var mode2 = Math.floor(program[i] / 1000) % 10;
      if (opcode == 1) {
        var var1 = mode1 == 0 ? program[program[i + 1]] : program[i + 1];
        var var2 = mode2 == 0 ? program[program[i + 2]] : program[i + 2];
        program[program[i + 3]] = var1 + var2;
        i += 4;
      } else if (opcode == 2) {
        var var1 = mode1 == 0 ? program[program[i + 1]] : program[i + 1];
        var var2 = mode2 == 0 ? program[program[i + 2]] : program[i + 2];
        program[program[i + 3]] = var1 * var2;
        i += 4;
      } else if (opcode == 3) {
        program[program[i + 1]] = inputArr[inputId++];
        i += 2;
      } else if (opcode == 4) {
        last = mode1 == 0 ? program[program[i + 1]] : program[i + 1];
        i += 2;
      } else if (opcode == 5) {
        var var1 = mode1 == 0 ? program[program[i + 1]] : program[i + 1];
        var var2 = mode2 == 0 ? program[program[i + 2]] : program[i + 2];
        i = var1 != 0 ? var2 : i + 3;
      } else if (opcode == 6) {
        var var1 = mode1 == 0 ? program[program[i + 1]] : program[i + 1];
        var var2 = mode2 == 0 ? program[program[i + 2]] : program[i + 2];
        i = var1 == 0 ? var2 : i + 3;
      } else if (opcode == 7) {
        var var1 = mode1 == 0 ? program[program[i + 1]] : program[i + 1];
        var var2 = mode2 == 0 ? program[program[i + 2]] : program[i + 2];
        program[program[i + 3]] = var1 < var2 ? 1 : 0;
        i += 4;
      } else if (opcode == 8) {
        var var1 = mode1 == 0 ? program[program[i + 1]] : program[i + 1];
        var var2 = mode2 == 0 ? program[program[i + 2]] : program[i + 2];
        program[program[i + 3]] = var1 == var2 ? 1 : 0;
        i += 4;
      } else {
        console.log("Error");
      }
      opcode = program[i] % 100;
    }
    return last;
  }

  var dataset = [];

  dataset.push({
    input: `3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0`,
    output: 43210
  });

  dataset.push({
    input: `3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0`,
    output: 54321
  });

  dataset.push({
    input: `3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0`,
    output: 65210
  });

  dataset.push({
    input: `3,8,1001,8,10,8,105,1,0,0,21,38,47,64,85,106,187,268,349,430,99999,3,9,1002,9,4,9,1001,9,4,9,1002,9,4,9,4,9,99,3,9,1002,9,4,9,4,9,99,3,9,1001,9,3,9,102,5,9,9,1001,9,5,9,4,9,99,3,9,101,3,9,9,102,5,9,9,1001,9,4,9,102,4,9,9,4,9,99,3,9,1002,9,3,9,101,2,9,9,102,4,9,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99`,
    output: 366376
  });

  Utils.check(solve, dataset, "7a");
})();
