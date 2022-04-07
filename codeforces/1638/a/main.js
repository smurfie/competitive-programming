var tests = parseInt(readline());

for (var i = 0; i < tests; i++) {
  var n = parseInt(readline());
  var arr = readline()
    .split(" ")
    .map((i) => parseInt(i));
  var l;
  var r;

  for (var j = 0; j < arr.length && arr[j] == j + 1; j++) {}
  if (j != arr.length) {
    l = j;
    for (var j = l; j < arr.length && arr[j] != l + 1; j++) {}
    r = j;
    for (var j = l; j < r; j++) {
      var tmp = arr[j];
      arr[j] = arr[r];
      arr[r--] = tmp;
    }
  }
  print(arr.join(" "));
}
