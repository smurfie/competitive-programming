(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var p1Pos = parseInt(lines[0].split(" ")[4]) - 1;
    var p2Pos = parseInt(lines[1].split(" ")[4]) - 1;
    var dice = 1;
    var p1Points = 0;
    var p2Points = 0;
    var p1Turn = true;
    var diceRolled = 0;

    while (p1Points < 1000 && p2Points < 1000) {
      var next = 3 * (dice + 1);
      dice += 3;
      dice %= 10;
      diceRolled += 3;
      if (p1Turn) {
        p1Pos += next;
        p1Pos %= 10;
        p1Points += 1 + p1Pos;
      } else {
        p2Pos += next;
        p2Pos %= 10;
        p2Points += 1 + p2Pos;
      }
      p1Turn = !p1Turn;
    }

    return Math.min(p1Points, p2Points) * diceRolled;
  }

  var dataset = [];

  dataset.push({
    input: `Player 1 starting position: 4
Player 2 starting position: 8`,
    output: 739785
  });

  dataset.push({
    input: `Player 1 starting position: 1
Player 2 starting position: 6`,
    output: 604998
  });

  Utils.check(solve, dataset, "21a");
})();
