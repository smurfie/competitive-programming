(() => {
  function solve(input, times) {
    let lines = Utils.read(input);
    let dic = {};
    let sum = 0;

    for (let num of lines[0].split(" ")) {
      sum += splittings(Number(num), times, dic);
    }

    return sum;
  }

  function splittings(num, times, dic) {
    if (times === 0) {
      return 1;
    }
    if (dic[num + "," + times]) {
      return dic[num + "," + times];
    }

    let result = 0;
    let numStr = String(num);
    if (num === 0) {
      result = splittings(1, times - 1, dic);
    } else if (numStr.length % 2 === 0) {
      result =
        splittings(
          Number(numStr.substring(0, numStr.length / 2)),
          times - 1,
          dic
        ) +
        splittings(Number(numStr.substring(numStr.length / 2)), times - 1, dic);
    } else {
      result = splittings(num * 2024, times - 1, dic);
    }
    dic[num + "," + times] = result;
    return result;
  }

  let dataset = [];

  dataset.push({
    input: `0 1 10 99 999`,
    times: 1,
    output: 7,
  });

  dataset.push({
    input: `125 17`,
    times: 6,
    output: 22,
  });

  dataset.push({
    input: `125 17`,
    times: 25,
    output: 55312,
  });

  dataset.push({
    input: `4 4841539 66 5279 49207 134 609568 0`,
    times: 25,
    output: 212655,
  });

  Utils.check(solve, dataset, "11a");
})();