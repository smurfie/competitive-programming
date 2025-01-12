(() => {
  function solve(input, steps) {
    let lines = Utils.read(input);
    let map = lines.map((i) => i.split(""));
    let x = -1;
    let y = -1;

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === "S") {
          x = i;
          y = j;
          map[i][j] = ".";
        }
      }
    }

    let h = map.length; // = h = w
    let sumEven = fillMapN(map, [0, 0], 2 * h - 2);
    let sumOdd = fillMapN(map, [0, 0], 2 * h - 3);

    // As all the sorroundings are empty we can easily deduct that besides the squares that goes all way
    // up/down, left/right, all the other ones will start at the corner. So for each corner lets count how long it takes
    // to fill all the square and it checks that is the same number of moves than to reach the opposite corner. I leave the code commented:
    /* 
      console.log(sumEven, fillMapN(map, [0, 0], 4 * h));
      console.log(sumOdd, fillMapN(map, [0, 0], 4 * h - 1));
    */

    let dict = {};
    let positions = [[x, y]];
    let quadNW = 0;
    let quadNE = 0;
    let quadSW = 0;
    let quadSE = 0;
    let n = 0;
    let end = false;
    while (!end) {
      n++;
      let positions2 = [];
      for (let position of positions) {
        for (let [i, j] of [
          [position[0] - 1, position[1]],
          [position[0] + 1, position[1]],
          [position[0], position[1] - 1],
          [position[0], position[1] + 1],
        ]) {
          if (map[posMod(i, map.length)][posMod(j, map[0].length)] === "." && !dict[i + "," + j]) {
            let piecesX = Math.floor(i / map.length);
            let piecesY = Math.floor(j / map.length);
            if (piecesX === 0 || piecesY === 0) {
              dict[i + "," + j] = true;
              positions2.push([i, j]);
            }
            if (piecesX < 0 && piecesY < 0 && quadNW === 0) {
              quadNW = n;
            } else if (piecesX < 0 && piecesY > 0 && quadNE === 0) {
              quadNE = n;
            } else if (piecesX > 0 && piecesY < 0 && quadSW === 0) {
              quadSW = n;
            } else if (piecesX > 0 && piecesY > 0 && quadSE === 0) {
              quadSE = n;
            }
            if (quadNW !== 0 && quadNE !== 0 && quadSW !== 0 && quadSE !== 0) {
              end = true;
            }
          }
        }
      }
      positions = positions2;
    }
    let sum = 0;

    // QUADRANTS
    let steps2 = steps - quadNW;
    let squaresN = 1;
    while (steps2 > 2 * h - 2) {
      sum += squaresN * (steps2 % 2 === 0 ? sumEven : sumOdd);
      steps2 -= h;
      squaresN++;
    }
    sum += squaresN * fillMapN(map, [h - 1, h - 1], steps2);
    sum += (squaresN + 1) * fillMapN(map, [h - 1, h - 1], steps2 - h);

    steps2 = steps - quadNE;
    squaresN = 1;
    while (steps2 > 2 * h - 2) {
      sum += squaresN * (steps2 % 2 === 0 ? sumEven : sumOdd);
      steps2 -= h;
      squaresN++;
    }
    sum += squaresN * fillMapN(map, [h - 1, 0], steps2);
    sum += (squaresN + 1) * fillMapN(map, [h - 1, 0], steps2 - h);

    steps2 = steps - quadSW;
    squaresN = 1;
    while (steps2 > 2 * h - 2) {
      sum += squaresN * (steps2 % 2 === 0 ? sumEven : sumOdd);
      steps2 -= h;
      squaresN++;
    }
    sum += squaresN * fillMapN(map, [0, h - 1], steps2);
    sum += (squaresN + 1) * fillMapN(map, [0, h - 1], steps2 - h);

    steps2 = steps - quadSE;
    squaresN = 1;
    while (steps2 > 2 * h - 2) {
      sum += squaresN * (steps2 % 2 === 0 ? sumEven : sumOdd);
      steps2 -= h;
      squaresN++;
    }
    sum += squaresN * fillMapN(map, [0, 0], steps2);
    sum += (squaresN + 1) * fillMapN(map, [0, 0], steps2 - h);

    // We will save a hash of the order of entrance of each concentric ring (i.e: [(2,0),(0,2),(-2,0),(0,-2)])
    // And once we find 2 equal hashes we encontered a loop
    let hashes = {};
    let concentricRings = [];

    // CENTER AND CROSS
    steps2 = steps;
    positions = [[x, y]];
    dict = {};
    if (steps2 % 2 == 0) sum++;
    dict[x + "," + y] = true;

    while (steps2 > 0) {
      steps2--;
      let positions2 = [];
      for (let position of positions) {
        for (let [i, j] of [
          [position[0] - 1, position[1]],
          [position[0] + 1, position[1]],
          [position[0], position[1] - 1],
          [position[0], position[1] + 1],
        ]) {
          let squareX = Math.floor(i / h);
          let squareY = Math.floor(j / h);
          let posX = posMod(i, h);
          let posY = posMod(j, h);

          if ((squareX === 0 || squareY === 0) && !dict[i + "," + j] && map[posX][posY] === ".") {
            let cc = -1;
            let quad = -1;
            if (squareX > 0 && posY === 0) {
              cc = squareX - 1;
              quad = 0;
            }
            if (squareX < 0 && posY === h - 1) {
              cc = -squareX - 1;
              quad = 1;
            }
            if (squareY > 0 && posX === 0) {
              cc = squareY - 1;
              quad = 2;
            }
            if (squareY < 0 && posX === h - 1) {
              cc = -squareY - 1;
              quad = 3;
            }

            dict[i + "," + j] = true;
            if (steps2 % 2 === 0) {
              if (cc >= 0) {
                if (cc === concentricRings.length) {
                  concentricRings.push([]);
                }
                concentricRings[cc].push(quad + "," + posX + "," + posY);
                if (concentricRings[cc].length === 2 * h) {
                  let hash = concentricRings[cc].join();
                  if (!hashes[hash]) {
                    hashes[hash] = [[0, sum, steps2]];
                  } else {
                    let res = hashes[hash];
                    let loopSteps = res[res.length - 1][2] - steps2;
                    let loopSum = sum - res[res.length - 1][1];

                    // Check if we found a loop
                    if (res.length < 2 || loopSteps !== res[res.length - 1][0]) {
                      res.push([loopSteps, sum, steps2]);
                    } else {
                      let loopN = Math.floor(steps2 / loopSteps);
                      if (loopN > 0) {
                        steps2 -= loopN * loopSteps;
                        sum += loopN * loopSum;
                      }
                    }
                  }
                }
              }
              sum++;
            }
            positions2.push([i, j]);
          }
        }
      }
      positions = positions2;
    }
    return sum;
  }

  function fillMapN(map, coord, n) {
    if (n < 0) {
      return 0;
    }
    let h = map.length;
    let positions = [coord];
    let sum = 0;
    if (n % 2 == 0) sum++;
    map[coord[0]][coord[1]] = "O";
    while (positions.length > 0 && n > 0) {
      n--;
      let positions2 = [];
      for (let position of positions) {
        for (let [i, j] of [
          [position[0] - 1, position[1]],
          [position[0] + 1, position[1]],
          [position[0], position[1] - 1],
          [position[0], position[1] + 1],
        ]) {
          if (i >= 0 && i < h && j >= 0 && j < h && map[i][j] === ".") {
            map[i][j] = "O";
            if (n % 2 === 0) {
              sum++;
            }
            positions2.push([i, j]);
          }
        }
      }
      positions = positions2;
    }

    for (i = 0; i < h; i++) {
      for (j = 0; j < h; j++) {
        if (map[i][j] === "O") {
          map[i][j] = ".";
        }
      }
    }

    return sum;
  }

  function posMod(a, n) {
    return ((a % n) + n) % n;
  }

  let dataset = [];

  dataset.push({
    input: `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`,
    steps: 6,
    output: 16,
  });

  dataset.push({
    input: `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`,
    steps: 10,
    output: 50,
  });

  dataset.push({
    input: `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`,
    steps: 50,
    output: 1594,
  });

  dataset.push({
    input: `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`,
    steps: 100,
    output: 6536,
  });

  dataset.push({
    input: `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`,
    steps: 500,
    output: 167004,
  });

  dataset.push({
    input: `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`,
    steps: 1000,
    output: 668697,
  });

  dataset.push({
    input: `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`,
    steps: 5000,
    output: 16733044,
  });

  dataset.push({
    input: `...................................................................................................................................
...#........#..#.#....#.....#..........#......#..........#...........................#.................#...#.#.....................
................#....#.........#.#...#............#..#....#..................##..........#........#.....#....###..#....#...........
.#...........##..............#...#.........#..............#.................#...............#...................................##.
..#...........#...........##....##.............#.....#.........................#................#..........................#.......
..............#......................#...........#..#...#......................#.............#.......#.............................
...........#..#..............#.#.....#...........................................#.....###..............#.#..............#.......#.
.......#....#............#......#....#.............................................#.....#.........................................
....##.........##......##.........##.........#....#............#.............#...#..#....#...................#.........#.#.........
..#...........#...#.#.........................................................#.....#.#...#.####.......##...................#...#..
.......#....##...................#..#......#....#...................#..........#...............#.............#.......#..#..........
.................#.#.#####....#....#....##.#...............#...#.....#.#..............#...................#...#................#...
...........................#.....#...#.......................#....##.....................##....#..#..#.............................
...#.#...............................................................#.#................#.#.......................#................
....##.................................#.#.....#......................#....................#........#.................#.#..#.......
.....#.........#.#...#..........#..#.#......#........................................#.................#..........#.##..........#..
.........#......#....#..#...................#............................#.............................#...#.......#...............
.#.#.........#...#..........#..#.........#..#...............##......##...#...........................#........#....................
......#......................#.........#....................#.#............#.#............#.............#........#...#.#.........#.
........#....#..................#......................#......#.#.......#..............................##...............#..........
.#.......#...#.#..#..................................#............#..#...#..................#.#...#.#..............#...#.....#.....
..#.....#...##..#......#.......#......#..............#....#..........#..........#.#.............#.....#.......#...#..###.##........
...................#..#.....#.......................#.......#............#.....#..#.........#....#....#....#.................#.....
........#.......###....##.......#.....#........#........#..##.....#.......##...#...#........#..............#.#.....................
...............#......##..............................#............#..........#...###...................#.#..................#.....
..#...#..#.#.#.#..........#.#...#..#.....................#..#.....#...........#...............#..............#..#..........#..#....
........#........#..#.......##.##..........##................##............#........#...........................#..#...#...##...#..
......#.#..#..#..........#.#...................#......#..............#.....#...........#..............##...........#...............
.....#...#...#.......##...........................#................#....#............#...........#.....#......#........##..........
..#.#........#..#.#...#.....#............#..................................#.............#................##....##................
......#.......#......#..........................#.........#.#.............#..#.......#...................#..#......................
......................#..................#.............#...#................#..........................#.##........#....#..........
..#....#.##...............#.............#.............................#.#..###.#...........#............................#..........
.....................................#.....#...#...#..#........#.....................#.#..#...#........#.....#.................#.#.
.....................#.....................#........................#..........#...#.....#..............#......#.................#.
.........#...#......#..#......................#.........#............#.........#........................#...#..###.#.....#..#......
.............#..#.......#..........#.............#.#...#.#.#....#...........#......................................................
.....##....#.......................#......................#...#.#..............................#..................##..#............
.....#.........#..........................#.........#.............#...#....#............#....#...............#...#..##.........#...
..#................................#......##..##..#.......#..#..................#.....................................#.#...#......
.....................#..........#.#...........#..............#.............#.#......................#...........#.###..............
......##.#.#.............................##........#.............................#.....#.....#.......................#.............
................#..............................#....#...................#.##......#...................#...........#....##..........
.#............#.....................#.....#...............................#.#.........#.............#...#........#.................
.#.........##...................##..............#..........#.#................#.......................#........................#...
..#............#.................#..............#..........##.....#..##..........#............#.......................#............
....#.#.......#.........#.............#.......#......##....#............#................#........#................#..........#....
..............................#....###......#..#..#....................##..........#.#.##.......#.........................#...##...
........#............#...##.....................##..#......##......#..........#......#...............................#.#...#.......
.....#.#.#............#....#....#.....#.......#.#....#.........#......#..................#.#..#..........................#.........
.........#...........................#.....#..#.......#.....#...#........#......#...................#.........#....................
....#....#............#........#..................#.......................#..#.##..............#................#..........#.......
...###...............##..............#.......##..#.#.....#.....#.......#...#.......##......................##...#...........#.#....
.......................#.....#.........#..........#......#...............#.....#.....#....#.........#..#.........#.................
................................................#.#.#....#......#...#..............#........#.#....#..........#.............#......
.#....#..................#.....#...#.......#......................#..#.........................#..#...........##....#..............
.....................##................#.#....#......#......#......#....#...#....................#..........##.....................
....#................#....#..........#.#.....................#.......#...#......#........#.#.#..........#...........#..........#.#.
..#..................#.................#..#....#.#.#.....#.#...#.......#..#......................#...................#.............
..#.............##.........#..#.......#......#.............#................##..................#...#......#............#..........
............#.....##.............#..#...#....###...#.........................#..#.#........#..................#......#.............
....................#.#........#.......#.........#....##......##....#...#.#.##.#..#...#...............#...#.......#....#...........
..................................#...#.........#..............#........#.............#...........................#.......#........
..............##.......#.............#.#.........#..#.#.....................#.......................##...##..#.........#...........
..........#.....#.#..##....#..................#....#.......#............#.........#...#........#..................#.......#........
.................................................................S.................................................................
..............##.#.....................#...........##..##.......#............#....#.#.........#..#.....................##...#......
...........................#.#...##..##............#......#............#...........#.#.#......#...#......................#.........
....................#...........#...........#.........#.......................#.........#......##...........#...........#..........
..................#......#.........................#.....###.......#................#..#.........#.........####..........#.........
.................#......#....................#.#.#..........###.......................#...#.......#...#................#.#.........
.......................#..#........#..##...#...........#.......#.......................#............#...#.....#.#..................
...............#.....................#..#..#................#.#...........#...#......#......#..#.....#.........#.......#...........
.#.................#........#.........#......#.....................#......................#..........................#..........#..
................##......#..........#.....#..........#.........#....................#....#...........#..#.....#.....................
.......................................#.......................#......#...........................#...#............................
..............................#..............................#.....#...............#..............#...#....#................#....#.
...#..#...........#...........##........##...........#.#.......................#..........#.#.......#...#..................##......
.....#.............##........#.#.#.............#.......#............#.....#.........#.............#......................#...#.#...
........#.....................#..........#......................#.............#.#.............#........#...........................
..........................#..........#...............#.............#.....##...#.#......#.........#.......#.............#...........
.#.....#..........................#.#..#..#..............#................#.............##..................................#......
...........#...................##.........................#.....#......#...#....#...............#............#.............##.#....
...#...........................#................#..#......#...#.............#..#.....#.............................................
.......##..#..............#.#....................#.....#.............#....................#............#.#....................##...
.##.#..........#........#.....................#.#.......#..#..#..........##...........................................#.......#....
..............#..#........#......#.................#.....#.........#.......#..............#..........##.....................#......
...........#...#.............#........#......#........#.........#......#.....#.....#....................#...........#..........#...
.#...............................#...#.....#.##........#............#...#...#..#................#.......................##.......#.
.........#.#...............................................#...#.....#.........................................#....#..............
.....#..#...#...................#................#......#.#....................#......#...#.....#............#.......#..........#..
..............#.....................#.....................................#.......#..#......#..................#.......#.....#.....
....#....#...#...##................#..#.......#..#................#..#..............#...........#..........#.##......#....#...#.#..
...#........#.........#..........#..#......#.....#..........................#........#................................#............
.........#........#..................................#..........................#.........................#....#......#............
.#..................................................#....##....#....#...#..#...#..........#.......................#................
........#...#............................##.........................#.....#...##...#.........#............#.........#..............
...#.#.......#.......................#.....#..............#...#.............#...#......................................#...#....#..
....#.......#..#......................##...#....##....#............#.........................................#.....................
.......#....................#.........#...............#.....#.#....#................#...#................#........#................
..#...#....#......#......#....#........#..##....#....##..#..##.#..#.....................#..........#.......#................##.....
......#.#............#....................#.....#...............#...#...............#...............###.#......#.........##........
..................#........................##..#.......#....#......#.................#.............#......#....#....#......#...#...
...#..#.......#....#...........#.....................#......................#..........#..........#........##......................
.....##.....#.....#...#...#..........................##....................##..#.....................#......##.........#.....#.....
....##.......##.#..#..#.........#...#.............#.....#..................................................#.#.........#....#......
..........#..#.##..............#.................#..............#......#.#.##.......#.........................#....#.............#.
...........#.......................#..............#..##.....#...#.#.........................................##........#....#.....#.
..............#..#...................................#...................#.....#..............#...........#.........#..#...........
..........#.#...................#...............#.....................#..........#.........................#.#.....................
........##...#......#.#...##..#.....#................#............#........#....#..............#....#.....................#........
.................#..#..#..#.................................#................#.....................#....................#..#.......
...............#......#...#....#.#..#.#......................#........##..........................##...........................#...
.............#....................#.#.........................#....#......#.............###........#...#........#....#....#........
............................#....#.............................#.............#.........##..#....#.....##...........................
..#............#.#......#.............................#.........#..#.......................#.......................................
..#........#..#....#.......#...#..........#............#....#.#.......#.............#......................##.....#................
.........##.#.............#...............................#.............................#.........................#.....#..........
..............#...#......#..###...................................#.....................................#..#...#...............#...
.....#.#...............#.........................#..............#.....#..........................#.#.............#..#......#.......
...#...###..#........#........#.............##................#....#...................................#..#...##....##.............
.....#.............#...............#..#...##.....#...................#............#..................#..##...............#.#.......
.....#....#........#.#..#.........#.........#.......#...................................#.................#.........#......#.....#.
......#...........................#....#..............#.........#.............................#.......................#.....#......
......#....#...#.......#.#......#..##...........#...........................#...#.#..#........................................##...
.....................................................#.....................#........#.......#......#........#.##.........#..#....#.
...........#.#.....#......................#...#....................................#..................#.............#......#.......
.#.....#.#.......................#......#..#................................#.......#...........##.........#....#..#......#..#.....
..........................##..#.............#........#.............................###........................#.#..........#.#.....
.....#..........#.#....................#...#......#........................#.#.....#..............##.................#.........#...
...................................................................................................................................`,
    steps: 26501365,
    output: 634549784009844,
  });

  Utils.check(solve, dataset, "21b");
})();
