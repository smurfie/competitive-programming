(() => {
  function solve(input) {
    let lines = Utils.read(input);
    let times = lines[0].split(" ").filter((i) => i != "");
    let distances = lines[1].split(" ").filter((i) => i != "");

    times.shift();
    distances.shift();

    let b = Number(times.join(""));
    let c = Number(distances.join(""));
    let sqr = Math.sqrt(b * b - 4 * c);
    let min = Math.ceil((b - sqr) / 2 + 0.00000001);
    let max = Math.floor((b + sqr) / 2 - 0.00000001);
    return max - min + 1;
  }

  let dataset = [];

  dataset.push({
    input: `Time:      7  15   30
Distance:  9  40  200`,
    output: 71503
  });

  dataset.push({
    input: `Time:        60     80     86     76
Distance:   601   1163   1559   1300`,
    output: 35961505
  });

  Utils.check(solve, dataset, "6b");
})();
