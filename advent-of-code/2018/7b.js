(() => {
  function solve(input, workers, plusTime) {
    var lines = Utils.read(input);
    var dict = {};

    for (var line of lines) {
      var ini = line.split(" ")[1];
      var end = line.split(" ")[7];
      if (!dict[ini]) dict[ini] = { next: [], count: 0 };
      if (!dict[end]) dict[end] = { next: [], count: 0 };
      dict[ini]["next"].push(end);
      dict[end]["count"]++;
    }

    var states = [];
    var running = [];
    for (var key in dict) {
      if (dict[key].count == 0) states.push(key);
    }

    var pass = "";
    var time = 0;
    while (states.length > 0 || running.length > 0) {
      if (states.length == 0 || workers == 0) {
        running.sort((a, b) => {
          var res = a[1] - b[1];
          if (res == 0) res = a[0].charCodeAt(0) - b[0].charCodeAt(0);
          return res;
        });
        time = running[0][1];
        while (running.length > 0 && time == running[0][1]) {
          workers++;
          var char = running.shift()[0];
          pass += char;
          for (n of dict[char].next) {
            if (--dict[n].count == 0) states.push(n);
          }
        }
      }
      if (states.length > 0) {
        states.sort();
        var char = states.shift();
        workers--;
        running.push([
          char,
          time + plusTime - "A".charCodeAt(0) + char.charCodeAt(0) + 1
        ]);
      }
    }

    return time;
  }

  var dataset = [];

  dataset.push({
    input: `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`,
    workers: 2,
    plusTime: 0,
    output: 15
  });

  dataset.push({
    input: `Step F must be finished before step P can begin.
Step R must be finished before step J can begin.
Step X must be finished before step H can begin.
Step L must be finished before step N can begin.
Step U must be finished before step Z can begin.
Step B must be finished before step C can begin.
Step S must be finished before step C can begin.
Step N must be finished before step Y can begin.
Step I must be finished before step J can begin.
Step H must be finished before step K can begin.
Step G must be finished before step Z can begin.
Step Q must be finished before step V can begin.
Step E must be finished before step P can begin.
Step P must be finished before step W can begin.
Step J must be finished before step D can begin.
Step V must be finished before step W can begin.
Step T must be finished before step D can begin.
Step Z must be finished before step A can begin.
Step K must be finished before step A can begin.
Step Y must be finished before step O can begin.
Step O must be finished before step W can begin.
Step C must be finished before step M can begin.
Step D must be finished before step A can begin.
Step W must be finished before step M can begin.
Step M must be finished before step A can begin.
Step C must be finished before step A can begin.
Step F must be finished before step Z can begin.
Step I must be finished before step A can begin.
Step W must be finished before step A can begin.
Step T must be finished before step C can begin.
Step S must be finished before step K can begin.
Step B must be finished before step J can begin.
Step O must be finished before step A can begin.
Step Q must be finished before step P can begin.
Step G must be finished before step M can begin.
Step R must be finished before step T can begin.
Step B must be finished before step G can begin.
Step J must be finished before step O can begin.
Step X must be finished before step E can begin.
Step X must be finished before step C can begin.
Step H must be finished before step Y can begin.
Step Y must be finished before step A can begin.
Step X must be finished before step W can begin.
Step H must be finished before step A can begin.
Step X must be finished before step A can begin.
Step I must be finished before step M can begin.
Step G must be finished before step J can begin.
Step N must be finished before step G can begin.
Step D must be finished before step M can begin.
Step L must be finished before step D can begin.
Step V must be finished before step T can begin.
Step I must be finished before step Y can begin.
Step S must be finished before step J can begin.
Step K must be finished before step Y can begin.
Step F must be finished before step R can begin.
Step U must be finished before step T can begin.
Step Z must be finished before step M can begin.
Step T must be finished before step Z can begin.
Step B must be finished before step I can begin.
Step E must be finished before step K can begin.
Step N must be finished before step J can begin.
Step X must be finished before step Q can begin.
Step F must be finished before step Y can begin.
Step H must be finished before step P can begin.
Step Z must be finished before step D can begin.
Step V must be finished before step O can begin.
Step E must be finished before step C can begin.
Step V must be finished before step C can begin.
Step P must be finished before step A can begin.
Step B must be finished before step N can begin.
Step S must be finished before step W can begin.
Step P must be finished before step D can begin.
Step L must be finished before step W can begin.
Step D must be finished before step W can begin.
Step K must be finished before step C can begin.
Step L must be finished before step M can begin.
Step R must be finished before step O can begin.
Step F must be finished before step L can begin.
Step R must be finished before step H can begin.
Step K must be finished before step O can begin.
Step T must be finished before step W can begin.
Step R must be finished before step K can begin.
Step C must be finished before step W can begin.
Step N must be finished before step T can begin.
Step R must be finished before step P can begin.
Step E must be finished before step M can begin.
Step G must be finished before step T can begin.
Step U must be finished before step K can begin.
Step Q must be finished before step D can begin.
Step U must be finished before step S can begin.
Step J must be finished before step V can begin.
Step P must be finished before step Y can begin.
Step X must be finished before step Z can begin.
Step U must be finished before step H can begin.
Step H must be finished before step M can begin.
Step I must be finished before step C can begin.
Step V must be finished before step M can begin.
Step N must be finished before step I can begin.
Step B must be finished before step K can begin.
Step R must be finished before step Q can begin.
Step O must be finished before step C can begin.`,
    workers: 5,
    plusTime: 60,
    output: 880
  });

  Utils.check(solve, dataset, "7b");
})();
