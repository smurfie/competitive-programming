(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var total = parseInt(lines[0]) + 10;

    var arr = [3, 7];
    var elf1 = 0;
    var elf2 = 1;

    while (arr.length < total) {
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

    return arr.slice(total - 10, total).join("");
  }

  var dataset = [];

  dataset.push({
    input: `9`,
    output: "5158916779"
  });

  dataset.push({
    input: `5`,
    output: "0124515891"
  });

  dataset.push({
    input: `18`,
    output: "9251071085"
  });

  dataset.push({
    input: `2018`,
    output: "5941429882"
  });

  dataset.push({
    input: `894501`,
    output: "2157138126"
  });

  Utils.check(solve, dataset, "14a");
})();
