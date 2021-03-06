(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var map = [];
    var wagons = [];
    var wagonsn = 0;

    for (var i = 0; i < lines.length; i++) {
      map[i] = lines[i].split("");
      for (var j = 0; j < lines[i].length; j++) {
        var c = map[i][j];
        if (c == ">" || c == "<" || c == "^" || c == "v") {
          wagons.push({
            x: i,
            y: j,
            d: c,
            old: c == ">" || c == "<" ? "-" : "|",
            turn: 0
          });
          wagonsn++;
        }
      }
    }

    var turns = [">", "^", "<", "v"];
    var slash = { ">": "^", v: "<", "<": "v", "^": ">" };
    var backslash = { ">": "v", v: ">", "<": "^", "^": "<" };

    while (wagonsn != 1) {
      wagons.sort((a, b) => {
        var res = a.x - b.x;
        return res == 0 ? a.y - b.y : res;
      });
      for (var wagon of wagons) {
        if (!wagon.crash) {
          map[wagon.x][wagon.y] = wagon.old;
          switch (wagon.d) {
            case ">":
              wagon.y++;
              break;
            case "<":
              wagon.y--;
              break;
            case "v":
              wagon.x++;
              break;
            case "^":
              wagon.x--;
              break;
          }
          var c = map[wagon.x][wagon.y];
          wagon.old = c;
          switch (c) {
            case ">":
            case "<":
            case "v":
            case "^":
              wagon.crash = true;
              for (var wagon2 of wagons) {
                if (
                  wagon.d != wagon2.d &&
                  wagon2.x == wagon.x &&
                  wagon2.y == wagon.y
                ) {
                  wagon2.crash = true;
                  map[wagon.x][wagon.y] = wagon2.old;
                }
              }
              wagonsn -= 2;
              break;
            case "/":
              wagon.d = slash[wagon.d];
              break;
            case "\\":
              wagon.d = backslash[wagon.d];
              break;
            case "+":
              wagon.d =
                turns[
                  (turns.indexOf(wagon.d) + 1 - wagon.turn + turns.length) %
                    turns.length
                ];
              wagon.turn = (wagon.turn + 1) % 3;
              break;
          }
          if (!wagon.crash) map[wagon.x][wagon.y] = wagon.d;
        }
      }
    }

    for (var wagon of wagons) {
      if (!wagon.crash) return wagon.y + "," + wagon.x;
    }
  }

  var dataset = [];

  dataset.push({
    input: `/>-<\\  
|   |  
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`,
    output: "6,4"
  });

  dataset.push({
    input: `                                    /----------------------------------------------------------------------\\                  /------------\\          
        /----------\\  /-------------+------------------------------------------------\\                     |                  |            |          
      /-+----------+--+-------------+--\\                                             |  /-----------\\      |                  |            |          
      | |          |  |             |  |                     /-----------------------+--+-----------+------+------------------+------------+-------\\  
      | |          |  |             |  |                     |          /------------+--+-----------+------+---------------\\  |            |       |  
    /-+-+----------+--+-------------+--+---------------------+-\\        |     /------+--+-----------+------+---------------+\\ |            |       |  
 /--+-+-+----------+--+-------------+--+---\\                 | |        |     |      |  |           |      |               || |            |       |  
 |  | | | /--------+--+-------------+--+\\  |                 | |        |     |      |  |           |      |               || |  /---------+-----\\ |  
 |  | | | |     /--+--+----->-------+--++--+----------------\\| |        |     |      |  |           |      |      /--------++-+--+---------+-\\   | |  
 |  | | | |     |  |  |             |  ||  | /<-------------++-+-\\ /----+-----+------+--+-----------+------+------+--------++-+--+\\        | |   | |  
 |  | | | |     |  |  |            /+--++--+-+--------------++-+-+-+----+---->+------+--+-----------+------+------+--------++-+--++-----\\  | |   | |  
 |  | | | |     |  |  |            ||  ||  | |              || |/+-+----+-----+------+--+-----------+------+\\     |        || |  ||     |  | |   | |  
 |  | | | |     |  | /+------------++--++--+-+--------------++-+++-+-\\  |     |      |  |           |      ||     |        || |  ||     |  | |   | |  
 | /+-+-+-+-----+--+-++------------++--++--+-+--------------++-+++-+-+--+-----+--\\   |  |           |      ||     |        || |  ||     |  | |   | |  
 | || | | |     |  | ||            ||  ||  | |              ||/+++-+-+--+-----+--+---+--+-----------+------++-----+--------++-+-\\||     |  | |   | |  
 \\-++-+-+-+-----+--+-++------------++--++--/ |              |||||| | |/-+-----+--+---+--+-----------+------++-----+-----\\  || | |||     |  | |   | |  
   || | | |     |  | ||   /--------++--++----+--------------++++++-+-++-+-----+--+---+--+-----------+------++--\\  |     |  || | |||     |  | |   | |  
   || | | |     |  | ||   |        ||  ||    |    /---------++++++-+-++-+-----+--+---+--+-----------+------++--+--+-\\   |  || | |||     |  | |   | |  
   || | | |     |/-+-++---+--------++--++----+----+\\ /------++++++-+-++-+-----+--+---+--+-----\\     |      ||  |  | |   |  || | |||     |  | |   | |  
   || |/+-+-----++-+<++---+--------++--++----+\\   || |      |||||| | || |     |  |   |  |     |     |      ||  |  | |   |  || | |||     |  | |   | |  
   || ||| |     || | ||   |        ||  ||    ||   || |      |||||| \\-++-+-----+--+---+--+-----+-----+------++--+--+-+---+--++-+-++/     |  | |   | |  
   || ||| |     || | ||   |        ||  ||    ||   || |      ||||||   || |     |  |   |  |     |     |     /++--+--+\\|   |  || | ||      |  | |   | |  
   || |||/+-----++-+-++---+--------++--++----++---++-+------++++++-\\ || |     |  |   |  |     |     |    /+++--+--+++---+->++-+\\||      |  | |   | |  
   || |||||     || | ||   | /------++--++----++---++-+------++++++-+-++-+-----+--+---+--+-----+-----+---\\||||  |  |||   |  || ||||      |  | |   | |  
   || ||||\\-----++-+-++---+-+------++--+/    ||   || |  /---++++++-+-++-+-----+--+---+--+-----+----\\|   |||||  |  |||   |  || ||||      |  | |   | |  
   || ||||    /-++-+-++---+-+------++--+-----++---++-+--+---++++++-+-++-+--\\  |  |/--+--+-----+----++---+++++--+--+++---+--++-++++------+--+-+---+-+-\\
   || ||||    | || | ||   | |      ||  |     ||   || |  |   |\\++++-+-++-+--+--+--++--+--+-----+----++---+++++--+--+++---+--++-++++------+--+-+---+-/ |
   || ||||    | || | ||/--+-+------++-\\| /---++---++-+--+--\\| |||| | || |  |  \\--++--+--+-----+----++---+++++--+--+++---+--+/ ||||      |  | |   |   |
   || ||||    | || | |\\+--+-+------++-++-+---++---++-+--+--++-++++-+-++-+--+-----++--/  | /---+----++---+++++--+--+++---+--+--++++------+--+-+\\  |   |
   || ||||    | || | | |  | |      || || |   ||   || |  |  || |||| | || |  |     ||   /-+-+---+----++---+++++--+--+++---+--+\\ ||||      |  | |^  |   |
   || ||||    | || | | |  | |      || || |   ||   || |  |  || ||||/+-++-+--+-----++---+-+-+---+----++---+++++--+\\ |||   |  || ||||      |  | ||  |   |
   || ||||    | || | | |  | |      |\\-++-+---++---++-+--+--++-++++++-++-+--+-----++---+-+-+---+----++---+++/|  || |||   |  || ||||      |  | ||  |   |
   || ||||    | \\+-+-+-+--+-+------+--++-+---++---++-+--+--+/ |||||| || |  | /---++---+-+-+---+----++---+++-+--++-+++---+--++-++++------+\\ | ||  |   |
   || ||||    |  | | | |  | |      |  || |   ||   ||/+--+--+--++++++-++-+--+-+---++---+-+-+---+----++---+++-+--++-+++---+--++-++++------++-+-++-\\|   |
   |\\-++++----+--+-+-+-+--+-+------+--++-+---++---++++--+--+--+/|||| || |  | |   ||   | | |   |    ||   ||| |  || |||   |  || ||||      || | || ||   |
   |  |||\\----+--+-+-+-+--+-+------+--++-+---++---++++--+--+--+-+++/ || |  | |   ||   | | |   |    ||   ||\\-+--++-+/|   |  || ||||      || | || ||   |
   |  |||    /+--+-+-+-+--+-+------+--++-+---++---++++--+--+--+-+++--++-+--+-+---++---+-+-+---+----++---++\\ |  || | |   |  || ||||      || | || ||   |
   |  |||    ||  | | | |  | |  /---+--++-+---++---++++--+--+--+-+++--++-+--+-+---++---+-+-+---+----++---+++-+--++-+-+---+--++-++++---\\  || | || ||   |
   |  ||| /--++--+-+-+-+--+-+--+---+--++-+---++---++++--+--+--+-+++--++-+--+-+---++\\  | | |   |    ||   ||| |  || | |   |  || ||||   |  || | || ||   |
   |  ||| |  ||  | | | |  | | /+---+--++-+---++---++++--+--+--+-+++--++-+--+-+-\\ |||  | | |  /+----++---+++-+--++-+-+---+--++-++++---+\\ || | || ||   |
   |  ||| |  ||  | | | |  | | ||   |  ||/+---++---++++--+--+--+-+++--++-+--+-+-+-+++--+-+-+--++----++---+++-+-\\|| |/+---+--++-++++---++\\|| | || ||   |
   |  ||| |  ||  | | | |  | | ||   |  ||||   ||   ||||  |  |  | |||  |\\-+--+-+-+-+++--+-+-+--++----++---+++-+-+++-+++---/  || ||||   ||||| | || ||   |
   |  ||| |  ||  | | | |  | | ||   |  |||\\---++---++++--+--/  | |||  |  |  | | | |||  | |/+--++----++---+++-+-+++-+++------++-++++-\\ ||||| | || ||   |
  /+--+++-+--++--+-+-+-+--+-+-++---+--+++----++---++++--+-----+-+++--+--+--+-+-+\\|||  | |||  ||  /-++---+++-+-+++-+++------++-++++-+-+++++-+-++\\||   |
  ||  ||| |  ||  | | | |  | | ||   |  |||    ||   |||| /+-----+-+++--+--+--+-+-+++++--+-+++-\\|| /+-++---+++-+-+++-+++------++-++++-+-+++++-+-+++++--\\|
  ||  ||\\-+--++--+-/ | |  | | ||   |  |||   /++---++++-++-----+-+++--+--+--+-+-+++++--+\\||| ||| || ||   ||| | ||| |||      || |||| | ||||| | |||||  ||
  ||  ||  |  || /+---+-+--+-+-++---+--+++---+++---++++-++-----+-+++--+--+--+-+-+++++--+++++-+++-++-++---+++-+-+++-+++-----\\|| |||| | ||||| | |||||  ||
  ||  ||  |  || ||   | |  | | ||   |  |||   |||   |||| ||     | |||  |  |  | | |||||  ||||| ||| || ||   ||| | ||| |||     ||| |||| | ||||| | |||||  ||
  |\\--++--+--++-++---+-+--+-+-++---+--+++---+++---++++-++-----+-+++--+--+--+-+-++/||  ||||| ||| || ||   ||| | ||| |||     ||| |||| | ||||| | |||||  ||
  |   ||/-+--++-++---+-+--+-+-++---+--+++---+++---++++-++-----+-+++--+--+-\\| | || ||  ||||| ||| || ||   |||/+-+++-+++-----+++-++++-+-+++++\\| |||||  ||
  |   ||| | /++-++---+-+--+-+-++---+--+++---+++---++++-++-----+-+++--+--+-++-+-++-++--+++++-+++-++-++--\\||||| ||| |||     ||| |||| | ||||||| |||||  ||
  |   ||| | ||| |\\---+-+--+-+-++---+--+++---+++---+/|| ||     | |||  |  | ||/+-++-++--+++++-+++-++-++--++++++-+++-+++-----+++-++++-+\\||||||| |||||  ||
  |   ||| | ||| |  /-+-+--+-+-++---+--+++---+++---+-++-++-----+-+++--+--+-++++-++-++--+++++-+++\\|| ||  |||||| ||| |\\+-----+++-++++-++++/|||| |||||  ||
  |   ||| | ||| |  | | |  | |/++---+--+++---+++---+-++-++-----+-+++\\ |  | |||| || ||  ||||| |||||| ||  |||||| ||| | |     ||| ||||/++++-++++-+++++-\\||
  |   ||| | ||v |  | | |  | ||||   |  |||   |||   | || ||     | |||| |  | |||| || ||  ||||| |||||| ||  |||||| ||| | |     ||| ||||||||| |||| ||||| |||
  |   ||| | ||| |  | | | /+-++++---+--+++---+++>--+-++-++-----+-++++\\|  | |||| || ||  ||||| |||||| ||  |||||| ||| | |     ||| ||||||||| |||| ||||| |||
  |   ||| | ||| |  | | | || ||||   |  |||   |||   | || ||  /--+-++++++--+-++++-++-++--+++++-++++++-++--++++++-+++-+\\|     ||| ||||||||| |||| ||||| |||
  |   ||| | ||| |  | | | || ||||   |  |||   |||   | || ||  |  | ||||||  | |||| || ||  ||||| |||||| ||  |||||| ||| |||     ||| ||||||||| |||| ||||| |||
  |   ||| | ||| |  | | | || ||||   |  |||   |||   | || ||  |  | ||||||  | |||| || ||  ||||| |||||| ||  |||||| ||| |||     ||| ||||||||| |||| ||||| |||
  |   ||| | ||| |  | | | || ||||   |  |||   |||   | || ||  |  | ||||||  | |||| || ||  ||||| |||||| ||  |||||| ||| |||     ||| ||||||||| |||| ||||| |||
  |   ||| | ||| |  |/+-+-++-++++---+--+++---+++---+-++-++--+--+-++++++--+-++++-++-++--+++++-++++++-++--++++++\\||| |||     ||| ||||||||| |||| ||||| |||
  |   ||| | |v| |  ||| | || ||||   |  |||   |||   | || ||  |  | ||||||  | |||| || ||  ||||| |||||| ||  |||||||||| |||     ||| ||||||||| |||| ||||| |||
 /+---+++-+-+++-+--+++-+-++\\||||   |  |||   |||   | || ||  |  | ||||||  | |||| || ||  ||||| |||||| ||  |||||||||| |||     ||| ||||||||| |||| ||||| |||
 ||   ||| | |||/+--+++-+-+++++++---+--+++---+++---+-++-++--+--+-++++++--+-++++-++-++--+++++-++++++-++\\ |||||||||| |||     ||| ||||||||| |||| ||||| |||
 ||   ||| | |||||  ||| | |||||||   |  |||   |||   | || ||  |  | ||||||  | |||| || ||  ||||| |||||| ||| |||||||||| |||     ||| ||||||||| |||| ||||| |||
 ||   ||| |/+++++--+++-+-+++++++---+--+++---+++---+-++-++--+--+-++++++--+-++++-++-++--+++++-++++++-+++-++++++++++-+++-\\   ||| ||||||||| |||| ||||| |||
 ||   ||| |||||||  ||| |/+++++++---+--+++--\\|||   | || ||  |  | ||||||  | |||| || ||  ||||| |||||| ||| |||||||||| ||| |   ||| ||||||||| |||| |||v| |||
 ||   ||| ||||||\\--+++-+++++++++---+--+++--++++---+-++-++--+--+-++++++--+-++++-++-++--+++++-++++++-+++-++++++++++-+++-+---/|| ||||||||| |||| ||||| |||
 ||   ||| ||||||   ||| |||||||||  /+--+++--++++---+-++-++--+--+-++++++--+\\|||| || ||  ||||| |||||| ||| |||||||||| \\++-+----++-+++++++++-++++-/|||| |||
 ||   ||| ||||||   ||| |||||||||  ||  |||  ||||   | || ||  \\--+-++++++--++++++-++-++--+++++-++++++-+++-++++++++++--/| |    || ||||||||| ||||  |||| |||
 ||   ||| ||||||   ||\\-+++++++++--++--+++--++++---+-++-++-----+-+++++/  |||||| || ^|  ||||| |||||| ||| ||||||||||   | |    || ||||||||| ||||  |||| |||
 ||/--+++-++++++---++--+++++++++--++--+++--++++---+-++-++-----+-+++++---++++++-++-++-\\||||| |||||| ||| ||||||||||   | |    || ||||||||| ||||  |||| |||
 |||  ||| ||||||   ||  |||||||||  ||  |||  ||||   |/++-++-----+-+++++---++++++-++-++-++++++-++++++-+++-++++++++++\\  | |    || ||||||||| ||||  |||| |||
 |||  \\++-++++++---++--+++++++++--++--+/|  ||||/--++++-++-----+-+++++---++++++-++-++-++++++-++++++\\||| |||||||||||  | |    || ||||||||| ||||  |||| |||
 |||   || ||||||  /++--+++++++++--++--+-+--+++++--++++-++-----+-+++++--<++++++-++-++-++++++\\|||||||||| |||||||||||  | |    || ||||||||| ||||  |||| |||
 |||   || ||||||  ||| /+++++++++--++--+-+--+++++--++++-++-----+-+++++-\\ |||||| || || |||\\+++++++++++/| |||||||||||  | |    || ||||||||| ||||  |||| |||
 |||   || ||||||  ||| ||||||||||  ||  | |  ||\\++--++++-++-----+-+/||| | |||||| || || ||| ||||||||||| | |||||||||||  | |    || ||||||||| ||||  |||| |||
 |||   \\+-++++++--+++-++++++++++--++--+-+--++-/|  \\+++-++-----+-+-+++-+-++++++-++-++-+++-+++++++++++-+-+++++++++++--/ |    || ||||||||| ||||  |||| |||
 |||    | ||||||  ||| ||||||||||  ||  | |  ||  |   ||| ||     | | ||| | |||||| || || ||| \\++++++++++-+-+++++++++++----+----++-+++++/||| ||||  |||| |||
 |||    | ||||||  ||| ||||||||||  ||  | |  ||  |   ||| ||     | | ||| | |||||\\-++-++-+++--++++++++++-+-+++++++++++----+----++-+++++-+++-+/||  |||| |||
 |||    | ||||||  ||| ||||||||||  ||  | |  ||  |   ||| ||     | | ||| |/+++++--++-++-+++--++++++++++-+-+++++++++++----+--\\ || ||||| ||| | ||  |||| |||
 |||    | ||||||  ||\\-++++++++++--++--+-+--++--+---+++-++-----+-+-+++-+++++++--++-++-+++--++++++++++-+-++++++/||||    |  | || ||||| ||| | ||  |||| |||
 |||    | ||||||  ||  ||||||||||  || /+-+--++--+--\\||| ||     | | \\++-+++++++--++-++-+++--++++++++++-+-++++++-++/|  /-+--+-++\\||||| ||| | ||  |||| |||
 |||    | ||||||  ||  ||||||||||  || || |  |\\--+--++++-++-----+-+--++-+++++++--++-++-++/  |||||||||| | |||||| || |  | |  | |||||||| ||| | ||  |||| |||
 |||    | ||||\\+--++--++++++++++--++-++-+--+---+--++++-++-----+-+--++-+++++/|  || || ||   |||||||||| | |||||| || |  | |  | |||||||| ||| v ||  |||| |||
 |||    | |||| |  ||  ||||||||||  || || |  |   |  |||| ||   /-+-+--++-+++++-+--++-++-++---++++++++++-+-++++++-++-+--+-+-\\| |||||||| ||| | ||  |||| |||
 |||    | |||| |/-++--++++++++++--++-++-+--+---+\\ |||| ||   | | | /++-+++++-+--++-++-++--\\|||||||||| | |||||| || |  | | || |||||||| ||| | ||  |||| |||
 |||   /+-++++-++-++--++++++++++--++\\|| |  |   || |\\++-++---+-+-+-+++-+++++-+--++-++-++--+++++++++++-+-++++++-++-/  | | || |||\\++++-+++-+-+/  |||v |||
 |||   || |||| || ||  ||||||||||  ||||| |  |   || | || ||   | | \\-+++-+++++-+--++-++-++--+++++++++++-+-+++++/ ||    | | || ||| |||| ||| | |   |||| |||
 |\\+---++-++++-++-++--++++++++++--+++++-+--+---++-+-++-++---+-+---+++-+++++-+--+/ || ||  ||||||||||| | |||||  ||    | | || ||| |||| ||| | |   |||| |||
 | |   || |||| || ||  ||||||||||  ||||| |  |   || | || \\+---+-+---+++-+++++-+--+--++-++--+++/||||||| | |||||  ||    | | || ||| |||| ||| | |   |||| |||
 | |   || |||| || ||  ||||||||||  ||||| |  |   || | ||  |   | |   ||| ||||| |  |  \\+-++--+++-+++++++-+-+++++--++----+-+-++-+++-++++-+++-+-+---++++-++/
 | |   || |||| || ||  ||||||||||  ||||| |  |   || | \\+--+---+-+---+++-+++++-+--+---+-++--+++-+++++++-+-+++++--++----+-+-++-+++-++++-+++-+-+---++/| || 
 | |   || |||| || ||  ||||\\+++++--+++++-+--+---++-+--+--+---+-+---+++-+++++-+--+---+-++--+++-+++++++-+-+++++--+/    | | || ||| |||| ||| | |   || | || 
/+-+---++-++++-++-++--++++-+++++--+++++\\|  |   || |  |  \\---+-+---+++-+++++-+--+---+-++--+++-++++++/ | |||||  |     | | || ||| |||| ||| | |   || | || 
|| |   || |||| || ||  |||| |||||  |||\\+++--+---++-/  |      | |  /+++-+++++-+--+---+\\||  ||| ||||||  |/+++++--+-----+-+-++-+++-++++-+++-+\\|   || | || 
|| |   || |||| \\+-++--++++-+++++--+++-+++--+---++----+------+-+--++++-+++++-+--+---++++--+++-++++++--/|||\\++--+-----+-+-++-+++-/|\\+-+++-+++---++-/ || 
|| |   |\\-++++--+-++--++++-+++++--+++-+++--+---++----+------+-+--++++-++++/ |  |   ||||  ||| ||||||   ||| ||  |     | | || |||  | | ||| |||   ||   || 
|| |   |  ||||  | || /++++-+++++--+++-+++--+---++----+-----\\| |  |||| ||||  |  |   ||||  ||| ||||\\+---+++-++--+-----+-+-++-+++--+-+-+++-+++---+/   || 
|| |   |  ||||  | || ||||| |||||  ||| |||  |   ||    |     || |  |||| ||||  |  |  /++++--+++-++++-+---+++-++--+-----+-+-++-+++--+-+-+++-+++---+----++\\
|| |   |  ||||  | || |||\\+-+++++--+++-+++--/   ||    |     |\\-+--++++-++++--+--+--+++++--+++-++++-+---+++-++--+-----+-+-/| |||  | | ||| |||   |    |||
|| |   |  ||||  | || ||| | |||||  ||| |||      ||    |     |  |  |||| ||||  |  |  |||||  ||| |||| |   ||| ||  |     | |  | |||  | | ||| |||   |    |||
|| |   |  |||| /+-++-+++-+-+++++--+++-+++------++----+-----+--+--++++-++++--+--+--+++++--+++-++++-+---+++-++--+-----+-+\\ | |||  | | ||| |||   |    |||
|| |   |  |||| || \\+-+++-+-+++++--+++-+++------++----+-----+--+--++++-++++--+--+--+++++--++/ |||| |   ||| ||  |     | || | |||  | | ||| |||   |    |||
|| |   |  |||| ||  | ||| | |||||  ||| |||   /--++----+-----+--+--++++-++++--+--+--+++++--++--++++-+---+++-++--+-----+-++-+-+++--+\\| ||| |||   |    |||
|| |   |  |||| ||  | ||| | |||||  ||| |||   |  ||    |     |  |  |||| ||||  |  |  |||||  ||  |||| |   ||| ||  |     | || | |||  ||| ||| |||   |    |||
|| |   |  |||| ||  | ||| | |||||  |\\+-+++---+--++----+-----+--+--++++-++++--+--+--+++++--++--++++-+---+++-++--+-----+-++-+-+++--+++-+++-/||   |    |||
|| |   |  |||| ||  | ||| | |||||  | | |||   |  ||    |     |  \\--++++-++++--+--+--+++++--++--++++-+---+++-++--+-----+-++-+-+++--/|| |||  ||   |    |||
|| | /-+--++++-++--+-+++-+-+++++-\\| | |||   |  ||    |     |   /-++++-++++--+--+--+++++--++--++++-+---+++-++--+----\\| || | |||   || |||  ||   |    |||
|| | | |  ||\\+-++--+-+++-+-+++++-++-+-+++---+--++----+-----+---+-++++-++++--+--+--+++++--++--++++-+---+/| ||  |    || || | |||   || |||  ||   |    |||
|| | | |  || | ||  | ||| | ||||| || | ||\\---+--++----+-----+---+-++++-++++--+--+--+++++--++--++++-+---+-+-++--/    || || | |||   || |||  ||   |    |||
|| | | |  || | ||  | ||| | ||||| || | ||    |  ||    |     |   | |||| ||||  |  |  |||||  ||  |||| |   | | ||       || || | |||   || |||  ||   |    |||
|| | | |  || | ||  | ||| | ||||| || | ||    |  ||    |     |   | |||| ||\\+--+--+--+++++--++--++++-+---+-+-++-------++-++-+-/||   || |||  ||   |    |||
|| | | |  || | ||  | \\++-+-+++++-++-+-++----+--++----+-----/   | |||| || |  |  |  |||||/-++--++++-+---+-+-++-------++-++-+--++---++-+++--++--\\|    |||
|| | | |  || | ||/-+--++-+-+++++-++-+-++----+--++----+\\        | |||| || |  | /+--++++++-++--++++-+---+-+-++-------++-++-+--++---++-+++--++--++--\\ |||
|| | | |  || | ||| |  || | ||||| || | ||    |  ||    ||        | |||| || |  | ||  |||||| ||  |||| |   | | ||       || || |  ||   || |||  ||  ||  | |||
|| | | |  || | ||| |  || | ||||| || | ||    |  ||    ||        | \\+++-++-+--+-++--++/||| ||  |||| |   | | |\\-------++-++-+--++---++-+++--+/  ||  | |||
|| | | |  || | ||| |  || | ||||| || | ||    | /++----++--------+--+++-++-+\\ | ||  || ||| ||  |||| | /-+-+-+--------++-++-+--++\\  || |||  |   ||  | |||
|| | | |  || | ||| |  || | |||||/++-+-++----+-+++----++-----\\  |  ||| || || | ||  || ||| ||  |||\\-+-+-+-+-+--------++-++-+--+++--++<+++--+---++--+-+/|
|| | | |  || | ||| |  || | |||||||| | ||    | |||    ||     |  |  ||| || || | ||  || |\\+-++--+++--+-+-+-+-+--------++-++-+--/||  || |||  |   ||  | | |
|| | | |  || | ||| |  || \\-++++++++-+-++----+-+++----++-----+--+--++/ || || | ||  || | | ||  |||  | | | | |   /----++-++-+---++--++-+++--+---++--+-+\\|
|| | | |  || | ||| |  ||   |\\++++++-+-++----+-+++----++-----+--+--++--++-++-+-++--++-+-+-++--+++--+-+-+-/ |   |    || || |   ||  || |||  |   ||  | |||
|| | | |  || | ||| |  ||   | |||||| | ||    | |||    ||     |  |  \\+--++-++-+-++--++-+-+-/|  |||  | | |   |   |    || || |   ||  || |||  |   ||  | |||
|| | | | /++-+-+++-+--++---+-++++++-+-++----+\\|||    ||     |  |   |  || || | \\+--++-+-+--+--+++--+-+-+---+---+----++-++-+---++--++-+++--+---++--/ |||
|| | | | ||| | ||| |  ||   | ||\\+++-+-++----+++++----++-----+--+---+--++-++-+--+--++-+-+--+--+++--+-+-+---+---+----++-++-+---++--++-+/|  |   ||    |||
|| | | | ||| | ||| |  |\\---+-++-+++-+-/|    |||||    \\+-----+--+---+--++-++-+--+--++-+-+--+--+/|  | | |   |   |    || || |   ||  |\\-+-+--+---++----/||
|| | | | ||| | ||| |  |    | || ||| |  |    |||||     |     |  |   |  || || |/-+--++-+-+--+--+-+--+-+-+---+--\\|    || || |   ||  |  | |  |   ||     ||
|| | \\-+-+++-+-+++-+--+----+-++-+/| |  |    |||||     |     |  |   |  || || || |  \\+-+-+--+--+-+--+-+-+---+--++----++-++-+---++--+--+-+--+---++-----+/
|| |   | ||| | ||| |  |    | || | | |  |    |||||     |     |  |   |  || || || |   | | |  |  | |  | | |   |  |v    || || |   ||  |  | |  |   ||     | 
|| |   | ||| \\-+++-+--+----+-++-+-+-+--+----+++++-----+-----+--+---+--++-++-++-+---+-+-+--+--+-+--+-+-+---/  ||    |\\-++-+---/|  |  | |  |   ||     | 
|\\-+---+-+++---+++-+--+----/ \\+-+-+-+--+----+++++-----+-----+--+---/  || || || |   | | |  |  | |  | | |      ||    |  || |    |  |  | |  |   ||     | 
|  |   | |||   ||| |  |       | | | |  |    |||||     |     |  |      |^ || || |   | | |  |  \\-+--+-+-+------++----+--++-+----+--+--+-/  |   ||     | 
|  |   | \\++---+++-+--+-------+-+-+-+--+----+/|\\+-----+-----+--+------++-++-++-+---+-+-+--+----+--/ | |      ||    |  || |    |  |  |    |   ||     | 
|  |   |  ||   ||| |  |       | \\-+-+--+----+-+-+-----+-----/  |      |\\-++-++-+---+-+-+--+----+----+-+------++----+--++-/    |  |  |    |   ||     | 
|  |   \\--++---+++-+--+-------+---+-/  |    | | |     |        |      |  || || |   | | |  \\----+----+-+------++----+--++------+--+--+----+---+/     | 
|  |      ||   ||| |  \\-------+---+----+----+-+-+-----+--------+------/  || || |   | | |       |    \\-+------++----+--++------/  |  |    |   |      | 
|  |      ||   ||\\-+----------+---+----+----+-+-+-----/        |         || || |   | | |       |      |      |\\----+--++---------+--+----+---+------/ 
|  |      ||   ||  |          |   \\----+----+-+-+--------------+---------/| || |   | | |       |      |      |     |  ||         |  |    |   |        
|  \\------++---++--+----------+--------+----+-+-+--------------+----------+-++-+---+-/ |       |      |      |     |  ||         |  |    |   |        
|         |\\---++--+----------+--------+----+-+-+--------------+----------+-++-+---+---+-------+------+------+-----+--/|         |  |    |   |        
|         |    ||  |          |        |    | | |              |          | || |   |   |       |      |      |     |   |         |  |    |   |        
|         |    ||  |          |        |    | | |              |          | |\\-+---+---+-------+------+------/     |   |         |  |    |   |        
\\---------+----++--+----------+--------/    \\-+-+--------------+----------+-+--+---+---+-------+------+------------+---+---------/  |    |   |        
          |    |\\--+----------+---------------+-/              |          | \\--+---+---+-------+------+------------+---+------------/    |   |        
          |    |   |          |               \\----------------+----------/    |   |   |       |      |            |   |                 |   |        
          \\----+---+----------+--------------------------------+---------------+---/   |       |      |            |   |                 |   |        
               |   |          |                                \\---------------+-------+-------+------+------------/   |                 |   |        
               |   |          \\------------------------------------------------/       \\-------+------+----------------+-----------------+---/        
               \\---+---------------------------------------------------------------------------+------+----------------/                 |            
                   \\---------------------------------------------------------------------------/      \\----------------------------------/            `,
    output: "2,84"
  });

  Utils.check(solve, dataset, "13b");
})();
