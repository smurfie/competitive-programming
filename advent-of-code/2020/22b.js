(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var i = 1;
    var p1 = [];
    var p2 = [];
    while (lines[i] != "") {
      p1.push(parseInt(lines[i]));
      i++;
    }

    i += 2;
    while (i < lines.length) {
      p2.push(parseInt(lines[i]));
      i++;
    }

    playGame(p1, p2);

    if (p1.length == 0) p1 = p2;
    return p1.reduce((a, b, i) => a + b * (p1.length - i), 0);
  }

  function playGame(p1, p2) {
    var dict = {};
    while (p1.length > 0 && p2.length > 0) {
      if (dict[hash(p1, p2)]) return 1;
      dict[hash(p1, p2)] = true;
      var el1 = p1.shift();
      var el2 = p2.shift();
      var winner = 0;
      if (el1 <= p1.length && el2 <= p2.length) {
        winner = playGame(p1.slice(0, el1), p2.slice(0, el2));
      }
      if (winner == 1 || (winner == 0 && el1 > el2)) {
        p1.push(el1);
        p1.push(el2);
      } else {
        p2.push(el2);
        p2.push(el1);
      }
    }
    return p1.length > 0 ? 1 : 2;
  }

  function hash(p1, p2) {
    return p1.join(",") + ";" + p2.join(",");
  }

  var dataset = [];

  dataset.push({
    input: `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`,
    output: 291
  });

  dataset.push({
    input: `Player 1:
12
48
26
22
44
16
31
19
30
10
40
47
21
27
2
46
9
15
23
6
50
28
5
42
34

Player 2:
14
45
4
24
1
7
36
29
38
33
3
13
11
17
39
43
8
41
32
37
35
49
20
18
25`,
    output: 32949
  });

  Utils.check(solve, dataset, "22b");
})();
