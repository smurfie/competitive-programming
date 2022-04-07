(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var total = parseInt(lines[0]) + 10;

    var arr = [3, 7];
    var elf1 = 0;
    var elf2 = 1;

    while (
      arr.length < input.length + 2 ||
      arr
        .slice(arr.length - 2 - input.length)
        .join("")
        .indexOf(input) == -1
    ) {
      var val1 = arr[elf1];
      var val2 = arr[elf2];
      var sum = val1 + val2;
      if (sum >= 10) arr.push(Math.floor(sum / 10));
      arr.push(sum % 10);
      elf1 += val1 + 1;
      elf1 %= arr.length;
      elf2 += val2 + 1;
      elf2 %= arr.length;
    }

    return arr.join("").indexOf(input);
  }

  var dataset = [];

  dataset.push({
    input: `51589`,
    output: "9"
  });

  dataset.push({
    input: `01245`,
    output: "5"
  });

  dataset.push({
    input: `92510`,
    output: "18"
  });

  dataset.push({
    input: `59414`,
    output: "2018"
  });

  dataset.push({
    input: `894501`,
    output: "20365081"
  });

  Utils.check(solve, dataset, "14b");
})();
