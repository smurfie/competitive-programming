(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var base = lines[0];

    var i = 0;
    var found = 0;
    var fives = {};
    var hashes = {};

    for (var i = 0; i < 1000; i++) {
      for (val of nRepeated(md52017(hashes, base + i), 5)) {
        add(fives, val, i);
      }
    }

    var i = 0;
    while (found < 64) {
      for (val of nRepeated(md52017(hashes, base + (i + 1000)), 5)) {
        add(fives, val, i + 1000);
      }
      val = nRepeated(md52017(hashes, base + i), 3);
      if (val.length > 0) {
        val = val[0];
        var five = fives[val];
        if (five && five.length > 0) {
          while (five.length > 0 && five[0] <= i) {
            five.shift();
          }
          if (five.length > 0) {
            found++;
            // Uncomment next line if you want to see the progress because it takes a while
            // console.log(found, ":", val, i);
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

  function md52017(hashes, s) {
    var ini = s;
    if (hashes[ini]) return hashes[ini];
    for (var i = 0; i < 2017; i++) s = SparkMD5.hash(s);
    hashes[ini] = s;
    return s;
  }

  var dataset = [];

  dataset.push({
    input: `abc`,
    output: 22551
  });

  dataset.push({
    input: `zpqevtbw`,
    output: 22423
  });

  Utils.check(solve, dataset, "14b", "This one takes a while... (~160 sec.)");
})();
