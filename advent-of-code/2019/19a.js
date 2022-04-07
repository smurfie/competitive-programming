(() => {
  function solve(input) {
    var matrix = Utils.matrix(50, 50, ".");
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = runProgram(input, i, j) == 0 ? "." : "#";
        if (matrix[i][j] == "#") sum++;
      }
    }
    return sum;
  }

  function runProgram(input, x, y) {
    var program = input.split(",").map((i) => parseInt(i));
    var i = 0;
    var output = [];
    var relBase = 0;
    var xVar = true;

    var opcode = program[i] % 100;
    while (opcode != 99) {
      var mode1 = Math.floor(program[i] / 100) % 10;
      var mode2 = Math.floor(program[i] / 1000) % 10;
      var mode3 = Math.floor(program[i] / 10000);
      if (opcode == 1) {
        var var1 = number(program, program[i + 1], mode1, relBase);
        var var2 = number(program, program[i + 2], mode2, relBase);
        program[position(program[i + 3], mode3, relBase)] = var1 + var2;
        i += 4;
      } else if (opcode == 2) {
        var var1 = number(program, program[i + 1], mode1, relBase);
        var var2 = number(program, program[i + 2], mode2, relBase);
        program[position(program[i + 3], mode3, relBase)] = var1 * var2;
        i += 4;
      } else if (opcode == 3) {
        var el = xVar ? x : y;
        program[position(program[i + 1], mode1, relBase)] = el;
        xVar = !xVar;
        i += 2;
      } else if (opcode == 4) {
        return number(program, program[i + 1], mode1, relBase);
      } else if (opcode == 5) {
        var var1 = number(program, program[i + 1], mode1, relBase);
        var var2 = number(program, program[i + 2], mode2, relBase);
        i = var1 != 0 ? var2 : i + 3;
      } else if (opcode == 6) {
        var var1 = number(program, program[i + 1], mode1, relBase);
        var var2 = number(program, program[i + 2], mode2, relBase);
        i = var1 == 0 ? var2 : i + 3;
      } else if (opcode == 7) {
        var var1 = number(program, program[i + 1], mode1, relBase);
        var var2 = number(program, program[i + 2], mode2, relBase);
        program[position(program[i + 3], mode3, relBase)] = var1 < var2 ? 1 : 0;
        i += 4;
      } else if (opcode == 8) {
        var var1 = number(program, program[i + 1], mode1, relBase);
        var var2 = number(program, program[i + 2], mode2, relBase);
        program[position(program[i + 3], mode3, relBase)] =
          var1 == var2 ? 1 : 0;
        i += 4;
      } else if (opcode == 9) {
        var var1 = number(program, program[i + 1], mode1, relBase);
        relBase += var1;
        i += 2;
      } else {
        console.log("Error");
      }
      opcode = program[i] % 100;
    }
  }

  function number(program, n, mode, relBase) {
    switch (mode) {
      case 0:
        return program[n] || 0;
      case 1:
        return n;
      case 2:
        return program[n + relBase] || 0;
    }
  }

  function position(n, mode, relBase) {
    switch (mode) {
      case 0:
        return n;
      case 2:
        return n + relBase;
    }
  }

  var dataset = [];

  dataset.push({
    input: `109,424,203,1,21101,0,11,0,1106,0,282,21102,18,1,0,1105,1,259,1202,1,1,221,203,1,21102,31,1,0,1106,0,282,21101,0,38,0,1106,0,259,20101,0,23,2,21201,1,0,3,21101,0,1,1,21101,57,0,0,1105,1,303,1202,1,1,222,21001,221,0,3,21001,221,0,2,21101,0,259,1,21101,80,0,0,1105,1,225,21101,119,0,2,21102,1,91,0,1106,0,303,2101,0,1,223,20102,1,222,4,21102,1,259,3,21101,0,225,2,21101,0,225,1,21101,0,118,0,1105,1,225,21002,222,1,3,21101,97,0,2,21101,133,0,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21102,148,1,0,1105,1,259,1201,1,0,223,20101,0,221,4,20102,1,222,3,21101,21,0,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21102,1,195,0,106,0,109,20207,1,223,2,20101,0,23,1,21101,-1,0,3,21101,0,214,0,1105,1,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,2102,1,-4,249,21202,-3,1,1,22101,0,-2,2,21201,-1,0,3,21102,1,250,0,1106,0,225,21201,1,0,-4,109,-5,2105,1,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2106,0,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,22101,0,-2,-2,109,-3,2106,0,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,21202,-2,1,3,21101,0,343,0,1106,0,303,1106,0,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,22101,0,-4,1,21102,384,1,0,1106,0,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,22102,1,1,-4,109,-5,2106,0,0`,
    output: 197
  });

  Utils.check(solve, dataset, "19a");
})();
