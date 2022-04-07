function DSU(elements) {
  this.size = elements.length;
  this.parent = {};
  elements.forEach((el) => {
    this.parent[el] = el;
  });
}

DSU.prototype.find = function (el) {
  while (this.parent[el] != el) el = this.parent[el];
  return el;
};

DSU.prototype.union = function (el1, el2) {
  var set1 = this.find(el1);
  var set2 = this.find(el2);
  if (set1 == set2) return;
  if (set1 < set2) {
    if (this.parent[el2] != el2) this.union(this.parent[el2], el1);
    this.parent[el2] = this.parent[el1];
  } else {
    if (this.parent[el1] != el1) this.union(this.parent[el1], el2);
    this.parent[el1] = this.parent[el2];
  }
};
