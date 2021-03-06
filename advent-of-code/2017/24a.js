(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var bridges = [];

    for (var line of lines) {
      bridges.push([
        parseInt(line.split("/")[0]),
        parseInt(line.split("/")[1])
      ]);
    }

    return maxBridge(bridges, 0);
  }

  function maxBridge(bridges, n) {
    var max = 0;
    for (var i = 0; i < bridges.length; i++) {
      var bridge = bridges[i];
      if (bridge[0] == n) {
        var bridges2 = Utils.duplicate(bridges);
        bridges2.splice(i, 1);
        max = Math.max(
          max,
          bridge[0] + bridge[1] + maxBridge(bridges2, bridge[1])
        );
      } else if (bridge[1] == n) {
        var bridges2 = Utils.duplicate(bridges);
        bridges2.splice(i, 1);
        max = Math.max(
          max,
          bridge[0] + bridge[1] + maxBridge(bridges2, bridge[0])
        );
      }
    }
    return max;
  }

  var dataset = [];

  dataset.push({
    input: `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`,
    output: 31
  });

  dataset.push({
    input: `14/42
2/3
6/44
4/10
23/49
35/39
46/46
5/29
13/20
33/9
24/50
0/30
9/10
41/44
35/50
44/50
5/11
21/24
7/39
46/31
38/38
22/26
8/9
16/4
23/39
26/5
40/40
29/29
5/20
3/32
42/11
16/14
27/49
36/20
18/39
49/41
16/6
24/46
44/48
36/4
6/6
13/6
42/12
29/41
39/39
9/3
30/2
25/20
15/6
15/23
28/40
8/7
26/23
48/10
28/28
2/13
48/14`,
    output: 1695
  });

  Utils.check(solve, dataset, "24a");
})();
