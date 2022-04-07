var n = parseInt(readline());
var m = n - 1;

var nodes = Array(n);
var edges = {};
for (var i = 0; i < m; i++) {
  var edge = readline().split(" ");
  var node1 = parseInt(edge[0] - 1);
  var node2 = parseInt(edge[1] - 1);
  addEdge(node1, node2, i + 1);
}

var activeNodesLinks = { 0: {} };
var activeLinksNodes = { 0: { 0: true } };
var actives = 1;
var line = readline();
var lastResult = 0;
while (line != "0" && line != "3") {
  if (line == "2") {
    printEdges();
  } else {
    activateNode(parseInt(line.split(" ")[1]) - 1);
    if (actives % 2 == 0) {
      lastResult = sumEdges(false);
    } else {
      lastResult = 0;
    }
    print(lastResult);
  }

  line = readline();
}

function addEdge(n1, n2, i) {
  if (nodes[n1] == undefined) nodes[n1] = [];
  if (nodes[n2] == undefined) nodes[n2] = [];

  nodes[n1].push([n2, i]);
  nodes[n2].push([n1, i]);
  edges[n1 + "," + n2] = i;
  edges[n2 + "," + n1] = i;
}

function activateNode(n) {
  var node = nodes[n];
  activeNodesLinks[n] = {};
  for (var edge of node) {
    var activeNodeLinks = activeNodesLinks[edge[0]];
    if (activeNodeLinks != undefined) {
      var size = Object.keys(activeNodeLinks).length;
      delete activeLinksNodes[size++][edge[0]];
      activeNodeLinks[n] = true;
      if (activeLinksNodes[size] == undefined) activeLinksNodes[size] = {};
      activeLinksNodes[size][edge[0]] = true;
      activeNodesLinks[n][edge[0]] = true;
    }
  }
  var links = Object.keys(activeNodesLinks[n]).length;
  if (activeLinksNodes[links] == undefined) activeLinksNodes[links] = {};
  activeLinksNodes[links][n] = true;
  actives++;
}

function sumEdges(withList) {
  var sum = 0;
  var edgesList = [];
  var anl = JSON.parse(JSON.stringify(activeNodesLinks));
  var aln = JSON.parse(JSON.stringify(activeLinksNodes));
  if (Object.keys(aln[0]).length > 0) return 0;

  while (Object.keys(aln[1]).length > 0) {
    var n1 = Object.keys(aln[1])[0];
    var n2 = Object.keys(anl[n1])[0];
    var edge = edges[n1 + "," + n2];
    if (withList) edgesList.push(edge);
    else sum += edge;

    for (var i of Object.keys(anl[n2])) {
      var s = anl[i];
      var size = Object.keys(s).length;
      delete aln[size][i];
      aln[size - 1][i] = true;
      delete anl[i][n2];
    }
    delete aln[0][n1];
    delete aln[Object.keys(anl[n2]).length][n2];
    delete anl[n2];
    if (Object.keys(aln[0]).length > 0) return 0;
  }
  if (withList) {
    edgesList.sort((a, b) => a - b);
    return edgesList;
  } else return sum;
}

function printEdges() {
  if (lastResult == 0) {
    print(0);
  } else {
    var res = sumEdges(true);
    print(res.length + " " + res.join(" "));
  }
}
