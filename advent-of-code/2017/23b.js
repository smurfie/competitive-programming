(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var registers = { a: 1 };

    /* Once analized the assemnly code, the real code seems somtehing like this:
  for (b=106700;b<=123700; b+=17) {
    f=false
    
    for(d=2;d<b;d++){
      for (e=2; e<b; e++) {
        if(d*e==b) f=true
      }
    }
    if (f) h++
  }
  Something like: count non-prime numbers from [106700-123700) adding 17 each iteration
  Let's write it in a little more optimal way:
*/
    var h = 0;
    for (var b = 106700; b <= 123700; b += 17) {
      f = false;

      for (var d = 2; d < b && !f; d++) {
        if (b % d == 0) f = true;
      }
      if (f) h++;
    }

    return h;
  }

  var dataset = [];

  dataset.push({
    input: `set b 67
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`,
    output: 905
  });

  Utils.check(solve, dataset, "23b");
})();
