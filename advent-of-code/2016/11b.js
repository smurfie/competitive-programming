(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var floors = [];

    for (var line of lines) {
      var words = line.split(" ");
      var generators = [];
      var microchips = [];
      for (var i = 0; i < words.length; i++) {
        if (words[i].indexOf("generator") > -1) generators.push(words[i - 1]);
        if (words[i].indexOf("microchip") > -1)
          microchips.push(words[i - 1].substring(0, words[i - 1].indexOf("-")));
      }
      floors.push({ generators, microchips });
    }
    floors[0].generators.push("elerium");
    floors[0].generators.push("dilithium");
    floors[0].microchips.push("elerium");
    floors[0].microchips.push("dilithium");

    var movs = 0;
    if (floors[0].generators.length == 0 && floors[1].generators.length == 1) {
      // For the inputs given this should work to detect special cases
      // Normal case: up 2 elemnts, down 1 element
      // Special case: up 1 element
      movs += 2;
    }

    var total = 0;
    for (var i = 0; i < floors.length - 1; i++) {
      total += floors[i].generators.length + floors[i].microchips.length;
      movs += 1 + 2 * (total - 2);
    }

    return movs;
  }

  var dataset = [];

  dataset.push({
    input: `The first floor contains a polonium generator, a thulium generator, a thulium-compatible microchip, a promethium generator, a ruthenium generator, a ruthenium-compatible microchip, a cobalt generator, and a cobalt-compatible microchip.
The second floor contains a polonium-compatible microchip and a promethium-compatible microchip.
The third floor contains nothing relevant.
The fourth floor contains nothing relevant.`,
    output: 71
  });

  Utils.check(solve, dataset, "11b");
})();
