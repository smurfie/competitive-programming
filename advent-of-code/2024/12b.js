(() => {
  function solve(input) {
    let lines = Utils.read(input);
    let matrix = lines.map((i) => i.split(""));
    let sum = 0;
    let fields = 0;

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (typeof matrix[i][j] !== "number") {
          let fences = { up: {}, down: {}, left: {}, right: {} };
          let plots = field(matrix, i, j, fields++, fences);
          sum += plots * countSides(fences);
        }
      }
    }

    return sum;
  }

  function field(matrix, i, j, fields, fences) {
    let seed = matrix[i][j];
    let plots = 1;
    matrix[i][j] = fields;

    if (i > 0 && matrix[i - 1][j] === seed) {
      plots += field(matrix, i - 1, j, fields, fences);
    } else if (i === 0 || matrix[i - 1][j] !== fields) {
      addFence(fences, "up", i, j);
    }
    if (j > 0 && matrix[i][j - 1] === seed) {
      plots += field(matrix, i, j - 1, fields, fences);
    } else if (j === 0 || matrix[i][j - 1] !== fields) {
      addFence(fences, "left", j, i);
    }
    if (i < matrix.length - 1 && matrix[i + 1][j] === seed) {
      plots += field(matrix, i + 1, j, fields, fences);
    } else if (i === matrix.length - 1 || matrix[i + 1][j] !== fields) {
      addFence(fences, "down", i, j);
    }
    if (j < matrix[0].length - 1 && matrix[i][j + 1] === seed) {
      plots += field(matrix, i, j + 1, fields, fences);
    } else if (j === matrix[0].length - 1 || matrix[i][j + 1] !== fields) {
      addFence(fences, "right", j, i);
    }

    return plots;
  }

  function addFence(fences, direction, i, j) {
    if (!fences[direction][i]) {
      fences[direction][i] = [];
    }
    fences[direction][i].push(j);
  }

  function countSides(fences) {
    return (
      countSidesDir(fences["up"]) +
      countSidesDir(fences["down"]) +
      countSidesDir(fences["left"]) +
      countSidesDir(fences["right"])
    );
  }

  function countSidesDir(fences) {
    let count = 0;
    for (let row of Object.keys(fences)) {
      count += countSidesRow(fences[row]);
    }
    return count;
  }

  function countSidesRow(row) {
    let sides = 1;
    row.sort((a, b) => a - b);
    let previous = row[0];
    for (let i = 1; i < row.length; i++) {
      if (row[i] !== previous + 1) {
        sides++;
      }
      previous = row[i];
    }
    return sides;
  }

  let dataset = [];

  dataset.push({
    input: `AAAA
BBCD
BBCC
EEEC`,
    output: 80,
  });

  dataset.push({
    input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
    output: 436,
  });

  dataset.push({
    input: `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`,
    output: 236,
  });

  dataset.push({
    input: `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`,
    output: 368,
  });

  dataset.push({
    input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
    output: 1206,
  });

  dataset.push({
    input: `SSSSSSSSGGGGGGGGGGGGGHHHHHHHHHHHHHHRHHFFFFFFNNNNNNNNZNIIQQQQQQQQQQQQLLLLLLCCCCCCCCCCCUUUUUUSSSSSSSSSSYYYYYYYYYYFFFFFFQQQQUUUUUUUUUUUUKKKKKKK
SSSSSSSSGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHFFFFNNNNNNNNNNNIQQQQQQQQQQQQQLLLLLLCLLCCCCUUUUUUUUSSSSSSSSSSSSSYYYYYYYFFFFFFFFFFFQQUUUUUUUUUUUUUJJJKK
SSSSSSSSGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHFFFFNNNNNNNNNNNQQQQQQQQQQQQQQLLLLLLLLLCCCCCCCUUUUWSSSSSSSSSSSKKZYYYYFFFFFFFFFFFFFFFFUUUUUUUUUUUUZJJJJ
SSSSSSSSGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHFFFNNRNNNNNNNNNNQQQQQQQQQQQQQQLLLLLLLLOCOOCOCCUUUUCSSSSSSGSSSZZZYYYYFFFFFFFFFFFFFFFZUUUUUUBUUUUUUJJJJ
SSSSSSGGGGGGGGGGGGGGHGHHHHHHHVVHVVHHHHHFNNNNNNNNNNNNNNNQQQQQQQQQQQQLLLLLLLNLOOOOOOOOCUUUCCSSSSSSGSSSZZZZYYFFFFFFFFFFFFFZZZZUUUUUUBUUUUUJJJJJ
SSSSSSSGGGGGGGGGGGGGGGHHHHHHHVOVVVFFFFFFFNNNNNNNNNNNNNNKQQQQQQQQQQUQLLLLLLNLOOOOOOOOCCCCCCSSSSSSSSSSZZZZYYYFFFFFFFFFFFFFQZZZZUUUUUUUUUJJJJJJ
SSSSSWSGGGGGGGGGGGGGHHHHHHHHHVVVVVVVFFFFFFNNNNNNNNNNNNNNNQQMCQQQQQQQLLLLLLOOOOOOOOOOOCCCCCSSSSSSSSSSZZZZYYYYFFFFYYFFFFFFZZZZZZUUUFFUUUJJJJJJ
WWWWWWWGGGGGGGGGGGGGHHHHHHHVVVVVVVVFFFFFNNNNNNNNNNNNNNNNNSQCCPQQQWWQLLLLLGGGOOOOOOOOOCCCCCCSSSZSSSSZZZYYYYUYYYYFYFFFFFFVZZZZZZZFFFFFSJJJJJJJ
WWWWWWWGGGGGGGGGGGGHHHHHHHHHVVVVVVVFFFFFFNNNNNNNNNZNZNNNCCCCCCCQUDDDDDLLLLLOOOOOOVOOCCCCCCCCZZZSSSSZZZZYUUUYYYYYYYYFFFZVVZZZAAZZFFSFSSJJJJJJ
WWWWWGGGGGGGGGGGGHHHGHHHHHHHVVVVVVVBFFFFFFNNPNNNNNZZZNCCCCCCCCUUUDDDDLLLVVOOVVVVVVVCCCCCNNNNNNZSSSSZZZZZUUUUYYYYKKOOOOZVVZZAAAAZFFSFSSJJJJJJ
WWWWWWAAGGGGGGGGRRGGGHHHHHHHVVVVVJJBBFFFFNNNPPNNKZZZZZZCCCCCCCCUUUUDDLLVVVVVVVVVVVVCCCVCNNNNNNZZZZSZZZZZUUUUYYYKKKKOOOZZZZZZAAAASSSSSXXJJJJJ
WUUWWWWGGDGGGGGGGGGGGHHHHHXXXFVVVVVBBBBFPPPPPPNNKZZZZZZCCZCCCUUUUDUDDDVVVVVVVVVVVVVVNNNVNNNNNNNNNNNNNZUUUUUUUKKKKKOOOOZZZZZCOAASSSSSSSJJJJJJ
UUUUUUUUGGGGSGGGGGGGGGHHHHXXFFFVVVVBBBBBPPPPPPPNKZZZZZZZZZZUUUUUDDDDDDMMVVVVVVVVVVVVNNNNNNNNNNNNNNNNNUUUUUUUUKKKKKKKOZZZZZZOOSSSSSSSSJJJJJJJ
VUUUUUUUUUUUZGGGGGGGGGHXHXXXXFFBBBBBBBBBPPPPPPPPKZZZZZZZZZUUUUUUDDDDDDMMVVVVVVVVVVVVNNNNNNNNNNNNNNNNNUUUUUUUUKKKKKKKOOZOZZZZOSSSSSSSSSBOBJJJ
VVVUZZZZUUUZZGGGGGGGGHHXXXXXXFFBBBBBBBBBBPPPPPPPKZZZZZZZZUUUUUUUUUDDMFMMMVMMVVVVVVVVNNNNNNNNNNNNNNNNNUUUUUUUUUKKKKKKOOOOZOOOOOSSSSSSSSBOBMJM
VVUUZZZZZZZZZGGGGGGGGGJXXXXXXXFXBBBBBBBBBPPPPPPPPZZZZZZZZZQUUUUUUUUMMMMMMVMMMMXVVVVVVNNNNNNNNNNNNNNNNUUUUUUUURKKKKKKOOOOOOOOOOSSBSBSSBBBBMJM
VVUUZZZZZZZZZGGGGGGGGGGXXXXXXXXXXBBBBBBBBBBPPPPPPZZZZZZZQQQUUUUQUUUMMMMMMVMMRVVVVVVVVNNNNNNNNNNNNNNNNUUUUUUUUUKKKKKKOOOOOOOCOOOCBBBBBBBBBMBM
VVVZZZZZZZZZZGGGGGGGGGGGLLLLLLLXXBXXCXBBBBBPPPPYYYZZZZZKQOQQQQQQQQQMMMMMMMMMRVVVVVVVVNNNNNNNNNEEEZZZUUUUUUUUUUKKKKOOOOOOOOOCCOOCCBBBBBBBBBBM
VVVVZZZZZWZGGGGGGGGGGGGLLLLLLLLXXXXXXXXYYBBPPPYYYYEEEEZZZQQQQQQQQQMMMMMMMMMMVVVVVVVVVNNNNNNNNNEEZZZZUUUUUUUUUUOOOOOOOOOOOOCCCYCCCBBBBBBBBBBM
VVVZZZZWWWXGGGGGGGGGGGGLLLLLLLLLXXXXXXXXYYYPPPYYYEEEEEQQQQQQQQQQQQQMMMMMMMMMVVVVVVVVVNNNNNNNNNXQQQZZZUUUUUUUUUOOOOOOOOOOOOOCCCCCCCCCBBBBBBMM
VVVVZZZWWWWGGGGGGGGGGGGLLLLLLLLXXXXXXXXYYYYYYYYYYYEEEEEQQQQQQQQQQQQQOMMMMMMRRRRRVVVVVVNNNNNNNNXQQQZZZUUUUUUUUUUOOOOOOOOOOOCCCCCCCCCCCBBBBMMM
VVVVZQQWRWWQQQGGGGGGGGGLLLLLLLXXXXXXXXXYYYYYYYUUUYEEEEEQQQQQQQQQQQQOOMMMMMMRRRRRVVVVBBNNNNNNNNXXQQQZVUUUUUUUUUUPPOPOPPPPOOOCCCCCCCCBBBBBBMMM
VVVVQQQQWWQQQQGGGGGGGLLLLLLDDLXXDXZXYYYYYYYYYUUUUEEEEEGQQQQQQQQQQQQOOMMRRMRRRRRRRRBBBBVDDXXXXXXQQQDVVVVUUUUVVVPPPPPPPPPPPOOOCCCCCCCCBBBBBMMM
VVVVQQQQQQQQQQGGGSSQSLLLLLLDDXXDDXXYYYYYYYYUYUUUUUUUPEEQQQQQQQQQQQQQQMRRRRRRRRRRRRBBLLXXXXXXXXXXQQVVVVVVVVVVVPPPPPPPPPPPPPPCCCCCCCBCCCCBOMMO
VVVVQQQQQQQQQQQGGSSSSSSLLLLDDDDDDXYYFFFFFYYUUUUUUUUUPPPQQQQQQQQQQQQQRRRRRRRRSRSRRRBBLLXXXXXXXXXQQQVVVVVVVVVVVPPPPPPPPPPPPCCCATCGCBBBBOEOOOOO
VVVVQQQQQQQQQQQQSSSSSSSSLLLDDDDDDDDYFFFFYYYUUUUUUUUUUUURRQQQQQQQQQQQQRRSSSSSSSSSLLLLLLXXXXXXXXXQQQVVVVVVVVVVVVPPPPPPPPPPPPPOTTGGTBBBBOOOOOOO
VVVVVQQQQQQQQQQQSSSSSSSSSLDDDDDDDDDYYFFFFFUUUUUUUUUUUUUQRQQQQQQQQQQQRRRRRSSSSSSSLLLLLLLXXXXXXXXXQQQQVVVVVVVVVVPPPPPPPPPPPPOOTTTTTBBTOOOOOOOO
VVVVQQQQQQQQQEQSSSSSSSSSSSSDDDDDDDDYYDFFFFUUUUUUUUUUUUUQQQQQQWQQQQQQRRSSSSSSSSSSLLLLLLLDXXXXXXXXQQQQVVVVVVVZVVVPPPPPPPPPPCTTYTTTTTTTTOOOOOOO
VVVVVVVQQQQQQQOSSSSSSSSSGGDDDDDDDDDDDDFFFFFUUUUUUUUUUUUUUAQQUQQQQQRRRRSSSSSSSSSSLLLLLLLLXXXXXXQQQQJJVVVVVBVVVVVPPPPPPPPPPCTTTDTTTTTTTTOOOOOO
VVVVVVVQQQOQOOOSSSSSSSSEEDDDDDDDDDDCCCFFFFFFUUUUUUUUUUUUUAQAURQQQRRRRRSSSSSSSSSSSLLLLLLLLXXXXXXXQQJJJJJJVVVVVVVVPPPPPPPPPPTWTTTTTTTTTTSSOOEE
VVVVVVVVQOOOOOOSOISSSEAEDEEDDDDDDDFWCCQQQFFUUUUUUUUUUZUAAAAARRRRRRRRRRJJJSSSSSSSSSLLLLLLLXXXXXXXXJJJJJJJVVVVVVVVPPPPPPPPPPWWTTTTTTTSSTSSSEEE
VVVVVVVVOOOOOOOSOOQSEEEEDDEWWWDDWWWWWCQQQQUUUUUUUUUMMAAAAAAARRRRRRRYYYYYYYYSSSSSSSLLLLLLXXXXXXAXXJJJJJJJVVVVVVVVVVPPPPPPPPWWTTTTTTISSSSSSSEE
VVVVOOVOOOOOOOOOOOSSEEAEEEEEWWWWWWWWWQQQQQUUUUUUUUUMMAAAAAAAAARRRRRYYYYYYYYSSSSSSLLLLLLLLXXXXXXTCCCCJJCCWCCVVVVVVVPPPPPPPPWWWWTIIIISSSSSSSSS
VVVOOOOOOOOOOOOOOOOEEEEEEEEEEWWWWWHHWQQQQQUUUUBUUBBMMMMAAAAAABBYYYYYYYYYYYYSSSXSSLSLLLHLLXXXGXTTCCCCCJCCCCVVVVVVVVVVPPPPPWWWWIIIIIISSSSSSSSS
TVOOOOOOOOOOOOOOOOOEEEEEEEEEEWWWWWHWWQQQQSUUAUBBUBBBBMMAAPAPBBBYYYYYYYYYYYYYYYYYYYSSHHHHHXXTTTTCCCCCCCCCCCCVVVVVVVVKPPPPPWWWWIIIIISSSSSSSSSS
OOOOOOOOOOOOOOOOQOQQQNQQEEEWWWWWWWWWWQQQQQAAAUBBBBBBBMMAAPPPPBRYYYYYYYYYYYYYYYYYYYSHHHHHHXZCCCCCCCCCCCCCCCCCCVVVVKVKPPPKWWWWIIIIIIISSSSSSSSS
OOOOUOOOOOOOOQQQQQQQQQQQECCCCWWWWWWWWQQQAFAABBBBBBBBBMMMPPPPPRRYYYYYYYYYYYYYYYYYYYSHHHHHHZZZCCCCCCCCCCCCCCCCVVVVKKVKKKKKWWWIIIIIIIISSSSSSSSS
OUUOUOOOOOOOQQQQQQIQQQCCCCCCCCWWWWWWWQAAAAAAABHBBBBBMMMMMPPPPRRYYYYYYYYYYYYYYYYYYYSSHHHHHZZZZZZCCCCCCCCCCCCMVVVKKKKKKKKKKCWIIIICCCIIIISSSSSS
MUUWUOOOOOOOQQQQQQQQQQCCCCCCCCCCCCQQQQQAAAAAABBBBBBBBMMPPPPPPRPYYYYYYYYYYYYYYYYYYYSSHHHHHZZZZZZCCCCCCCCCCCCMKKKKKKKKKKKKCCCCICCCCCCIIISSSSSS
MUUUUUUUOOOOQNQQQQQQQQQQCCCCCCCQQQQQQQQAAAAAABPPBBBBBPPPCPPPPPPYYYYYYYYYYYYYYYYYYYHSHHZZZZZZZZZZCCCCCCCCCCCCKKKKKKKKKKKKCCCCCCCCCCIIIIIISSSS
UUUUUUMMMUOOOQQQQQQQQQQQQCCCCCCCCCQQQQQQAAAAAAAPBBHBBPPPPPPPPPPYYYYYYYYYYYYYYYYYYYHHHHZZZZZZZZZZCCCCCCCCCCCCKKKKKKKKKKKKCCCCCCCCCCCCIIIIIIIJ
UUUUUUUUUUOOOOQQQQQQQQQQQQCCCCCTCQQQQQQQQQAAAAAAAHHHPPPPPPPPPPYYYYYYYYYYYJJJHHHHSHHHHHZZZZZZZZZZZCCCCCCCCCPCJKKKKKKKKKKKKCCCCCCCCCCCCIIIIIIJ
UUUUUUUUUUUOOOSQQQQQQQQQQCCQHHHQCCQQQQQAAAAAAFAHHHHHPPPPPPPPPPYYYYYYYYYYYJHHHHHHHHHHHHZZZZZZZZZZZCCCCCCCXXCCJJGKKKKKKKKKTCCCCCCCCCCCCIIIIIJJ
UUUUUUUUUUUTOOSQQQQQQQQQQQQQHHHQQQQQQAAAAAAAAFFHHHHHPPPPPPPPPPYYYJKKKKJJJJJHHHHHHHHHHHHZNZZZZZZZZZCCCCCXXXXXJJGKKKKKKKKKTCCCCCCCCCCCIIIIIIIJ
UUUUUUUUUUUTOHSSSSQQQQQQQQQQHHHQQQQQQQAAAAAAAFHBBHHHHBPPPPPPPPYYYYYYYYKKJJJJJHHHHHHHHHHNNZZZZZZXXZCCCCXXXXXJJJKKKKKPKKKTTCCCCCCCCCCIIIIJIJJJ
UUUUUUUUUUUSVSSSSSSQQQQQQQQQQQQQQQQQQAAAAAAAFFFBBBBBBBPPBBPPBPYYYYYYYYKJJJJJHHHHHHHHHHNNNNNZZZZZXXXXXXXXXXJJXXXXKKKYYKYYYPPCCCCCCCCCIIIJJJJJ
UAUUUUUUUUUSSSSSSSSSQQQQQQQQQQEQQQQQAAAAAAAFFFFBBBBBBBBBBBPPBBYYYYYYYYJJJJJJHHHHHHHHHHNNNNGNZZPZZZAXXXXXXXXXXXXXXYYYYYYYYYPCCCCCCCJJIIIJJJJJ
AAUUUUUUUUUSSSSSSSSSWQQQQQQQQQEQQQQQQQAAAAAFFFBBBYYYYYYYYYYBBBYYYYYYYYJJJJJJHHHHHHHHHHNNNNNNNZZZZPAAAAAXXXXXXXXXYYYYYYYYYYYYCCCCCCJJIJIJJJJJ
AUUUUUUUUUSSSSSSSSSWWWQQQQQWQQQQQQQQQQQAYYYFFFBBBYYYYYYYYYYBBBPPYYYYYYJJJJJJJHHHHHHHNNNNNNNNNNDAAAAAAAAXTXXXXXXYYYYYYYYYYYIYYCCCCCCJJJJJJJJJ
AAUUUUUUUUWSSSSSSWWWWWWQQQQWWPPPQQXQQQHAYYYYYYYBBYYYYYYYYYYYYYYYYYYYYYJJJJJJJJHJJJJJNNNNNNNLNNAAAAAAAAAXTTTTXXXYYYYYYYYYYYYYYZCCCCCJJJJJJJJJ
AUUUYYYYYWWWWWSSWWWWWWWAWQQWWPPPPXXXQQQQYYYYYYYYBYYYYYYYYYYYYYYYYYYYYYJJJJJIJJJJJJJRRRRRRRRRRNAAAAAAATTTTTTTXTXXYYYYYYYYYYYYYYCAACCWWJJJJJJJ
AAAUYYYYYWWWWWSSWWWWWWWWWWWWPPPPXXUQQQQQYYYGGGGBBYYYYYYYYYYYYYYYYYYYYYJJJJJJJJRJJJJRRRRRRRRRRNALAAAAAATTTTTTTTTXYYYYYYYYYYYYYAWWWWCWWJJJJJJJ
AAAYYYYYYYWWWWWWWWWWWWWWWWWPPPXXXXUQQYQYYYYYGGGBBYYYYYYYYYYYYYYYYYYYYYHJJJJJMMRJJJJRRRRRRRRRRNAAAAAAATTTTTTTTTXYYYYYYYYKYYYYYAAWWWWWWWJJJJBJ
AAAYYYYYYYWWWWWWWWWWWWWWWWWWWPXXXXXYYYYYYYYGGGGGGGGBBBBBBBYYYYYYYHHHHHJJJNJJRRRRRRRRRRRRRRRRRAAAAAAAAATTTTTTTTXXYYAKKKKKKYYYAAWWWWWWWWWBBBBB
AAYYYYYYYYYYWWWWWWWWWWWWWWWWPPXXXXXXYYYYYYYGGGGGGGBBBGBBBBYYYYYYYHHHHHHHHMMMRRRRRRRRRRRRRRRRRAAAAAAAAAJTTTXXXXXXXXKKKKKKKKNYAAWWWWWWWWBBBBBB
AAYYYYYYYYYYWWWWWWWWWWWWWXWWXXXXXXXXXXYYYYGGGGGGGGGGGGGYBBBHHHHHHHHHHHHHHMMMRRRRRRRRRRRRRRRRRAAAAAAALLLLLXXXXXXXXXKKKKKKKKNWWAAWWWWWWWBBBBBB
AYYGYYYYYYYYWWWWWWWWWWQQQXXXXXXXXXXXXXYYYYGGGGGGGGGGGGGYYYBHHHHHHHHHHHHHHMMMRRRRRRRRRRRRRRRRRAAAAAAAALLLLXQXXQQXXKKKKKKKAWWWWAWWWWWWWWBBBBBB
AAYYRYYYYYYYYYWWWWWNWWQQXXXXXXXXXXXXXXXXGYGGGGGGGGGGGGGGHHHHHHHHRRHHHHHHMMMMMMMMMMJRRRRRRRRRRAAAAAAALLLLLLQQXQQXKKKKKKKKKWWWWWWWWWWWWWWWBBBB
AAAYYYYYYYYYYYYWNNNNWWWQQQXXWWXXXXXXXXVVGGGGGGGGGGGGFGXXXHHHHHHHHRHHHHHMMMMMMMMMMMJRRRRRRRRRRAAAAALLLLLLLLLQQQQXQKKKKKKKKKWWWWWWWWWWWWLLLBBB
AAAYYYYYYYYYYYYNNNNNWWWQQXXXWWWXXXXXXXVVGGGGGGGGGGGGFGXXXXHHHHHHRRRHHHHHMHMMMMMMMMJJJJJJJJAAAAAALLLLLLLLLLLLQQQQQKKKKKKKKKKWWWWWWWWWWWWLLLBB
AAAAAYYYYYYYYYNNNNNNNNNQQQXXWWWXWXXXXVXVGGGGVGGGGGGGGXXXHHHHHQHHRRHHHHHHHHHMHSMMJMJJJJJJJAAAAAAALLLLLLLLLLLLJJQQQQQKKKKKKKKKKGGGWWWWWWWLLBBB
AAAAAAYYYYAYNNNNNNNNNNNQQQQQWWWWWWXXXVVVGGGGVGGGGGGOXXXXZHHHQQQHRHHHHHHHHHHHHSMMJJJJJJJJJJJAAAAALLLLLLLLLLLLJJQQQQQKKKKKKKKKKGGGWWWWWCWCLLBB
AAAAAAYYYYAAANNNNNNNNNQQQQQWWWWWWWXXVVVVVGGVVGGGGGGOXXXXXHHSQQQHHHHHHHHHHHHHHHJJJJJJJJJJJJJPPAAALLLLLLLLLLJJJJQQQQQQKKKKKKKKKGGGGCCWCCCCLLBB
AAAAAYYYYAAAANNNNNNNQQQQQQQQWWWWWWXXWVVVVVVVVVVGVVVVRRRWSSSSQQQQQQHHHHHHHHHJJHHHJJJJJJSSSJJPPPPPPPLLLLLLLJJJJJQQQJKKKKKKJKKKGGGGGGCCCCCCCCBB
AAAAAAAYYAAAANNNNNNNQQQQQQQWWWWWWWWMWWWVVVVVVVVVVVVVRRWWWSSQQQQQQNNNHHHHHHJJJHJJJJJJJSSSSSSPPPPPPPLLLLLJLJJJJJJJJJKKKKKKJKKKGGGGGGGCCCCCCCAB
AAAAAAAAAAAAAANNNNNSSQQQQQWWWWWWWWWWWWWVVVVVVVVVVVWWWWWWSSQQQQQQQNNNHHNNNNNNHHJJJJJJSSSSSSPPPPPPPPLLJJJJJJJJJJJJJJJKKKKJJJKKGGGGGGGCCCCCCAAB
AAAAAAAAAAHHAAANNNNSSQQQQQWWWWWWWWWWWWVVVVVVVVVVVVWWWWWSSSSSQNNNNNNNNNNNNNNNJHJJJJJJSSSSSSPPPPPCPLLLJJJJJJJJJJJJJJKKKKJJJJJJGGGGAGGCCCCCCCAA
AAAAAAAAAAHWHNNNNNNSSSSQQWWWWWWWWWWWWWVVVVVVVVVVVWWWWWWSSSSQQNNNNNNNNNNNNNNNJJDDJJDDESSSSSSPSSCCCLLLJJJJJJJJJJJFJKKKJKJJJJJTGGGGAAAAACCACAAA
AAAUAAAAAHHHHHNNNNNSSSQQQQQWDWWWWWWWWWWWVVVVVVVVVVWWWWWSSSQQQNNNNNNNNNNNNNNNDDDDDDDDESSSSSSSSSSVVJVIJJJJJJJJJJJJJJJJJJJJJJJJJGGGSAAAAAAAAAAA
AAAUUUUUAHHHHNNNNSSSSSDQQQQDDWWWWWWWWWWWVVVVVVVVCCWWWWWWSSQQQNNNNNNNNNNNNNNNDDDDDDVDSSSSSSSSSSSGVVVIJJJJJJJJJJJJJJJJJJJJJJJJJGIGSAAAAAAAAAAA
UUUUUUUUUUHHHVVNSSSSSSDDDQQQDDDWWWWWWWWVVVVVVVVVCCCWWWWWSQQQQQQNNNNNNNNNNNNNDDDDDDVSSSSSSSSSSSOVVVVVJJJJJJJJJJJJJJJJJJJJJJJJJIIIAAAAAAAAAAAA
UUUUUUUURHHHHSSNSSSSSDDDDDDDDDDDDWWWWWWWVVWVVVVVCCCWOOOHHYYQQQQNNNNNNNNNNNNNDDDDDDSSSSSSSSSSSSSVVVVVIIJJJJJJJJJJJJJJJJJJJJJJIIIAAAAAAAAAAAAA
UUUUUUUUUUHHHSSSSSSSDDDDDDDDDDDDDWWWWWWWWWWWVWFFFCCCHHHHHYYQQQQNNNNNNNNNNNNNDDDASSSQSSSSSSSSSSSVVVVVVIIJJLJJJJJJJJJJJJJJJJJIIIIAAAAAAAAAAAAA
UUUUUUUUUUHHHSSSSSSSSSSDDDDDDDDDDWWWWWWWWWWWFFFFFCCHHHHHHYYYQQQNNNNNNNNNJDDDDDDDSSSSSSSSSSSSSSSSVVVVVVIJJLGOJJJJJDJJJJJJJJIIIIIAAAAAAAAAAAAA
UUUUUUUUUUHHSSSSSSSSSOSDDDDDDDDDDWWWWWWWWWWWWFFFFCHHHHHHHHXXXXXQQQXNNNNNJDDDDDDDSUSCSSSSSSSSSSSVVVVVVVVVGGGOOJBJJDDDJJJJJJJJXXXXTAAAAAAAAAAA
UUUUUUUUUUHHSSSSSSSSOOSDDDDDDDDDDWWWWWWWWWWWWWWFFCCHHHHHHXXXXXXXXXXXXXJJJDDDDDDDDDDSSSSSSSFSSSSVVVVVVVVVGGGOOGJJDDDDDDJJJJJJXXAAAAAAAAAAAAAO
UUUUUUUUUHHSSSSSSSSSODSDDDDDDDDDDWWWWWWWWWWWWWWFQHHHHHTHHXXXXXXXXXXXXXJJJDDDDDDDDDSSSSSSSSFSSSSVVVVVVVVVGGGGGGJJDDDDDPJDDDDJXXXAUXAAAAAAAAAO
UUUUUUUUUHHHNNSSSSSSOOODDDDDDDVDDWWWWWWWWWWWWWWFHHHHHHHXXXXXXXXXXXXXXXJJJJJDDDDDDDSSSSSSOTTTSSSVVIIVVGVGGGGGGGGJDDDJJJJJDDDXXXXXXXAAAAAAAAAO
UUUUUUUUNNHNNSSSSSSSOOVVDVDVDVVVDWWWWWYWWWWWWWWWWWHWHHNXXXNNNNXXXXXXXJJJJJSDDDDDDDSADISTTTTTTTTVIIIIIINGGGGGGGGGDDDDDDJJDDDXXXXXXXSSAAAAAOOO
UUUUUUUUUNNNNNSSSSVVVOVVVVVVVVVVWWWWWWYYYYWWWWWWWWWWHHNNXXNNNNNNXXXXWWWJJJSDDDDDDDDDDDSSSTTTTTVVIIIIPGGGGGGGGGGDDDDDDDDDDDDZXXXXXXSVSAAOOOOO
UUUUUUUUUNNNNNSXVVVVVVVVVVVVSSSSWWWWWWWWYWWWWWWWWQQQINNNXNNNNNNNFXXXXJJJJJDDDDDDDDDDDTTTTTTTTTTVIIIIIIIGGGGGGGGGGDDDDDDDDDDXXXXXXXSVVAAOOOOO
RURRRRUUUNNNBBVVVVVVVVVVVVVVVSSSSWWSSSYYYWYYWWQQWQQQQNNNNNNNNNNNNXIIIIIJJJDJDDATTDDDTTTTTTTTTTTTMIIIIIIGGGGGGGGGGGDDDDDDDDDDXXXPXVSSVVVVOOOO
RRRRRUUUBBNNBYVVVVVVVVVVVVSSVSSSSSSSSSYYYYYYWQQQWQQQQQNNNNNNNNNNNIIIIIBJJJJJDDTTTTTTTTTTTTTTTTTTMIIIIIIIIGGGGGGGGGGGDDDDDDDDXXXXXVVVVVVVVOOO
RRRRRRUUBBNNBYVVVVVVVVVVVVSSSSSSSSSSSSSSYYYYWQQQQQQQQCNNNNNNNNNBBBIIBBBJJJJJJJTTTTTTTTTTTTTTTTTTMIIIIIIIIGGGGGGGGGWDDDDDDDDDUUXYVVVVVVVVVVOO
RRRRRRRRRBBBBYVVVVVVVVVVVSSSSSSSSSSSSSSSYYYQQQQQQQQQCCNNNNNNNNNBBBIIBBBBJJJJJJJTTTTTTTTTTTKKKTTTMIIIIIIIGGGGGGGGGGDDDDDDDDUUUUXMKVVVVVVVVVVV
RRRRRRRRRBBBBYYYVVVVVVVVVSSSSSSSSSSSSSSSYYYYYYQQQQQQQQNNNNNNNNNNNBBBBBBBJJJJJJJTTTTTTTTTTTKKKTTIIIIIIIIIGGGWGGGGGGGDDDDUUUUUUMMMVVVVVVVVVVVV
RRRRRRBBBBBBBYBVVVVVVVMVVVMMMSSSSSSSSSSSYYYYYYQQQQQQQQNNNNNNNNNNBBBBBBBJJJJJJJTTTTTTTTTTTKKKXXTIIIKIIIIIWGWWWWWGGGLDDDDDDUUMMMMMMNVVVVVVVVVV
RRRRRRRRBBBBBBBVVVVVVVMVVMMMMMSSSSSSSSSSSYYYYYQQQQQQQQQNNNNNNNNNBBBBBBBBJJJJJJTTTTTTTNTTTKKKKKDIKKKKIIKKWWWWWWWWWWLDWDDDDCUUUMMMMMVVVVVVVVVV
RRRRRRRRBBBBRBRRTTVVMMMMMMMMMMSSSSSSSSSSSYYYYNNNQQQWQQQNNWJNNNNNBBBBBBBBBBJJJJJNTTTNNNKKYKKKKKKKKKKKKKKKKWWWWWWWWWWWWWDCDCMMMMMMMMVVVVVVVVVV
RRRRRRRBBBBRRRRRTTMVMMMMMMMMMMSSSSSSSSSYYYWWYWNNNQQWQAQWWWJJJNNJBBBBBBBBBBJJJNNNNNNNNNNKKKKKKKKKKKKKKKWWWWWWWWWWWWWWWWWCCCRMMMMMMMVVVVVVVVVV
RRRRRRRBBBRRRRRHTMMMMMMMMMMMMSSSSSSSSYSYYYWWWWWWNQQWWWWWWJJJJNJJBBBBBBBBBBBBBNNNNNNNNNNNNKKKKKKKKKKKKKKWWWWWWWWWWWWWWWCCCCCMMMMVVVVVVVVVVVVN
RRRRDRRRBRRHRHHHTZZZZZMMMMMMMSSSSSSSSYYYYYWWWWWWWQQWWWWWWWWWJJJJBBBBBBBBBBBBBBNNNNNNNNNNNSKKKKKKKKKKKKKWWWWWWWWWWWWWWIICCCCCMMVVVVVVVVVVVVVV
DDDDDRRRRRRHHHHHTZZZZZMMMMMMMMSSSSSSSYYYYWWWWWWWWWWWWWWWWWWJJJJRRBNNBBBBBBBBBNNNNNNNNNNNNKKKKKKKKKKKKKWWWWWWWWWWWWWWWIIIICCCCVVVVVVVVVVVVVVV
DDDDDRRRRRRHHHHHHHZZZZZZZZMMMSSSSYYYYYYYYWWWWWWWWWWWWWWDWJJJJRRLRNNNBBMMMMMBBNNNNNNNNNNNNPPKKKKKKKKKKKKKWWWWWWWWWWWWWIIICCCCCVVVVVVVVVVVVVVV
DDDDDDRRRRRHHHHHHZZZZZZZKMMMMMMMYYYYYYYYYWWWWWWWWWWWWWWWWJJJJRRRRRNRBBBMMMMBBNNNNNNNNNNNNPPPKPKKKKKKKKKKKWWWWWWWUUWWWIICCCCCCVVVVVVVVVVVVVVV
DDDDDDDRRRRHHHHHHHZZZZZZZMZMMMMMYYYAYYYYYYWWWWCCCWWWWWWWWJJJJJRRRRRRRBBMMMMNNNNNNNNNNNNTNPPPPPPAKKKKWWWKHWWWWWWWUUSSWIISSSSSCCCVVVVVVVVVVVVV
DDDDDDRRRRRVHHHHZZZZZZZZZZZZMMMMMAAAYYYYYAAAAWDCWWWWWWWWWWJJJRRRRRRCRMMMMMMNNNNNNNNNNNNNNPPPPAAAKKKKKKKHHHWWWWWWSSSSSSISSSSCCCCVVVVVVVVVVVVV
DDDDRDRRRRVVVVHHZZZZZZZZZZZZMMMMWWAAAAAYYAAAAACCWWWWWWTWWWWJRRRRRRRRRMMMMMMMNNNNNNNNNNNNNPAAAAAAAAKKKHHHHHHHHHHYNNSSSSSSSSCCCCVVVVVVVVVVLLVV
DDDDDDDDRRVVVVVVYYVZZZZZZZZZBMMMAAAAAAAAAAABAACCCWCCWTTWWQWRRRRRRRRRRMRMMMMMNNNNNNNNNNNPPPPPAAAAAAAAAHHHHHHHHHYYYNNSSSSSSSCCCCVVVVVVVVVLLLVL
DDDDDDDDDRRVVVVVVVVVZZZZZZZZZMMEAAAAAAAAAAAAACCCCCCCWTTTWWRRRRRRRRRRRRRRMMMMMNNNNNNNNNPPPPPPAAAAAAAAAAHHHHHHYYYYYNNSSSSSSSSSCCVVVVVVVVLLLLLL
DDDDDDDOOVVVVVVVVVVVVZZZZZZZJZZZCAAAAAAAAAAAACCCCCCCTTTLLRRRRRRRRRRRRRRRRRMMMMNNNNNNPPPPPPPAAAAAAAAAAAAHHHHHYYYYYYYVYSYSSSSCCCCVZVVVVVVLRLLL
DDDDDOOOOVVVVVVVVVVVVZZZZZZZZZCCCAAAAAAAAAAAACCCCCCCCCCCXRRRRRRRRRRRRRRRRMMMMMNNNPPPPPPPPPAAAAAAAAAAAHHHYYYYYYYYYYYYYSYYYYYCCCVVZVVVVVVLRRLL
DDDOOOVVVVVVVVVVVVVVVZZZZZZZZZCAAAAAAAAAAAAAACCCRRCCCCXNXRRRRRRRRRRRRRRRMMMMMMNPPPPPPPPPPPALAAAAAAAAAAAHYYYYYYYYYYYYYYYYYYYCCCVRVVVVVVVRRLLL
OODDOVVVVVVVVVVVVVVVJJZZZZZZZZCAAAAAAAAAAAAAAACHROOOQQXXXXXRRRRRRRSRRRRBSSMMMGPPPPPPPPPPPPPAAAAAAAAAAAHYYOYYYYYYYYYYYYYYYYYYYCRRRRRVVVRRRLLL
OOOOOOOOVVVVVVVVVVVVJZZZZZZZZCCCCCCAAAAAAAAAAAARRROXXXXXXXXXRRKRRSSSSSRRSSSSGGPPPPPPPPKKKKKAAAAAAAAAAAHOOOYYYYYYYYYYYYYYYYYYYCCRRRRRRRRRRRRR
OOOOOOOOVVVVVVVVVVVVJZZKKZZZGKKKCCAAAAAAAAAAAAARRROOXXXXXXXGGGSSSSSSSSSSSSSCGXGPPKPPPPKUKKKAAAAAMMMMMOOOOOYOYYYYYYYPYYXXXYYYCCRRRRRRRRRRRRRR
OOOOOOOVVVVVVVVVVVVVVVVKKKZZGKKKCCAAAAAAAAAAKRRRROORXXXXXXXXGGGGYSSSSSSSSSSSGGGGPKPPPKKKKKKKAAAMMMMMOOOOOOOOOYYYYYYPXXXXXXXYYCRRRRRRRRRRRRRR
OOOOOOOVVVVVOVVVVVVVVKKKKKKKKKKCCCARAAAAAALARRRRROORXXXXXXXXXGGGGRRRRSSSSSSSGGGGGKKKKKKKKKKKAAAMMMMMOOOOOOYOYYYYYYYYYXXXXXXYYYYRRRRRRRRRKKKY
OOOOOOOOVOOOOVVVVVVVKKKCCKKKKKKCCCGGHAAGALLLRRRRRRRRRXXXXXXXXGGGGRRRRSSGSSSSGGGGGFKKKKKKKKKKKAAMMMMOOOOOOOYYYYYYYYXXXXXXXXYYYYYRRRRRRRRRKKKK
OOOOOOOOOOOOOOVVVJJVKKKCCKKKKKKGCGGGGAGGGLLRRRRRRRRXXXXXXXGGGRRRRRRRRRSGRSSSGGGGGGKKKKKKKKKKKKAOOOOOOOWOYYYYYYYYYXXXXXXXXXXXXRRRRRRRRRRRRKKK
OOOOOOOOOOOOVVVJVJJJKCCCCCKAEEEGGGGGGGGGGGLRRRRRRRRKXXXXXXGGGRRRRRRRRRSGGGCCGGGGGGGGKKKKKKKKKKKOOOOOOWWWWBYYYYYYYXXXXXXXXXXXXXRRRRRRRRRRRKVV
OOOOOOOOOOOOOVVJJJJJJJCCCCKAAAAGGGGGGGGGGFRRRRRRRRKKXXXXXGGGGRRRRRRRRRGGGGCCCGGGGGGGGKKKKKKKKKOOOOOOWWWWWBWTTYYYYYXXXXXXXXXXXXRRRRRRRRRRRVVV
OOOOOOOOOOOOOOJJJJJJJJCCCCVAAAGGAAGGGGGAARRRRRRRRRKXXXXXXGGGGRRRRRRRRRGGGCCCCCGGCGGGGGKKKKKKKOOOOOOWWWWWWWWWTTTTYXXXXXXXXXXXXXRRRRRRRVRRVVVV
OOOOOOOOOOOOJJJOJJJJJCCCCAAAAAAAAAGGGGAAARRRRRRRRRKKXXXGGDGGGRRRRRRRRRGGCCCCCCCCCGGGGKKKKKKKKOOOOOWWWWWWWWWWWTXXXXXXXXXXXMXXXXHHRRVVVVVVVVVV
ONOOONOOOOOOOOOOIJJJJCCCAAAAAAAAAAAGGAAAARRRRRRRRRRKXXXGGRRRRRRRRRRRRRGGCCCCCCCCCGGGGGGKKKKKZOOOOOOWWOWWWWWWWTXXXXXXXXXXMMMMMMMHRRVVVVVVVVVV
NNOOONNOONNIIIIIIJJJCCCFAAAAAAAAAAAAGAARRRRRRRRRRRRRRUXZKRRRRRRRRRRRRGGCCCCCCCCCCGGGGGGKKKKKKKOOOOOOOORRWWWWWTTXXXXXXXXXXMMMMMMHRRRVVVVVVVVV
NNNNNNNNNNUUIIIIIIIJCCCCCAAAAAAAAAAAAARRRRBRRRRRRRRFFKXKKRRRRRRRRRRGQCCCCCCCCCCCCCGGGGGGGGKKKKOWOOOOOWRRWWWWTTXXXXXXXXXXMMMMMEEMMJJVVVVVVVVV
NNNNNNNNNUUUIIIIIIJJJJJJCJAAAAAAAAAAAARPPRRRRRRVVRRFFKKKKRRRRRRRRRRQQCCCCCCCCCCCCCCGGGGGGKKWWWOWWWOOWWRRTTTTTTTXXXXXXXQMMMMMMMMMMJJVVVVVVVVV
NNNNNNNNNUUUIIIIIIJJJJJJJJANAAAAAAAAPPRPPPRRLRRRVVRKKKKKPRRRRRRRRRGGQCCCCCCCCCCCCGGGGGGGGGGWWWWWWWWWWRRBBBBBBBBBBXXXQQQQMMMMMMMMMJJVPVVVVVVV
NNNNNNNNNNUUUIIIIIIUUJJJJJAAAJAAAAAAPPPPPPPPRRVVVVRKKKKKPRRRRRRRRRGQQCCCCCCCCCCCCCGGGGGGGGGWWWWWWWWWWRRBBBBBBBBBBBBBBBBBQMMMMMMMMMPPPPPVVVYV
NNNNNNNNNNUUUIIUIIIUUUJJJJJJAJAAAAPAPPPPPPPKKVVVVKKKKKKKPRRRRRRRRRCCCCCCCCCCCCQUUCGGGGGXXXWWWWWWWWWRRRBBBBBBBBBBBBBBBBBBQMMMMMMMEMMPPPPPPVYV
NNNNNNNUUUUUUUUUUIIUUUUUJJJJJJAAAAPPPPPPPPKKKKKKVVKKKKKKPRRRRRRRRRCCCCCCCCCCCCUUUUUUGGXXXXXWWWWWWWRRRRBBBBBBBBBBBBBBBBBBQMMMIIMMEMLPPPPPPPYY
NNNNNNNNUUUUUUUUUUUUUUUUUJJJJAAAAPPPPPPPPPPKKKKKKKKKKKKKPRRRRRRRRRCCCCCCHHSSUUUUUUUUGGGXXXXWFFWWWWRYRRBBBBBBBBBBBBBBBBBBBBBBIIJELLLLLLPPYYYY
NNNNNNNUUUUUUUUUUUUUUUUIIHJAAAAAAGPPPPPPPPPPKKKKKKKKKKKKKPMPPCCCCCCCCCHHHHHSSUUUUUUUUUXXXXXFFFWFFRRRRRRBBBBBBBBBBBBBBBBBBBBBIIJJLLLLLLLPPYYY
NNNNNNNUUUUUJUUUUUUUUUUUHHHHHHAAAAAPPPPFFFFKKKKKKKKKKKKKKKPPCCCCCCCCCCHHHHHSSUUUUUUUUUXXXXXVFFFFFRRRRRRRRRRBBBQBBBBBBBBBBBBBJIJJLLLLLLLPYYYY
NNNNNNNNUUJJJUUUJUUUUUUUHHHHHHAAAAAEPPPFFFFKKKKKKKKKKKKKKKPPCCCCCCCCCHHHHHHSHURUUUUUUXXXXXXVVFFFFFFRRRRRRRRBBBQBBBBBBBBBBBBBJJJJLLLLLLLYYYYY
NNNNNNNNUUJJJJJJJJJJUUUUIHHHHHAEEEEEPPFFFFFKKKKKKKKLLLKKKKKPCCCCCCCCCHHHHHHSHUYYYYYYYYYYUXFFFFFFFFFFFRRRRNNBBBNBBBBBBBBBBBBBJJJJLJLLLLLYYYYY
NNNNNNENUJJJJJJJJJDDUDDHHHHHHEEEEEEEPPFFFFFKKKKKLLLLLLKKKKKKCCCCCCCCCHHHHHHHHGYYYYYYYYYYYYYYYYYFFFFFFRFRFNNBBBNBBBBBBBBBBBBBAJJJJJLLLLLLYYYY
NNNNNNNNSSSJJJJJJJDDDDDDHHHHHHEEEEEEFFFFFFFFKZKKLLLLLLKKKKKKKCCKCKCCCHHHHHHHGGYYYYYYYYYYYYYYYYYFFFFFFQQQQQQBBBQBBBBBBBBBBBBBAJJJJJJJLLLQQQQY
KNNENSCSSJJJJJJJJJDDDDDDDHHHHEEEEEEFFFFFFFCKKKKKLLLLLKKKKKKKKKKKKKKKHHHHMHHZGGYYYYYYYYYYYYYYYYYFFFFFFQQQQQQQQQQFFCCFFFFAAAAAAAJJJJJJLQQQQQQQ
NNNENSSSSJJJJJJJJJDDDDDDDHHHHEEEEEHFFFFFFFLLKLLLLLLLKKKKKKKKKKKKKKKKCTCCCCZZZZYYYYYYYYYYYYYYYYFFFFFFQQQQQQQQQQQNFFFFFFFAAAAAAJJJJJJQQQQQQQQQ
EEEEESSSSSJJJJJJJJSDDDDDHHHHHHHEEEHXXFVVFFLLKLLLLLLLLKKKKKEEKKEEKKEKCCCCCCCZZZYYYYYYYYYYYYYYYYFFFFFFQQQQQQQQQQQFFFFFFFFAAAAAAJJJJJQQQQQQQQQQ
JEEJEJJJJJJJJJJJJJSDDDDDHHHHHHHEEEHXXXLVFLLLLLLLLLLALEEEEKEEEEEEKKEKCCCCCCCZZZZYYYYYYYKKKKKKKKKFFFFFQQQQQQQQRRRBBRFFFFFAAAAAAJJJRRQQQQQQQQQQ
JEJJJJJJJJJJJJUUSSSSDDDDHHHHHHHHHHHHXXLLLLLLLLLLLLLAAEEEEEEEEEEEEEEECCCCCCCCCCZYYYYYYYKKKKKKKKKKFFFFQQQQQQQQQQQQQRFFFFFFAAAAAJJJJQQQQQQQQQQW
JJJJJJJJJJJJFFUUSSSSSDHHHHHHHHHHHHHXXXXLLLLLLLLLLLAAAEEEEEEEEEEEEECCCCCCCCCCCCCYYYYYYYKKKKKKKKHFFFFFFQQQQQQQQQQQQRRRGFFGGAAMMMXXHQQQQQQQQQQW
JJJJJJJJJJJJJUUUSSSSDDHHHHHHHHHHHHYHXXXXLXLLLLLLLAAAAAAEEEEEEEEECCFCCCCCCCCCCCCYYYYYYYKKKKKKKKKFFFFGGQQQQQQQQQQQQRGGGGGGGXMMXXXXXQQQQQQQQQQQ
UJJJJJJJJJJBBUUUSSSSSHHHHHHHHHHHHHHHXXXXXXBBBBLLLAAAAEEEEEEEEEEECCCCCCCCCCCCCCCCCCPPKKKKKKKKKKKKKKGGGQQQQQQQQQQGGRRGGGGGXXXXXXXKXXQQQQQQQQQQ
JJJJJJJJJJJBSSSSSSSSSHHHHHHHHHHHHHAHXXXXXXXBBBBAAAAAAAAEEEEEEEEECCCCCCCCCCCCCCCCCPPPKKKKKKKKKKKKKGGGGQQQQQQQQQQGGGGGGGGXXXXXXXXXXXCQQQQQQQOQ
KJJJJJJJJJJSSSSSSSSSSHHHHHHHHHHHHHHHXXXXXXBBBBBBBBAAAAAEEEEEEEEOOOCCCCCCCCCCCCPPPPPPPKKKKKKKKKKKKGGGGQQQQQQQQQQGGGGGGGGGXXXXXXXXXYQQQQQQQQQU
KJJJJJJJJJJSSOOSSSSSSAHHHHHHHHHHHHHHHXXXXXBBBBBBBAAAAAAEEEEEEEEOOOCCCCCCCCCCCPPPPPPPPPKKKKKKKKKKKGGGGQQQQQQQQQQGGGGGGGXXXXXXXXXXXYQQQQQQQQQU`,
    output: 844132,
  });

  Utils.check(solve, dataset, "12b");
})();
