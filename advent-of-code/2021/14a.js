(() => {
  function solve(input, steps) {
    var lines = Utils.read(input);
    var str = lines[0];
    var rules = {};
    var i = 2;

    while (i < lines.length) {
      var line = lines[i].split(" -> ");
      rules[line[0]] = line[1];
      i++;
    }

    var pairs = {};
    for (var i = 1; i < str.length; i++) {
      var pair = str[i - 1] + str[i];
      add(pair, pairs, 1);
    }

    for (var i = 0; i < steps; i++) {
      var pairs2 = {};
      for (var pair in pairs) {
        var insert = rules[pair];
        var pair1 = pair[0] + insert;
        var pair2 = insert + pair[1];
        add(pair1, pairs2, pairs[pair]);
        add(pair2, pairs2, pairs[pair]);
      }
      pairs = pairs2;
    }

    var letters = {};
    for (var pair in pairs) {
      add(pair[0], letters, pairs[pair]);
      add(pair[1], letters, pairs[pair]);
    }
    add(str[0], letters, 1);
    add(str[str.length - 1], letters, 1);

    var max = 0;
    var min = Infinity;
    for (var letter in letters) {
      max = Math.max(max, letters[letter]);
      min = Math.min(min, letters[letter]);
    }

    return (max - min) / 2;
  }

  function add(el, dict, times) {
    dict[el] = dict[el] || 0;
    dict[el] += times;
  }

  var dataset = [];

  dataset.push({
    input: `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`,
    steps: 10,
    output: 1588
  });

  dataset.push({
    input: `NBOKHVHOSVKSSBSVVBCS

SN -> H
KP -> O
CP -> V
FN -> P
FV -> S
HO -> S
NS -> N
OP -> C
HC -> S
NP -> B
CF -> V
NN -> O
OS -> F
VO -> V
HK -> N
SV -> V
VC -> V
PH -> K
NH -> O
SB -> N
KS -> V
CB -> H
SS -> P
SP -> H
VN -> K
VP -> O
SK -> V
VF -> C
VV -> B
SF -> K
HH -> K
PV -> V
SO -> H
NK -> P
NO -> C
ON -> S
PB -> K
VS -> H
SC -> P
HS -> P
BS -> P
CS -> P
VB -> V
BP -> K
FH -> O
OF -> F
HF -> F
FS -> C
BN -> O
NC -> F
FC -> B
CV -> V
HN -> C
KF -> K
OO -> P
CC -> S
FF -> C
BC -> P
PP -> F
KO -> V
PC -> B
HB -> H
OB -> N
OV -> S
KH -> B
BO -> B
HV -> P
BV -> K
PS -> F
CH -> C
SH -> H
OK -> V
NB -> K
BF -> S
CO -> O
NV -> H
FB -> K
FO -> C
CK -> P
BH -> B
OH -> F
KB -> N
OC -> K
KK -> O
CN -> H
FP -> K
VH -> K
VK -> P
HP -> S
FK -> F
BK -> H
KV -> V
BB -> O
KC -> F
KN -> C
PO -> P
NF -> P
PN -> S
PF -> S
PK -> O`,
    steps: 10,
    output: 3342
  });

  Utils.check(solve, dataset, "14a");
})();
