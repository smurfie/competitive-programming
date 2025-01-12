(() => {
  function solve(input) {
    let lines = Utils.read(input);
    let matrix = lines.map((i) => i.split(""));
    let antennas = {};
    let antinodes = {};

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] !== ".") {
          let antenna = matrix[i][j];
          if (!antennas[antenna]) {
            antennas[antenna] = [];
          }
          antennas[antenna].push([i, j]);
        }
      }
    }

    for (let points of Object.values(antennas)) {
      for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
          if (i !== j) {
            let [p1x, p1y] = points[i];
            let [p2x, p2y] = points[j];
            let antinodeX = 2 * p1x - p2x;
            let antinodeY = 2 * p1y - p2y;
            if (
              inRange(
                antinodeX,
                antinodeY,
                matrix.length - 1,
                matrix[0].length - 1
              )
            ) {
              antinodes[antinodeX + "," + antinodeY] = true;
            }
          }
        }
      }
    }

    return Object.keys(antinodes).length;
  }

  function inRange(x, y, xMax, yMax) {
    return x >= 0 && x <= xMax && y >= 0 && y <= yMax;
  }

  let dataset = [];

  dataset.push({
    input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
    output: 14,
  });

  dataset.push({
    input: `.....................U.........w..................
l.................................................
...........o.a................U...w...............
............................................W.....
..........T....................s.............7....
.............................................W....
.........T..............4....n.d.H.........5......
......T.....oj...U.....n...w......H...........z...
.G..x..........................E.....V..H.........
.........a....................d....s.......7w.....
...j....r.............o.............V.......d...W.
.......r..J.Goa.U...............n................z
.........Jj.........M..........Pv.................
...J...........t..3..M..............sLV...........
...................t................n.............
....r...........X...........M........v............
...x....t......I......a.PM...............W........
...........1.Bj....I........vO.h.dL...............
.........6....Rr......B...X........h..5v.L..z.....
......1G...........x.....3B.......5...............
.................B....0..........4..E.............
.....................X.....5..h....P....f.....D...
.......1........J.....eK..........................
..................I....R....K...........k.........
......G..................O........................
...........H...9...............K8.P.4..k..E.......
............1....3.............8.F.............f..
.........................4........................
.l...........X............9.......................
....N.................R...t.e.....................
...g............3..R.........e....h.........f.....
...........................e......i...............
................2...I.7..9..O.....s.........k.....
....................6...9E.............F..O.......
........................KN........................
.......g......................Z.........F..f...Y..
...........................A....i.................
...........6g...b........8.......y.....S..........
..l.....6.....m...............8...................
....u..m...b...............p...A..................
..............b.p........................k........
....m......2...........Z..y....i..................
........g2.....b.........i....D..ZF...............
......2.0...........p............N..........A.....
...m.............S...y........A...Z...N...........
..S..l..........................................Y.
........S....0u.................y......DY.........
...........0.........................D............
.................u...................p...Y........
.......u..........................................`,
    output: 423,
  });

  Utils.check(solve, dataset, "8a");
})();
