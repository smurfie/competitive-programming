(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var a = parseInt(lines[0].split(" ")[4]);
    var b = parseInt(lines[1].split(" ")[4]);

    var count = 0;

    for (var i = 0; i < 40000000; i++) {
      a = (a * 16807) % 2147483647;
      b = (b * 48271) % 2147483647;
      if (a << 16 == b << 16) count++;
    }

    return count;
  }

  var dataset = [];

  dataset.push({
    input: `Generator A starts with 65
Generator B starts with 8921`,
    output: 588
  });

  dataset.push({
    input: `Generator A starts with 679
Generator B starts with 771`,
    output: 626
  });

  Utils.check(solve, dataset, "15a");
})();
