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
