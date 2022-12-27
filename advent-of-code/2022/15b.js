(() => {
  function solve(input, maxX, maxY) {
    var lines = Utils.read(input);
    var emptys = [
      [0, 0],
      [0, maxY],
      [maxX, 0],
      [maxX, maxY]
    ];

    var diags = [];
    var diagsInv = [];

    // We know that a point exists that is not inside any radar. We can asume that this point
    // has some cross of diagonals in its sorroundings except for the corners that could be isolated with only one diagonal:
    // Corner case (The numbers are the limits of an area, the x are multiple limits of different areas):
    // ---1----
    // |.1ooooo
    // |1oooooo
    // 1ooooooo
    // Other cases 1 (Cross between different areas - to simplify we print the case in the edge)
    // o1o2ooo
    // ooxoooo
    // o2.1ooo
    // -------
    // Other cases 2 (Cross between same areas, corners of that areas - to simplify we print the case in the edge)
    // o1o1o3o
    // 2oxo3oo
    // ox.xooo (Here the point is sorrounded by corners of non colliding areas)
    // 2---3--
    // Other cases 3 (Cross between different areas, not in an integer point - to simplify we print the case in the edge)
    // 4o32o1o (Between this line and the next 3 crosses 2)
    // o4231oo (Between this line and the next 3 crosses 1)
    // 42.13oo
    // -----3-
    // In any of these cases the point is always at at-max 1,5 distance (horizontally and/or vertically of the cross)
    // So we only need to
    // 1. For each area define its 4 diagonal (2 normal, 2 inverse)
    // 2. For each pair of diag-diagInv calculate its crossing points if they exist
    // 3. For each one of that points, add to a list all the points that are at max 1,5 distance horizontally/vertically
    // 4. For each point of the list check if it belongs to an area, and if a point don't belong to any area then we have it

    for (var line of lines) {
      var els = line.split(/[ ,:=]/);
      var sX = Number(els[3]);
      var sY = Number(els[6]);
      var bX = Number(els[13]);
      var bY = Number(els[16]);
      var manhattan = Math.abs(sX - bX) + Math.abs(sY - bY);

      // 1. For each area define its 4 diagonal (2 normal, 2 inverse)
      diags.push({ xIni: sX - manhattan, xEnd: sX, inc: sY + manhattan - sX }); // y=inc+x
      diags.push({ xIni: sX, xEnd: sX + manhattan, inc: sY - manhattan - sX });
      diagsInv.push({
        xIni: sX - manhattan,
        xEnd: sX,
        inc: sY - manhattan + sX
      }); // y=inc-x
      diagsInv.push({
        xIni: sX,
        xEnd: sX + manhattan,
        inc: sY + manhattan + sX
      });
    }

    // 2. For each pair of diag-diagInv calculate its crossing points if they exist
    for (var diag1 of diags) {
      for (var diag2 of diagsInv) {
        // inc1+x=inc2-x -> x=(inc2-inc1)/2
        var x = (diag2.inc - diag1.inc) / 2;
        if (
          x >= 0 &&
          x <= maxX &&
          x >= diag1.xIni &&
          x <= diag1.xEnd &&
          x >= diag2.xIni &&
          x <= diag2.xEnd
        ) {
          var y = x + diag1.inc;

          // 3. For each one of that points, add to a list all the points that are at max 1,5 distance horizontally/vertically
          for (var i = Math.floor(x) - 1; i <= Math.ceil(x) + 1; i++) {
            for (var j = Math.floor(y) - 1; j <= Math.ceil(y) + 1; j++) {
              if (i >= 0 && i <= maxX && j >= 0 && j <= maxY) {
                emptys.push([i, j]);
              }
            }
          }
        }
      }
    }

    // 4. For each point of the list check if it belongs to an area, and if a point don't belong to any area then we have it
    for (var point of emptys) {
      var possible = true;
      for (var i = 0; i < lines.length && possible; i++) {
        var line = lines[i];
        var els = line.split(/[ ,:=]/);
        var sX = Number(els[3]);
        var sY = Number(els[6]);
        var bX = Number(els[13]);
        var bY = Number(els[16]);
        var manhattan = Math.abs(sX - bX) + Math.abs(sY - bY);
        var manhattan2 = Math.abs(sX - point[0]) + Math.abs(sY - point[1]);
        possible = manhattan2 > manhattan;
      }
      if (possible) {
        return 4000000 * point[0] + point[1];
      }
    }
    return 0;
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
    maxX: 20,
    maxY: 20,
    output: 56000011
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
    maxX: 4000000,
    maxY: 4000000,
    output: 13743542639657
  });

  Utils.check(solve, dataset, "15b");
})();
