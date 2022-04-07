(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var paths = {};
    for (var line of lines) {
      var node1 = line.split("-")[0];
      var node2 = line.split("-")[1];
      if (!paths[node1]) paths[node1] = [];
      if (!paths[node2]) paths[node2] = [];
      paths[node1].push(node2);
      paths[node2].push(node1);
    }

    return numPaths(paths, "start", "end", { start: true });
  }

  function numPaths(paths, i, e, visited) {
    if (i == e) return 1;
    var sum = 0;
    for (var el of paths[i]) {
      if (!visited[el]) {
        var v2 = Utils.duplicate(visited);
        if (el[0] >= "a" && el[0] <= "z") v2[el] = true;
        sum += numPaths(paths, el, e, v2);
      }
    }
    return sum;
  }

  var dataset = [];

  dataset.push({
    input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`,
    output: 10
  });

  dataset.push({
    input: `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`,
    output: 19
  });

  dataset.push({
    input: `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`,
    output: 226
  });

  dataset.push({
    input: `pf-pk
ZQ-iz
iz-NY
ZQ-end
pf-gx
pk-ZQ
ZQ-dc
NY-start
NY-pf
NY-gx
ag-ZQ
pf-start
start-gx
BN-ag
iz-pf
ag-FD
pk-NY
gx-pk
end-BN
ag-pf
iz-pk
pk-ag
iz-end
iz-BN`,
    output: 5212
  });

  Utils.check(solve, dataset, "12a");
})();
