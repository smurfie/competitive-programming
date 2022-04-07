(() => {
  function solve(input, totalTime) {
    var lines = Utils.read(input);

    var reindeers = [];

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].split(" ");
      var reindeer = {};
      reindeer.speed = parseInt(line[3]);
      reindeer.time = parseInt(line[6]);
      reindeer.wait = parseInt(line[13]);
      reindeer.points = 0;
      reindeers.push(reindeer);
    }

    for (var i = 1; i <= totalTime; i++) {
      var max = -1;
      var reindeersMax = [];

      for (var j = 0; j < reindeers.length; j++) {
        var lap = reindeers[j].time + reindeers[j].wait;
        var nLaps = Math.floor(i / lap);
        var seconds =
          Math.min(i % lap, reindeers[j].time) + nLaps * reindeers[j].time;
        var distance = seconds * reindeers[j].speed;

        if (distance > max) {
          max = distance;
          reindeersMax = [j];
        } else if (distance == max) {
          reindeersMax.push(j);
        }
      }

      for (var j = 0; j < reindeersMax.length; j++) {
        reindeers[reindeersMax[j]].points++;
      }
    }

    var max = -1;
    for (var i = 0; i < reindeers.length; i++) {
      max = Math.max(max, reindeers[i].points);
    }

    return max;
  }

  var dataset = [];

  dataset.push({
    input: `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`,
    totalTime: 1000,
    output: 689
  });

  dataset.push({
    input: `Rudolph can fly 22 km/s for 8 seconds, but then must rest for 165 seconds.
Cupid can fly 8 km/s for 17 seconds, but then must rest for 114 seconds.
Prancer can fly 18 km/s for 6 seconds, but then must rest for 103 seconds.
Donner can fly 25 km/s for 6 seconds, but then must rest for 145 seconds.
Dasher can fly 11 km/s for 12 seconds, but then must rest for 125 seconds.
Comet can fly 21 km/s for 6 seconds, but then must rest for 121 seconds.
Blitzen can fly 18 km/s for 3 seconds, but then must rest for 50 seconds.
Vixen can fly 20 km/s for 4 seconds, but then must rest for 75 seconds.
Dancer can fly 7 km/s for 20 seconds, but then must rest for 119 seconds.`,
    totalTime: 2503,
    output: 1084
  });

  Utils.check(solve, dataset, "14b");
})();
