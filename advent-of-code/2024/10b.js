(() => {
  function solve(input) {
    let lines = Utils.read(input);
    let matrix = lines.map((i) => i.split("").map((j) => Number(j)));
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j] === 0) {
          sum += trails(matrix, i, j);
        }
      }
    }

    return sum;
  }

  function trails(matrix, x, y) {
    let sum = 0;
    let read = {};
    let queue = [[x, y]];
    let paths = {};
    paths[x + "," + y] = 1;
    read[x + "," + y] = true;
    while (queue.length > 0) {
      let [i, j] = queue.shift();

      let height = matrix[i][j];
      if (matrix[i][j] === 9) {
        sum += paths[i + "," + j];
      } else {
        let pathsNum = paths[i + "," + j];
        if (i > 0 && matrix[i - 1][j] === height + 1) {
          addPath(i - 1, j, read, paths, pathsNum, queue);
        }
        if (j > 0 && matrix[i][j - 1] === height + 1) {
          addPath(i, j - 1, read, paths, pathsNum, queue);
        }
        if (i < matrix.length - 1 && matrix[i + 1][j] === height + 1) {
          addPath(i + 1, j, read, paths, pathsNum, queue);
        }
        if (j < matrix[0].length - 1 && matrix[i][j + 1] === height + 1) {
          addPath(i, j + 1, read, paths, pathsNum, queue);
        }
      }
    }

    return sum;
  }

  function addPath(i, j, read, paths, pathsNum, queue) {
    if (read[i + "," + j]) {
      paths[i + "," + j] += pathsNum;
    } else {
      read[i + "," + j] = true;
      paths[i + "," + j] = pathsNum;
      queue.push([i, j]);
    }
  }

  let dataset = [];

  dataset.push({
    input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
    output: 81,
  });

  dataset.push({
    input: `56760198543405456770107687012987873265430701234123
47891087612514320889298596543236982176321878985054
30932912503423411978321436760145453089490965076567
21043803498598502565450345897896334569584324105498
43256754387687643445601231056787276578675013212389
50105620896014553238782322348996189432106522301210
60234211205423469109695210567345023456987101232569
71454301312345678100556501051269010787832198543478
82365985407856743291447892340178732696949037643323
99878876556989856782332309650065341054658743252110
12389565445845698943221218761234456565789650167087
03458890330532787892100321052442787074656782108996
12766721221621056521098478934321692183245891210105
00875437876521245430167569035630013290194300121234
21980356985430130101456122128754324389980215432101
32341245234561221212340033439961015671271326990123
41239832101676678703121542345872343760362347887654
50146701098787569254035671096112654854454558943210
69655410889693452164549389987003569943003967656787
78789324989582543076678432176124578752112876545490
49670123476451001289986581065437669801198743454321
34565404560302654345677893034458954321034652345210
21670313401212701238766732123361056700125601216787
10781223304343870349676678901272341811098700305891
87690433210154901234587565078980110925643212456730
98521049873269100448996652169765223434756965569821
83430656794378234567385543258894304589807874321034
12345690185123247855434789043210113676212981012125
04396783276030110982329872178901923494345891234596
65287654896543225671012763561032876587436780989687
70132108987652334430101654432945214306525891078765
89945345456701498521012346547876305211014342569854
67876276789876567677890107236521456523210213410743
56940189678930438988743298101430567894765104323212
45434328509821321089654340122334567765894101298701
50125613410030012127763019831021998568903210345692
23498701322147897898892123742340867478912653210789
10567654213456786721089054654356789302801743105678
01678123402110995437658766789210676211010892234109
67569016567021874378941043212101245432346781103201
58454323898134565632332456701234306011015490321232
49323454234012906701454327890965412102367305410147
31012365125643812898765410378876543233458216568758
21009876034756763019034101269989100146569325679669
21898745129829654323129654352123299656478012784578
30743231065018760563238765543034788798329983693056
45656189654323011056769894672145632347012674212147
01218088745896522349850123283034701456981065100238
14309893236787631438943210190129892123672578921109
25456782101896540127654301012010181034543465433212`,
    output: 1242,
  });

  Utils.check(solve, dataset, "10b");
})();