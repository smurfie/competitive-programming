(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var x = 1;
    var i = 1;
    var sum = 0;
    for (var line of lines) {
      var ins = line.split(" ")[0];
      i++;
      if ((i + 20) % 40 == 0) {
        sum += i * x;
      }
      if (ins == "addx") {
        var val = Number(line.split(" ")[1]);
        x += val;
        i++;
        if ((i + 20) % 40 == 0) {
          sum += i * x;
        }
      }
    }
    return sum;
  }

  var dataset = [];

  dataset.push({
    input: `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
    output: 13140
  });

  dataset.push({
    input: `noop
addx 25
addx -5
addx -14
addx 4
noop
addx 2
addx 3
noop
noop
noop
noop
addx 3
addx 5
addx 2
noop
noop
addx 5
noop
noop
noop
addx 1
addx 2
addx 5
addx -40
addx 5
noop
addx 26
addx -20
addx -3
addx 2
noop
addx -4
addx 9
addx 5
addx 2
addx 11
addx -10
addx 2
addx 5
addx 2
addx 5
noop
noop
noop
addx -31
addx 32
addx -37
addx 1
addx 8
addx 13
addx -15
addx 4
noop
addx 5
noop
addx 3
addx -2
addx 4
addx 1
addx 4
addx -14
addx 15
addx 4
noop
noop
noop
addx 3
addx 5
addx -40
noop
addx 5
addx 8
addx -3
noop
addx 2
addx 9
addx -4
noop
noop
noop
noop
addx 5
addx -9
addx 10
addx 4
noop
noop
addx 5
addx -19
addx 24
addx -2
addx 5
addx -40
addx 22
addx -19
addx 2
addx 5
addx 2
addx 5
noop
noop
addx -2
addx 2
addx 5
addx 3
noop
addx 2
addx 2
addx 3
addx -2
addx 10
addx -3
addx 3
noop
addx -40
addx 2
addx 11
addx -5
addx -1
noop
addx 3
addx 7
noop
addx -2
addx 5
addx 2
addx 3
noop
addx 2
addx 6
addx -5
addx 2
addx -18
addx 26
addx -1
noop
noop
noop
noop`,
    output: 14620
  });

  Utils.check(solve, dataset, "10a");
})();
