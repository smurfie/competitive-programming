(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var minx = Infinity;
    var maxx = 0;
    var miny = Infinity;
    var maxy = 0;
    var dict = {};
    var states = [];
    var i = 1;
    var impossible = new Set();

    for (var line of lines) {
      var x = parseInt(line.split(", ")[0]);
      var y = parseInt(line.split(", ")[1]);
      minx = Math.min(minx, x);
      miny = Math.min(miny, y);
      maxx = Math.max(maxx, x);
      maxy = Math.max(maxy, y);
      states.push([i, x, y, 0]);
      dict[x + "," + y] = [i, 0];
      i++;
    }

    while (states.length > 0) {
      var state = states.shift();
      var i = state[0];
      var x = state[1];
      var y = state[2];
      var n = state[3] + 1;
      if (dict[x + "," + y][0] != 100000) {
        if (x == minx || x == maxx || y == miny || y == maxy) impossible.add(i);
        if (x > minx) add(dict, states, i, x - 1, y, n);
        if (x < maxx) add(dict, states, i, x + 1, y, n);
        if (y > miny) add(dict, states, i, x, y - 1, n);
        if (y < maxy) add(dict, states, i, x, y + 1, n);
      }
    }

    var counts = {};
    for (key in dict) {
      var val = dict[key][0];
      if (val != 100000 && !impossible.has(val)) {
        counts[val] = (counts[val] || 0) + 1;
      }
    }

    var max = 0;
    for (key in counts) {
      max = Math.max(max, counts[key]);
    }

    return max;
  }

  function add(dict, states, i, x, y, n) {
    if (!dict[x + "," + y]) {
      dict[x + "," + y] = [i, n];
      states.push([i, x, y, n]);
    } else if (dict[x + "," + y][1] == n && dict[x + "," + y][0] != i) {
      dict[x + "," + y] = [100000, n];
    }
  }

  var dataset = [];

  dataset.push({
    input: `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`,
    output: 17
  });

  dataset.push({
    input: `292, 73
204, 176
106, 197
155, 265
195, 59
185, 136
54, 82
209, 149
298, 209
274, 157
349, 196
168, 353
193, 129
94, 137
177, 143
196, 357
272, 312
351, 340
253, 115
109, 183
252, 232
193, 258
242, 151
220, 345
336, 348
196, 203
122, 245
265, 189
124, 57
276, 204
309, 125
46, 324
345, 228
251, 134
231, 117
88, 112
256, 229
49, 201
142, 108
150, 337
134, 109
288, 67
297, 231
310, 131
208, 255
246, 132
232, 45
356, 93
356, 207
83, 97`,
    output: 4976
  });

  Utils.check(solve, dataset, "6a");
})();
