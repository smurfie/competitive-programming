(() => {
  function solve(input, steps) {
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

    for (var i = 0; i < steps; i++) {
      next(planets);
    }

    return energy(planets);
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
    steps: 10,
    output: 179
  });

  dataset.push({
    input: `<x=-8, y=-10, z=0>
  <x=5, y=5, z=10>
  <x=2, y=-7, z=3>
  <x=9, y=-8, z=-3>`,
    steps: 100,
    output: 1940
  });

  dataset.push({
    input: `<x=4, y=12, z=13>
<x=-9, y=14, z=-3>
<x=-7, y=-1, z=2>
<x=-11, y=17, z=-1>`,
    steps: 1000,
    output: 5350
  });

  Utils.check(solve, dataset, "12a");
})();
