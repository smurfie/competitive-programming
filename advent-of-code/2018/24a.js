(() => {
  var groups;

  function solve(input) {
    var lines = Utils.read(input);
    var i = 1;
    groups = [];
    var type = 0;

    while (i < lines.length) {
      var line = lines[i];
      if (line.length == 0) {
        i += 2;
        type++;
      } else {
        var group = read(line);
        group.type = type;
        groups.push(group);
        i++;
      }
    }

    while (
      groups.filter((i) => i.type == 0).length > 0 &&
      groups.filter((i) => i.type == 1).length > 0
    ) {
      targets();
      attacks();
    }

    return groups.reduce((a, b) => a + b.units, 0);
  }

  function attacks() {
    var groups2 = Utils.duplicate(groups);
    groups2.map((val, id) => {
      val.id = id;
      return val;
    });
    groups2.sort((a, b) => {
      return b.initiative - a.initiative;
    });

    for (var group of groups2) {
      var group1 = groups[group.id];
      if (group1.target != undefined) {
        var power = group1.units * group1.attack;
        var group2 = groups[group1.target];
        var damage =
          group2.weak.indexOf(group1.attackType) == -1 ? power : power * 2;
        group2.units = Math.ceil(
          Math.max(0, group2.units * group2.hp - damage) / group2.hp
        );
      }
    }

    groups = groups.filter((i) => i.units != 0);
  }

  function targets() {
    groups.sort((a, b) => {
      var res = b.units * b.attack - a.units * a.attack;
      return res == 0 ? b.initiative - a.initiative : res;
    });

    for (var group of groups) {
      delete group.target;
      delete group.targeted;
    }

    for (var group1 of groups) {
      var power = group1.units * group1.attack;
      var target = -1;
      var targetDamage = 0;
      var targetPower = 0;
      var targetInitiative = 0;
      for (var i = 0; i < groups.length; i++) {
        var group2 = groups[i];
        if (
          group1.type != group2.type &&
          !group2.targeted &&
          group2.immune.indexOf(group1.attackType) == -1
        ) {
          var damage =
            group2.weak.indexOf(group1.attackType) == -1 ? power : power * 2;
          var power2 = group2.units * group2.attack;
          if (
            target == -1 ||
            damage > targetDamage ||
            (damage == targetDamage && power2 > targetPower) ||
            (damage == targetDamage &&
              power2 == targetPower &&
              group2.initiative > targetInitiative)
          ) {
            target = i;
            targetDamage = damage;
            targetPower = power2;
            targetInitiative = group2.initiative;
          }
        }
      }
      if (target != -1) {
        group1.target = target;
        groups[target].targeted = true;
      }
    }
  }

  function read(line) {
    var units = parseInt(line.split(" ")[0]);
    var hp = parseInt(line.split(" ")[4]);
    var immune = [];
    var weak = [];
    if (line.indexOf("(") > -1) {
      var props = line
        .substring(line.indexOf("(") + 1, line.indexOf(")"))
        .split(";");
      for (var prop of props) {
        if (prop.indexOf("weak") > -1) {
          weak = prop.split("weak to ")[1].split(", ");
        } else {
          immune = prop.split("immune to ")[1].split(", ");
        }
      }
    }
    line = line.split("that does ")[1];
    var attack = parseInt(line.split(" ")[0]);
    var attackType = line.split(" ")[1];
    var initiative = parseInt(line.split(" initiative ")[1]);

    return { units, hp, immune, weak, attack, attackType, initiative };
  }

  var dataset = [];

  dataset.push({
    input: `Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`,
    output: 5216
  });

  dataset.push({
    input: `Immune System:
4555 units each with 9688 hit points (immune to radiation; weak to bludgeoning) with an attack that does 17 radiation damage at initiative 1
2698 units each with 9598 hit points (immune to slashing) with an attack that does 29 slashing damage at initiative 16
4682 units each with 6161 hit points with an attack that does 13 radiation damage at initiative 19
8197 units each with 4985 hit points (weak to cold) with an attack that does 5 cold damage at initiative 18
582 units each with 3649 hit points with an attack that does 46 slashing damage at initiative 13
53 units each with 5147 hit points (immune to bludgeoning, slashing) with an attack that does 828 cold damage at initiative 11
5231 units each with 8051 hit points (weak to radiation) with an attack that does 14 radiation damage at initiative 9
704 units each with 4351 hit points (immune to cold; weak to slashing) with an attack that does 60 radiation damage at initiative 2
326 units each with 9157 hit points (weak to cold, slashing) with an attack that does 261 radiation damage at initiative 6
6980 units each with 3363 hit points (weak to radiation) with an attack that does 4 slashing damage at initiative 4

Infection:
1994 units each with 48414 hit points (immune to slashing) with an attack that does 46 cold damage at initiative 3
42 units each with 41601 hit points (weak to radiation; immune to fire) with an attack that does 1547 bludgeoning damage at initiative 7
3050 units each with 29546 hit points (immune to fire) with an attack that does 19 fire damage at initiative 10
3825 units each with 5609 hit points (immune to cold; weak to slashing, bludgeoning) with an attack that does 2 bludgeoning damage at initiative 12
37 units each with 30072 hit points with an attack that does 1365 cold damage at initiative 20
189 units each with 49726 hit points (weak to bludgeoning) with an attack that does 514 slashing damage at initiative 5
930 units each with 39623 hit points (weak to radiation) with an attack that does 81 bludgeoning damage at initiative 8
6343 units each with 31638 hit points (immune to slashing) with an attack that does 9 bludgeoning damage at initiative 15
1561 units each with 10633 hit points (weak to radiation, cold) with an attack that does 12 cold damage at initiative 14
3198 units each with 25539 hit points (immune to radiation, fire) with an attack that does 15 bludgeoning damage at initiative 17`,
    output: 14799
  });

  Utils.check(solve, dataset, "24a");
})();
