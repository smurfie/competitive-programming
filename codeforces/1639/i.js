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
    if (notVisited.length > 0) chooseBest(notVisited);
    else chooseBest(info);

    next = readline();
  }
}

function chooseBest(arr) {
  var sum = arr.reduce((a, b) => a + b[0], 0);
  var elect = Math.floor(Math.random() * sum);
  var i = 0;
  while (elect >= arr[i][0]) {
    elect -= arr[i][0];
    i++;
  }
  print(arr[i][2]);
}

function add(nodes, edge) {
  if (nodes[edge[0]] == undefined) nodes[edge[0]] = { flag: false, nodes: [] };
  if (nodes[edge[1]] == undefined) nodes[edge[1]] = { flag: false, nodes: [] };
  nodes[edge[0]].nodes.push(edge[1]);
  nodes[edge[1]].nodes.push(edge[0]);
}
