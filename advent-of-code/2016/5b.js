(() => {
  function solve(input) {
    var password = [];
    var filled = 0;
    var i = 0;
    while (filled < 8) {
      var hash = SparkMD5.hash(input + i);
      if (hash.startsWith("00000")) {
        var pos = parseInt(hash[5]);
        var value = hash[6];
        if (!isNaN(pos) && pos < 8 && !password[pos]) {
          password[pos] = value;
          filled++;
        }
      }
      i++;
    }

    return password.join("");
  }

  var dataset = [];

  dataset.push({
    input: `abc`,
    output: "05ace8e3"
  });

  dataset.push({
    input: `abbhdwsy`,
    output: "424a0197"
  });

  Utils.check(solve, dataset, "5b", "This one takes a while... (~75 sec.)");
})();
