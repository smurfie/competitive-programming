(() => {
  function solve(input, moves) {
    var arr = input.split("").map((i) => parseInt(i));
    var currentId = 0;
    var n = arr.length;

    for (var i = 0; i < moves; i++) {
      var current = arr[currentId];
      var part = arr.splice(currentId + 1, 3);
      var j = current - 1;
      if (j == 0) j = n;
      var insertId = arr.indexOf(j);
      while (insertId == -1) {
        j--;
        if (j == 0) j = n;
        insertId = arr.indexOf(j);
      }
      arr.splice(insertId + 1, 0, ...part);
      if (insertId < currentId) currentId += 4;
      else currentId++;
      while (currentId > 0) {
        arr.push(arr.shift());
        currentId--;
      }
    }

    while (arr[0] != 1) {
      arr.push(arr.shift());
      currentId--;
    }

    return arr.join("").substring(1);
  }

  var dataset = [];

  dataset.push({
    input: `389125467`,
    moves: 10,
    output: 92658374
  });

  dataset.push({
    input: `389125467`,
    moves: 100,
    output: 67384529
  });

  dataset.push({
    input: `784235916`,
    moves: 100,
    output: 53248976
  });

  Utils.check(solve, dataset, "23a");
})();
