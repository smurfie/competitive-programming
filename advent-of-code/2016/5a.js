(() => {
  function solve(input) {
    var password = "";
    var i = 0;
    while (password.length < 8) {
      var hash = SparkMD5.hash(input + i);
      if (hash.startsWith("00000")) password += hash[5];
      i++;
    }

    return password;
  }

  var dataset = [];

  dataset.push({
    input: `abc`,
    output: "18f47a30"
  });

  dataset.push({
    input: `abbhdwsy`,
    output: "801b56a7"
  });

  Utils.check(solve, dataset, "5a", "This one takes a while... (~30 sec.)");
})();
