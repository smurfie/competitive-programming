(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var reg = [1, 0];
    var id = 0;

    while (id < lines.length) {
      [id, reg] = execute(lines, reg, id);
    }

    return reg[1];
  }

  function execute(lines, reg, instruction) {
    var command = lines[instruction].split(" ")[0];
    switch (command) {
      case "hlf":
        reg[toNum(lines[instruction].split(" ")[1])] /= 2;
        return [instruction + 1, reg];
      case "tpl":
        reg[toNum(lines[instruction].split(" ")[1])] *= 3;
        return [instruction + 1, reg];
      case "inc":
        reg[toNum(lines[instruction].split(" ")[1])] += 1;
        return [instruction + 1, reg];
      case "jmp":
        return [instruction + parseInt(lines[instruction].split(" ")[1]), reg];
      case "jie":
        return [
          reg[toNum(lines[instruction].split(" ")[1].split(",")[0])] % 2 == 0
            ? instruction + parseInt(lines[instruction].split(" ")[2])
            : instruction + 1,
          reg
        ];
      case "jio":
        return [
          reg[toNum(lines[instruction].split(" ")[1].split(",")[0])] == 1
            ? instruction + parseInt(lines[instruction].split(" ")[2])
            : instruction + 1,
          reg
        ];
    }
  }

  function toNum(reg) {
    return reg == "a" ? 0 : 1;
  }

  var dataset = [];

  dataset.push({
    input: `jio a, +16
inc a
inc a
tpl a
tpl a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
tpl a
tpl a
inc a
jmp +23
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
tpl a
inc a
inc a
tpl a
inc a
tpl a
inc a
tpl a
inc a
inc a
tpl a
inc a
tpl a
tpl a
inc a
jio a, +8
inc b
jie a, +4
tpl a
inc a
jmp +2
hlf a
jmp -7`,
    output: 247
  });

  Utils.check(solve, dataset, "23b");
})();
