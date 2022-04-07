(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var planets = [];

    for (var line of lines) {
      var coords = line.split(",");
      var x = parseInt(coords[0].split("=")[1]);
      var y = parseInt(coords[1].split("=")[1]);
      var z = parseInt(coords[2].split("=")[1]);
      var planet = [x, y, z, 0, 0, 0];
      planets.push(planet);
    }

    var x = Utils.duplicate(planets);
    var eqx = 0;
    var eqy = 0;
    var eqz = 0;

    for (var i = 0; eqx == 0 || eqy == 0 || eqz == 0; i++) {
      next(planets);
      if (
        eqx == 0 &&
        planets[0][0] == x[0][0] &&
        planets[0][3] == x[0][3] &&
        planets[1][0] == x[1][0] &&
        planets[1][3] == x[1][3] &&
        planets[2][0] == x[2][0] &&
        planets[2][3] == x[2][3] &&
        planets[3][0] == x[3][0] &&
        planets[3][3] == x[3][3]
      )
        eqx = i + 1;
      if (
        eqy == 0 &&
        planets[0][1] == x[0][1] &&
        planets[0][4] == x[0][4] &&
        planets[1][1] == x[1][1] &&
        planets[1][4] == x[1][4] &&
        planets[2][1] == x[2][1] &&
        planets[2][4] == x[2][4] &&
        planets[3][1] == x[3][1] &&
        planets[3][4] == x[3][4]
      )
        eqy = i + 1;
      if (
        eqz == 0 &&
        planets[0][2] == x[0][2] &&
        planets[0][5] == x[0][5] &&
        planets[1][2] == x[1][2] &&
        planets[1][5] == x[1][5] &&
        planets[2][2] == x[2][2] &&
        planets[2][5] == x[2][5] &&
        planets[3][2] == x[3][2] &&
        planets[3][5] == x[3][5]
      )
        eqz = i + 1;
    }

    return Utils.mcm(Utils.mcm(eqx, eqy), eqz);
  }

  function energy(planets) {
    var sum = 0;
    for (var i = 0; i < planets.length; i++) {
      var pot =
        Math.abs(planets[i][0]) +
        Math.abs(planets[i][1]) +
        Math.abs(planets[i][2]);
      var kin =
        Math.abs(planets[i][3]) +
        Math.abs(planets[i][4]) +
        Math.abs(planets[i][5]);
      sum += pot * kin;
    }
    return sum;
  }

  function next(planets) {
    for (var i = 0; i < planets.length - 1; i++) {
      for (var j = i + 1; j < planets.length; j++) {
        for (var k = 0; k < 3; k++) {
          if (planets[i][k] > planets[j][k]) {
            planets[i][k + 3]--;
            planets[j][k + 3]++;
          }
          if (planets[i][k] < planets[j][k]) {
            planets[i][k + 3]++;
            planets[j][k + 3]--;
          }
        }
      }
    }
    for (var i = 0; i < planets.length; i++) {
      for (var k = 0; k < 3; k++) {
        planets[i][k] += planets[i][k + 3];
      }
    }
  }

  var dataset = [];

  dataset.push({
    input: `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`,
    output: 2772
  });

  dataset.push({
    input: `<x=-8, y=-10, z=0>
  <x=5, y=5, z=10>
  <x=2, y=-7, z=3>
  <x=9, y=-8, z=-3>`,
    output: 4686774924
  });

  dataset.push({
    input: `<x=4, y=12, z=13>
<x=-9, y=14, z=-3>
<x=-7, y=-1, z=2>
<x=-11, y=17, z=-1>`,
    output: 467034091553512
  });

  Utils.check(solve, dataset, "12b");
})();
