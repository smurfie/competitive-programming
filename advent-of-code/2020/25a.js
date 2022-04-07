(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var cardPK = parseInt(lines[0]);
    var doorPK = parseInt(lines[1]);
    var value = 1;
    var sn = 7;
    var loopCard = 0;
    var loopDoor = 0;
    var limit = 20201227;

    // This
    while (value != cardPK) {
      loopCard++;
      value *= sn;
      value %= limit;
    }

    value = 1;
    sn = doorPK;
    while (loopCard--) {
      value *= sn;
      value %= limit;
    }

    // Or
    // value = 1;
    // while (value != doorPK) {
    //   loopDoor++;
    //   value *= sn;
    //   value %= limit;
    // }

    // value = 1;
    // sn = cardPK;
    // while (loopDoor--) {
    //   value *= sn;
    //   value %= limit;
    // }

    return value;
  }

  var dataset = [];

  dataset.push({
    input: `5764801
17807724`,
    output: 14897079
  });

  dataset.push({
    input: `17607508
15065270`,
    output: 12285001
  });

  Utils.check(solve, dataset, "25a");
})();
