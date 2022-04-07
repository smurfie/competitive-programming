var coord = readline()
  .split(" ")
  .map((i) => parseInt(i));

var n = coord[0];
var m = coord[1];

var paint = Array(n);
var trace = Array(n * m);
var traceSize = 0;
var queue = Array(n * m);
var queueSize = 0;
var index = 0;

for (var i = 0; i < n; i++) {
  var line = readline()
    .split(" ")
    .map((i) => parseInt(i));
  paint[i] = line;
}

for (var i = 0; i < n - 1; i++) {
  for (var j = 0; j < m - 1; j++) {
    var color = possibleSquare(i, j);
    if (color) {
      queue[queueSize++] = [i, j, color];
    }
  }
  while (index < queueSize) {
    var sq = queue[index++];
    if (possibleSquare(sq[0], sq[1])) paintF(sq[0], sq[1], sq[2]);
  }
}

var solved = true;
for (var i = 0; i < n - 1 && solved; i++) {
  for (var j = 0; j < m - 1 && solved; j++) {
    if (paint[i][j] > 0) solved = false;
  }
}
if (solved) {
  print(traceSize);
  for (var i = traceSize - 1; i >= 0; i--) print(trace[i].join(" "));
} else {
  print(-1);
}

function paintF(x, y, c) {
  paint[x][y] = -2;
  paint[x + 1][y] = -1;
  paint[x][y + 1] = -1;
  paint[x + 1][y + 1] = -1;
  trace[traceSize++] = [x + 1, y + 1, c];
  var lx = Math.max(0, x - 1);
  var mx = Math.min(x + 1, n - 2);
  var ly = Math.max(0, y - 1);
  var my = Math.min(y + 1, m - 2);
  for (var i = lx; i <= mx; i++) {
    for (var j = ly; j <= my; j++) {
      var color = possibleSquare(i, j);
      if (color) {
        queue[queueSize++] = [i, j, color];
      }
    }
  }
}

function possibleSquare(x, y) {
  var c1 = paint[x][y];
  if (c1 == -2) return false;
  var c2 = paint[x][y + 1];
  if (c1 < 0) c1 = c2;
  else if (c2 > 0 && c1 != c2) return false;
  c2 = paint[x + 1][y];
  if (c1 < 0) c1 = c2;
  else if (c2 > 0 && c1 != c2) return false;
  c2 = paint[x + 1][y + 1];
  if (c1 < 0) c1 = c2;
  else if (c2 > 0 && c1 != c2) return false;

  if (c1 > 0) return c1;
  paint[x][y] = -2;
  return false;
}
