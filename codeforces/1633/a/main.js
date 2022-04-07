var lines = parseInt(readline());

for (var i = 0; i < lines; i++) {
  var number = parseInt(readline());
  var remainder = number % 7;
  if (remainder <= number % 10) print(number - remainder);
  else print(number + (7 - remainder));
}
