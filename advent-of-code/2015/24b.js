(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var weights = lines.map((i) => parseInt(i));
    var exactWeight = Utils.sum(weights) / 4;

    var minWeights = Infinity;
    var minQE = Infinity;

    var weights = weights.sort((a, b) => a - b);
    var initialState = {
      weights: weights,
      a: [],
      remaining: []
    };

    [minWeights, minQE] = calculate(
      initialState,
      exactWeight,
      minWeights,
      minQE
    );

    return minQE;
  }

  function NoBetterSolutionPossible(state, exactWeight, minWeights, minQE) {
    var arr = state.a;
    var sum = Utils.sum(arr);
    var remaining = exactWeight - sum;
    var prod = Utils.prod(arr);
    return (
      Utils.sum(state.weights) + Utils.sum(arr) < exactWeight ||
      arr.length > minWeights ||
      (arr.length == minWeights && prod >= minQE) ||
      (arr.length == minWeights - 1 && prod * remaining >= minQE)
    );
  }

  function calculate(state, exactWeight, minWeights, minQE) {
    if (NoBetterSolutionPossible(state, exactWeight, minWeights))
      return [minWeights, minQE];
    if (state.weights.length == 0) {
      if (
        Utils.sum(state.a) == exactWeight &&
        (state.a.length < minWeights ||
          (state.a.length == minWeights && Utils.prod(state.a) < minQE))
      ) {
        minWeights = state.a.length;
        minQE = Utils.prod(state.a);
        // For correctnes we should check that the remaining weights could be arranged in the other slots
      }
      return [minWeights, minQE];
    }
    var first = state.weights.pop();
    var newState = Utils.duplicate(state);
    if (Utils.sum(newState.a) + first <= exactWeight) {
      newState.a.push(first);
      [minWeights, minQE] = calculate(newState, exactWeight, minWeights, minQE);
      newState = Utils.duplicate(state);
    }
    newState.remaining.push(first);
    [minWeights, minQE] = calculate(newState, exactWeight, minWeights, minQE);
    return [minWeights, minQE];
  }

  var dataset = [];

  dataset.push({
    input: `1
2
3
4
5
7
8
9
10
11`,
    output: 44
  });

  dataset.push({
    input: `1
3
5
11
13
17
19
23
29
31
41
43
47
53
59
61
67
71
73
79
83
89
97
101
103
107
109
113`,
    output: 77387711
  });

  Utils.check(solve, dataset, "24b");
})();
