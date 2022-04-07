var lines = parseInt(readline());

for (var i = 0; i < lines; i++) {
  var line = readline().split(" ");
  var hpC = parseInt(line[0]);
  var damC = parseInt(line[1]);
  line = readline().split(" ");
  var hpE = parseInt(line[0]);
  var damE = parseInt(line[1]);
  line = readline().split(" ");
  var coins = parseInt(line[0]);
  var attack = parseInt(line[1]);
  var defense = parseInt(line[2]);
  var h = 0;
  var win = false;
  while (!win && h <= coins) {
    var turnsC = Math.ceil(hpE / (damC + attack * h));
    var turnsE = Math.ceil((hpC + defense * (coins - h)) / damE);
    if (turnsC <= turnsE) {
      win = true;
      print("YES");
    } else {
      var hForSpeedUp = Math.ceil((hpE / (turnsC - 1) - damC) / attack);
      var hForSlowDown = Math.ceil(((turnsE + 1) * damE - hpC) / defense);
      h += Math.min(hForSpeedUp - h, hForSlowDown - (coins - h));
    }
  }
  if (!win) print("NO");
}
