(() => {
  var mul;
  var add;
  function solve(input, cards, card, times) {
    var lines = Utils.read(input);

    var pos = card;
    mul = 1;
    add = 0;
    for (var line of lines) {
      if (line.startsWith("cut")) {
        pos = cut(pos, cards, parseInt(line.split(" ")[1]));
      } else if (line.startsWith("deal with")) {
        pos = dealW(pos, cards, parseInt(line.split(" ")[3]));
      } else {
        pos = dealN(pos, cards);
      }
      add += cards;
      add %= cards;
      mul += cards;
      mul %= cards;
    }
    var bCard = BigInt(card);
    var bCards = BigInt(cards);
    var bAdd = BigInt(add);
    var bMul = BigInt(mul);
    var bTimes = BigInt(times);

    // As this is the other way around (instead of finding the position of certain card, we have to find
    // the card in certain position, we have to inverse the mul and add)
    bMul = Utils.modInverse(bMul, bCards);
    bAdd = bCards - ((bMul * bAdd) % bCards);
    // The formula is:
    // ((card*mul+add) * mul + add)*mul+add... bTimes times=
    // card*mul^times + mul^(times-1)*add + mul^(times-2)*add... = (the second part is geometrical sum)
    // card*mul^times + add*(1-mul^times)/(1-mul) =
    // card*mul^times + add*(mul^times-1)/(mul-1)
    // We have to apply modulus properties now. As bCards is prime any number is coprime with it so we
    // can apply the modular multiplicative inverse
    var bPow = Utils.powMod(bMul, bTimes, bCards);
    var first = (bCard * bPow) % bCards;
    var second =
      (bAdd * (bPow - 1n) * Utils.modInverse(bMul - 1n, bCards)) % bCards;
    return (first + second) % bCards;
  }

  function cut(pos, n, c) {
    add -= c;
    return (pos - c + n) % n;
  }

  function dealN(pos, n) {
    add *= -1;
    add -= 1;
    mul *= -1;
    return n - 1 - pos;
  }

  function dealW(pos, n, c) {
    mul *= c;
    add *= c;
    return (pos * c) % n;
  }

  var dataset = [];

  dataset.push({
    input: `deal with increment 15
cut -4394
deal with increment 9
deal into new stack
cut -8068
deal with increment 15
deal into new stack
cut 1470
deal into new stack
cut 4151
deal into new stack
cut -2438
deal into new stack
cut 9852
deal with increment 50
cut -953
deal with increment 8
cut -2836
deal with increment 30
cut -2419
deal into new stack
cut 2759
deal with increment 66
cut 1127
deal with increment 66
cut 2194
deal with increment 48
cut 4710
deal with increment 49
deal into new stack
deal with increment 59
deal into new stack
deal with increment 25
deal into new stack
deal with increment 60
cut -2003
deal with increment 2
cut -6166
deal with increment 26
cut -6179
deal with increment 4
cut 373
deal with increment 53
cut 6849
deal with increment 13
cut 625
deal with increment 68
cut 4084
deal with increment 53
cut -6939
deal into new stack
cut -3416
deal with increment 39
cut -2671
deal with increment 64
deal into new stack
deal with increment 75
cut 7654
deal into new stack
cut -5431
deal with increment 66
cut -370
deal into new stack
cut 3316
deal with increment 31
cut 312
deal with increment 22
cut 71
deal with increment 21
cut 562
deal with increment 27
cut 8611
deal with increment 67
cut 8358
deal with increment 7
cut -2957
deal with increment 71
cut 1740
deal with increment 31
cut -9577
deal with increment 59
cut 6104
deal with increment 40
cut -8862
deal with increment 17
cut 2516
deal with increment 34
cut 9594
deal into new stack
cut 5182
deal with increment 72
cut -2630
deal into new stack
cut -9018
deal with increment 45
cut -1069
deal with increment 28
cut 358
deal into new stack
cut -2244`,
    cards: 119315717514047,
    card: 2020,
    times: 101741582076661,
    output: 91967327971097
  });

  Utils.check(solve, dataset, "22b");
})();
