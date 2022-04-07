(() => {
  function solve(input) {
    // As each initial index is > arr.length/2. We have to only calculate the numbers from lastIndex
    // to last, because the previous ones don't impact on the result
    // The last number of each iteration is itself, and each previous one you have to add
    // the previous value
    var initialIndex = parseInt(input.substring(0, 7));
    var totalLength = input.length * 10000;
    var neededLength = totalLength - initialIndex;
    var repeats = Math.ceil(neededLength / input.length);
    var arr = input
      .repeat(repeats)
      .split("")
      .map((i) => parseInt(i));
    arr.splice(0, arr.length - neededLength);
    for (var i = 0; i < 100; i++) {
      arr = fft(arr);
    }
    return arr.join("").substring(0, 8);
  }

  function fft(arr) {
    var arr2 = new Array(arr.length);
    arr2[arr.length - 1] = arr[arr.length - 1];
    for (var i = arr.length - 2; i >= 0; i--) {
      arr2[i] = (arr2[i + 1] + arr[i]) % 10;
    }
    return arr2;
  }

  var dataset = [];

  dataset.push({
    input: `03036732577212944063491565474664`,
    output: "84462026"
  });

  dataset.push({
    input: `02935109699940807407585447034323`,
    output: "78725270"
  });

  dataset.push({
    input: `03081770884921959731165446850517`,
    output: "53553731"
  });

  dataset.push({
    input: `59740570066545297251154825435366340213217767560317431249230856126186684853914890740372813900333546650470120212696679073532070321905251098818938842748495771795700430939051767095353191994848143745556802800558539768000823464027739836197374419471170658410058272015907933865039230664448382679990256536462904281204159189130560932257840180904440715926277456416159792346144565015659158009309198333360851441615766440174908079262585930515201551023564548297813812053697661866316093326224437533276374827798775284521047531812721015476676752881281681617831848489744836944748112121951295833143568224473778646284752636203058705797036682752546769318376384677548240590`,
    output: "32749588"
  });

  Utils.check(solve, dataset, "16b");
})();
