(() => {
  function solve(input) {
    var str = input.split(": ")[1];
    var coords = str.split(", ");
    var xmin = parseInt(coords[0].split("..")[0].substring(2));
    var xmax = parseInt(coords[0].split("..")[1]);
    var ymin = parseInt(coords[1].split("..")[0].substring(2));
    var ymax = parseInt(coords[1].split("..")[1]);

    var max = 0;
    for (var x = 1; x <= xmax; x++) {
      for (var y = -ymin; y >= ymin; y--) {
        if (y > max && impact(x, y, xmin, xmax, ymin, ymax)) {
          max = y;
        }
      }
    }

    return (max * (max + 1)) / 2;
  }

  function impact(vx, vy, xmin, xmax, ymin, ymax) {
    var x = 0;
    var y = 0;
    for (;;) {
      if (x >= xmin && x <= xmax && y >= ymin && y <= ymax) return true;
      if (y < ymin) return false;
      if (x > xmax) return false;
      if (vx == 0 && x < xmin) return false;
      x += vx;
      y += vy;
      vx = Math.max(0, vx - 1);
      vy--;
    }
  }

  var dataset = [];

  dataset.push({
    input: `target area: x=20..30, y=-10..-5`,
    output: 45
  });

  dataset.push({
    input: `target area: x=48..70, y=-189..-148`,
    output: 17766
  });

  Utils.check(solve, dataset, "17a");
})();
