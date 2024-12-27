(() => {
  function solve(input) {
    let lines = Utils.read(input);
    let values = {};
    let outputs = {};
    let i = 0;

    for (i = 0; i < lines.length && lines[i] !== ""; i++) {
      let parts = lines[i].split(": ");
      values[parts[0]] = Number(parts[1]);
    }
    i++;

    for (; i < lines.length; i++) {
      let parts = lines[i].split(" -> ");
      outputs[parts[1]] = parts[0].split(" ");
    }

    let result = "";
    i = 0;
    let z = calcZ(i);
    while (outputs[z] !== undefined) {
      result = calcValue(z, values, outputs) + result;
      i++;
      z = calcZ(i);
    }

    return parseInt(result, 2);
  }

  function calcZ(i) {
    if (i >= 10) {
      return "z" + i;
    } else {
      return "z0" + i;
    }
  }

  function calcValue(z, values, outputs) {
    if (values[z] === undefined) {
      let parts = outputs[z];
      let op = parts[1];
      let x = calcValue(parts[0], values, outputs);
      let y = calcValue(parts[2], values, outputs);

      if (op === "AND") {
        values[z] = x & y;
      } else if (op === "OR") {
        values[z] = x | y;
      } else if (op === "XOR") {
        values[z] = x ^ y;
      }
    }

    return values[z];
  }

  let dataset = [];

  dataset.push({
    input: `x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02`,
    output: 4,
  });

  dataset.push({
    input: `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`,
    output: 2024,
  });

  dataset.push({
    input: `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
x05: 0
x06: 1
x07: 1
x08: 0
x09: 1
x10: 1
x11: 1
x12: 1
x13: 1
x14: 1
x15: 1
x16: 1
x17: 0
x18: 0
x19: 0
x20: 0
x21: 0
x22: 0
x23: 0
x24: 0
x25: 1
x26: 1
x27: 1
x28: 1
x29: 0
x30: 1
x31: 1
x32: 0
x33: 0
x34: 1
x35: 0
x36: 1
x37: 1
x38: 0
x39: 0
x40: 1
x41: 1
x42: 0
x43: 0
x44: 1
y00: 1
y01: 0
y02: 0
y03: 1
y04: 1
y05: 0
y06: 0
y07: 0
y08: 0
y09: 0
y10: 0
y11: 1
y12: 0
y13: 0
y14: 1
y15: 0
y16: 1
y17: 1
y18: 1
y19: 1
y20: 1
y21: 0
y22: 0
y23: 1
y24: 0
y25: 0
y26: 0
y27: 1
y28: 1
y29: 1
y30: 0
y31: 1
y32: 0
y33: 1
y34: 1
y35: 0
y36: 0
y37: 0
y38: 1
y39: 1
y40: 1
y41: 1
y42: 0
y43: 1
y44: 1

y13 AND x13 -> dct
y19 XOR x19 -> qww
x40 AND y40 -> vvt
bpj AND jmc -> qvd
x34 AND y34 -> qkf
y07 XOR x07 -> shj
x12 XOR y12 -> msr
dqf OR wvh -> mqr
y04 XOR x04 -> cwp
x16 AND y16 -> qsm
x10 XOR y10 -> fpp
y31 AND x31 -> mfb
y24 XOR x24 -> swf
kbw XOR cnq -> z20
x36 AND y36 -> fbv
y26 XOR x26 -> vwb
pnt OR nwb -> bnk
pdk AND fpp -> fnn
x18 XOR y18 -> fcm
y05 AND x05 -> mkq
y15 AND x15 -> mht
cnq AND kbw -> tdh
dvg OR vvt -> hfj
msr AND rfj -> qnh
y36 XOR x36 -> fmw
wgp OR ncj -> jjg
bkm OR bwr -> fgc
mht XOR fgc -> z15
fcm XOR qnk -> z18
bnk XOR qww -> z19
mgr AND vfc -> vsh
y42 XOR x42 -> jmc
cdh OR wjj -> qnk
rtc AND fkn -> dbr
bfg XOR rsw -> z21
y24 AND x24 -> dwp
y33 XOR x33 -> vfc
x13 XOR y13 -> fpd
qdw XOR mhh -> z29
x29 XOR y29 -> mhh
y38 XOR x38 -> cds
y42 AND x42 -> fcg
wnb XOR qjh -> z34
y30 AND x30 -> kqh
hdk OR qtc -> mgr
pbk OR sdq -> ggp
y43 XOR x43 -> psg
jsd AND kbc -> jbf
x17 XOR y17 -> jhw
grs XOR whw -> z39
x08 AND y08 -> hrv
y06 AND x06 -> wgp
vwb XOR dgc -> z26
tsw XOR wwm -> hdt
tqf XOR grc -> z25
x09 AND y09 -> z09
y25 AND x25 -> dmw
x23 XOR y23 -> tqk
x11 XOR y11 -> jrm
cwp AND rsk -> dmh
y00 AND x00 -> jfb
tmd AND fsp -> rtw
qww AND bnk -> frn
jbf OR bmh -> qdw
rtc XOR fkn -> z02
cwp XOR rsk -> z04
mqr XOR fmw -> z36
y40 XOR x40 -> dqk
y29 AND x29 -> jnk
y14 XOR x14 -> hsh
x32 XOR y32 -> vtg
mhh AND qdw -> hdf
x23 AND y23 -> sjk
x03 AND y03 -> ttc
qhs OR vkm -> z45
y25 XOR x25 -> tqf
y28 AND x28 -> bmh
y19 AND x19 -> sgc
tdw OR ndp -> grs
rrc AND bsn -> vfs
y41 AND x41 -> pkb
tsw AND wwm -> rnk
tqk XOR chk -> z23
x05 XOR y05 -> wwm
kqh OR nbf -> rrc
whw AND grs -> rtb
fcg OR qvd -> drc
vsk AND djp -> wkn
y37 AND x37 -> hbg
vkd XOR wqr -> gbf
gmj XOR swf -> z24
y41 XOR x41 -> gfs
sdb XOR cds -> z38
x21 AND y21 -> rkv
pdk XOR fpp -> z10
chk AND tqk -> mnm
hbg OR kjf -> sdb
pkb OR nvj -> bpj
grv AND jnv -> kjf
x00 XOR y00 -> z00
jjj XOR jfb -> z01
x44 XOR y44 -> wdq
ttc OR vkp -> rsk
x27 XOR y27 -> vsk
dbr OR vrb -> psp
x32 AND y32 -> qtc
hdt AND gwg -> ncj
nqw OR tdh -> bfg
y03 XOR x03 -> fhp
y15 XOR x15 -> jgt
x43 AND y43 -> ndc
fmw AND mqr -> pqm
fnn OR cpd -> tfh
bsn XOR rrc -> z31
dpr AND nvv -> z30
x34 XOR y34 -> qjh
wnb AND qjh -> pnf
y20 AND x20 -> nqw
hfj AND gfs -> nvj
y22 AND x22 -> dvc
nwr OR jgt -> shs
x04 AND y04 -> dsn
x02 XOR y02 -> fkn
fhp AND psp -> vkp
x33 AND y33 -> pwh
mht AND fgc -> nwr
jfb AND jjj -> pss
y26 AND x26 -> hts
hts OR hqr -> djp
dct OR ffq -> gnt
ndc OR gqn -> ggg
y27 AND x27 -> sfr
pwh OR vsh -> wnb
vtg XOR ssr -> z32
sjk OR mnm -> gmj
jjg XOR shj -> z07
gbf OR ttm -> pdk
ggg AND wdq -> vkm
mvt XOR jnw -> z35
ggg XOR wdq -> z44
swf AND gmj -> ccj
gnt AND hsh -> bkm
mfb OR vfs -> ssr
wnd AND shs -> pgd
x16 XOR y16 -> wnd
x11 AND y11 -> fqp
vsk XOR djp -> z27
x28 XOR y28 -> kbc
rtb OR fvv -> fkp
y01 XOR x01 -> jjj
rnk OR mkq -> z05
cjc XOR ggp -> z08
y39 XOR x39 -> whw
fkp AND dqk -> dvg
y37 XOR x37 -> jnv
x02 AND y02 -> vrb
prk XOR jhw -> z17
wvc OR hrv -> vkd
hfj XOR gfs -> z41
kbc XOR jsd -> z28
shj AND jjg -> pbk
dmh OR dsn -> tsw
x10 AND y10 -> cpd
rsw AND bfg -> mbt
jhw AND prk -> wjj
hmn OR qnh -> sjh
fqp OR rng -> rfj
y07 AND x07 -> sdq
vfc XOR mgr -> z33
sjh XOR fpd -> z13
ggp AND cjc -> wvc
y35 XOR x35 -> mvt
fsp XOR tmd -> z22
y09 XOR x09 -> wqr
dpr XOR nvv -> nbf
hdt XOR gwg -> z06
mvt AND jnw -> dqf
x35 AND y35 -> wvh
grd OR dmw -> dgc
psp XOR fhp -> z03
x08 XOR y08 -> cjc
x39 AND y39 -> fvv
x38 AND y38 -> ndp
ssr AND vtg -> hdk
frn OR sgc -> kbw
qsm OR pgd -> prk
cds AND sdb -> tdw
ccj OR dwp -> grc
psg XOR drc -> z43
mbt OR rkv -> tmd
y18 AND x18 -> nwb
jmc XOR bpj -> z42
y12 AND x12 -> hmn
jrm AND tfh -> rng
qnk AND fcm -> pnt
cpp OR pss -> rtc
sjh AND fpd -> ffq
jnk OR hdf -> nvv
grv XOR jnv -> z37
x20 XOR y20 -> cnq
y31 XOR x31 -> bsn
rfj XOR msr -> z12
vkd AND wqr -> ttm
y17 AND x17 -> cdh
dgc AND vwb -> hqr
y14 AND x14 -> bwr
y06 XOR x06 -> gwg
y22 XOR x22 -> fsp
fkp XOR dqk -> z40
jrm XOR tfh -> z11
y30 XOR x30 -> dpr
hsh XOR gnt -> z14
x21 XOR y21 -> rsw
rtw OR dvc -> chk
x44 AND y44 -> qhs
qkf OR pnf -> jnw
fbv OR pqm -> grv
grc AND tqf -> grd
drc AND psg -> gqn
shs XOR wnd -> z16
y01 AND x01 -> cpp
sfr OR wkn -> jsd`,
    output: 51657025112326,
  });

  Utils.check(solve, dataset, "24a");
})();
