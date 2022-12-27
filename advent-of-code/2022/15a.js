(() => {
  function solve(input, y) {
    var lines = Utils.read(input);
    var arrNotBeacons = [];
    var arrBeacons = [];
    var setBeacons = new Set();

    for (var line of lines) {
      var els = line.split(/[ ,:=]/);
      var sX = Number(els[3]);
      var sY = Number(els[6]);
      var bX = Number(els[13]);
      var bY = Number(els[16]);
      var manhattan = Math.abs(sX - bX) + Math.abs(sY - bY);
      var distY = Math.abs(y - sY);
      var distX = manhattan - distY;
      if (distX >= 0) {
        arrNotBeacons.push([sX - distX, sX + distX]);
      }
      if (bY == y) {
        setBeacons.add(bX);
      }
    }
    arrNotBeacons.sort((a, b) => {
      var res = a[0] - b[0];
      return res === 0 ? a[1] - b[1] : res;
    });
    arrBeacons = Array.from(setBeacons).sort((a, b) => a - b);

    var sum = 0;
    var j = 0;
    var max = -Infinity;
    for (var i = 0; i < arrNotBeacons.length; i++) {
      var [x1, x2] = arrNotBeacons[i];
      if (x1 <= max) {
        x1 = max + 1;
      }
      if (x2 >= x1) {
        max = x2;
        sum += x2 - x1 + 1;
        while (j < arrBeacons.length && arrBeacons[j] <= x2) {
          if (arrBeacons[j] >= x1) {
            sum--;
          }
          j++;
        }
      }
    }

    return sum;
  }

  var dataset = [];

  dataset.push({
    input: `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`,
    y: 10,
    output: 26
  });

  dataset.push({
    input: `Sensor at x=3842919, y=126080: closest beacon is at x=3943893, y=1918172
Sensor at x=406527, y=2094318: closest beacon is at x=-1066, y=1333278
Sensor at x=2208821, y=3683408: closest beacon is at x=2914373, y=3062268
Sensor at x=39441, y=1251806: closest beacon is at x=-1066, y=1333278
Sensor at x=3093352, y=2404566: closest beacon is at x=2810772, y=2699609
Sensor at x=3645473, y=2234498: closest beacon is at x=3943893, y=1918172
Sensor at x=3645012, y=2995540: closest beacon is at x=4001806, y=2787325
Sensor at x=18039, y=3083937: closest beacon is at x=103421, y=3007511
Sensor at x=2375680, y=551123: closest beacon is at x=2761373, y=2000000
Sensor at x=776553, y=123250: closest beacon is at x=-1066, y=1333278
Sensor at x=2884996, y=2022644: closest beacon is at x=2761373, y=2000000
Sensor at x=1886537, y=2659379: closest beacon is at x=2810772, y=2699609
Sensor at x=3980015, y=3987237: closest beacon is at x=3844688, y=3570059
Sensor at x=3426483, y=3353349: closest beacon is at x=3844688, y=3570059
Sensor at x=999596, y=1165648: closest beacon is at x=-1066, y=1333278
Sensor at x=2518209, y=2287271: closest beacon is at x=2761373, y=2000000
Sensor at x=3982110, y=3262128: closest beacon is at x=3844688, y=3570059
Sensor at x=3412896, y=3999288: closest beacon is at x=3844688, y=3570059
Sensor at x=2716180, y=2798731: closest beacon is at x=2810772, y=2699609
Sensor at x=3575486, y=1273265: closest beacon is at x=3943893, y=1918172
Sensor at x=7606, y=2926795: closest beacon is at x=103421, y=3007511
Sensor at x=2719370, y=2062251: closest beacon is at x=2761373, y=2000000
Sensor at x=1603268, y=1771299: closest beacon is at x=2761373, y=2000000
Sensor at x=3999678, y=1864727: closest beacon is at x=3943893, y=1918172
Sensor at x=3157947, y=2833781: closest beacon is at x=2914373, y=3062268
Sensor at x=3904662, y=2601010: closest beacon is at x=4001806, y=2787325
Sensor at x=3846359, y=1608423: closest beacon is at x=3943893, y=1918172
Sensor at x=2831842, y=3562642: closest beacon is at x=2914373, y=3062268
Sensor at x=3157592, y=1874755: closest beacon is at x=2761373, y=2000000
Sensor at x=934300, y=2824967: closest beacon is at x=103421, y=3007511
Sensor at x=3986911, y=1907590: closest beacon is at x=3943893, y=1918172
Sensor at x=200888, y=3579976: closest beacon is at x=103421, y=3007511
Sensor at x=967209, y=3837958: closest beacon is at x=103421, y=3007511
Sensor at x=3998480, y=1972726: closest beacon is at x=3943893, y=1918172`,
    y: 2000000,
    output: 4748135
  });

  Utils.check(solve, dataset, "15a");
})();
