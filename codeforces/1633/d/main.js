var lines = parseInt(readline());

var steps = new Array(1000);
steps[0] = 0;
for (var i = 1; i < 1000; i++) {
  if (steps[i - 1] != undefined) {
    var step = steps[i - 1];
    for (var j = 1; j <= i; j++) {
      var inc = Math.floor(i / j);
      if (
        i + inc - 1 < 1000 &&
        (steps[i + inc - 1] == undefined || steps[i + inc - 1] > step + 1)
      )
        steps[i + inc - 1] = step + 1;
    }
  }
}

for (var i = 0; i < lines; i++) {
  var line = readline().split(" ");
  var n = parseInt(line[0]);
  var k = parseInt(line[1]);
  var b = readline()
    .split(" ")
    .map((i) => parseInt(i));
  var c = readline()
    .split(" ")
    .map((i) => parseInt(i));

  var weights = [];
  for (var j = 0; j < b.length; j++) {
    weights.push([c[j], steps[b[j] - 1]]);
  }

  weights.sort((a, b) => b[0] / (b[1] + 0.00001) - a[0] / (a[1] + 0.00001));
  var dict = {};
  print(best(dict, weights, k, 0));
}

function best(dict, w, k, i, opt) {
  if (i >= w.length) return 0;
  if (dict[k + "," + i] != undefined) return dict[k + "," + i];
  var take = 0;
  opt = opt || 0;
  if (w[i][1] <= k)
    take = best(dict, w, k - w[i][1], i + 1, opt - w[i][0]) + w[i][0];
  if (opt > take) console.log(take, opt);
  take = Math.max(take, opt);
  if (w[i][1] == 0) {
    dict[k + "," + i] = take;
    return take;
  }

  var bestSub = 0;
  var kTemp = k;
  for (var j = i + 1; j < w.length && kTemp > 0; j++) {
    if (kTemp >= w[j][1]) bestSub += w[j][0];
    else bestSub += Math.floor((kTemp * w[j][0]) / w[j][1], take);
    kTemp -= w[j][1];
  }
  if (bestSub <= take) {
    dict[k + "," + i] = take;
    return take;
  }

  take = Math.max(best(dict, w, k, i + 1), take);
  dict[k + "," + i] = take;
  return take;
}
