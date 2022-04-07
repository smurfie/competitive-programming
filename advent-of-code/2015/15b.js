(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var ingredients = [];
    var max = 0;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].split(" ");
      var ingredient = [];
      ingredient.push(parseInt(line[2].slice(0, -1)));
      ingredient.push(parseInt(line[4].slice(0, -1)));
      ingredient.push(parseInt(line[6].slice(0, -1)));
      ingredient.push(parseInt(line[8].slice(0, -1)));
      ingredient.push(parseInt(line[10]));
      ingredients.push(ingredient);
    }

    var permuts = permutations(100, ingredients.length);

    for (var i = 0; i < permuts.length; i++) {
      var i1 = 0;
      var i2 = 0;
      var i3 = 0;
      var i4 = 0;
      var i5 = 0;
      for (var j = 0; j < ingredients.length; j++) {
        i1 += permuts[i][j] * ingredients[j][0];
        i2 += permuts[i][j] * ingredients[j][1];
        i3 += permuts[i][j] * ingredients[j][2];
        i4 += permuts[i][j] * ingredients[j][3];
        i5 += permuts[i][j] * ingredients[j][4];
      }
      if (i5 == 500) {
        i1 = Math.max(0, i1);
        i2 = Math.max(0, i2);
        i3 = Math.max(0, i3);
        i4 = Math.max(0, i4);
        max = Math.max(max, i1 * i2 * i3 * i4);
      }
    }

    return max;
  }

  function permutations(size, length) {
    if (length <= 1) return [[size]];
    else {
      var permuts = [];
      for (var i = 0; i <= size; i++) {
        permuts = permuts.concat(
          permutations(size - i, length - 1).map((j) => [i].concat(j))
        );
      }
      return permuts;
    }
  }

  var dataset = [];

  dataset.push({
    input: `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`,
    output: 57600000
  });

  dataset.push({
    input: `Sprinkles: capacity 2, durability 0, flavor -2, texture 0, calories 3
Butterscotch: capacity 0, durability 5, flavor -3, texture 0, calories 3
Chocolate: capacity 0, durability 0, flavor 5, texture -1, calories 8
Candy: capacity 0, durability -1, flavor 0, texture 5, calories 8`,
    output: 1766400
  });

  Utils.check(solve, dataset, "15b");
})();
