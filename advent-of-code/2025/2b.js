(() => {
  function solve(input) {
    let lines = Utils.read(input);
    let ranges = lines[0].split(",");

    let sum = 0;
    for (let range of ranges) {
      let [start, end] = range.split("-").map(Number);
      if (start < 10) {
        start = 10;
      }

      while (start <= end) {
        let length = String(start).length;
        let min = Infinity;
        let minNext = Infinity;

        for (let divisor = 1; divisor <= Math.floor(length / 2); divisor++) {
          if (length % divisor === 0) {
            let part = String(start).slice(0, divisor);
            let partPlus = String(Number(part) + 1);
            let times = length / divisor;
            let complete = Number(part.repeat(times));
            let completePlus = Number(partPlus.repeat(times));
            if (complete >= start && complete < min) {
              min = complete;
            }
            if (completePlus < minNext) {
              minNext = completePlus;
            }
          }
        }

        if (min <= end && min <= minNext) {
          sum += min;
          min++;
        } else {
          min = minNext;
        }

        start = min;
      }
    }

    return sum;
  }

  let dataset = [];

  dataset.push({
    input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
    output: 4174379265,
  });

  dataset.push({
    input: `990244-1009337,5518069-5608946,34273134-34397466,3636295061-3636388848,8613701-8663602,573252-688417,472288-533253,960590-988421,7373678538-7373794411,178-266,63577667-63679502,70-132,487-1146,666631751-666711926,5896-10827,30288-52204,21847924-21889141,69684057-69706531,97142181-97271487,538561-555085,286637-467444,93452333-93519874,69247-119122,8955190262-8955353747,883317-948391,8282803943-8282844514,214125-236989,2518-4693,586540593-586645823,137643-211684,33-47,16210-28409,748488-837584,1381-2281,1-19`,
    output: 44143124633,
  });

  Utils.check(solve, dataset, "2b");
})();
