(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var a = parseInt(lines[0].split(" ")[4]);
    var b = parseInt(lines[1].split(" ")[4]);

    var count = 0;

    for (var i = 0; i < 5000000; i++) {
      do {
        a = (a * 16807) % 2147483647;
      } while (a % 4 != 0);
      do {
        b = (b * 48271) % 2147483647;
      } while (b % 8 != 0);
      if (a << 16 == b << 16) count++;
    }

    return count;
  }

  var dataset = [];

  dataset.push({
    input: `Generator A starts with 65
Generator B starts with 8921`,
    output: 309
  });

  dataset.push({
    input: `Generator A starts with 679
Generator B starts with 771`,
    output: 306
  });

  Utils.check(solve, dataset, "15b");
})();
