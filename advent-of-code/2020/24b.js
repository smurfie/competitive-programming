(() => {
  function solve(input) {
    var lines = Utils.read(input);

    var dict = {};
    for (var line of lines) {
      var coords = calcCoord(line);
      if (dict[coords]) delete dict[coords];
      else dict[coords] = true;
    }

    for (var i = 0; i < 100; i++) {
      var dict2 = {};
      for (var el in dict) {
        var x = parseInt(el.split(";")[0]);
        var y = parseInt(el.split(";")[1]);
        var arr = [
          [x + 2, y],
          [x - 2, y],
          [x + 1, y + 1],
          [x + 1, y - 1],
          [x - 1, y + 1],
          [x - 1, y - 1]
        ];
        var count = adj(dict, x, y);
        if (count == 1) dict2[x + ";" + y] = true;
        for (var tile of arr) {
          count = adj(dict, tile[0], tile[1]);
          if (count == 2) dict2[tile[0] + ";" + tile[1]] = true;
        }
      }
      var dict = dict2;
    }

    return Object.keys(dict).length;
  }

  function adj(dict, x, y) {
    var arr = [
      [x + 2, y],
      [x - 2, y],
      [x + 1, y + 1],
      [x + 1, y - 1],
      [x - 1, y + 1],
      [x - 1, y - 1]
    ];
    var count = 0;
    for (var tile of arr) {
      if (dict[tile[0] + ";" + tile[1]]) count++;
    }
    return count;
  }

  function calcCoord(line) {
    var i = 0;
    var x = 0;
    var y = 0;
    while (i < line.length) {
      if (line[i] == "e") {
        x += 2;
        i++;
      } else if (line[i] == "w") {
        x -= 2;
        i++;
      } else if (line[i] == "s" && line[i + 1] == "e") {
        x++;
        y++;
        i += 2;
      } else if (line[i] == "s" && line[i + 1] == "w") {
        x--;
        y++;
        i += 2;
      } else if (line[i] == "n" && line[i + 1] == "e") {
        x++;
        y--;
        i += 2;
      } else if (line[i] == "n" && line[i + 1] == "w") {
        x--;
        y--;
        i += 2;
      }
    }

    return x + ";" + y;
  }

  var dataset = [];

  dataset.push({
    input: `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`,
    output: 2208
  });

  dataset.push({
    input: `neneeenenesweneswneesewenenwneew
eswswenweeseneseswwsenewsenw
seeweswwneswnwwwenwwwwwnenwwsesw
swsweseseseswswsenwswseswswsese
eseseseswsenweseseneseswnwneeewww
sweeeeeenweseenesweee
nwnwsewenwwnwnwsenwwnwseswnwnw
swswswwwswweswswswswswenenesesewwwe
swnwenenesenwsewswswseeeswnwwnewwsese
senwweewnwweswnenwwsw
ewneswswsweenwwnwsenwswnewsenwnwsw
nenenwwneenwnwnwwnesewsenenwnwnenwnw
nwnwwsenwwnwnwnwnwwnwnwewwnw
wnwnwnwnwseswwnwnwesewsenwnwnwnwnenew
seswewwneweswnwnwswwsw
neswesenenenewwswnenwnenenenwnenenenese
nwwswsenwnenwnesenwnwsenwnwnwwnwsenenwse
senwswwswwnweswswneswswwswnweswseswew
neeeeswnweswseeeeeneeeeenwwnene
nwnewnwnwnwswnewwsewnwwseenenwnww
eeseeeeeswneenwewee
neseseseeenwwseseeseneswnenwsewswse
wswswnwnwwswswneswwweeswswswwww
swnwnwneswswseswseswswswswswnwseswsesenesw
swneesenwnwnwwnwnwnenwnwnwnwnewnwsese
wswswswewnewnewsenewnwswseswswwse
swenwnwnwnenwnenwnwswnenenwswwnenwsenw
ewnenwnwweenwneesewnwwwwnwswse
eeewnweneneeesweesweeeneeee
nenwnwnwnwswwnwsewnwswswenwweswenw
senenenenenenwneneewnenenene
neneeneswnesewneneneeneneeenenenwe
nwswenwseswnwswenwnwnewnwneww
wnewwwweswwsww
seseswsewesesenesesewseewseseenenwe
neneseswnesenewwenenwneneneneneenew
swswswswwsweswseswsewwneswswswswneswswsw
sesenesesesenwsesesesenwsewnw
nenenenenenewnwswnwnenwsenesenwneswwne
swwnewweewwwwnwswnewwweswew
swnwwswesenewwwswwswwweseswswnesw
weeseseseneseseewwseseseseseseesese
nwenenenwwnenenenenwneneneseswnenwenesw
nwsewswswwswsweswnwwwnwswswsew
nwewnwwwewnwwnwnwwnwswwnwwsewnw
eesesesesesesewseseewneseesesesesenw
nwwenwweswnwswenwnw
sewseswswneneswnwenwneeswwnwwesenw
eseswwnwnwwenewneswnwsweenwseswne
wsewwswnwnwewnewswwwwswseswnew
eswnenwnwnenwswnenwnwnwnenwnwnwnenwsewne
neneewswnenenenenene
nwseeseseesesesesesesese
eenweneeeswswseeseeneesese
sewneeneneswseeewnwswsenewswenwwenw
nwwwweswnenwsenwwswnwwnwwwnwwnew
nwewwneswnwwwnwswswsesweswswwseww
neseswseweseeswsenwsesesesesw
nwswswseswswseeswswseswnewneseswswwsw
eweseeswseeeeseneenwenweeee
nesewwwwneeseweswwseneeseseswseswsw
nwswnwnewnewneeenwneeswwnwse
swwnwsesewneneeneenwseswseswnww
nwnwnwnwsenwnwnwnwnwnwnwnw
wwnewnwsesewwwwwwnwseewsenenew
swswswswenwswseswsweeswnwswswswswswswswnw
nwnwseeswnwnwswnenwwnwnewnwnwwnwnw
wnenenesesenwnwwnwsenenesewnewnenee
senwswnwnwwenenwnenwnenesewswenewnene
neseseeseneswswswswswwwswswnwswwsenesw
neswwsesenwnwnwneswseseseseswnesenwsese
eeweesenesweenweeneenwneeswse
wwnewswsenwnwsesenwswseneeswswseswnese
wnwsewnwnwnenwnwnwnwwnwnwwww
wwswswewwwwwwswwwwnewnwnenw
eeneseswswnewneneneenenenenenenenew
wswwnwswwswneneneswnwnwnwswseneneswsenene
nwswswewswsewswsewswsenweswswneswnwsw
wwwwesewnwnewwwnewwwwsese
nwnesenwnwnwnwswswnwwswwnwnwwwwneeenw
swseseswenwswswnwswwnenesenesesesesesese
nesewswswswsewswswnwswwswwswsw
wnwwwnwnwnwnwsewsenwsewwwwwww
wwwwwwwwswwswwwewwnw
swseseseseeswsesesenwseseswseswwsenwse
sweeeseeswnwenwneeenwneswenwneee
nwswseswswswswwsweswnesesweswswswseswse
nwnwenwnwnwnwnwswnwwnwnwwnenw
wseewnwnwnwenewnenenesenewnenwnenwne
nwsweswswswswswswswswsw
swswwswwswswswswnenewenwewweswnw
nwseeswnwnwseseseswneseswseseseenewsw
wseswseseesenweeeseeeewnwenene
newnenenwswnwnenenwneneseneneneenenesenw
wnwnwswseenwnwnwnwenwwwnwnenwnwswne
esesesesewneseswswsewswseswswneswsesesw
wsewwwnewswwnenenwnwwnwwnwnwwwsew
wsenwenwnwnwewwsesenwwwwnwnwnwnew
nwnwnenesenenenwnenewnenenwneneswswnene
eseneneewneneneeneeneneee
nenenenwnwseswswnwwnwnwwesenwsenewswne
neenwnwnenenwnwnwwnwnenwnwnwwnwswsenw
swwwswwswswwnwwwnenwseswswwseswsenw
nwsewneswnwesweeswnwwwnweswnwne
neswsewswseswseswswswneswseswneseseswsww
wsewwwnwnenwnwewwseenwwwwswnw
neseseswseswwswswswnenwsesewswswswswsw
swwsweswneseswswwswswswswweswwsw
nenwneneswneeneenene
eneweneseneeneeswswswenenesenenew
swseeseswswesenwsesenwswnwnwseeesenwswsw
nenenwnenwwwnenenweneneneseneswnenenene
neneenenwswswseswwwnweswnenesesewnewse
neneseneneseneenenenewswneeenenewnene
swsweesenesenenenwnwnwswsweneseenww
swnewwnwsewseswewsewsesenwneewnww
enenewnenenenwnenenenw
seseesesewwseseseseseswswseesesenese
eeenwneeeewneneeeeewswneneee
eswnwenweesenwseeswsweenwsenwnwesw
eesweeeneneeneeeeewnweeewe
seswswseseswswswsene
newswnewswwwneswwwse
neeswnenwewnwnesewsweneeswnwenesww
eswwwwwwswnesewwwnewwnwwww
ewsesenwseswsesenwsesesewesenwsenenese
nenwnewswneneneneeeneneseneneneenee
wwseseeeenwnwweseneewnweeeewsw
nwneswnwnwnwwwnwseenwnwnwenenwnw
swswswswswneswenwwweswswsw
swenwwwnwnewswnenwneswnwesweswwe
neswseenwseseeenwsesesew
seseeesesenwnwseeseseseswnesese
sweeeseseenwseeweesee
swneswsweswnewwswseswswsw
nwwwewsewwwwwwwwewswswnewsw
nenenewneswsenenenenesenenenenenenenwneenw
sewwwnesewswwnwwwwswewswwswew
swswseswnwnwswswswswswswnwseswenwseswswsw
nwnwnwnwnwnwnwnwnenwnwsenw
nenwwewnwwsewnewwnwsewwwewseswe
seseseswweewnwneneseseseesewsesesw
swswesenewswswswwewswsesweswsw
seseneneswwsewneeenwenenwseenwsee
nenwenwwneewnwneswnwnenwseswnwenwnwnw
sweswswswseswswswseseswseswwnesesesenw
nweeesweeeeneseeseeenwenwwe
sweewneneeeseeewswneeenwneenene
swsewseseenwsenesewseseseswswseswnese
wwwswseseswwnwwnwnenenwwswnwsenesene
seswswswseeseswseseseswnwsenwseswswsesene
nenwesenwswneneseeewsesesweeseeswse
nwseswswnwseeswnwswsenwnwnenwnenwnwnenwnw
neswnenwweesenwneswwneneswnwenenesw
nwneswnesesenwswenwsesewewsweewsw
neseeenenenewnenenweswew
eenweesweewneneseneeswee
weesenwsweenenenwswenenwneswenee
nwswswsweseswwsweswswswswnwswswswswsw
esweweseeeeseneeenweeeeee
swneswswswwswnenwewswenwswswwnew
eesweswnwseeeeeeeeneseeenwsee
senwwswnwnwnwnwnwnenwnwnwnwnwwnenenwnese
swwseeswswnwnenesewnenwsenweeeene
enenwnesenenenenwnenewneneneewswswwne
nwwneseseeseeseeseseeseseeseswnwsese
sewwswsewnwwswnwnwnewenweneswesw
eneeneeneeneewneeeeeeenwsesw
wwenwwnesenwnwnwwww
nwneneswnesenenenenwnwnenenenwnene
sweneseseswewnwswwneneneneseneesenwnw
nwewenwnwwwnwnenwsesenwnenesenwnwwwnw
nwenwnwswsenwnwnwnenwnwnwnwnwwesenenw
swswwnewweweswswnwswsenesewwwnww
nenewneswnenenweenenenwswsenene
swswswwswswswswswswswswswne
eeswswenwswneenwenweseenwnweeese
swnwnwnwwwsewnwnenwwwnww
wswwwenenwwwweswseswnwswweswsw
enewneneweseeswswenewnenwwnesene
swsenesweswswswswwswswswseseseswwsw
nwwseswnwsenwsenenwwnwnwneewwwwww
wwsesesenwnwnenesenwenenwswneneenesw
seseneweseeswseseneeseseesenwesese
nwnwwswwwweenwwnwwswsewwneww
eneneneeneswnenweneswenewneeseenenew
eseewneesenewesenwsewewwwsee
nwnwnwenenenwenwnwnwsenwnwnwswnewnenwne
neseeeesewneseseweeseseswseseesese
newwnwswwewneswseewsesweswneswwse
seseseseseeseenwseeenwsesesesese
eseswnesewseswswswsenwwswseswneswsee
eeseseseneeeeeseeeseeew
nwesweeneenwnwseneeeneeeneneneswse
swswswswseseswnwneswswseswsewse
senwnweswwnwwnwweseenwswsenwnwwse
wneneneenenesenewnwswswenwnene
eswseswneseseneseseeeeeewsenenwnew
sewseeeeenwseese
sesenwnwseseseswseseswswswseesenesesesenwse
nwwneewseswneeeneneneseenenwewneese
wwwswwnewwneswwwwwsewwwsw
seswwwwneswneswwneswswswswswseww
eewneenwsweseseweeeeneneneneesw
swswsewswswwswswnewwswsww
nwnwwswnenwwnwnenwswnwnwwsenwseeswwnw
swswsenwnewseeswseseneneswsewnwsesesenwsw
senwnwnwnwswneswnwenwnwwnesweswswnwnenw
neenenewswnwswnwsewwewswsenwnwwsw
senwnewnewnwwnwwnwseseswwnw
seeseseeneswneeswnenwwswswwswnwswwe
seswenweeneeneneneeneneneee
nwwnwwenwwwwwwwnw
swswswswwswwswwswsenenwsewnewneswswne
newswnwnwswnwenwwnenwnwnwwwwsewnwnw
eneewenweeeweeseenwseneeeswse
seseseswenwseseweseseenwnee
wnwwnenwswnwnwweeeswsw
senesesenwswseseseenwseswseswswseswsesw
seseseseseseseseseseseseenwsese
seenwnwnwswsewweeweseeneesewswene
wwwseswsesenwnwnenenwse
nwwewnwnwwneswnwwnwnwnwwnwewswne
neewneneseneneswnene
wswwswnwwwswwwewswswsww
wswwneswwswnwwnwnewseswsewswenwsw
ewnwwwwswwnwesweswswwsw
wswnwnwwnenwnewwsesewwseenewswenew
wswwnenwwswnenenwnenenenenweswseseswe
nesesenwswsweeswewwswneeneeeee
nwswwwnewwwwwwneewnwsewsewsew
nwwweswwswwwnwneswnwswenwnwneew
nwnwswnwswenenenwnwwnwnenwnenenweew
neswnwneseeneneenewswwnwnweseneene
nwswswwwwseeswnwswwsweswwnwseswww
neneseneswsesewenwseswneneswnenwwenew
neneneeneneneseneeneseneww
sweenenwenweeenesweeeenwesee
seseseseseseneesesesesesesesew
senesweewneeswenwseswseseeeesee
nesesenwwswnwnwwnewsenenwswnwnenwsee
neseewnwenenwwnewnenwnwsenwnwswswnwnw
eswnenenwswnewsweseswseewsesenwsee
enweeswenwewsweeeneenweeseesee
senwswswwswwswswwswswswswseswswswneswne
sweswwnwewseneeeenenewenweee
newnenwnwswwseseseesenwsese
enweeswseenwneeenenesweeneswenewsw
nwnwnwnwnwswenwnwnwnwnwnweswnwnwnwnwnw
nenenenweneswnesenwneswneneneneeneese
seseeenwswnweeeewswseeeswwnwsenw
esenwsewseseesewneseeseseseeeenese
seewnwsesesenwesesesesewneeeseee
eneseneewneneseweeneneeeneeee
nwwnwenwswsenwnwnwnwnwwnwswwnwnwnwnew
wnewwwwwwnwwwswnwww
wnwenwsenwswnwnwnwwnenwnwnw
eeneneswnwwneneswnwneeeneneneneewne
wsewnwwwwewwwwwwwsenwwnwwe
wwwseeseswsewsewewneswnwsewnenenw
seseneswsewneswswseswseswswswseneswsesesw
nwnwnwsenenweeneneeneswswneswneseeesw
eswseswwnwswseswswswswneenwswseswsese
eenewseneeeseneneeswwneeeenenee
nweeeeseeeseeseeswenwnenweswee
swswwneneneswenenwsenenenenenwnenwnwe
nwenwnwnwseswnwnwnwnwnwnwsenwnwnwnwnwnwnw
eswnwnweswsweseseswwswswnwseneswnenwswe
wnesewneswwneswwwwnwwwwsese
nwnenwnenenenenenenwneswnenwnenw
neswenenwswneneswnwee
wwnwwwwewwnwswnesewww
esenwnwswenenwnewswneswwenwswwnwswnww
swswwswnenwwswswnwseswswswwswswewsesw
nenwsenewnwswswneeswnwnenwnwnweenwnwne
neswwnwwwnwwwnenenwnwswwnwsenwnww
neneeneswenenenenenenee
swseweseneeeswwnenwswnwnwe
eewswweneweeneneeenenenenenenene
nwnwneneneneseneseswnenwnenwnwnenwnenene
enwnwenenwswswswnwsenwswswseswseenwe
eneneneneeeswneneenenenene
enwnenwwwsenwwwswneswnwwenwewww
neneneswnenewneneneeenwnenwnesewnene
seswsenwsesesenwewseswseseseseswsesenenwse
neneenewsesewneweeewseseenwneeene
nwwswwwsesenwwwsenewwnwnew
seseenesesesesesesesewesesee
nwwnwswswswseswwswseneswswswswswswswswe
wswwnwnwnwnwnwnwwnwnenwnwenwnwenwnw
seseswseneeswneswnewwswwwnwneesenene
nenwnwnwnenwnwnwnenwsenwnwnwnw
eswwwwwsewwnewswswwwswswneswww
esenwnwnweeewswneneswnwswnwswnenwnwnene
nenweseenwneenenwseeeneseene
newnwwsenwnwenwwwnwsewswnwnwenwww
newenenenenenenwenwswswswsene
nwsweswnwwnwewewwwenwwwwwnwwnw
sewnwsewwnwsenenwwww
swswnenwnwnewneswnewnweswsweswenwsenwse
wsweseeswnwseenewseneenee
eeeeeseeswnweeeenwseseewsese
sesesesenewsesesewesesesenwseseseene
sesewswseswsewseseseswweseeseseenese
esenwswwseseseseesesesenweseseseswe
nwnenenwnenwnwnenenesw
nwnenweneenwnenwnwnwswnenwneneswnenwnw
sewswswswswswnwswneeseswswswsw
swwswswswwwwneswneswwswswswnweswsw
neseswswesesewswwswswseswswnwseswnenese
nwswnwneewneweeseeseewewneneew
swseenenwwsenwnwnewneenwwewnwswe
swsweseswswswwwwswswswnewswsw
swnwwneneswswnwewwnwsenwenwnenwee
ewswseseneesewseneswsenwswseseswsese
eneeneeseswenwsewneeweenwnwese
swnwswswseswswswseseeswnwswswsweswnwsww
wwnwnwswnwsewwnwwnwwnwwnwsenwnee
eeseeeswneseneseeweneweseee
senesenwsesenwwsesesesesesesesesesesese
nwnewesewneswneeeeneeneeswnesenene
wesenwseswsweweenwnenwwnesese
nenwnwneeswneneeneneneswneneswneneenwnee
nwnwwsenwwnwnwwnwsenwnwenwnwnwwnwne
nwnwsenwnwsenwnwnwnenwnwwnesenwnwenwne
sewswweneesenenwneseswseswnweeeene
nwswnwnwnwnwwsenwnwwnwnwenwnwesenwnw
wwwwwwnenwwwwnesewwwse
swnenenenenenenwneneswnwneesenwnenewne
neneneswneneeneneneene
wswneseswswnewwnewswwwwwwwswsww
neeneseewnenwnwneseewneenenwwnenesww
enwseswseesesewnesweeeeneswsesenese
nwnwswnenenenwnwnwnenene
wswswswneswneswwswswsweseswswseswseswsw
sewseseesesweseneseseseseseswnwwsw
swseswswwnesenewnwwnweenweswwsenw
seseseswswseseseeseesesesesenwnwsesese
nenewnenwneswnwnese
seseneswseswswseseswswseswnwwswse
nwneeeeseseneseseeseeeeeeeeww
nwnwneenwswswnenwnenwnenwwneneenenwnwnw
nwnwenwnwnwsenwnwenwnwwnwnwnwswnwnwnw
wwnwwenesesewwwnewsesewnewwwe
wnwnwwwewnwseswwwwwnewnwswnwe
nwwwwswnesewwsewsenewnwnwsewnwnww
nweeeenwseeeseee
eneenewnwenewnwsesenewewswenenese
eswwsweswseswnwsenewnenwswseswwww
neswnesenenenwnenwenenwnwneneswneswnwne
enwseswnwnweesewnwseeseseeseseseseesw
wenwwwswnewswsesewwnwwnwnenewnw
nwwseseswswewwswwsewneswnenwnwesww
swnwnwnwswenenwnwnwnwsewenenenwnenesw
weneswwswswnwsweeesenenwsenwwwsw
eeseesenesesewnweseeenesweeeeew
eseweseseseesenwwsesenese
eneneneneneneneneeenenenenenwsw
esenwnweswenenwnwswnwwnewneenewnww
eeneneneeeeswneneenwsew
seweeseesenewswsenwewwneeeeee
newnwnwenwwnenesenewsenewswnweese
neswwwswswswneww
seswseswseneswseswswnewneswswswswsenenw
eneeneeeenwswneneeswnweenwseneswnene
neswseeswseseswswsewsese
wnewwswwneswswwenewswswwwswwnene
newswseswnwnwnwnenwnwnwnwnwnesenwne
neewswseswswnwswswseneswswswswswseswsesw
nwwneenwwwwsenwwseswenwnwswwnenw
wwwenwwnwnwwnwnwnwe
esesewsesesesesesenwsenwesenwswswswee
nwsesesenweseswseseseseswsesewseseenwse
newnwnwnenwswswwwnwwwnwwnwwnenwsw
swsewsenwseseseswwseseneesweswswsese
neeenweseeeeneswneeeeweee
nwenwnwnwnenwwnwnenenwnw
wwsewwenewwwwwwwsewwwnww
neneenesweneeneenwnenwneneseseeee
eswseneseseseeeeeeeseenwsewsese
nenenwswneeswnesenenewwnenenenwenwsese
nwwwwwewwswwswwnewwwwseeww
swswswswswswswseseswneeswswseneswwswwsww
nwneneswneeswenwseenweeneneewwwnee
swswswswneswwneseswwseswswswsw
swswseswneswwwswswwswsw
nwenweseesweeeeneeseeswseeesw
swswswsweswswnewwswwwswswwwnwswse
sewneseseswsesesesesewseseswnwseneswse
enenweeswsweswenwnwe
nenenwnwnenwnenwwnwswnwnenwsenenwne
neswseneswswnwwweneswnwseswswneewnese
nenweswsweeneeneswnweeneswneswee
wsenwseseseseeseseseseseseeseneswnese
swnenwwnwnwenwnwswnwnesenesesewnwnenenw
sweneeenenwenenenweeenenwsweeeswe
sewewnesesewnenwsesesesweseswswsesesw
neswswnenwneseseneneneneneneneswnenwnene
newnewweewwwnwseswwseswwewswww
senwseseseswswnesenweseswsewswsesesewsw
senenenenenenwnwnwsewnwnwenwnwnwwnene
nwnwenenwnwwneneswneneneneenwnwnwnese
seseseseseseswwneswseswesewswseswnwse
nenwnwnenwenenweswneneswweenwneneswnwnw
swnwseswewnewnesesesesesesesee
seswnenwwwewseneswswsenweneswnenenwe`,
    output: 3608
  });

  Utils.check(solve, dataset, "24b");
})();
