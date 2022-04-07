(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var damageEnemy = parseInt(lines[1].split(" ")[1]);
    var armorEnemy = parseInt(lines[2].split(" ")[1]);

    var damage = 0;
    var armor = 0;

    var weapons = [
      [8, 4],
      [10, 5],
      [25, 6],
      [40, 7],
      [74, 8]
    ];
    var armors = [
      [13, 1],
      [31, 2],
      [53, 3],
      [75, 4],
      [102, 5]
    ];
    var rings = [
      [25, 1, 0],
      [50, 2, 0],
      [100, 3, 0],
      [20, 0, 1],
      [40, 0, 2],
      [80, 0, 3]
    ];

    var min = Infinity;
    var cost = 0;

    for (var i = 0; i < weapons.length; i++) {
      for (var j = -1; j < armors.length; j++) {
        for (var k = -1; k < rings.length; k++) {
          for (var l = k == -1 ? -1 : k + 1; l < rings.length; l++) {
            damage = 0;
            armor = 0;
            cost = 0;
            if (i > -1) {
              cost += weapons[i][0];
              damage += weapons[i][1];
            }
            if (j > -1) {
              cost += armors[j][0];
              armor += armors[j][1];
            }
            if (k > -1) {
              cost += rings[k][0];
              damage += rings[k][1];
              armor += rings[k][2];
            }
            if (l > -1) {
              cost += rings[l][0];
              damage += rings[l][1];
              armor += rings[l][2];
            }
            if (win(damage, armor, damageEnemy, armorEnemy) && cost < min) {
              min = cost;
            }
          }
        }
      }
    }
    return min;
  }

  function win(damage, armor, damageEnemy, armorEnemy) {
    return Math.max(1, damage - armorEnemy) >= Math.max(1, damageEnemy - armor);
  }

  var dataset = [];

  dataset.push({
    input: `Hit Points: 100
Damage: 8
Armor: 2`,
    output: 91
  });

  Utils.check(solve, dataset, "21a");
})();
