var lines = parseInt(readline());

for (var i = 0; i < lines; i++) {
  print(minority(readline()));
}

function minority(s) {
  var zeros = 0;
  for (var i = 0; i < s.length; i++) {
    if (s[i] == "0") zeros++;
  }
  var ones = s.length - zeros;
  if (ones == zeros) return Math.max(0, zeros - 1);
  return Math.min(ones, zeros);
}
