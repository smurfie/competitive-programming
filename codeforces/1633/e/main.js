function PriorityQueue(compare) {
  this.heap = [];
  this.elements = 0;
  this.compare = compare || ((a, b) => a < b);
}

PriorityQueue.prototype.size = function () {
  return this.elements;
};

PriorityQueue.prototype.isEmpty = function () {
  return this.elements == 0;
};

PriorityQueue.prototype.clear = function () {
  this.elements = 0;
};

PriorityQueue.prototype.peek = function () {
  return this.elements > 0 ? heap[0] : undefined;
};

PriorityQueue.prototype.add = function (myVal) {
  this.heap[this.elements++] = myVal;

  var current = this.elements - 1;
  while (current > 0) {
    var up = (current - 1) >> 1;
    var upVal = this.heap[up];
    if (this.compare(upVal, myVal)) break;
    this.heap[current] = upVal;
    current = up;
  }
  this.heap[current] = myVal;
};

PriorityQueue.prototype.pop = function () {
  if (this.elements == 0) return null;
  if (this.elements == 1) {
    return this.heap[--this.elements];
  }
  var el = this.heap[0];

  var myVal = this.heap[--this.elements];
  this.heap[0] = myVal;

  var current = 0;
  var maxSize = this.elements / 2;
  var leftChild;
  var rightChild;
  var best;

  while (current < maxSize) {
    leftChild = current * 2 + 1;
    rightChild = leftChild + 1;
    best = this.heap[leftChild];

    if (
      rightChild < this.elements &&
      this.compare(this.heap[rightChild], best)
    ) {
      best = this.heap[rightChild];
      leftChild = rightChild;
    }
    if (this.compare(myVal, best)) {
      break;
    }
    this.heap[current] = best;
    current = leftChild;
  }
  this.heap[current] = myVal;

  return el;
};

PriorityQueue.prototype.toArray = function () {
  return this.heap.filter((_, id) => id < this.elements);
};

var line = readline().split(" ");
var n = parseInt(line[0]);
var m = parseInt(line[1]);

var nodes = Array(n);
var weights = Array(m);
var iniEdges = Array(m);
for (var i = 0; i < m; i++) {
  var edge = readline().split(" ");
  var node1 = parseInt(edge[0]);
  var node2 = parseInt(edge[1]);
  var weight = parseInt(edge[2]) * 2; //*2 to avoid decimals
  addEdge(nodes, node1, node2, weight, i);
  weights[i] = weight;
  iniEdges[i] = [node1, node2, parseInt(edge[2])];
}

var cuts = new Set();
cuts.add(0);
for (var i = 0; i < m; i++) {
  var w1 = weights[i];
  cuts.add(w1);
  for (var j = 0; j < i; j++) {
    cuts.add((w1 + weights[j]) / 2);
  }
}
cuts = Array.from(cuts);
cuts.sort((a, b) => a - b);

var line = readline().split(" ");
var p = parseInt(line[0]);
var k = parseInt(line[1]);
var a = parseInt(line[2]);
var b = parseInt(line[3]);
var c = parseInt(line[4]);

var queries = readline()
  .split(" ")
  .map((i) => parseInt(i));

var edges = new PriorityQueue((a, b) => {
  return a[1] == b[1] ? b[3] < a[3] : a[1] < b[1];
});

var edgeCuts = new Array(cuts.length);
edgeCuts[0] = [mst(edges, nodes, cuts[0]), cuts[0]];
edgeCuts[cuts.length - 1] = [
  mst(edges, nodes, cuts[cuts.length - 1]),
  cuts[cuts.length - 1]
];
if (!sortedArrayEquals(edgeCuts[0][0][0], edgeCuts[cuts.length - 1][0][0]))
  calcCuts(cuts, edgeCuts, edges, 0, cuts.length - 1);
edgeCuts = edgeCuts.filter((i) => i != undefined);
edgeCuts = edgeCuts.filter(
  (i, id) => id == 0 || !sortedArrayEquals(i[0][0], edgeCuts[id - 1][0][0])
);
for (var i = 0; i < weights.length; i++) {
  edgeCuts.push([mst(edges, nodes, weights[i]), weights[i]]);
}
edgeCuts.sort((a, b) => a[1] - b[1]);
edgeCuts = edgeCuts.filter((i, id) => id == 0 || i[1] != edgeCuts[id - 1][1]);

var result = 0;
var q = 0;
var dict = [];
for (var i = 0; i < k; i++) {
  var qbase = i < queries.length ? queries[i] : ((q * a) / 2 + b) % c;
  q = qbase * 2;
  var res = dict[q];
  if (dict[q] == undefined) {
    var j = upperBoundEdges(edgeCuts, q);

    var edgesList = edgeCuts[j][0][0];
    var weightsList = edgeCuts[j][0][1];
    var z = upperBound(weightsList, q);
    res =
      (edgeCuts[j][0][2] - (n - 1 - 2 * z) * Math.abs(edgeCuts[j][1] - q)) / 2;
  }
  result ^= res;
}

print(result < 0 ? result + 8 * (1 << 30) : result);

function upperBoundEdges(edgeCuts, q) {
  var min = 0;
  var max = edgeCuts.length;
  var mid = Math.floor((min + max) / 2);
  while (min != mid) {
    if (edgeCuts[mid][1] <= q) min = mid;
    else max = mid;
    mid = Math.floor((min + max) / 2);
  }
  return mid;
}

function upperBound(arr, q) {
  var min = -1;
  var max = arr.length;
  var mid = Math.floor((min + max) / 2);
  while (min != mid) {
    if (arr[mid] <= q) min = mid;
    else max = mid;
    mid = Math.floor((min + max) / 2);
  }
  return mid + 1;
}

function calcCuts(cuts, edgeCuts, edges, ini, end) {
  var mid = Math.floor((ini + end) / 2);
  if (mid == ini) return;
  edgeCuts[mid] = [mst(edges, nodes, cuts[mid]), cuts[mid]];
  var equalDown = sortedArrayEquals(edgeCuts[ini][0][0], edgeCuts[mid][0][0]);
  var equalUp = sortedArrayEquals(edgeCuts[end][0][0], edgeCuts[mid][0][0]);
  if (!equalDown) calcCuts(cuts, edgeCuts, edges, ini, mid);
  if (!equalUp) calcCuts(cuts, edgeCuts, edges, mid, end);
}

function sortedArrayEquals(a, b) {
  for (var i = 0; i < a.length; i++) if (a[i] != b[i]) return false;
  return true;
}

function addEdge(nodes, n1, n2, w, i) {
  if (nodes[n1 - 1] == undefined) nodes[n1 - 1] = [];
  if (nodes[n2 - 1] == undefined) nodes[n2 - 1] = [];

  nodes[n1 - 1].push([n2 - 1, w, i]);
  nodes[n2 - 1].push([n1 - 1, w, i]);
}

function mst(edges, nodes, q) {
  edges.clear();
  var visited = { 0: true };
  var nVisited = 1;
  var edgesOrder = [];
  var weightsOrder = [];
  var sum = 0;
  for (var edge of nodes[0])
    edges.add([edge[0], Math.abs(edge[1] - q), edge[2], edge[1]]);
  while (true) {
    var min = edges.pop();
    var node = min[0];
    if (!visited[node]) {
      visited[node] = true;
      edgesOrder.push(min[2]);
      weightsOrder.push(min[3]);
      sum += min[1];
      if (++nVisited == nodes.length) break;
      for (var edge of nodes[node]) {
        if (!visited[edge[0]])
          edges.add([edge[0], Math.abs(edge[1] - q), edge[2], edge[1]]);
      }
    }
  }
  return [
    edgesOrder.sort((a, b) => a - b),
    weightsOrder.sort((a, b) => a - b),
    sum
  ];
}
