(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var curState = lines[0][15];
    var states = {};
    var steps = parseInt(lines[1].split(" ")[5]);
    var pos = 0;
    var dict = {};

    for (var i = 3; i < lines.length; i += 10) {
      var nState = lines[i][9];
      var val0 = parseInt(lines[i + 2][22]);
      var dir0 = lines[i + 3].indexOf("left.") > -1 ? -1 : 1;
      var next0 = lines[i + 4][26];
      var val1 = parseInt(lines[i + 6][22]);
      var dir1 = lines[i + 7].indexOf("left.") > -1 ? -1 : 1;
      var next1 = lines[i + 8][26];
      states[nState] = {
        val: [val0, val1],
        dir: [dir0, dir1],
        next: [next0, next1]
      };
    }

    for (var i = 0; i < steps; i++) {
      var state = states[curState];
      var index = dict[pos] ? 1 : 0;
      var val = state.val[index];
      if (val == 0 && dict[pos]) delete dict[pos];
      else dict[pos] = 1;
      pos += state.dir[index];
      curState = state.next[index];
    }

    return Object.keys(dict).length;
  }

  var dataset = [];

  dataset.push({
    input: `Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`,
    output: 3
  });

  dataset.push({
    input: `Begin in state A.
Perform a diagnostic checksum after 12919244 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state C.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state D.

In state C:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state E.

In state D:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the right.
    - Continue with state B.

In state E:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state F.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state C.

In state F:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state D.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`,
    output: 4287
  });

  Utils.check(solve, dataset, "25a");
})();
