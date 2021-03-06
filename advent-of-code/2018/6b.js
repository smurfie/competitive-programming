(() => {
  function solve(input, maxDist) {
    var lines = Utils.read(input);
    var minx = Infinity;
    var maxx = 0;
    var miny = Infinity;
    var maxy = 0;
    var points = [];

    for (var line of lines) {
      var x = parseInt(line.split(", ")[0]);
      var y = parseInt(line.split(", ")[1]);
      minx = Math.min(minx, x);
      miny = Math.min(miny, y);
      maxx = Math.max(maxx, x);
      maxy = Math.max(maxy, y);
      points.push([x, y]);
    }

    var counts = 0;

    for (var i = minx; i <= maxx; i++) {
      for (var j = miny; j <= maxy; j++) {
        var dist = 0;
        for (var point of points) {
          dist += Math.abs(i - point[0]) + Math.abs(j - point[1]);
        }
        if (dist < maxDist) counts++;
      }
    }

    return counts;
  }

  var dataset = [];

  dataset.push({
    input: `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`,
    maxDist: 32,
    output: 16
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
    maxDist: 10000,
    output: 46462
  });

  Utils.check(solve, dataset, "6b");
})();
