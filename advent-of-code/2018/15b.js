(() => {
  var creatures;
  var opposite = { G: "E", E: "G" };
  var map;

  function solve(input) {
    var lines = Utils.read(input);
    var mapIni = lines.map((i) => i.split(""));

    var attack = {
      G: 3,
      E: 0
    };
    var creaturesIni = [];

    for (var i = 0; i < mapIni.length; i++) {
      for (var j = 0; j < mapIni[i].length; j++) {
        if (mapIni[i][j] == "E" || mapIni[i][j] == "G") {
          creaturesIni.push({ i, j, type: mapIni[i][j], life: 200 });
        }
      }
    }

    var elvesWin = false;

    while (!elvesWin) {
      attack["E"]++;
      map = Utils.duplicate(mapIni);
      creatures = Utils.duplicate(creaturesIni);
      var combatEnds = false;

      var rounds = 0;

      while (!combatEnds) {
        creatures.sort((a, b) => {
          var res = a.i - b.i;
          return res == 0 ? a.j - b.j : res;
        });

        for (var i = 0; i < creatures.length && !combatEnds; i++) {
          var creature = creatures[i];
          if (countOpposites(creature) == 0) {
            combatEnds = true;
            elvesWin = true;
          } else {
            var target = findTargetMove(creature);
            if (target[0] != creature.i || target[1] != creature.j) {
              moveToTarget(creature, target);
            }
            target = findTargetCreature(creature);
            if (target) {
              var indexOpCreature = -1;
              for (
                var j = 0;
                j < creatures.length && indexOpCreature == -1;
                j++
              ) {
                if (
                  target[0] == creatures[j].i &&
                  target[1] == creatures[j].j
                ) {
                  indexOpCreature = j;
                }
              }
              var opCreature = creatures[indexOpCreature];
              opCreature.life -= attack[creature.type];
              if (opCreature.life <= 0) {
                if (opCreature.type == "E") {
                  combatEnds = true;
                }
                map[opCreature.i][opCreature.j] = ".";
                creatures.splice(indexOpCreature, 1);
                if (indexOpCreature < i) i--;
              }
            }
          }
        }
        rounds++;
      }
    }

    return --rounds * creatures.reduce((a, b) => a + b.life, 0);
  }

  function countOpposites(creature) {
    return creatures.reduce(
      (a, b) => a + (b.type == opposite[creature.type] ? 1 : 0),
      0
    );
  }

  function findTargetCreature(creature) {
    var op = opposite[creature.type];
    var posOpCreatures = [];
    if (map[creature.i - 1][creature.j] == op)
      posOpCreatures.push([creature.i - 1, creature.j]);
    if (map[creature.i][creature.j - 1] == op)
      posOpCreatures.push([creature.i, creature.j - 1]);
    if (map[creature.i][creature.j + 1] == op)
      posOpCreatures.push([creature.i, creature.j + 1]);
    if (map[creature.i + 1][creature.j] == op)
      posOpCreatures.push([creature.i + 1, creature.j]);
    if (posOpCreatures.length == 0) return null;

    var opCreatures = [];
    for (var posOpCreature of posOpCreatures) {
      var found = false;
      for (var j = 0; j < creatures.length && !found; j++) {
        if (
          posOpCreature[0] == creatures[j].i &&
          posOpCreature[1] == creatures[j].j
        ) {
          found = true;
          opCreatures.push(creatures[j]);
        }
      }
    }
    opCreatures.sort((a, b) => {
      var res = a.life - b.life;
      if (res == 0) res = a.i - b.i;
      if (res == 0) res = a.j - b.j;

      return res;
    });
    return [opCreatures[0].i, opCreatures[0].j];
  }

  function moveToTarget(creature, target) {
    var map2 = Utils.duplicate(map);
    var positions = [target];
    var found = false;

    while (!found && positions.length > 0) {
      positions.sort((a, b) => {
        var res = a[0] - b[0];
        return res == 0 ? a[1] - b[1] : res;
      });

      for (var i = 0; i < positions.length && !found; i++) {
        var p = positions[i];
        if (
          (p[0] - 1 == creature.i && p[1] == creature.j) ||
          (p[0] + 1 == creature.i && p[1] == creature.j) ||
          (p[0] == creature.i && p[1] - 1 == creature.j) ||
          (p[0] == creature.i && p[1] + 1 == creature.j)
        ) {
          found = true;
          map[p[0]][p[1]] = creature.type;
          map[creature.i][creature.j] = ".";
          creature.i = p[0];
          creature.j = p[1];
        }
      }

      if (!found) {
        var positions2 = [];
        for (var p of positions) {
          if (map2[p[0] - 1][p[1]] == ".") {
            map2[p[0] - 1][p[1]] = "#";
            positions2.push([p[0] - 1, p[1]]);
          }
          if (map2[p[0]][p[1] - 1] == ".") {
            map2[p[0]][p[1] - 1] = "#";
            positions2.push([p[0], p[1] - 1]);
          }
          if (map2[p[0]][p[1] + 1] == ".") {
            map2[p[0]][p[1] + 1] = "#";
            positions2.push([p[0], p[1] + 1]);
          }
          if (map2[p[0] + 1][p[1]] == ".") {
            map2[p[0] + 1][p[1]] = "#";
            positions2.push([p[0] + 1, p[1]]);
          }
        }
        positions = positions2;
      }
    }
  }

  function findTargetMove(creature) {
    var map2 = Utils.duplicate(map);
    var positions = [[creature.i, creature.j]];
    var found = false;
    var position = [creature.i, creature.j];

    while (!found && positions.length > 0) {
      positions.sort((a, b) => {
        var res = a[0] - b[0];
        return res == 0 ? a[1] - b[1] : res;
      });
      var op = opposite[creature.type];

      for (var i = 0; i < positions.length && !found; i++) {
        var p = positions[i];
        if (
          map2[p[0] - 1][p[1]] == op ||
          map2[p[0] + 1][p[1]] == op ||
          map2[p[0]][p[1] - 1] == op ||
          map2[p[0]][p[1] + 1] == op
        ) {
          found = true;
          position = p;
        }
      }

      if (!found) {
        var positions2 = [];
        for (var p of positions) {
          if (map2[p[0] - 1][p[1]] == ".") {
            map2[p[0] - 1][p[1]] = "#";
            positions2.push([p[0] - 1, p[1]]);
          }
          if (map2[p[0]][p[1] - 1] == ".") {
            map2[p[0]][p[1] - 1] = "#";
            positions2.push([p[0], p[1] - 1]);
          }
          if (map2[p[0]][p[1] + 1] == ".") {
            map2[p[0]][p[1] + 1] = "#";
            positions2.push([p[0], p[1] + 1]);
          }
          if (map2[p[0] + 1][p[1]] == ".") {
            map2[p[0] + 1][p[1]] = "#";
            positions2.push([p[0] + 1, p[1]]);
          }
        }
        positions = positions2;
      }
    }

    return position;
  }

  var dataset = [];

  dataset.push({
    input: `#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`,
    output: 4988
  });

  dataset.push({
    input: `#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`,
    output: 31284
  });

  dataset.push({
    input: `#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`,
    output: 3478
  });

  dataset.push({
    input: `#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`,
    output: 6474
  });

  dataset.push({
    input: `#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`,
    output: 1140
  });

  dataset.push({
    input: `################################
#########....G#######.##########
##########.G########...#########
###########.########.#.#########
###########.#..G######..######.#
##########..#...###......G..##.#
##.#######......#..G....E#.....#
##.##..######...........E..E####
##.##...###................#####
#.....G.G...........G.....######
#...G....G...................###
#G.G.............EG..........###
#..G..........#####.........####
##.G.......G.#######.........###
#####....G..#########..G.E....##
####....#...#########.........##
#######.##..#########...#.....##
#########...#########.....######
##########..#########G....######
##########...#######..E...######
##########....#####...#EE.######
#########.........G.......######
#########............###########
############..........##########
############.......#.###########
###########...........##########
###########........#.###########
##########E.#......#############
#########...##....E.############
#########.######....############
################....############
################################`,
    output: 49120
  });

  Utils.check(solve, dataset, "15b");
})();
