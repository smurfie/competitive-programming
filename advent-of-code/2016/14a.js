(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var base = lines[0];

    var i = 0;
    var found = 0;
    var fives = {};

    for (var i = 0; i < 1000; i++) {
      for (val of nRepeated(SparkMD5.hash(base + i), 5)) {
        add(fives, val, i);
      }
    }

    var i = 0;
    while (found < 64) {
      for (val of nRepeated(SparkMD5.hash(base + (i + 1000)), 5)) {
        add(fives, val, i + 1000);
      }
      val = nRepeated(SparkMD5.hash(base + i), 3);
      if (val.length > 0) {
        val = val[0];
        var five = fives[val];
        if (five && five.length > 0) {
          while (five.length > 0 && five[0] <= i) {
            five.shift();
          }
          if (five.length > 0) {
            found++;
          }
        }
      }
      i++;
    }

    return i - 1;
  }

  function add(fives, a, i) {
    if (!fives[a]) fives[a] = [];
    fives[a].push(i);
  }

  function nRepeated(s, n) {
    var regex = new RegExp("(.)\\1{" + (n - 1) + ",}", "g");
    return (s.match(regex) || []).map((i) => i[0]);
  }

  var dataset = [];

  dataset.push({
    input: `abc`,
    output: 22728
  });

  dataset.push({
    input: `zpqevtbw`,
    output: 16106
  });

  Utils.check(solve, dataset, "14a");
})();
