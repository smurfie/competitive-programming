var maps = parseInt(readline());

for (var i = 0; i < maps; i++) {
  var line = readline()
    .split(" ")
    .map((i) => parseInt(i));
  var n = line[0];
  var m = line[1];
  var start = line[2];
  var base = line[3];

  run(n, m, start, base);
}

function run(n, m, start, base) {
  var nodes = Array(n);
  for (var i = 0; i < m; i++) {
    var edge = readline()
      .split(" ")
      .map((i) => parseInt(i) - 1);
    add(nodes, edge);
  }
  nodes[start - 1].flag = true;

  var next = readline();
  while (next != "AC" && next != "F") {
    var line = next.split(" ");
    line.shift();
    line = line.map((i) => parseInt(i));
    var deg = line.shift();
    var info = [];
    for (var i = 0; i < line.length / 2; i++) {
      info.push([line[i * 2], line[i * 2 + 1], i + 1]);
    }
    var notVisited = info.filter((i) => i[1] == 0);
    var visited = info.filter((i) => i[1] == 1);
    if (notVisited.length > 0) chooseBest2(notVisited, visited);
    else chooseBest(info);

    next = readline();
  }
}

function chooseBest(arr) {
  var arrId3 = arr.filter((i) => i[0] == 3);
  var arrId40 = arr.filter((i) => i[0] == 40);

  if (arrId40.length > 0) print(arrId40[0][2]);
  else if (arrId3.length > 0) print(arrId3[0][2]);
  else {
    arr.sort((a, b) => a[0] - b[0]);
    var sum = (arr.length * (arr.length + 1)) / 2;
    var elect = Math.floor(Math.random() * sum);
    var i = 0;
    while (elect >= i + 1) {
      elect -= i + 1;
      i++;
    }
    print(arr[i][2]);
  }
}

function chooseBest2(notVisited, visited) {
  var arrId4 = notVisited.filter((i) => i[0] == 4);
  var arrId1 = notVisited.filter((i) => i[0] == 1);
  var arrId2 = notVisited.filter((i) => i[0] == 2);

  if (notVisited.length + visited.length == 40 && notVisited.length > 1)
    notVisited.filter((i) => i[0] != 2);
  if (arrId4.length > 0) print(arrId4[0][2]);
  else if (arrId1.length > 0) print(arrId1[0][2]);
  else if (arrId2.length > 0) print(arrId2[0][2]);
  else if (
    notVisited.length == 1 &&
    visited.length == 1 &&
    visited[0][0] > 4 &&
    visited[0][0] < 25
  ) {
    print(visited[0][2]);
  } else {
    notVisited.sort((a, b) => a[0] - b[0]);
    notVisited = notVisited.filter((i) => i[0] == notVisited[0][0]);
    print(notVisited[Math.floor(Math.random() * notVisited.length)][2]);
  }
}

function add(nodes, edge) {
  if (nodes[edge[0]] == undefined) nodes[edge[0]] = { flag: false, nodes: [] };
  if (nodes[edge[1]] == undefined) nodes[edge[1]] = { flag: false, nodes: [] };
  nodes[edge[0]].nodes.push(edge[1]);
  nodes[edge[1]].nodes.push(edge[0]);
}
