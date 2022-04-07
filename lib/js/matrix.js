function Matrix(m) {
  this.setMatrix(
    m ||
      Array(1)
        .fill()
        .map(() => Array(1).fill())
  );
}

Matrix.prototype.setMatrix = function (m) {
  this.m = m;
  this.h = m.length;
  this.w = m[0].length;
};

Matrix.prototype.readFromArr = function (arr) {
  this.setMatrix(arr.map((i) => i.split("")));
};

Matrix.prototype.readFromStr = function (str) {
  this.setMatrix(str.split("\n").map((i) => i.split("")));
};

Matrix.prototype.hash = function () {
  return this.m.map((i) => i.join("")).join("");
};

Matrix.prototype.count = function (el) {
  var count = 0;
  for (var i = 0; i < this.h; i++) {
    for (var j = 0; j < this.w; j++) {
      if (this.m[i][j] == el) count++;
    }
  }
  return count;
};

Matrix.prototype.applyAllFun = function (fun) {
  for (var i = 0; i < this.h; i++) {
    for (var j = 0; j < this.w; j++) {
      this.m[i][j] = fun(this.m[i][j]);
    }
  }
};

Matrix.prototype.countAdj = function (i, j, el, diagonals) {
  var count = 0;
  if (i > 0 && j > 0 && diagonals && this.m[i - 1][j - 1] == el) count++;
  if (i > 0 && this.m[i - 1][j] == el) count++;
  if (i > 0 && j < this.w - 1 && diagonals && this.m[i - 1][j + 1] == el)
    count++;
  if (j > 0 && this.m[i][j - 1] == el) count++;
  if (j < this.w - 1 && this.m[i][j + 1] == el) count++;
  if (i < this.h - 1 && j > 0 && diagonals && this.m[i + 1][j - 1] == el)
    count++;
  if (i < this.h - 1 && this.m[i + 1][j] == el) count++;
  if (
    i < this.h - 1 &&
    j < this.w - 1 &&
    diagonals &&
    this.m[i + 1][j + 1] == el
  )
    count++;
  return count;
};

Matrix.prototype.countAdjFun = function (i, j, fun, diagonals) {
  var count = 0;
  if (i > 0 && j > 0 && diagonals && fun(this.m[i - 1][j - 1])) count++;
  if (i > 0 && fun(this.m[i - 1][j])) count++;
  if (i > 0 && j < this.w - 1 && diagonals && fun(this.m[i - 1][j + 1]))
    count++;
  if (j > 0 && fun(this.m[i][j - 1])) count++;
  if (j < this.w - 1 && fun(this.m[i][j + 1])) count++;
  if (i < this.h - 1 && j > 0 && diagonals && fun(this.m[i + 1][j - 1]))
    count++;
  if (i < this.h - 1 && fun(this.m[i + 1][j])) count++;
  if (
    i < this.h - 1 &&
    j < this.w - 1 &&
    diagonals &&
    fun(this.m[i + 1][j + 1])
  )
    count++;
  return count;
};
