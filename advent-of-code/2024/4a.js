(() => {
  function solve(input) {
    let lines = Utils.read(input);
    let matrix = [];
    let sum = 0;

    for (let line of lines) {
      matrix.push(line.split(""));
    }

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        sum += xmas(matrix, i, j);
      }
    }
    return sum;
  }

  function xmas(matrix, i, j) {
    let sum = 0;
    if (matrix[i][j] === "X") {
      if (
        i < matrix.length - 3 &&
        matrix[i + 1][j] === "M" &&
        matrix[i + 2][j] === "A" &&
        matrix[i + 3][j] === "S"
      ) {
        sum++;
      }
      if (
        i > 2 &&
        matrix[i - 1][j] === "M" &&
        matrix[i - 2][j] === "A" &&
        matrix[i - 3][j] === "S"
      ) {
        sum++;
      }
      if (
        j < matrix[i].length - 3 &&
        matrix[i][j + 1] === "M" &&
        matrix[i][j + 2] === "A" &&
        matrix[i][j + 3] === "S"
      ) {
        sum++;
      }
      if (
        j > 2 &&
        matrix[i][j - 1] === "M" &&
        matrix[i][j - 2] === "A" &&
        matrix[i][j - 3] === "S"
      ) {
        sum++;
      }
      if (
        i < matrix.length - 3 &&
        j < matrix[i].length - 3 &&
        matrix[i + 1][j + 1] === "M" &&
        matrix[i + 2][j + 2] === "A" &&
        matrix[i + 3][j + 3] === "S"
      ) {
        sum++;
      }
      if (
        i < matrix.length - 3 &&
        j > 2 &&
        matrix[i + 1][j - 1] === "M" &&
        matrix[i + 2][j - 2] === "A" &&
        matrix[i + 3][j - 3] === "S"
      ) {
        sum++;
      }
      if (
        i > 2 &&
        j < matrix[i].length - 3 &&
        matrix[i - 1][j + 1] === "M" &&
        matrix[i - 2][j + 2] === "A" &&
        matrix[i - 3][j + 3] === "S"
      ) {
        sum++;
      }
      if (
        i > 2 &&
        j > 2 &&
        matrix[i - 1][j - 1] === "M" &&
        matrix[i - 2][j - 2] === "A" &&
        matrix[i - 3][j - 3] === "S"
      ) {
        sum++;
      }
    }

    return sum;
  }

  let dataset = [];

  dataset.push({
    input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
    output: 18,
  });

  dataset.push({
    input: `XMMMSMMXMSXMXMAXSMMAXXXXSXXASXSASAMSXMAXAAMSMMMSXSAMXMMXMASMMMSXMXSAMXSASAMXXXXMMMMMMXMXSMXSMSMSMSXSSXSMSSMSAMMXXSAMXMXMXSMSMMASMXMAASMSMMMM
MSMXAASXMSASAAAXSASMSAMXMMMXAAMMMASMMXSXMXSAMAAMXSMMASXSSXMAAAAAMAMAXASAXMMSMMMXSAAASMMAMSAMASAAASXMAMAAAAXMAMAASAMSAMXMAAMAMAASMMMSXMAAMAAM
AAMMXXMXASAMXSSMSAMAXAMMSAXMMSMSSXMXSAXASXSASMXMAXASMMSAAASXMSSMMASMMMMMMAAAAXXAXMXMXAMAXMMSAMSMXMAXMXMMMSMSAMMXSAASASMMAXSASMMXAAAMMMSMSMXX
SSSSXASMMMSMAXXAMXMXMXMASXSAAAAXMXXXMASAMMSAMASMMSAMAXXMSMMMMAMASAXAAXASAMXSSMMMSMSSSMMSSMXMAXMMSSMMXMMAMAASXSXMSMMSAMXSAXAMMASXMMMSAXAAAASX
XAAMAMXAAAAMXMMMAAMAAAMMSXXMSSSMMSMAMAMAMAMXMAMAMAMMXMSXXMASMAXAMXSXMXMXXSAMAMAAAAAAXXAAAXXMMMMAAAAMMXSASMXMXMMMXMAMMMAMXSMAXAMAAMASXSMSXMAA
MMMMAXSMMSSMSXAASXSASXSMMASAAAAMAAAMMMSXMXMAMXSAMSASAMXAXSMMSSMMXMAXMSMMAMXMAASXMSMMMMXSAMSMSMMMSXXMAASXXXAXAAAMAMSSMMXSASXSMAXMMMAXAXAMMSMA
MXSSMMMSMMMAAMMMXAMXMXAAXAMMMSMMSMSXAXMAMAMASASASAASMAMSMSMAAMAXXMAXMAMMSSMSSXMMAXXXAAAXAASASMAAXASMMMSXMXMSMSMMASMXMAAMMSAXSAMSMMXSSMXMASXX
MAMAMMAAXSMSMSASXSAMMSSMMXSXAAXMAXAMXXSMMSSMMXMXMMMMMAXMAXMMSSMASMMXMASXAAAAMAMMSAMSMSMMMMMXMMMMMXMASAMXAMXMAAXSMXMASMMSAMAMMXXXASMAXMASXSSM
MXSSMMSMXSAAASASMMAMAAAAXXXAMMMMSASXMXAMAXAXXSMSXSMASMSMAMXMAAXAMASASAMMSMMMMXMAXAMXXXXAXMXMSXSXSXSXMASAMSSSXMXAAXAMXAXMXMMMSSMSAMMMMMMMAMAM
SMMMXMAMXXMMXMAMMSAMMSXMSMSMMXAAAMXAXSAMMMSMMMAAAXMAXAAMAMAMMSMXSAMMMASAXAXXXAMAMAMMMSSSMSAMSSMASAASMXMXMXMASXSMMSMMMSMAAXMAXAAMAXASAXXMASAM
AAAAXMMSASMXXMXMXSXSMXMASASAASMSSXMAMSXMAAAAAMMMMMMXSSMSASMSAMXXMXMXMAAMXSMSXSMMSXMAAXAAAXAMXAMAMAMMMAXAXXMMMXAXAAMAAAMSMMMMSMXMXSASAXMSASAS
SSMSXSAMXAAAXSSMAMXXAXMAMXMXXMAXXMMXMMSSMSSSSSXSMXSAAXAMMSAMXSAXAAMAMMSAMMASAMXMAXSASMMMMSSMSAMSSXMAXMSMSXXXXMSMSSSMSSXXASXXAMMMAMXMMMAMASMM
XMAXAMMMMMMMAXSMASXMMMMASXMXSMSMMMXAXSAXMAAXXAAXXAMMSMSMMMAMSSMSXMSSSMAXAMAMAMAMSXSAMXMAMAAXMAMMAASMMMAAMMMAXAAAXMXXXMASAMMSXSAASMSAAMXMAMXM
SMSMSMAASXMMXMMSMMAAAAMXMXMAMAAXAXSXMMAXMSSSSMSMMMSMMAMAASAMAMXSAXXAAXAMSMASXSXSXMMAMMMMMSSSSMSMMMMMASMSMSMASMMSMSMMSMXMXMAXXMASMAMXMXAMAXAX
AAXSXMSMXAXXAXXAMMSSMMSASAMASMMSXXAMXSMSAMAAXAAMAXAAXAMSMSASMMASXMMSSMXSXSXXAAXMASMMMXAAMAMXAAAAXAASXMXMASAASMAMMXMAXXXXSXMMAMSAMXMASXSSMMSS
MAMSXMAXSMMSXMSASAXAMASXSASASAXAMXXAMAAMXMMMMSMSSSSSMSAAMSAMXMASAMXAXMXMXMSMMMAXAMASASXMMAXSMMMSSSMSAMSMAXMASMAMXXMMMSAAXAAMSMAAXMMXSAMAXAAA
SMAMASAXAAAXMASAMMSAMXSASXMASMMSSMSSSMMMSXAAAMXXAAXAAXMSMMXSAMXXAXMSMMXMXMMMSAMMSSMMASAASXMMXMAAAMASAMXMXSMMXMAMSASAASMSMXMAMASMMASAMAMAMMXM
MXSXMMMXMMMSAMMXMXMMMAXXXMMMMAAXAASAXAXSXMSMSSSMMMMASXAAAXSXMMAXMMMAASMMAMAXASMAAAMMXMXMXAMXAMMSSMXSSMXSXMAAXXAMSAMMXMXXMMSAMAMSAMMASMMSSMSS
AAAXSASMXSXMMMMSMXMAMSMXMMAMMMMSMMMMSAMXAMXMAAAAAXAMXMSSSMMASMSSMAMSSMASASASMMMSSMMSMSSXSMMSMSAMXXXMAMXXASAMSMMXMXMXAXMAMXMASXXMSXSXMMAMAMAS
MXXMSAMAASXSAXAAMASMSAAAMSASXMAMMAMXSMSSXMAMXSSMMMSXXAAAAAMXMAAXMMMXMAXSMSXMXMAAAAMXMASXXAXAAMASMSSSMSMSAMXMMASXMMMSMSXAAAMXMMAMMMMXXMAAAMMS
MMSMMSMMMSASMMSXSAMXSMSMXAASXMAMSMSMXMAAASXSAXMAAAXAXSAMSSMSMXMXAMSAXMMSXXMSAMXXSMMAMMSMXAMXXSAMXAAAAAAMAMMMSAMAAMASXXXMXXMAXXSMAAMSSSSSSSXS
XAAMAMXASMAMXAAAMXSAMXMXMMXMMMSMXAAXAMSSMMASASXSSSMXMMAMXAAAMSMXXXMAXSAMXMASMMSMMASASXMASXXSAMAMMMSMMMMSAMSAMXMSMMMMMMAXASXXSAAXXXMAAXAXAAAX
MMXMAMAMXMAMXMAMXXAMXASMXXMAXAMXMSMSXMMAXMAMMMXXAAAASMMSSMMMMAMASMMMMMASXXAXMAMAMAMASAMXMXASXSAMMXAMAMMSASMXXSAXAMXAAXMAXSAASXMASXMMSMMMSMMM
MSSSXSAMXAMMAMSMSMMXMMSAASXSMMSAAAXMMMSMMMMSAAXSMSMMMAXAAAMSSMSAAMAAXSAMMMMMMMSAMAMXMMMSMMAMAXAXSXMSASAXMMASAMMSMMSSXSXSXMMMMAXAAAAAMAXXMAMX
AAAAMSMMSMMMSSMAMXMSASMMMSAMAXSXSMXMXAAAAXAMXSMSXMMXXSMSMMMAAXMMSSSSMMASXMSAXMAXSMSXMAXAASXMSMSXSAASMMMSAXASXMXAMMAMMSAXASXXMAMXSXMMSMMMSSMA
AMMMMXXAXXMAXAMXMSAMXXSAMXMSAMXAXXXXMMSSMSSMMXASAMXSXXAMASMSSMSAMXAXXSXMAAXMXMSXSXXAMSXSMMSAAAMASMMMMAASXMAMAXSXSMAMXMAXAMAMSXMAMMSAMAXAAAXM
SMMSXXMASXMSSMMAMAMMMASMXAXXMXMSMSMXSAAAMAXAXMXMMSAMXMMMASAMXXMAXSAMXMSMMMMSMAAASMSSMXXXAAMSMMMMMMSSMMMSAXXXMMXMMMSSXSMMMMMXAAMAMXMAXXMMSSMM
AMAMXXAMXAMXAXSXSAMAMXMASMMMMSMMXMAXMASMMSSMMMXSAMXSMSAMXSAMXXMAMXASMAAXAMAAMXMMMAXAAXAXMMMAXAAMXAAAXSXMXMMMSAXAAAAAASXSXAXSMXXASMXSMXAMAMXX
MMAXSASMSSMMMMAXMASXMSAAAAAAAAXMASXMMXMAAMXMAMAMASASASMSASAMXMSMSSMMMSMMMSSXSSXSMSMMSMSMSAMMSSSSSMSSMAAMXAXAAAXSMSMMMMAMMSMAAASMMMSXMMAAMMMM
XSASXAAAMMSAMXMMSMMMSSMMSSMMSXSSMSASXSMMMMMXMMAXAMXMAMAMXSAMXAAAXASAMXASMAMMMXAXAAXXAAXASMMXMAAAMAAMXXAMAMMASAMXAMASXMAMAMSMMMSXAXMAMMMMXAAA
MMSSMMMXMASMSASAAXAXXXXMAXMXMAMXASAMAMSMAAMXSMMSXSMMSMMMMMXMXSMMMAMXSSXAMXXMMAMMSMSMMSMMMMSMMMMSMMMMSXSASXXAXMXMXMASXMAMAMSXSXSMSMMAMASMSSSS
AXAMXSXSMAXXSAMSMMMSMSXSAMXAMAMAAMMMXMAXMXSASAAAAMAMAMXAASAMXXXSMSXXMASMAASXMMXAXAXXMXMSXMAMAMXMAMAXSAXAXSMSMMAMAMASASXSSSMAMAXAXSSMMMSAXAMX
SMXXMSASAMXAMAMMXMMAMXAAXAMXSAMXSXXAMSSSXAMASMMMSMASASXSXSASAXAXAMMSMXMXMSMMASMMSAMSMAMXASMSMSAMXMXSMAMAMMXMASASAMASAMAAXSMAMSMSMAXAASMXMAMA
AAMXMMMMAMSAMSMSAMSSMMMMMSAMXMSXXMMMXAAXMAMXMMMAMXAMMSAXAXAMAMSAAMASMXMXMXASAMXAMAAAMXMXMMXAAAMAMMSMMXMXMSASXMAMASMSAMMMMMSXSAMXMMMMMMAXSXMM
MXAAXAMXSXSAMMASMMAXXSXSAAXAASAMAMASMMSMAAXAAXMASMSSMMAMXMMXSSXMMMXMASXMMSXMASMSSXSMXSMSMAMMSMMAAXMXSXMASXASAMSMMAMSMMAXMAMXSAXXAXSMSMSMMMMM
XSSMMASXMASAMMAMAMMXXXASXMASXSASXSASAAAAMSSMSMSMSXXAMMMMXASAMMMSMMMMXMAAASASASMAMAMXAXAAAXMXAXMSSXSAMAMXSMMMMAXASMMSXSXSMXXASAMSAMXXAAAAMAAX
XAAASXMASASAMMSSSMXXMMXMAXAMXSAMXXASAMXSAMAMAAAMSMMXMAMXMAMXSAAAAAMAMSMMMSXMAXMASAMMSSSMSMMSMSMAXAMMSXSAMXXASAMAMXXSAMAMMMSMMMMASMSSMSMSSSSS
XMXMAMSAMAMXMAAMAAXSXSAXMMMMXMMSSMXMASAMMSAMMSMSXAXSSMSSMXMASMXSSXSAXXMSXMXMXMMMSXXAXMAXXAXAAXMAMMMXAXXMSSSXSAMSXSSMAMAMAAAMASMAMXMAMXAMXXAX
ASASMMMSMMMSMSMXMMMAASXSSXSXXXAAAMAMXMMSMMAXXMXSMMMAAMAMAAAXMSXMAMSMMAMMAMXMMMSAMXMSSSMMSMSSMMMSSXSMMMSAAAXMMXMMAMXMXMASMSSSSSMASASMMSSMSMSM
AXAMSASASASXAAXSXSMMASAMXAMXMMMSXSAMSAMXMSSMASAMAAAXMMXSSSSMAMSMAMSMSSMSAMXSAAMMMMAAAAXMAMXMAASXMASMAAAMMXMMMXMMMMAMASXXAXXXAXMASMMMAXXAXAXX
SMSMSMSASXMMMMMXASXXMXXAMAMMSXMXAAAXMAXXAAASAMMSSMMSXMAMAMXMAAAXAXMXAAXSXSAMMSSXSXMMMASMXMAXMMMAMSMMMSSMSMXSMAAAAXASAMMMSMMMMMMMMAAMSSSMMSMM
XAAASMMXMAMMMMAMSMAXMAXMSXMASXAXMASMMXSAMSXMSSXAXAAAAMMMSMXXMSSSSSMMMSMMSMMSAAMXMASXSMMAMSSSMSSXMAMMMAAAXXAASXMSSXAMAXSAMAAAAMASXMXSAAAASXMS
MMMMMAMXSMMSAMXMXAMXMASMXAMSMMMXSMXAXASMXXAAAMMASMMSXMMAMMMXAMAMXAMAXAASAMXMMXXAMAMXAAMSMAMMMAASXMSMASMMMMMXAXAAXMAMSMMASXSSXSMXAXMMMSMMMAMS
SASMSXMAMAASXSMSMXMAMXXXASMMXAXMMSSXMASAASXMMAAMXMMMMMMAXASXMMSMSSMSASMSAMMSMSSSSMMSAMMAMAXAMXSMSMAXMMAMMSXMMSAMSSSXXASXMAAXMMMSMMAXMAMASMMS
SASAMXMASMMXMMAAAMSMMSXXXMAXSXMXAAMAAASMMSXXXXMMAMAAAAMSMMMAMAXMAXAXMMMXAMAAAAXAAAAMASMXMSSMSXMAXSAXXXXMASXAMMAXXAXXXXMSMMMMXAAXXXXMSSSXMMAS
MAMAXASXSXSMSMSMSMAAAXMSAMXMSXMMMSSSMXMAXXXMMSXSASXSMXSAAXSSMXSAMMSMXAMSMMSMSMAMMMMMASAAAMAMSAMAMMMSSMAMAMSMMSSMMXMMMSAXMSMMMSXSMMSAAMXAXMAS
MASXMMAXMASAMAMAMXMMMMAAAMAMMASAMXAXXMSSMMSXAAXSASAMASMMSMAAAXMMXMAXMAMAAAXAAMSXXSSMAXMMMSAMSAMXSAMAAMAMMMXSAAAAMASAAMSMSASXAXAXAAAMMSSSMMXS
MASXMAAMMAMXMXMAMAXAAAMMXXSXSASAMMSMXXAAAAMMMMXMMMMMMMAAXMMMMMSXMXSSSSSSSMXSASXXMAXMMMXMASMMMAXXXAXMMSXMSASMMSSMSAMXMXXXSASMMSASMMSSXMAMXMAM
MAMAXAMXMXMXMXMAMAXSSSMXMXXASASXMAXMSMSSMASMXSXXMAMASMMMXMSMSAMASAXAAAXAAAXXXXMMSXXAMXMXMXMASMMMSXMSMSMASMMAAAMMMXSSMMMMMXMAXMAMAMXMAMMMAXAX
MSSMXASMXMSMAMSMSAXAMXAAAMMAMAMXMXXAAMXAXXMXAMXASMSXMAMSSMAAMXSAMMMMMMMSMMSXMAMXASMMSMSAMXSASMAMAXAAAMMAMXSSMSMAMXSXSAAXMASXMSMSASASAMASMSSS
MAAXSSMXAAAMAAAXXMAMMMSMSMMAMAMXXAMMMSSMMMAMXMAXAMXAMMMMASMXMMMASMXMAXXXXAXAXAMMASXAAMXAXAMMXXMAXXMMSMMMSAMXAAXAXXMAMSSMSASAMAMAAAXXASMSAAAX
MMSMMAASMSSSSSSSMSMSMAXXXXMAMAXMMMXSAAAAASXSASXSXXSAXSASMMSAMAMXMAAASMMMMSSMMMMMXMMMSSXSMMMXMSSMSMXMAXMAMAXMSMSSSMMSMAXXMASAMASMSMASMMXMMMSM
XXAAXMXMXMXAXAAXAAMAMMSMXSMSSXMAAASMMMSSMSASXXAMXMAAXSAMSAMXSSMMSMMMAAAAAAAASXMXAAAXAMAMASAASASAAAASMSAMXMAXMMXMAMAMMAMMAMXXSXMXAAAXAAXXAAXX
SSMSXXAXAAMMMMMMSMSXSASXAAAAAAXMMMSXAMMMMMMMXMAMSXMXMMAMMMSAMAAAXAXXMSMMSMSMMAASMMSMMSMSAMXMMAMSMSMSAMXXAAMSAMXSMMAMMAXXMXSAMXMSXMMSMSSXMSSX
AMXMXSSSSSSXAAMXMXMASASMSMMMSMXSAMXMAXAMXXAAXSAMXAXAMXAMAAMXSMMMMMSSXMXAAMAXMMMMMAAXMAMMXMXXMSMMXMAMAMMSSSMMMMMXXSSSSXSAAAMSAMXXSXAXAAAMSAMX
MSXMAAXAXAMXSMXAMASXMAMXXXMXMAASAMAMSSSSSSMSMMASMXMMXMAXMSMASXASMAAMASMSSXMMMAAMXSMSSMSMMMSAAMAMSMASAMMMAMXAAAAAAXMAMAAXMMXAMMMMSMAMXSMSMAMM
XMAMXMMMSMMMMSMXSXMAMMMMXMSMMAMSAMXSAXXAXMAXXSSMASMAMSAMSXMASXMMMMXXXMAMAASXSSMSAMXXAXXAAASMMMAMSXMSMSXSASMSSSSMSSXAMXMAMXXAXAAAXMXMAAXSMSXS
SSSMSXAXAAXXAMXMAMSAMXASAMMASXXXMASAMSMXMSAMMMAMAMMAXAMXAAMXXASXMSSSMMMMMMMAAAAXMAMSAMXMMXSXMMXMXAXXMAAMASAAMAXAAXMMXAXSSSMSSXSXMMAMASMMAXAA
XAMAMMSMMSMMSMMMSXMAMSAAMASAMMXMAMAMMAMAMMAAAMAMAXMXMAXXMSMXSSMMXAAAXXAAAXMMMMMMXAXMXMMSMXXMXASMSSMAMSSMSMMMMSMMMSASXMSMAAAAAXXAMMXSAMAMAMSM
MMMAMMAMXAMAAAAAMMMSAMMMXAMSSXXXMASXMASAMXASMSXXXSMMSSMSMAAMSXMXMSMMMSMSMSAAXMAAMSSSMSMAMMXSMMSXAAXXMAAMXMXAAMAMAMXMAMXMSMMMXASASAMMASMMMMAA
XSSMSMAXSAMXSSMXSAAAXXAXAAXAMMMSXMMASMSASMAMMMMMSAAMAMAAXMXMXAMMMXAAAXXAAMMMSMMMSAAMAAMMMMASAMMMSMMSXMASAMXMXXAMMXSSMMSMMXXXMMSAMXXSAMXMXAMS
MMAAXMAXMAMMXMASMMMSASMSXMMAXAAXMASAMAMAMMMMMAAXASMMAMSMXSAMSAMAAMSMMSXMSMSASAMSMMSMSMMSAMAXMMAAAAMXAXASXMAXSSMMMAXAXAAMMSSMAXMXSAXMXSASASXA
AMMXMASXSAMSAMXMAMAXXAXXASXSSMSSMAMSMXMMMMASMSSSMXSSSXXAAMAXAASMSMMAMXAAXMMASAMAAXMMXAAXSMSMMSXSMSSSSMXSASMXMASXSMMAMSMSAAAXSXAAMASMXSASMAMM
SASXMAMXMAASASXSMMAMSXSMXMAMMXMAMSAXMAXMASMSAAAXAXXXMAMMMSSMSMMAMMMMXSXMXSMAMASMSAMXXMXXMMXAAMAMAMAAMMMMAAXASAMXSAMXMXAMMSSMMMMMSMXMAXXXXMAX
AAXSMXMAMSMMXMXAAMMMMMMXAMXMMAMXMMAMSSMSXSMMMMSMMMMAMXMMXXAAXAMXMAASMMXMAMMXXXMMXXAXXXSASAXMMMAMAMMMMMSMSMXMMASXSAMSMMXMAMMXAAAXXMAXMMXSAXAM
MMMMSSMSMAAXMSXMSMMAMAXASMSSSMSAXMAMXXASAMXMAXAMSAMAMASXMSMMMXMASMMSAAAMMXSAXSAMXMMSMMXAMAXSXMASAMXMAAMAXXSSSMMASXMAMAXSXSASMXSXSSSXSAASAMSS
MSAMXMAXSMMMAXAXAAMXSMSMMAAMAMSXXXASAMXMAMAMMMXMMAXXSASAMXAAMXSXMMXSMMXSAAMAXSAMSAAMAAMXMAMMASMSAMMSMSMXMXAASXMAMMSXSMASAMMMMMMAMAMAMXMSAMAM
XSMSAMSMSMSSSSMSSSMAMAMXMMMXXMMMMSAMAXMXAMXMSAMXSMMXMMSXMMMMSASMSMXMMMAMMSMMMSAAMMMSSMSMMXXSAMMXAMAXMMMSXMSAMXAMMMMAAMAMXMMXSAMAMAMXMSMMAMMS
MXAMXMAAXAXAAXXMAMAASMMXMAMSMSXAAMAMMMXSASAAXMXMAXSAMASASXSMMAMMAMAAAMXSAMAMASMMSXMAMXXAAAMMMMSSMMSMXMASXAXASXMAMAMSMMMSMXSAMMSMMXMXAAXSXMXX
AMSMSSMSMSMMMMMMAMSAMAMMXAMAAMMMMSAMAAMSAMMSMMMMMASASMSAMAAXMSMSMXSSMSAMMSAMXSXAAMMASXXMMMSAMMXAAXAAXMAMMMSAMXMASMXXAMXMAAMASAAXSSMMSMXASMXM
SAAAAAAMAMXAAAXSAMMXSMMASXSMSMAXXSXSMSXMSSMMMMXAXMSAMXMXMSXMAMXAAAXMMMASXXAMXSMXSAMASMSMSMSAMAXAXSXSSMSSMAMXMAMMSMAMSMSXMASAMXXSAAXAAXAMMMAM
XSMXMMXMAMSMMSAAMSMAAMMMXAAAMXXXAMXMXXAMAXMAXMSMSXMASXAXXMASASMMMXSAMXAMMMSMAXAMXXMXMAAAAXSAMASMMSXAAXXAMSSSSXSMXMAMAXMASAMAMXXXMSMXSSMAAXAS
MXSXXMMSAMMASXMXMAMXSMSXSSMMMASMAMXXAMAMMSSMSXMAMMMSAMXXMSAMXSAAXAMXMMSXSAXMMMSMAMSSMSMSMMSAMAAAAXMSMMSSMXMASAAASXSSXSSXMXSAMSAMXXXAMAXSSSMS
SASMAMASMSXXMAXXSXSMAASAMXAXMASMAMMMMXAMXMAAXMMXMAXMASXMMMASASXMMXSMXMAAMAXAAAAMXMAAAAMAMAMMMMXMMMXAMXMMMAMMMSMSMAAMAXXASAMAXXAMMSMXMAMXAAAS
MAMMAMMMXAASXSMAMASMMMMMMSMMAAXMAXXAXXXXASMSMXSSSMMAXXMMASAMXXAXXMAXAMMSMMSXMSMXMSSMMMMAMXXSASXMAXXAXXMAMAMXAMXMMMMMXMXXMXSXMSAMAXMMMSMXSMMM
MAMSMSXSMSXSAAMXMAMAMSSMMAMXMSXMSMSASXXSXSMMMAXXAASMSMMSASAMSSMMXAMSMXAAAAAXXAMAAAXXMAMMSMMSASXMSSMMMXXAXAXMASAXAMXSAAXMSMXAXSXMMMAAAAAAXASM
MAMAASASAMAMXMASMSSSMAAXXXMSXMAAAAMAMAASAMXAMMMMSMMAAAMAASMMAAAXMSXMAMSSSMMSAASMMMMMMSXSAXAMXMASASAMXAXSSXMSAMASXMASMSAXAAMSMMASAMSMSSMXSAMX
SMSMSMAMXMAMXXXXAXMAMMMMMSMMASXMMSMMMMXMAMMSXSAXXXMXMXMMMMMMSSMMSAMASAXXAMXXMMMMSAAXAAXSAMSSMSMMASXMMXSAAXXMASXSAMASAMXXMSMAAAXMAMXAAMXXAMXM
SMMMAMXMAMXMXMXMMMMASMMSXSAMAMMAAXAXSSSMMSMMASXSMMSMSMSAXXXAXAMXXAMAMXMSMMMXXXAASMMXMXMMAMAMXAXAMMXSAXXMXMMXMAXXAMASASXSMAXXSMXSXMMMMSXMMSAS
MAXSASXMXMAMXAXAAXAAXMASASXMXXAMXSAMAAAMXSAMAMAMAAXAXASMSAMXSAMMSMMSMMXAMAMXMMMMMASASAMMAMAXMMSSSSXMMSMXMMXXMXMSMMMSXMAASXSXMMMMAMAAAXAMXSAS
SAMXMXMMASASXXSAMMMMMMMMAMXSMMSMXMXMMSMMAMAMSMMSMMSXMMMMSAXAMAMMAMMAASMSSXSAMXAXMXMAXASMSSMSAAAAMXMAAAMMMXAXMAMAASAMXMSMMMAXMAMSAAMSMSMMAMXM
MMSMMAMXAMAXAASASXXMXSXMXMAXAMXXAMAMAMAMASAMXSXAAXAMXMAMSAMSXSMSASMMXMAXXMMASMMSAMMSMXMAXAAMMMMMMAXSXMSAMAXXMXXAMXMASXMASMMAXAMXMSMAMMAMMSAM
XAAAMASMMSXMMMMAMMMSAMASXMSSSMSAMXASAXMXMSMSMASXSMAMMSAXMAMAAXASXSASMMSMAMSMMXAMXXAXMXSXMMMSSSSSSSXXAAXASMMSASMSXMSAXAMASMSASMSMAAMAXSASXSAS
MSSSMASXXAAMXSMAMAAMASAMAXMAXXMASMMMMSXMXMMAMMAMXMSMASMMSAMMSMAMMMAMMAMXXMAXXXMSSMMSMAMAMMXMAASXAXAMMMSMAAAMAMAXMAMMSSMAMXXAAMAASXMSXSASAMSM
MAAXMXMMMMMSAMMSXMMSXMASMMSAXMMXMMAAXMASAAXASXAXAMXMXSAMSXSAMXXXSMAMMXMASMSSSMAAAAAAMAXAMMMMMMMMAMXMXMAMMMMMXMAMMSMXAMMAXMMMMSSMXSAXAMAMMMAS
MMSMSAMXAAAMXMAXSMMMMXMMXAMXSMSMMSMMMMMSSSMMSMMXAMAMAXAMXAMASMMMASMSMXMAMAAAMAMMXMMXSSSMMXAAAAXMXMAMXXXSXMXAAMXMMMMMMMMSAAXXMAMXAAMMMMMMMSAS
AXMMXXSSMXSAAMXMAXSASAASMXSASAAAASXMXXAMAMAASAMXSSMSSSSMMXMXMAAAMMMAMMMAMSMSMSMSSSXMAXAXSSSSMXSXAMSXSXAMAMXSXXAASAMASAAXSSMSMSSMSXSASAXAXXAM
SAMXSMMASAXMASAMMMSASXSMMASAMXXSMMMMXSXSXSMMMAMAMAXAAXAASXMMMSSSXASASXSAXMAXXXAAAAMMMMMMMAMXAXXMXSAASMMMSSMXMMSXSASASMSMMXAMXAAXXMSASASMSMAM
XMAXAASAMMXAMXMMXMMAMXMAMAMAMAXMAMASXSAXAXMAXAMSMSMMSSSMMMAAAAMXMASMMASXSMAMSMMMSMAAXSMMMAMASMAXXMMMMAAAXAMXMMXASAMASXAMMMSMMSMMMMMXMXMAMXAM
MMMMMXMMSXXASAXXMAMAMXXAMXSAMXMXAMXSAMXMXMXMMXMXAXXXAAXXSSSMSMSAMXSXMAMMXMMSMSAMXXMXSAAASASAASXMASMSMXMSMXMSMAMMMXMAMXXXSAMMAXAXXMSSMSMSMMMS
AAAXXAAMXAASMMSXMASXSASMMMMXSAMSSMXMXMAXXMSMXSAMMMMMMSMXXAXAMXMXSASXMASXMASAMMSMAMASXXSMSMMAXMXAXXAAAASMXMAAMASXMASXMMXAMASMSSSMAXAAMAAXSXAX
XXMXSMSMMMMMAMXMSMSAMASXAMAAXXMAAXXSXMSMSAXAAXMXMAAAMXASMMMSMAMAMASMSAMMSMMMSAAXAMXXAXMXXAXMASMMMMMMSMSAAMSMSAMXSMSAMAXASAMAXAASAMSMMMMMMMMS
ASMMSXXASMMXAMAMAMMAMXMXSMMMSSMXXMMSAMMASXMMMSXSXMMSMXSXSAAAXXMASMXAXMAXAAAAMMMSMSSMMMMMSMMXASASXSMAMAMXMMMAMMMXSASAMMSXMASMMSMMXMAAAXAAMAMM
XXAAXAXXMAXSASXSASXSMXSAMXMSAMSAASAMAMMXMAMXMAAXXSAXMXMASMSSSSSMSASMSMSSSSMSSMXAMAAAMMAAAAXMMMMXAAMAMAMXSASMMXSAMXMMMAAXMAMXAXMSSMSMMSSSSMSS
SSMMMSMMSAMSASAXXXXAMAMAMXMMAAXSSMASXMMMXSMSMMSMAMMXAAMAMAMAMXAAXXMXAAAAXAXAAXAAMSSMAMSSSSSMASXMXMMMSMSAMXSAMMXMMXMAMMXMXAMXMMXAAMAXXAXMAXAM
XAAXAMAMAMAMAMMSSXSMMAMMMSXSXMAMXMMMMAMSAXASXAXMXMAMXXSAMXMAMSMMXXMXMMMSMMMSSMMSMXXXXXAAXAAMAMAXSXMXAMMASASMMSASAXMAMXASXSMSMSMSSMSMMMMSAMSS
SSMMMSSMMXSMSMSAAMSXSMSMAMASMSXMXXAAMAMSAMAMMXSAAMASMASMSMSSXXAMMXSAMXXAAAAMAAXAMXMMMMMMMSMMSSSMAASMMMSMMMSAXSASMXSASMAMAMAXAAAXAAAAAAXMAXAM
AAAXXAAAXMXAAXMMSMMAXAAMAMMMMMAMSSSMMAMMXMAMAMMXMSASMAMAAAXMAMAMMAMASMSASMMSSMMMMASAMAXAMXAAAAAMSMMAMXSAXXSXMMAMXMMASMXMAMMMMMSMMMMSMSSMSMMX
XSMSMSSMMSMSMSXSAAMXMSSMSASXXSAMMAAASXMMXMXXAAMAXMASMAMSMSXMXSXMMAMMMAMMMAAAAXMXSASMSAXSSSXMMMMMAAAMMAXMAMMSMMMMAXMMMMMMXSAMXAMXSMXXMXMXAAXA
MXASAMMAXXXMXMMMSSMXAXAAAMAAASXSSSMXMAASASXSXSXSXMAMXAXMXMASAAASXSSXMMSAMMMMSMAMMXSAMXXXAMXMAAXXMAMXMXSMMSAAXASXMSAMAMSMMSMSMMSAMXSXMASMSSMX
SMAMSMXAMSMSASAMAMXXXMMSMXMMMMAAAAXXMSMMAMXAXMAXSXXXMMXSASAMMSMMAAAXMMSASXXXXAMMSAMXMMXMAXSXMSSSMASMXXMASMXMMMMAXMMSAAAXXXMAXAMAMASAMAMAAAXX
XMSMXMMXMXAXAMSAMMMSXAXMASXXMMXMXMMSXMXMAMMXMMMMASXAMAASAMXSMXAMAMXMSASXMMXMMXSAMMSAMXASMXSAAAAMSAMXMAMXMAASMSSSMXMSMSMXAAMMSMXMMXSXMMSMSSMM
ASXAAXAASMSMSMXMAAAMSSMSSSXSXAXXXSASMXAXASMSMXXMAAMMMMMSAMXXMASMMSAMXXXMAMXAAMMMSASMSMASMASMMMSMMMMSXSAAMSMXXMAMXAAXAAXSSMMXAMAAXAMXAXAMAXAA
MMAXMSSMAAMAXAXXXMXMXMASAXAMXSAXSMASMSSSMSAAXMAMMSMXXMAMAMSMXAMXXMXMMXSMXMAXXXAXMASMAAAXMAMSMMAMAMSMAAMXMAMAXMMMSSSMSMXXAAXXAMSSMASXMMXMMSSX
MSAMXXMXMAMAMMMXSAMSMMSMXMMMAMMMMMMMAAXXMMXMMAAMAXMAMXMXAXSAMSSMSXAXSASMASMSSSXXMAMXXSMXMXXXMSAXAXAMXMMXSXSMXMAAXMAMXMXSXMMMSMAMMMAMXMAXXAMM
MMASXAXXXAMSSMAXMAMXASAMXMASMSAAXAXMMMSSMAXXAMXSAMXASAMMMMMAMAAAAMXMMAXSMMAMXAMMMMSMMAMXMSMAMSMSMSMMSXXMAAAMSSMXSSSMXMAMSMAAXAMXSSSSSSSSMXSA
XMSMMMMASAMXAMSXSAMSMMASXSASMMXMSXMASAAAMASMSMMMXSXMSASASMSSMSMMMAAMMSMAMMSMSAMSAXAAXAXAAXXMMMXAAAAXAAXSMSMAAAXAXAXAAMAXAXMASAXAASAAAAAXAASM
SMMAXXMXSASMMMMASMXMASMMAMASMSXXXAXAMMMSMASAAASXAMXAMXSASAAXMAAAMMXSAAXXMMMASAAXMSSSSMSMSMASXSSSSSSMMMMXXAXMSSMSMSASMSSSXSSXSXMXSMMMMMSMMASX
MASAMXMASAMXXAMXMXASMMASAMXMMXMASMMMSMSMMASMSAMMMSAMSMSMMMMMMSSMSSMMXSMMMSMMMMXAMXMXAAXMAMMAAAXAMXAXXAMAAMXMAMAAXMAXXAASXXMASASXMAMXXAXMAXSA
SAMASAMXSAMXSMMMXXMSASAMAMMMSXSAXAAAAMAAXXMXMAMAAMMXAAXAXASMMAXAAXXXAXMAMAMSASMXMASXMMMXAXXMMMMMAMSASASXMXMXAMMMXMXMMMMMSMMMMAMASAMSMMMMSMMM
MMSASASMSMSMXMSMMXXSAMMSSMAMSXMASMMSSSSSMSXXMAXMXSXSMSMXMMAMXAMMMSXMAXAASAMSASXASASXASASMSSXXMXXSAAASAXMMASMMSMAXXMSAAAAAMAAMMMXXXSXAAXAXAAX
SXMMSMMMSASMAMAAMAMMXMAAMXMXMXMAMXAXMAXAAXXAXMSSMSAMXXMASMSMSMMMXXAAMSSMSMXMMMMMMASXMMAXXAMSMMMMMMSAXMMAXAMXMAMMSXAAXSMSSSMSSSMMMMMMXMMXSMMS
AAXAXAASMAMSASXXMAAMMMMMMAMMMXSASMSMMSSMMMXMASAMXXASASMAMMAXAAAXMMASXAMMXXMASXAXMAMXMMSMMXMAXAAXMAMXASMXMSSMSASASMSMXMAMAXAXAXAASASXSMMMMXAA
SMMMMMMXMXMMMMXXSXXSAMXASXMSAAXXSAMXAMSAAXAMSMASXMMMASMSSSMSMMMSXMAXMXSAMXSAMSSXSMMASAAXSASXMSSSMXSXMMMXXMAMXXMAMXXXXSAMAMSMSMSMMAMAAMXAMMSS
MXMXXAAASASMSXSASAMXXXMAMMAMMSMMMMMMAXXXMSMSASXMMAXMSMAAXAMMMSMXAMAXASXXAXMAXAMMSAAAMXSASASAAMAXXXSXMAMMXMMSXMMAMMSAXMAMMXXAAAASMAMSMMMXSAAM
SAMXSMMSAMXSAAMMMMMXXMASXMMMAXXAAAAXMXSMMAMSASXASMMMMMMMXSAMSASXXMAXSXMASXXMMMXAMAMXSAMXMAMXMMAMXXMASXMMASASMXSASAXMASXMMAMXMMASMMXMASXAMMSS
SAMXSMMMXXXMMMMMAAMMXMAMSSXMXSMSSSMMSAAMSAXMAMMMMAMSASAAAAAMSASMXMSMMASAMASMSSMSSXSAMXSSMXMASMMMSMSAMAASASXSAMXAMMSMMAXXMASXMMMXAMAXAMMXSAAX
MXMAMAXAMXXSAMASXSSMAMXMASXSXSAMMXAAMMMMSXSMAMAMSAMSAXMMXXMMMAMAXMMAMAMAMXMAAXAAXMMXSASMMSSMAAAAXXAMAXXMAXAMXXXAXMAMXMAMXASAXXMSAMSMASAMXMAS
MAMSXMMSSMXXASASAAAXSMSMMMMSAMXMAMMMMMSXMMMMXXSMXXXMSMSSXSAMAMMMSASAMAXXAMXMMMMMSMXAMXMAAXAMSSMMSSSSSMXMXMSMAMXMMSXSAMMSMMSMSAASAAAXMAMXXMAM
SASMASAMAXASAMXSMSMAMASMMAAMXMXMAMAXAAXAXXMASXMMSMSAXXAAASMMASAXMASMMSXMAMMXXXAAAMMMSXSMMMXMXXXXAAMAXXAXXAAMXSAAXAAXXSASAXXAMMMMMMMXSAMXMMAM
MSXXXMAXSMMAMXXSMMXMMAMASMMSASAMXMSSMSSSMAMAMAAAAAMMMMMSMMASASXMSXSAAAXSAMXMMSMMSSMSAAAMAXSSSMSMMSMMMMMMMSXMASMSMMSMMXASMMMMSMSXSAAXSSMAXSAS
SXXAXSSMMXSXSXXMASMXMASAMAXSXMAMXXAAMAAAXXMMSSMMXSAMSAMAMXXMAMAMXASMMSMXAMXXAAAXXAMXMMMMAXXAAAXMXXAXAXXAXMMSMSXMMAMXXMXMAXXXAXMASXMMMXXAMXXX
AMXMMAMXMXMASMXMAMAMMAMMSMMMMXAMXMSSMMSMSMMMAXAXMMAMMAMASXMXMSAMMMMXXAAMSMSMSSSMMMMMMXXXMSMAMSMSAMXSMSSXSAASMMAMMAMAXAMSMMMXMXMXMMSSXMXSXMSM
MXAMMXMASXMAMAXMXXSXSAMMAXAXASMSSMMAAXMASXAMAMXMXSAMSSMASAXAXSMMSXMMSMSMXASAMAMAASAMXMMAXAAAXXAMASAAAAAASMMMASXMSSXMXMAAMASAMXSAMXXMASMXAMXA
XMSMMASAMAMXXSASMMMAMASXMSAAXAAAMXXMMMMAMMXMAXMAMXXXAAMAMMMMMXMAMASAMXAAMAMSMAMSMSAMSAMAXMSAMMASAMMSMXSMMSXSXMAMMXAXASMXSASXMASASMXSAMXSAMMS
MXAXSAMXSAMXXAMAAXSAMSMXASASXMMMMMMAAAAXMASMMSAAAAXMSSMMMXAXXAMMSMMASXMXMAMMMXMAASAMMAXXMXAMXSXMASAXXMMXMAXSMMXSASXMMSAAMXMAMASMMXAMAMAXAMAM
SMMMMASXSASMMSXSMMMAMXASMMAMXXMSASMSMSXAMXMAAXMXSXSAMXXMSSXSSMMAAASXMAASMXSAASMSMXXXSSMMMAASXSASMMMMSAMXMSMSAAAMXMAMXMMMMMSMXAXMSSSMXMSSSMSS
AAXAMXMASAMMAMAAAASMMMAMASXMXMMMASAMAMXXMAMMMSMMMASASASAAMXAMXAMXMMSAMSMSAMMXSAXAXSMMAAASMAMAMAMXAXAXSXMXXASXMXSASAMAMAAAXAMMMSMAMAAXSAAMXMS
SXMMSMMXMAMSSMSMSXXMASMSXMAMMAXMAMAMMMMMXAXAXXMASASXMAMMAMSSMMSMMAASXXAAMMMSXMMMMXXASXSMSXAMXMXSSSMMMXSMXMMMMMXSASAXXXXSSSSXSAAMASXMMMMSMAMM
MASXAXMAMAMXMAAMXMMSAMAMASXMAXMMSXMMSAMASMSMMMMXMXMAMXMSMMMAAAAMMMMMMSMSMAAXASMAXAMXMXAAXMXSXSMAAXAXAMASXXMAAMMMMMMSSSXAMAXAMSXSASAMXXXAXXMM
SAMXSMSAXASAMSMSASMMASXSXMAXSXSAMASMSAMMAAAXAAMASAXMMAXXXSMSMMXSAMASMXAAMMSSMMMSMXSAAMMMMMXMAXXMMSMMMSAMXMXSXSAXAXXAAMMSMMMSMXXMASXMASXMSSSS
MSMAMMSMSMMAMMASASASASAMXMMMMXMASMMASXMMMMMXXMSASXSMSSSMASAXXMAXXSASAMSMMSAMXAXAAMMMMSMSXSAMMMXAMXMAAMAMMAMAAMMSMSMMSMAXAAAASAMXXXXMSMSAAAAA
SAMASAXMAMASXSAMASAMXSASXMSAMAMMMAMMMASAMXSSMXMMSMAXAMAAASAMMMMSMMASMMMXMMSSXXXSSSMSXAMAASXSXAXAXAMMSSMXSSSMXMMAMAAMXMSSSMSSSSXMSMXMAAMMMMMM
AMMAMAMXMASMMMXMXMXMXXMXMASASXSSSMSXSMMAXAAAMXAAXAMMXMXXXMAMXAXAAMAMAAXSXAMMXSAAAXAMSSMMAMASASMMMMAAMAMMXAAXMAMXSSSMXAXMAMMAMXSAAAAXMMMAMAXM
SXMASAMXXMASAXAMXMASXXMAMASAMAAAMXMAXASMMMSMMMMMSSXMSMAMSMSMSAMMSMAMMMSAMMSAAMMMMMAMMMAXMMAMMMMXAAMXSAMAMXMMMSAMXXXAMXMSMMMAMAMSXMSSSSSXSMSS
XMAXAXSAAMAXSSSSXXMAMSMMMAMXMMMMMAMXMASAXXMASXXMXAAAAMAMAAXXXASAMMXASXSMXXMMMXSASXMMMSMMSMAMXAXXSSMMSMSSMMMAXAAXSSSSMSMXAAXAMXMMSAMAAASAMMAA
MSMMMXMASMXSAMXMXSXSASAASMSSSXSSSMSAMAXMMXMAXMSMMSMSXSAMXMMSXXAAAXXMXAXXMMASAASASXMSAAASAMMSSMSAAAAAMXAAASASMMSMAXAAAASMSMSAMXAAMXXAMXMXMMMS
AMASAAAAMXXMASXMAMAMASMMMAAAAAMAAAAAMAXSMSMSMMAAAXAXASASMSSXMMSMMSSMMMMMSAAMMXMXMAAMMSXSASAAMAMMSMMSSMSSMSAXMAMMMMSMMMAXXMAAMSMXSASXXMASXSXX
MAAMSAMXSXMSAMXMASAMAMAAMMMMMAMMSMSXMASXAAAAXSSMMMXMASAAAXMASAMAAAMXASAASMXMXASXSMMXMMMSAMMSMAMMMMXMAXMAAMAMMASAAAAAAXMXMASAMXAXMASXAXAASMAX
AMSXXXMXAMAMXMSAMXMSMSSSSMSAXSMMXXMASXAMMMMMMMASAMXXXMMMAMSAMMSMMSSSMSMXSSXMSXSMXSAXSXMMSMAAMXSAMXXSXMSMMMAMMMSXMSSSMSXSAMXAXXSXMSMMXMASAMXM`,
    output: 2297,
  });

  Utils.check(solve, dataset, "4a");
})();
