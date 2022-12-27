(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var i = 0;
    var monkeys = [];
    var mcm = 1;
    while (i < lines.length) {
      var monkey = {};

      i++;
      var line = lines[i].substring(lines[i++].indexOf(":") + 2);
      monkey.items = line.split(", ").map((i) => Number(i));
      monkey.multiply = lines[i].indexOf("*") >= 0;
      monkey.value = lines[i++].split(" ").at(-1);
      monkey.divisible = Number(lines[i++].split(" ").at(-1));
      mcm *= monkey.divisible; // As all are prime numbers
      monkey.true = Number(lines[i++].split(" ").at(-1));
      monkey.false = Number(lines[i++].split(" ").at(-1));
      monkey.inspections = 0;
      monkeys.push(monkey);
      i++;
    }

    for (i = 0; i < 10000; i++) {
      for (var monkey of monkeys) {
        while (monkey.items.length > 0) {
          var item = monkey.items.shift();
          monkey.inspections++;
          var value = monkey.value == "old" ? item : Number(monkey.value);
          var newValue = monkey.multiply ? item * value : item + value;
          newValue %= mcm;
          monkeys[
            newValue % monkey.divisible == 0 ? monkey.true : monkey.false
          ].items.push(newValue);
        }
      }
    }

    var inspections = monkeys.map((i) => i.inspections);
    inspections = inspections.sort((a, b) => b - a);
    return inspections[0] * inspections[1];
  }

  var dataset = [];

  dataset.push({
    input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
    output: 2713310158
  });

  dataset.push({
    input: `Monkey 0:
  Starting items: 53, 89, 62, 57, 74, 51, 83, 97
  Operation: new = old * 3
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 5

Monkey 1:
  Starting items: 85, 94, 97, 92, 56
  Operation: new = old + 2
  Test: divisible by 19
    If true: throw to monkey 5
    If false: throw to monkey 2

Monkey 2:
  Starting items: 86, 82, 82
  Operation: new = old + 1
  Test: divisible by 11
    If true: throw to monkey 3
    If false: throw to monkey 4

Monkey 3:
  Starting items: 94, 68
  Operation: new = old + 5
  Test: divisible by 17
    If true: throw to monkey 7
    If false: throw to monkey 6

Monkey 4:
  Starting items: 83, 62, 74, 58, 96, 68, 85
  Operation: new = old + 4
  Test: divisible by 3
    If true: throw to monkey 3
    If false: throw to monkey 6

Monkey 5:
  Starting items: 50, 68, 95, 82
  Operation: new = old + 8
  Test: divisible by 7
    If true: throw to monkey 2
    If false: throw to monkey 4

Monkey 6:
  Starting items: 75
  Operation: new = old * 7
  Test: divisible by 5
    If true: throw to monkey 7
    If false: throw to monkey 0

Monkey 7:
  Starting items: 92, 52, 85, 89, 68, 82
  Operation: new = old * old
  Test: divisible by 2
    If true: throw to monkey 0
    If false: throw to monkey 1`,
    output: 19457438264
  });

  Utils.check(solve, dataset, "11b");
})();
