var tests = parseInt(readline());

for (var i = 0; i < tests; i++) {
  var n = parseInt(readline());
  var arr = readline()
    .split(" ")
    .map((i) => parseInt(i));

  var el = arr[0];
  var min = el;
  var cuts = [];
  for (var j = 1; j < arr.length; j++) {
    min = Math.min(min, arr[j]);
    if (arr[j] > el) {
      cuts.push([min, el]);
      el = arr[j];
      min = el;
    }
  }
  cuts.push([min, el]);
  cuts.sort((a, b) => a[0] - b[0]);
  var sum = 1;
  var max = cuts[0][1];
  for (var j = 1; j < cuts.length; j++) {
    if (cuts[j][0] < max) max = Math.max(max, cuts[j][1]);
    else {
      sum++;
      max = cuts[j][1];
    }
  }
  print(sum);
}
