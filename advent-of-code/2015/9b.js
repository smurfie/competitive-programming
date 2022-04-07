(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var max = 0;
    var cities = new Set();
    var distances = {};

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var first = line.split(" = ")[0];
      var distance = parseInt(line.split(" = ")[1]);
      var city1 = first.split(" to ")[0];
      var city2 = first.split(" to ")[1];

      cities.add(city1);
      cities.add(city2);
      if (!distances[city1]) distances[city1] = {};
      if (!distances[city2]) distances[city2] = {};
      distances[city1][city2] = distance;
      distances[city2][city1] = distance;
    }

    var permuts = permutations(Array.from(cities));
    for (var i = 0; i < permuts.length; i++) {
      var distance = 0;
      var permut = permuts[i];
      for (var j = 1; j < permut.length; j++) {
        distance += distances[permut[j - 1]][permut[j]];
      }
      max = Math.max(max, distance);
    }

    return max;
  }

  function permutations(arr) {
    var results = [];
    if (arr.length > 0) {
      var first = arr[0];
      var arr = arr.slice(1);
      var partial = permutations(arr);
      for (var i = 0; i < partial.length; i++) {
        var partialSol = partial[i];
        for (var j = 0; j <= partialSol.length; j++) {
          var partialSolb = [...partialSol];
          partialSolb.splice(j, 0, first);
          results.push(partialSolb);
        }
      }
    } else {
      results.push([]);
    }
    return results;
  }

  var dataset = [];

  dataset.push({
    input: `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`,
    output: 982
  });

  dataset.push({
    input: `Faerun to Tristram = 65
Faerun to Tambi = 129
Faerun to Norrath = 144
Faerun to Snowdin = 71
Faerun to Straylight = 137
Faerun to AlphaCentauri = 3
Faerun to Arbre = 149
Tristram to Tambi = 63
Tristram to Norrath = 4
Tristram to Snowdin = 105
Tristram to Straylight = 125
Tristram to AlphaCentauri = 55
Tristram to Arbre = 14
Tambi to Norrath = 68
Tambi to Snowdin = 52
Tambi to Straylight = 65
Tambi to AlphaCentauri = 22
Tambi to Arbre = 143
Norrath to Snowdin = 8
Norrath to Straylight = 23
Norrath to AlphaCentauri = 136
Norrath to Arbre = 115
Snowdin to Straylight = 101
Snowdin to AlphaCentauri = 84
Snowdin to Arbre = 96
Straylight to AlphaCentauri = 107
Straylight to Arbre = 14
AlphaCentauri to Arbre = 46`,
    output: 909
  });

  Utils.check(solve, dataset, "9b");
})();
