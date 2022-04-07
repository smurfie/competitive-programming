function PriorityQueue(compare) {
  this.heap = [];
  this.elements = 0;
  this.compare = compare || ((a, b) => a - b);
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
  return this.elements > 0 ? this.heap[0] : undefined;
};

PriorityQueue.prototype.add = function (myVal) {
  this.heap[this.elements++] = myVal;

  var current = this.elements - 1;
  while (current > 0) {
    var up = (current - 1) >> 1;
    var upVal = this.heap[up];
    if (this.compare(upVal, myVal) < 0) break;
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
      this.compare(best, this.heap[rightChild]) > 0
    ) {
      best = this.heap[rightChild];
      leftChild = rightChild;
    }
    if (this.compare(myVal, best) < 0) {
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

var nodeParentHeightEdge = Array(n);
nodeParentHeightEdge[0] = [0, null, 0, null];
makeTree([0], { 0: true });

var sum = 0;
var currNodes = {};
var nonCurrNodes = { 0: true };
var nonCurrNodesSize = 1;
var queue = new PriorityQueue((a, b) => {
  var res = b[2] - a[2];
  return res == 0 ? a[1] - b[1] : res;
});
var toBeRemoved = {};
queue.add(nodeParentHeightEdge[0]);

var line = readline();
var lastResult = 0;
while (line != "0" && line != "3") {
  if (line == "2") {
    print(getEdges());
  } else {
    lastResult = activateNode(parseInt(line.split(" ")[1]) - 1);
    print(lastResult);
  }

  line = readline();
}

function makeTree(list, dict) {
  while (list.length > 0) {
    var n = list.shift();
    for (n2 of nodes[n]) {
      if (dict[n2] === undefined) {
        dict[n2] = true;
        nodeParentHeightEdge[n2] = [
          n2,
          n,
          nodeParentHeightEdge[n][2] + 1,
          edges[n + "," + n2]
        ];
        list.push(n2);
      }
    }
  }
}

function addEdge(n1, n2, i) {
  if (nodes[n1] == undefined) nodes[n1] = [];
  if (nodes[n2] == undefined) nodes[n2] = [];

  nodes[n1].push(n2);
  nodes[n2].push(n1);
  edges[n1 + "," + n2] = i;
  edges[n2 + "," + n1] = i;
}

function activateNode(n) {
  var node = nodeParentHeightEdge[n];
  queue.add(node);
  nonCurrNodes[n] = true;

  if (++nonCurrNodesSize % 2 != 0) return 0;
  return recalculate();
}

function recalculate() {
  while (queue.size() > 0) {
    var p = queue.peek();
    if (toBeRemoved[p[0]]) {
      queue.pop();
      delete toBeRemoved[p[0]];
    } else if (nonCurrNodes[p[1]]) {
      delete nonCurrNodes[p[0]];
      delete nonCurrNodes[p[1]];
      toBeRemoved[p[1]] = true;
      nonCurrNodesSize -= 2;
      queue.pop();
      sum += p[3];
      currNodes[p[0]] = [p[1], p[3]];
    } else if (currNodes[p[1]]) {
      delete nonCurrNodes[p[0]];
      queue.pop();
      var p2 = currNodes[p[1]];
      sum -= p2[1];
      queue.add(nodeParentHeightEdge[p2[0]]);
      nonCurrNodes[p2[0]] = true;
      delete currNodes[p[1]];
      currNodes[p[0]] = [p[1], p[3]];
      sum += p[3];
    } else {
      return 0;
    }
  }
  return sum;
}

function getEdges() {
  if (lastResult == 0) {
    return "0";
  } else {
    var res = [];
    for (n of Object.keys(currNodes)) res.push(currNodes[n][1]);
    res.sort((a, b) => a - b);
    return res.length + " " + res.join(" ");
  }
}
