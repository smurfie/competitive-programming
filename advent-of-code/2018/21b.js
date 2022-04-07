(() => {
  function solve() {
    // Analizing the code it is something like this, where it stops when a3 == a0
    /*
var a0 = 0;
var a3 = 0;

for (;;) {
  var a2 = a3 | 65536;
  a3 = 7637914;

  for (;;) {
    a3 += a2 & 255;
    a3 &= 16777215;
    a3 *= 65899;
    a3 &= 16777215;

    if (a2 < 256) {
      break;
    } else {
      var a1 = 0;
      while (a2 >= (a1 + 1) * 256) a1++;
      a2 = a1;
    }
  }

  if (a3 == a0) break;
}
*/
    // Lets do some modifications to run it quickly and see where the a3 var repeats (and we can take the last
    // before that)

    var dict = {};
    var a3 = 0;
    var previous;

    for (;;) {
      previous = a3;
      var a2 = a3 | 65536;
      a3 = 7637914;

      for (;;) {
        a3 += a2 & 255;
        a3 &= 16777215;
        a3 *= 65899;
        a3 &= 16777215;

        if (a2 < 256) {
          break;
        } else {
          a2 = Math.floor(a2 / 256);
        }
      }

      if (!dict[a3]) dict[a3] = previous;
      else break;
    }

    return previous;
  }

  var dataset = [];

  dataset.push({
    input: `#ip 4
seti 123 0 3
bani 3 456 3
eqri 3 72 3
addr 3 4 4
seti 0 0 4
seti 0 5 3
bori 3 65536 2
seti 7637914 8 3
bani 2 255 1
addr 3 1 3
bani 3 16777215 3
muli 3 65899 3
bani 3 16777215 3
gtir 256 2 1
addr 1 4 4
addi 4 1 4
seti 27 1 4
seti 0 7 1
addi 1 1 5
muli 5 256 5
gtrr 5 2 5
addr 5 4 4
addi 4 1 4
seti 25 3 4
addi 1 1 1
seti 17 0 4
setr 1 8 2
seti 7 7 4
eqrr 3 0 1
addr 1 4 4
seti 5 5 4`,
    output: 10721810
  });

  Utils.check(solve, dataset, "21b");
})();
