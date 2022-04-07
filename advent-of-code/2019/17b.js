(() => {
  function solve(input) {
    var program = input.split(",").map((i) => parseInt(i));
    var inputId = 0;
    var i = 0;
    var output = [];
    var relBase = 0;
    program[0] = 2;
    var inputArr = [];

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
        if (inputArr.length == 0) {
          inputArr = calculateRoute(output);
          output = [];
        }
        program[position(program[i + 1], mode1, relBase)] = inputArr[inputId++];
        i += 2;
      } else if (opcode == 4) {
        output.push(number(program, program[i + 1], mode1, relBase));
        i += 2;
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

    return output[output.length - 1];
  }

  function calculateRoute(output) {
    var stringMap = output.map((i) => String.fromCharCode(i)).join("");
    var matrix = stringMap
      .split("\n")
      .filter((i) => i != "")
      .map((i) => i.split(""));

    var x = -1;
    var y = -1;
    for (var i = 0; i < matrix.length - 1 && x == -1; i++) {
      for (var j = 0; j < matrix[i].length - 1 && x == -1; j++) {
        if (
          matrix[i][j] == "^" ||
          matrix[i][j] == "<" ||
          matrix[i][j] == ">" ||
          matrix[i][j] == "v"
        ) {
          x = i;
          y = j;
        }
      }
    }

    var route = [];
    var dir = 0;
    switch (matrix[x][y]) {
      case "^":
        dir = 0;
        break;
      case ">":
        dir = 1;
        break;
      case "v":
        dir = 2;
        break;
      case "<":
        dir = 3;
        break;
    }

    var steps = 0;
    var s = straight(matrix, x, y, dir);
    var l = left(matrix, x, y, dir);
    var r = right(matrix, x, y, dir);
    while (s[3] == "#" || l[3] == "#" || r[3] == "#") {
      if (s[3] == "#") {
        steps++;
        x = s[0];
        y = s[1];
      } else if (l[3] == "#") {
        if (steps > 0) {
          route.push(steps);
          route.push(",");
        }
        route.push("L");
        route.push(",");
        steps = 1;
        x = l[0];
        y = l[1];
        dir = l[2];
      } else if (r[3] == "#") {
        if (steps > 0) {
          route.push(steps);
          route.push(",");
        }
        route.push("R");
        route.push(",");
        steps = 1;
        x = r[0];
        y = r[1];
        dir = r[2];
      }
      s = straight(matrix, x, y, dir);
      l = left(matrix, x, y, dir);
      r = right(matrix, x, y, dir);
    }
    route.push(steps);

    return minimalPrograms(route.join(""));
  }

  function minimalPrograms(route) {
    var a = "";
    var b = "";
    var c = "";

    var main = "";
    while (route.length > 0) {
      if (route[0] == ",") {
        route = route.substring(1);
      } else if (route.startsWith("A")) {
        main += "A,";
        route = route.substring(2);
      } else if (route.startsWith("B")) {
        main += "B,";
        route = route.substring(2);
      } else if (route.startsWith("C")) {
        main += "C,";
        route = route.substring(2);
      } else if (c == "") {
        var len = 20;
        var max = 0;
        var sMax = "";
        var s = route.substring(0, len);
        var r = new RegExp(s, "gi");
        while (len > 3) {
          if (
            s.indexOf("A") == -1 &&
            s.indexOf("B") == -1 &&
            s.indexOf("C") == -1 &&
            !s.endsWith(",")
          ) {
            var rep = (route.match(r) || []).length;
            if (rep * len > max) {
              max = rep * len;
              sMax = s;
            }
          }
          len--;
          s = route.substring(0, len);
          r = new RegExp(s, "gi");
        }
        if (a == "") {
          a = sMax;
          route = route.replaceAll(sMax, "A");
        } else if (b == "") {
          b = sMax;
          route = route.replaceAll(sMax, "B");
        } else {
          c = sMax;
          route = route.replaceAll(sMax, "C");
        }
      } else {
        console.log("Error!");
        return [];
      }
    }
    main = main.substring(0, main.length - 1);
    return (main + "\n" + a + "\n" + b + "\n" + c + "\nn\n")
      .split("")
      .map((i) => i.charCodeAt(0));
  }

  function straight(matrix, x, y, dir) {
    switch (dir) {
      case 0:
        x--;
        break;
      case 1:
        y++;
        break;
      case 2:
        x++;
        break;
      case 3:
        y--;
        break;
    }
    var tile =
      x >= 0 && y >= 0 && x < matrix.length && y < matrix[x].length
        ? matrix[x][y]
        : ".";

    return [x, y, dir, tile];
  }

  function left(matrix, x, y, dir) {
    dir += 3;
    dir %= 4;
    return straight(matrix, x, y, dir);
  }

  function right(matrix, x, y, dir) {
    dir++;
    dir %= 4;
    return straight(matrix, x, y, dir);
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
    input: `1,330,331,332,109,3508,1102,1,1182,16,1101,0,1473,24,101,0,0,570,1006,570,36,1002,571,1,0,1001,570,-1,570,1001,24,1,24,1105,1,18,1008,571,0,571,1001,16,1,16,1008,16,1473,570,1006,570,14,21102,58,1,0,1105,1,786,1006,332,62,99,21102,1,333,1,21101,0,73,0,1106,0,579,1102,0,1,572,1101,0,0,573,3,574,101,1,573,573,1007,574,65,570,1005,570,151,107,67,574,570,1005,570,151,1001,574,-64,574,1002,574,-1,574,1001,572,1,572,1007,572,11,570,1006,570,165,101,1182,572,127,1002,574,1,0,3,574,101,1,573,573,1008,574,10,570,1005,570,189,1008,574,44,570,1006,570,158,1105,1,81,21102,340,1,1,1106,0,177,21101,477,0,1,1105,1,177,21102,514,1,1,21102,1,176,0,1106,0,579,99,21101,184,0,0,1106,0,579,4,574,104,10,99,1007,573,22,570,1006,570,165,101,0,572,1182,21102,375,1,1,21101,211,0,0,1105,1,579,21101,1182,11,1,21102,222,1,0,1105,1,979,21102,388,1,1,21102,233,1,0,1105,1,579,21101,1182,22,1,21101,0,244,0,1106,0,979,21102,401,1,1,21101,255,0,0,1106,0,579,21101,1182,33,1,21101,266,0,0,1106,0,979,21101,0,414,1,21102,1,277,0,1106,0,579,3,575,1008,575,89,570,1008,575,121,575,1,575,570,575,3,574,1008,574,10,570,1006,570,291,104,10,21101,0,1182,1,21101,0,313,0,1106,0,622,1005,575,327,1102,1,1,575,21102,1,327,0,1106,0,786,4,438,99,0,1,1,6,77,97,105,110,58,10,33,10,69,120,112,101,99,116,101,100,32,102,117,110,99,116,105,111,110,32,110,97,109,101,32,98,117,116,32,103,111,116,58,32,0,12,70,117,110,99,116,105,111,110,32,65,58,10,12,70,117,110,99,116,105,111,110,32,66,58,10,12,70,117,110,99,116,105,111,110,32,67,58,10,23,67,111,110,116,105,110,117,111,117,115,32,118,105,100,101,111,32,102,101,101,100,63,10,0,37,10,69,120,112,101,99,116,101,100,32,82,44,32,76,44,32,111,114,32,100,105,115,116,97,110,99,101,32,98,117,116,32,103,111,116,58,32,36,10,69,120,112,101,99,116,101,100,32,99,111,109,109,97,32,111,114,32,110,101,119,108,105,110,101,32,98,117,116,32,103,111,116,58,32,43,10,68,101,102,105,110,105,116,105,111,110,115,32,109,97,121,32,98,101,32,97,116,32,109,111,115,116,32,50,48,32,99,104,97,114,97,99,116,101,114,115,33,10,94,62,118,60,0,1,0,-1,-1,0,1,0,0,0,0,0,0,1,42,14,0,109,4,1201,-3,0,586,21001,0,0,-1,22101,1,-3,-3,21102,0,1,-2,2208,-2,-1,570,1005,570,617,2201,-3,-2,609,4,0,21201,-2,1,-2,1106,0,597,109,-4,2105,1,0,109,5,1202,-4,1,630,20101,0,0,-2,22101,1,-4,-4,21101,0,0,-3,2208,-3,-2,570,1005,570,781,2201,-4,-3,652,21001,0,0,-1,1208,-1,-4,570,1005,570,709,1208,-1,-5,570,1005,570,734,1207,-1,0,570,1005,570,759,1206,-1,774,1001,578,562,684,1,0,576,576,1001,578,566,692,1,0,577,577,21102,702,1,0,1105,1,786,21201,-1,-1,-1,1105,1,676,1001,578,1,578,1008,578,4,570,1006,570,724,1001,578,-4,578,21102,1,731,0,1105,1,786,1105,1,774,1001,578,-1,578,1008,578,-1,570,1006,570,749,1001,578,4,578,21101,0,756,0,1106,0,786,1106,0,774,21202,-1,-11,1,22101,1182,1,1,21102,774,1,0,1106,0,622,21201,-3,1,-3,1106,0,640,109,-5,2106,0,0,109,7,1005,575,802,21002,576,1,-6,21001,577,0,-5,1106,0,814,21101,0,0,-1,21101,0,0,-5,21101,0,0,-6,20208,-6,576,-2,208,-5,577,570,22002,570,-2,-2,21202,-5,55,-3,22201,-6,-3,-3,22101,1473,-3,-3,2102,1,-3,843,1005,0,863,21202,-2,42,-4,22101,46,-4,-4,1206,-2,924,21102,1,1,-1,1105,1,924,1205,-2,873,21101,35,0,-4,1105,1,924,1201,-3,0,878,1008,0,1,570,1006,570,916,1001,374,1,374,1201,-3,0,895,1102,1,2,0,2101,0,-3,902,1001,438,0,438,2202,-6,-5,570,1,570,374,570,1,570,438,438,1001,578,558,922,20102,1,0,-4,1006,575,959,204,-4,22101,1,-6,-6,1208,-6,55,570,1006,570,814,104,10,22101,1,-5,-5,1208,-5,37,570,1006,570,810,104,10,1206,-1,974,99,1206,-1,974,1102,1,1,575,21101,973,0,0,1106,0,786,99,109,-7,2105,1,0,109,6,21101,0,0,-4,21102,0,1,-3,203,-2,22101,1,-3,-3,21208,-2,82,-1,1205,-1,1030,21208,-2,76,-1,1205,-1,1037,21207,-2,48,-1,1205,-1,1124,22107,57,-2,-1,1205,-1,1124,21201,-2,-48,-2,1106,0,1041,21102,1,-4,-2,1105,1,1041,21102,1,-5,-2,21201,-4,1,-4,21207,-4,11,-1,1206,-1,1138,2201,-5,-4,1059,1201,-2,0,0,203,-2,22101,1,-3,-3,21207,-2,48,-1,1205,-1,1107,22107,57,-2,-1,1205,-1,1107,21201,-2,-48,-2,2201,-5,-4,1090,20102,10,0,-1,22201,-2,-1,-2,2201,-5,-4,1103,2101,0,-2,0,1106,0,1060,21208,-2,10,-1,1205,-1,1162,21208,-2,44,-1,1206,-1,1131,1106,0,989,21101,439,0,1,1105,1,1150,21101,477,0,1,1106,0,1150,21102,514,1,1,21102,1149,1,0,1106,0,579,99,21102,1157,1,0,1105,1,579,204,-2,104,10,99,21207,-3,22,-1,1206,-1,1138,1201,-5,0,1176,2102,1,-4,0,109,-6,2106,0,0,40,9,46,1,7,1,46,1,7,1,46,1,7,1,46,1,7,1,46,1,7,1,42,13,42,1,3,1,50,1,3,1,50,1,3,1,50,1,3,9,42,1,11,1,36,9,9,1,36,1,5,1,1,1,9,1,18,13,5,1,5,7,5,1,18,1,17,1,7,1,9,1,8,7,3,1,13,11,1,1,9,1,8,1,5,1,3,1,13,1,3,1,5,1,1,1,9,1,6,7,1,1,3,1,13,1,3,1,5,1,1,1,9,1,6,1,1,1,3,1,1,1,3,1,13,1,3,1,5,1,1,1,9,1,6,1,1,1,3,1,1,1,3,1,13,1,3,1,5,1,1,1,9,1,6,1,1,1,3,1,1,1,3,1,13,1,3,1,5,1,1,1,9,1,6,1,1,11,13,1,3,7,1,1,9,8,5,1,1,1,17,1,11,1,15,2,5,1,1,1,5,13,11,9,7,2,5,1,1,1,5,1,31,1,7,10,5,1,31,1,7,1,6,1,7,1,31,1,7,1,6,1,7,1,25,11,3,1,6,1,7,1,25,1,5,1,3,1,3,1,6,9,25,1,1,13,40,1,1,1,3,1,3,1,44,1,1,1,3,1,3,1,44,1,1,1,3,1,3,1,44,7,3,1,46,1,7,1,46,9,4`,
    output: 1075882
  });

  Utils.check(solve, dataset, "17b");
})();
