var tests = parseInt(readline());

for (var i = 0; i < tests; i++) {
  var n = parseInt(readline());
  var arr = readline()
    .split(" ")
    .map((i) => parseInt(i));

  var odd = null;
  var even = null;
  var posible = true;
  for (var j = 0; j < arr.length; j++) {
    if (arr[j] % 2 == 0) {
      if (even == null) even = arr[j];
      else {
        if (even > arr[j]) {
          posible = false;
          break;
        } else {
          even = arr[j];
        }
      }
    } else {
      if (odd == null) odd = arr[j];
      else {
        if (odd > arr[j]) {
          posible = false;
          break;
        } else {
          odd = arr[j];
        }
      }
    }
  }
  print(posible ? "Yes" : "No");
}
