(() => {
  function solve() {
    // Changing line addr 4 2 4 for 4 3 4 does that instead of initializing the register 4 to
    // 10551370 it is initiallized at 970 and we can check more easily what does the program.
    // It counts the sum of all divisibles of that register

    var n = 10551370;
    var sum = 0;
    for (i = 1; i <= n; i++) {
      if (n % i == 0) sum += i;
    }

    return sum;
  }

  var dataset = [];

  dataset.push({
    input: `#ip 1
addi 1 16 1
seti 1 1 3
seti 1 9 5
mulr 3 5 2
eqrr 2 4 2
addr 2 1 1
addi 1 1 1
addr 3 0 0
addi 5 1 5
gtrr 5 4 2
addr 1 2 1
seti 2 6 1
addi 3 1 3
gtrr 3 4 2
addr 2 1 1
seti 1 6 1
mulr 1 1 1
addi 4 2 4
mulr 4 4 4
mulr 1 4 4
muli 4 11 4
addi 2 6 2
mulr 2 1 2
addi 2 2 2
addr 4 2 4
addr 1 0 1
seti 0 3 1
setr 1 4 2
mulr 2 1 2
addr 1 2 2
mulr 1 2 2
muli 2 14 2
mulr 2 1 2
addr 4 2 4
seti 0 0 0
seti 0 4 1`,
    output: 18992484
  });

  Utils.check(solve, dataset, "19b");
})();
