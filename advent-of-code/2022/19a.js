(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var sum = 0;

    for (var line of lines) {
      var arr = line.split(/[ :]/);
      var blueprint = Number(arr[1]);
      var ore = Number(arr[7]);
      var clay = Number(arr[13]);
      var obs1 = Number(arr[19]);
      var obs2 = Number(arr[22]);
      var geo1 = Number(arr[28]);
      var geo2 = Number(arr[31]);
      var costs = { ore, clay, obs: [obs1, obs2], geo: [geo1, geo2] };
      var minutes = 24;
      sum +=
        blueprint *
        maxGeodes(costs, [1, 0], [0, 0], [0, 0], [0, 0], minutes, "", 0);
    }

    return sum;
  }

  function maxGeodes(
    costs,
    [oreN, oreMat],
    [clayN, clayMat],
    [obsN, obsMat],
    [geoN, geoMat],
    minutes,
    constructing,
    max
  ) {
    var nexts = [];

    nexts.push("clay");
    if (obsN > 0) {
      nexts.push("geo");
    }
    if (clayN > 0) {
      nexts.push("obs");
    }
    nexts.push("ore");
    for (var next of nexts) {
      max = Math.max(
        max,
        maxGeodesWithNext(
          costs,
          [oreN, oreMat],
          [clayN, clayMat],
          [obsN, obsMat],
          [geoN, geoMat],
          minutes,
          constructing,
          max,
          next
        )
      );
    }

    return max;
  }

  function maxGeodesWithNext(
    costs,
    [oreN, oreMat],
    [clayN, clayMat],
    [obsN, obsMat],
    [geoN, geoMat],
    minutes,
    constructing,
    max,
    next
  ) {
    minutes--;
    oreMat += oreN;
    clayMat += clayN;
    obsMat += obsN;
    geoMat += geoN;
    if (minutes == 0) {
      return geoMat;
    }
    if (constructing == "ore") {
      oreN++;
    }
    if (constructing == "clay") {
      clayN++;
    }
    if (constructing == "obs") {
      obsN++;
    }
    if (constructing == "geo") {
      geoN++;
    }

    // Check if we could better our max:
    if (
      best(
        costs,
        [oreN, oreMat],
        [clayN, clayMat],
        [obsN, obsMat],
        [geoN, geoMat],
        minutes
      ) <= max
    ) {
      return max;
    }

    var isConstructing = false;
    if (oreMat >= costs.ore && next == "ore") {
      isConstructing = true;
      max = Math.max(
        max,
        maxGeodes(
          costs,
          [oreN, oreMat - costs.ore],
          [clayN, clayMat],
          [obsN, obsMat],
          [geoN, geoMat],
          minutes,
          "ore",
          max
        )
      );
    }
    if (oreMat >= costs.clay && next == "clay") {
      isConstructing = true;
      max = Math.max(
        max,
        maxGeodes(
          costs,
          [oreN, oreMat - costs.clay],
          [clayN, clayMat],
          [obsN, obsMat],
          [geoN, geoMat],
          minutes,
          "clay",
          max
        )
      );
    }
    if (oreMat >= costs.obs[0] && clayMat >= costs.obs[1] && next == "obs") {
      isConstructing = true;
      max = Math.max(
        max,
        maxGeodes(
          costs,
          [oreN, oreMat - costs.obs[0]],
          [clayN, clayMat - costs.obs[1]],
          [obsN, obsMat],
          [geoN, geoMat],
          minutes,
          "obs",
          max
        )
      );
    }
    if (oreMat >= costs.geo[0] && obsMat >= costs.geo[1] && next == "geo") {
      isConstructing = true;
      max = Math.max(
        max,
        maxGeodes(
          costs,
          [oreN, oreMat - costs.geo[0]],
          [clayN, clayMat],
          [obsN, obsMat - costs.geo[1]],
          [geoN, geoMat],
          minutes,
          "geo",
          max
        )
      );
    }
    if (!isConstructing) {
      max = Math.max(
        max,
        maxGeodesWithNext(
          costs,
          [oreN, oreMat],
          [clayN, clayMat],
          [obsN, obsMat],
          [geoN, geoMat],
          minutes,
          "",
          max,
          next
        )
      );
    }
    return max;
  }

  // Calculates the best possible geode material that could be generated with the given resources
  function best(
    costs,
    [oreN, oreMat],
    [clayN, clayMat],
    [obsN, obsMat],
    [geoN, geoMat],
    minutes
  ) {
    var oreMatForClay = oreMat;
    var oreConst = false;
    var clayConst = false;
    var obsConst = false;
    var geoConst = false;
    if (oreMat >= costs.ore) {
      oreConst = true;
      oreMat -= costs.ore;
    }
    if (oreMatForClay >= costs.clay) {
      clayConst = true;
      oreMatForClay -= costs.clay;
    }
    if (clayMat >= costs.obs[1]) {
      obsConst = true;
      clayMat -= costs.obs[1];
    }
    if (obsMat >= costs.geo[1]) {
      geoConst = true;
      obsMat -= costs.geo[1];
    }

    for (var i = minutes; i > 0; i--) {
      oreMat += oreN;
      oreMatForClay += oreN;
      if (oreConst) {
        oreN++;
        oreConst = false;
      }
      if (costs.clay <= oreMatForClay) {
        // Supose the best case were we construct one each time we can
        oreMat -= costs.ore;
        oreConst = true;
      }
      clayMat += clayN;
      if (clayConst) {
        clayN++;
        clayConst = false;
      }
      if (costs.clay <= oreMatForClay) {
        // Supose the best case were we construct one each time we can
        oreMatForClay -= costs.clay;
        clayConst = true;
      }
      obsMat += obsN;
      if (obsConst) {
        obsN++;
        obsConst = false;
      }
      if (costs.obs[1] <= clayMat) {
        // Supose the best case were we construct one each time we can
        clayMat -= costs.obs[1];
        obsConst = true;
      }
      geoMat += geoN;
      if (geoConst) {
        geoN++;
        geoConst = false;
      }
      if (costs.geo[1] <= obsMat) {
        // Supose the best case were we construct one each time we can
        obsMat -= costs.geo[1];
        geoConst = true;
      }
    }
    return geoMat;
  }

  var dataset = [];

  dataset.push({
    input: `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`,
    output: 33
  });

  dataset.push({
    input: `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 2 ore and 18 obsidian.
Blueprint 2: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 4 ore and 15 obsidian.
Blueprint 3: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 4: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 19 clay. Each geode robot costs 2 ore and 12 obsidian.
Blueprint 5: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 11 clay. Each geode robot costs 4 ore and 7 obsidian.
Blueprint 6: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 7 clay. Each geode robot costs 2 ore and 19 obsidian.
Blueprint 7: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 4 ore and 11 obsidian.
Blueprint 8: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 3 ore and 10 obsidian.
Blueprint 9: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 6 clay. Each geode robot costs 2 ore and 16 obsidian.
Blueprint 10: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 3 ore and 15 obsidian.
Blueprint 11: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 10 clay. Each geode robot costs 2 ore and 13 obsidian.
Blueprint 12: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 12 clay. Each geode robot costs 3 ore and 17 obsidian.
Blueprint 13: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 19 clay. Each geode robot costs 2 ore and 18 obsidian.
Blueprint 14: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 6 clay. Each geode robot costs 4 ore and 11 obsidian.
Blueprint 15: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 12 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 16: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 16 clay. Each geode robot costs 4 ore and 16 obsidian.
Blueprint 17: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 18: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 11 clay. Each geode robot costs 2 ore and 16 obsidian.
Blueprint 19: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 11 clay. Each geode robot costs 2 ore and 8 obsidian.
Blueprint 20: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 11 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 21: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 15 clay. Each geode robot costs 2 ore and 13 obsidian.
Blueprint 22: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 9 clay. Each geode robot costs 3 ore and 7 obsidian.
Blueprint 23: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 4 ore and 8 obsidian.
Blueprint 24: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 3 ore and 12 obsidian.
Blueprint 25: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 15 clay. Each geode robot costs 3 ore and 16 obsidian.
Blueprint 26: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 3 ore and 10 obsidian.
Blueprint 27: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 9 clay. Each geode robot costs 3 ore and 7 obsidian.
Blueprint 28: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 11 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 29: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 2 ore and 11 obsidian.
Blueprint 30: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 2 ore and 13 obsidian.`,
    output: 2341
  });

  Utils.check(solve, dataset, "19a");
})();
