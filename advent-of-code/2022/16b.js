(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var dict = {};
    var val = 1;

    for (var line of lines) {
      var arr = line.split(/[ ;,:=]/).filter((i) => i.length > 0);
      var valve = arr[1];
      var flow = Number(arr[5]);
      var paths = [];
      for (var i = 10; i < arr.length; i++) {
        paths.push(arr[i]);
      }
      dict[valve] = { flow, paths };
    }

    var node = "AA";
    var timer = 26;
    var open = new Set();
    var dists = calcDists(dict);
    var totalNodes = Object.keys(dists).length - 1;
    var arr = Array.apply(null, Array(2 ** totalNodes)).map(() => 0);
    var closed = new Set();
    for (var el of Object.keys(dists["AA"])) {
      closed.add(el);
      console.log(el);
      dict[el].val = val;
      val *= 2;
    }
    // arr will have the best possible solution for a subset of nodes
    // we only take care of nodes with flow > 0
    // for example arr[17] -> to binary -> arr[10001] -> best solution for nodes 1 + 5
    // so we make all possible partitions and the max of the sum of the two complementary partitions
    // will make the best result (we took one partition and the elefphant the other)
    // in the upper case we will took arr[17] and elefant arr[01110]->arr[14]
    best(arr, dict, node, timer, open, closed, dists, 0);

    // Now we have the best solutions for each combination of nodes but if a combination of nodes is not
    // achievable the max is 0. So in that case we have to set it at the max of removing each one of the nodes
    // so if arr[11111]=0 means there is no solution for all nodes. We took the max of arr[11110], arr[11101],
    // arr[11011], arr[10111], arr[01111]. As some of these values could also be 0 we start from the start of the arr
    // Also is this case: "A(1)-B(10)---C(100) with time = 7 --> arr=[0,6,50,53,200,106,150,0,0]" we see that arr[5]
    // has a better solution if we ignore node 0 so the before mentioned process will solve alse these cases.
    for (var i = 0; i < arr.length; i++) {
      var j = 1;
      while (j <= i) {
        if ((i & j) === j) {
          arr[i] = Math.max(arr[i], arr[i - j]);
        }
        j *= 2;
      }
    }
    var max = 0;
    for (var i = 0; i < arr.length; i++) {
      max = Math.max(max, arr[i] + arr.at(-i - 1));
    }

    return max;
  }

  function best(arr, dict, node, timer, open, closed, dists, sum) {
    for (var node1 of Array.from(closed)) {
      if (timer > dists[node][node1] + 1) {
        open.add(node1);
        closed.delete(node1);
        var newTimer = timer - dists[node][node1] - 1;
        var index = Array.from(open).reduce(
          (acc, curr) => acc + dict[curr].val,
          0
        );
        var newSum = sum + newTimer * dict[node1].flow;
        arr[index] = Math.max(arr[index], newSum);
        best(arr, dict, node1, newTimer, open, closed, dists, newSum);
        open.delete(node1);
        closed.add(node1);
      }
    }
  }

  function calcDists(dict) {
    var dists = {};
    for (var node of Object.keys(dict)) {
      if (node === "AA" || dict[node].flow > 0) {
        dists[node] = calcDist(dict, node, new Set(node));
      }
    }
    return dists;
  }

  function calcDist(dict, nodeName, processed) {
    var dist = {};
    var nodes = [[nodeName, 0]];
    while (nodes.length > 0) {
      var node = nodes.shift();
      var name = node[0];
      if (!processed.has(name)) {
        processed.add(name);
        var n = node[1];
        if (dict[name].flow > 0 && name != nodeName) {
          dist[name] = n;
        }
        for (var path of dict[name].paths) {
          nodes.push([path, n + 1]);
        }
      }
    }
    return dist;
  }

  var dataset = [];

  dataset.push({
    input: `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`,
    output: 1707
  });

  dataset.push({
    input: `Valve SW has flow rate=0; tunnels lead to valves LX, LD
Valve VS has flow rate=0; tunnels lead to valves JO, OO
Valve OO has flow rate=10; tunnels lead to valves KK, HD, VS, KI
Valve DZ has flow rate=8; tunnels lead to valves KV, GX, WQ, BA, PK
Valve GX has flow rate=0; tunnels lead to valves AA, DZ
Valve IF has flow rate=0; tunnels lead to valves OI, DW
Valve BO has flow rate=0; tunnels lead to valves UJ, ZT
Valve KI has flow rate=0; tunnels lead to valves OO, KU
Valve JT has flow rate=3; tunnels lead to valves FC, AM, KV, XP, XZ
Valve TQ has flow rate=0; tunnels lead to valves AA, DW
Valve KK has flow rate=0; tunnels lead to valves QW, OO
Valve NR has flow rate=0; tunnels lead to valves UG, XM
Valve VO has flow rate=0; tunnels lead to valves YR, AA
Valve MS has flow rate=17; tunnels lead to valves LT, LX
Valve JO has flow rate=0; tunnels lead to valves YR, VS
Valve ZB has flow rate=0; tunnels lead to valves UJ, LT
Valve ZT has flow rate=0; tunnels lead to valves XM, BO
Valve YR has flow rate=9; tunnels lead to valves VO, FY, WB, JO
Valve QS has flow rate=0; tunnels lead to valves QW, FY
Valve UD has flow rate=0; tunnels lead to valves CA, JB
Valve AP has flow rate=0; tunnels lead to valves CA, DW
Valve KV has flow rate=0; tunnels lead to valves JT, DZ
Valve JH has flow rate=0; tunnels lead to valves IK, UJ
Valve LD has flow rate=15; tunnels lead to valves IK, SW
Valve XK has flow rate=0; tunnels lead to valves XZ, BH
Valve XM has flow rate=11; tunnels lead to valves XP, CJ, ZT, NR
Valve FY has flow rate=0; tunnels lead to valves YR, QS
Valve GI has flow rate=22; tunnel leads to valve TI
Valve JB has flow rate=14; tunnels lead to valves WB, UD, WQ, HD
Valve DW has flow rate=6; tunnels lead to valves AP, TQ, NQ, IF, PK
Valve UJ has flow rate=13; tunnels lead to valves JH, ZB, BO
Valve KU has flow rate=0; tunnels lead to valves CA, KI
Valve WQ has flow rate=0; tunnels lead to valves JB, DZ
Valve BA has flow rate=0; tunnels lead to valves BH, DZ
Valve AA has flow rate=0; tunnels lead to valves YX, TQ, VO, GX, QP
Valve TI has flow rate=0; tunnels lead to valves GI, UG
Valve FC has flow rate=0; tunnels lead to valves QP, JT
Valve CA has flow rate=18; tunnels lead to valves KU, UD, AP
Valve QW has flow rate=25; tunnels lead to valves QS, KK
Valve XZ has flow rate=0; tunnels lead to valves JT, XK
Valve YX has flow rate=0; tunnels lead to valves AA, CJ
Valve OI has flow rate=0; tunnels lead to valves IF, BH
Valve NQ has flow rate=0; tunnels lead to valves AM, DW
Valve QP has flow rate=0; tunnels lead to valves AA, FC
Valve AM has flow rate=0; tunnels lead to valves NQ, JT
Valve XP has flow rate=0; tunnels lead to valves XM, JT
Valve BH has flow rate=12; tunnels lead to valves BA, XK, OI
Valve HD has flow rate=0; tunnels lead to valves OO, JB
Valve LT has flow rate=0; tunnels lead to valves MS, ZB
Valve LX has flow rate=0; tunnels lead to valves MS, SW
Valve CJ has flow rate=0; tunnels lead to valves XM, YX
Valve PK has flow rate=0; tunnels lead to valves DW, DZ
Valve IK has flow rate=0; tunnels lead to valves LD, JH
Valve WB has flow rate=0; tunnels lead to valves YR, JB
Valve UG has flow rate=21; tunnels lead to valves TI, NR`,
    output: 2455
  });

  Utils.check(solve, dataset, "16b");
})();
