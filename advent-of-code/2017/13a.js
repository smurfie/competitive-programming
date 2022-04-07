(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var sum = 0;

    for (var row of lines) {
      var i = parseInt(row.split(": ")[0]);
      var n = parseInt(row.split(": ")[1]);
      var pos = i % (2 * (n - 1));
      if (pos > n - 1) pos = 2 * n - pos - 2;
      if (pos == 0) sum += i * n;
    }

    return sum;
  }

  var dataset = [];

  dataset.push({
    input: `0: 3
1: 2
4: 4
6: 4`,
    output: 24
  });

  dataset.push({
    input: `0: 3
1: 2
2: 5
4: 4
6: 4
8: 6
10: 6
12: 6
14: 8
16: 6
18: 8
20: 8
22: 8
24: 12
26: 8
28: 12
30: 8
32: 12
34: 12
36: 14
38: 10
40: 12
42: 14
44: 10
46: 14
48: 12
50: 14
52: 12
54: 9
56: 14
58: 12
60: 12
64: 14
66: 12
70: 14
76: 20
78: 17
80: 14
84: 14
86: 14
88: 18
90: 20
92: 14
98: 18`,
    output: 2508
  });

  Utils.check(solve, dataset, "13a");
})();
