(() => {
  function solve(input) {
    // For solving it you have to analize a little (or a lot) the program
    // We want the variable z to be 0 at the end if we see we can identify
    // 7 "div z 26" operations and 14 "mul z y" operations where "y" could be
    // 1 or 26. In 7 cases (when in "add x num" num is >9) "y" will always be
    // 26 so we have to make the other ones (when num is negative) to make y=1
    // So the "eql" instruction after an "add x num" negative must be true
    var lines = Utils.read(input);

    var regs = [0, 0, 0, 0];
    return process(lines, 0, regs).join("");
  }

  function process(lines, i, regs) {
    var arr = [];
    var reduceNextMul = false;
    while (i < lines.length) {
      var line = lines[i];
      var parts = line.split(" ");
      switch (parts[0]) {
        case "mul":
          var reg = cToi(parts[1]);
          regs[reg] *= regVal(regs, parts[2]);
          break;
        case "add":
          if (parts[2].startsWith("-")) reduceNextMul = true;
          var reg = cToi(parts[1]);
          regs[reg] += regVal(regs, parts[2]);
          break;
        case "div":
          var reg = cToi(parts[1]);
          regs[reg] = Math.floor(regs[reg] / regVal(regs, parts[2]));
          break;
        case "mod":
          var reg = cToi(parts[1]);
          regs[reg] %= regVal(regs, parts[2]);
          break;
        case "eql":
          var reg = cToi(parts[1]);
          regs[reg] = regs[reg] == regVal(regs, parts[2]) ? 1 : 0;
          if (reduceNextMul) {
            if (regs[reg] == 0) return false;
            reduceNextMul = false;
          }
          break;
        case "inp":
          var reg = cToi(parts[1]);
          for (var j = 1; j < 10; j++) {
            regs[reg] = j;
            var res = process(lines, i + 1, Utils.duplicate(regs));
            if (res) {
              if (res !== true) {
                arr = res;
              }
              arr.unshift(j);
              return arr;
            }
          }
          regs[reg] = 1;
          break;
      }
      i++;
    }
    return regs[3] == 0;
  }

  function regVal(regs, c) {
    if (c == "w" || c == "x" || c == "y" || c == "z") return regs[cToi(c)];
    return parseInt(c);
  }

  function cToi(c) {
    switch (c) {
      case "w":
        return 0;
      case "x":
        return 1;
      case "y":
        return 2;
      case "z":
        return 3;
    }
  }

  var dataset = [];

  dataset.push({
    input: `inp w
mul x 0
add x z
mod x 26
div z 1
add x 10
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 0
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 12
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 6
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 13
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 4
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 13
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 2
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 14
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 9
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -2
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 1
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 11
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 10
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 6
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -10
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 4
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 10
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 6
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -10
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 3
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -4
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 9
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -1
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 15
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -1
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 5
mul y x
add z y`,
    output: 21191861151161
  });

  Utils.check(solve, dataset, "24b");
})();
