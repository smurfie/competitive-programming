(() => {
  function solve(input) {
    let lines = Utils.read(input);
    let times = lines[0].split(" ").filter((i) => i != "");
    let distances = lines[1].split(" ").filter((i) => i != "");

    times.shift();
    distances.shift();

    times = times.map((i) => Number(i));
    distances = distances.map((i) => Number(i));

    let mul = 1;
    for (let i = 0; i < times.length; i++) {
      let b = times[i];
      let c = distances[i];
      let sqr = Math.sqrt(b * b - 4 * c);
      let min = Math.ceil((b - sqr) / 2 + 0.00000001);
      let max = Math.floor((b + sqr) / 2 - 0.00000001);
      mul *= max - min + 1;
    }

    return mul;
  }

  let dataset = [];

  dataset.push({
    input: `Time:      7  15   30
Distance:  9  40  200`,
    output: 288
  });

  dataset.push({
    input: `Time:        60     80     86     76
Distance:   601   1163   1559   1300`,
    output: 1155175
  });

  Utils.check(solve, dataset, "6a");
})();
