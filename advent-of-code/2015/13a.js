(() => {
  function solve(input) {
    var lines = Utils.read(input);

    lines = lines.map((i) => i.substring(0, i.length - 1));

    var max = 0;
    var persons = new Set();
    var happiness = {};

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var happy = parseInt(line.split(" ")[3]);
      if (line.split(" ")[2] == "lose") happy = -happy;
      var person1 = line.split(" ")[0];
      var person2 = line.split(" ")[10];

      persons.add(person1);
      persons.add(person2);
      if (!happiness[person1]) happiness[person1] = {};
      happiness[person1][person2] = happy;
    }

    var permuts = permutations(Array.from(persons));
    for (var i = 0; i < permuts.length; i++) {
      var happy = 0;
      var permut = permuts[i];
      for (var j = 1; j < permut.length; j++) {
        happy += happiness[permut[j - 1]][permut[j]];
        happy += happiness[permut[j]][permut[j - 1]];
      }
      happy += happiness[permut[0]][permut[permut.length - 1]];
      happy += happiness[permut[permut.length - 1]][permut[0]];
      max = Math.max(max, happy);
    }

    return max;
  }

  function permutations(arr) {
    var results = [];
    if (arr.length > 0) {
      var first = arr[0];
      var arr = arr.slice(1);
      var partial = permutations(arr);
      for (var i = 0; i < partial.length; i++) {
        var partialSol = partial[i];
        for (var j = 0; j <= partialSol.length; j++) {
          var partialSolb = [...partialSol];
          partialSolb.splice(j, 0, first);
          results.push(partialSolb);
        }
      }
    } else {
      results.push([]);
    }
    return results;
  }

  var dataset = [];

  dataset.push({
    input: `Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.`,
    output: 330
  });

  dataset.push({
    input: `Alice would lose 2 happiness units by sitting next to Bob.
Alice would lose 62 happiness units by sitting next to Carol.
Alice would gain 65 happiness units by sitting next to David.
Alice would gain 21 happiness units by sitting next to Eric.
Alice would lose 81 happiness units by sitting next to Frank.
Alice would lose 4 happiness units by sitting next to George.
Alice would lose 80 happiness units by sitting next to Mallory.
Bob would gain 93 happiness units by sitting next to Alice.
Bob would gain 19 happiness units by sitting next to Carol.
Bob would gain 5 happiness units by sitting next to David.
Bob would gain 49 happiness units by sitting next to Eric.
Bob would gain 68 happiness units by sitting next to Frank.
Bob would gain 23 happiness units by sitting next to George.
Bob would gain 29 happiness units by sitting next to Mallory.
Carol would lose 54 happiness units by sitting next to Alice.
Carol would lose 70 happiness units by sitting next to Bob.
Carol would lose 37 happiness units by sitting next to David.
Carol would lose 46 happiness units by sitting next to Eric.
Carol would gain 33 happiness units by sitting next to Frank.
Carol would lose 35 happiness units by sitting next to George.
Carol would gain 10 happiness units by sitting next to Mallory.
David would gain 43 happiness units by sitting next to Alice.
David would lose 96 happiness units by sitting next to Bob.
David would lose 53 happiness units by sitting next to Carol.
David would lose 30 happiness units by sitting next to Eric.
David would lose 12 happiness units by sitting next to Frank.
David would gain 75 happiness units by sitting next to George.
David would lose 20 happiness units by sitting next to Mallory.
Eric would gain 8 happiness units by sitting next to Alice.
Eric would lose 89 happiness units by sitting next to Bob.
Eric would lose 69 happiness units by sitting next to Carol.
Eric would lose 34 happiness units by sitting next to David.
Eric would gain 95 happiness units by sitting next to Frank.
Eric would gain 34 happiness units by sitting next to George.
Eric would lose 99 happiness units by sitting next to Mallory.
Frank would lose 97 happiness units by sitting next to Alice.
Frank would gain 6 happiness units by sitting next to Bob.
Frank would lose 9 happiness units by sitting next to Carol.
Frank would gain 56 happiness units by sitting next to David.
Frank would lose 17 happiness units by sitting next to Eric.
Frank would gain 18 happiness units by sitting next to George.
Frank would lose 56 happiness units by sitting next to Mallory.
George would gain 45 happiness units by sitting next to Alice.
George would gain 76 happiness units by sitting next to Bob.
George would gain 63 happiness units by sitting next to Carol.
George would gain 54 happiness units by sitting next to David.
George would gain 54 happiness units by sitting next to Eric.
George would gain 30 happiness units by sitting next to Frank.
George would gain 7 happiness units by sitting next to Mallory.
Mallory would gain 31 happiness units by sitting next to Alice.
Mallory would lose 32 happiness units by sitting next to Bob.
Mallory would gain 95 happiness units by sitting next to Carol.
Mallory would gain 91 happiness units by sitting next to David.
Mallory would lose 66 happiness units by sitting next to Eric.
Mallory would lose 75 happiness units by sitting next to Frank.
Mallory would lose 99 happiness units by sitting next to George.`,
    output: 664
  });

  Utils.check(solve, dataset, "13a");
})();
