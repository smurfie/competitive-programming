(() => {
  function solve(input) {
    var permutations = [];
    for (var i1 = 5; i1 < 10; i1++) {
      for (var i2 = 5; i2 < 10; i2++) {
        if (i2 == i1) continue;
        for (var i3 = 5; i3 < 10; i3++) {
          if (i3 == i2 || i3 == i1) continue;
          for (var i4 = 5; i4 < 10; i4++) {
            if (i4 == i3 || i4 == i2 || i4 == i1) continue;
            for (var i5 = 5; i5 < 10; i5++) {
              if (i5 == i4 || i5 == i3 || i5 == i2 || i5 == i1) continue;
              permutations.push([i1, i2, i3, i4, i5]);
            }
          }
        }
      }
    }
    var last = 0;
    var max = -Infinity;
    for (var per of permutations) {
      var p1 = input.split(",").map((i) => parseInt(i));
      var p2 = input.split(",").map((i) => parseInt(i));
      var p3 = input.split(",").map((i) => parseInt(i));
      var p4 = input.split(",").map((i) => parseInt(i));
      var p5 = input.split(",").map((i) => parseInt(i));
      var tmp = 0;
      var c1 = 0;
      var c2 = 0;
      var c3 = 0;
      var c4 = 0;
      var c5 = 0;
      [tmp, c1] = sim(p1, c1, [per[0], tmp]);
      [tmp, c2] = sim(p2, c2, [per[1], tmp]);
      [tmp, c3] = sim(p3, c3, [per[2], tmp]);
      [tmp, c4] = sim(p4, c4, [per[3], tmp]);
      [tmp, c5] = sim(p5, c5, [per[4], tmp]);
      while (tmp != "end") {
        [tmp, c1] = sim(p1, c1, [tmp]);
        if (tmp == "end") break;
        [tmp, c2] = sim(p2, c2, [tmp]);
        if (tmp == "end") break;
        [tmp, c3] = sim(p3, c3, [tmp]);
        if (tmp == "end") break;
        [tmp, c4] = sim(p4, c4, [tmp]);
        if (tmp == "end") break;
        [tmp, c5] = sim(p5, c5, [tmp]);
        if (tmp == "end") break;
        last = tmp;
      }
      max = Math.max(max, last);
    }

    return max;
  }

  function sim(program, i, inputArr) {
    var inputId = 0;

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
        return [mode1 == 0 ? program[program[i + 1]] : program[i + 1], i + 2];
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
    return ["end", "end"];
  }

  var dataset = [];

  dataset.push({
    input: `3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5`,
    output: 139629729
  });

  dataset.push({
    input: `3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10`,
    output: 18216
  });

  dataset.push({
    input: `3,8,1001,8,10,8,105,1,0,0,21,38,47,64,85,106,187,268,349,430,99999,3,9,1002,9,4,9,1001,9,4,9,1002,9,4,9,4,9,99,3,9,1002,9,4,9,4,9,99,3,9,1001,9,3,9,102,5,9,9,1001,9,5,9,4,9,99,3,9,101,3,9,9,102,5,9,9,1001,9,4,9,102,4,9,9,4,9,99,3,9,1002,9,3,9,101,2,9,9,102,4,9,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99`,
    output: 21596786
  });

  Utils.check(solve, dataset, "7b");
})();
