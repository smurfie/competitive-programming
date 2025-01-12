(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var dict = {};

    for (var line of lines) {
      var monkey = line.split(": ")[0];
      var num = line.split(": ")[1];
      if (isNaN(num)) {
        var var1 = num.split(" ")[0];
        var op = num.split(" ")[1];
        var var2 = num.split(" ")[2];

        dict[monkey] = { var1, op, var2 };
      } else {
        dict[monkey] = { num: Number(num) };
      }
    }

    return calc(dict, "root");
  }

  function calc(dict, monkey) {
    var result;
    if (dict[monkey].num) {
      result = dict[monkey].num;
    } else {
      var { var1, op, var2 } = dict[monkey];
      var x = calc(dict, var1);
      var y = calc(dict, var2);
      switch (op) {
        case "+":
          result = x + y;
          break;
        case "-":
          result = x - y;
          break;
        case "*":
          result = x * y;
          break;
        case "/":
        default:
          result = x / y;
      }
      dict[monkey].num = result;
    }
    return result;
  }

  var dataset = [];

  dataset.push({
    input: `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`,
    output: 152
  });

  dataset.push({
    input: `mvnb: mhgv * zvcm
nrwg: pqnb + wznq
mcbv: 1
vwnl: 15
ggdz: bgvn + mwjn
nnmj: snhj * fpmt
zmzd: ttjq * zrhr
tdpj: nvdr * mlmj
mdps: jfrh * spnj
wmwm: fdcg * pmbd
qrcq: vrpq + bwpv
sgzv: 2
zhrt: 5
mzwm: lzmq + ldzw
bwhp: 2
clfd: 4
rmwq: 11
pqtc: srtc * vjhc
cqrh: bnph * jzrj
mbjq: 5
tqdl: rfll + dbhj
lsbb: 11
fcld: cgjq * qmbc
mqvz: 6
dghz: 8
qncq: 5
nsql: csns - lrfq
qzfg: 2
wsqv: 1
vjph: bwwn * qjmh
dsjq: wnls * pdqm
tmhv: frmn * cmdn
pqnf: ljhb * zzdg
rhmw: bjcm * mqzs
tgtv: psgh * ndbj
cqgs: 4
vthp: 5
zcfd: ffdn - gwgf
tsrp: nlbv * ptbr
cldw: 2
nmlz: 2
pjhm: mhvf * cdms
nmln: dhwj * gfnb
ldzw: bbls + qwhm
fljd: rbvm * fprb
gwhp: jvbm + rrwh
pjmc: mtrd + wljp
gnph: crdg + zvqd
bccm: nctz + fvcp
gwjj: fclp * fplf
qsth: wshg * lspl
ttcl: gpmj * wftl
ggrv: 3
bvqd: mdds * jrpz
nglg: 2
ddpq: 10
wflc: svsd - crbr
mqzs: 18
vfnf: 3
lrdw: gfdg + mbjq
wflw: glbs + vdsg
jdln: sgln + dsfj
ddlp: 5
zcmw: mwnc * mjmp
cqtt: 11
rswb: 3
mhzc: mfsc - mgmb
shlm: tsrp + pfsp
hbzq: svrr * vzsj
tvqp: 4
plsl: 5
dfnt: 11
scvz: 3
nzjp: bhqt * chtc
wqst: 14
vfdd: hccl + vwwl
rzsp: srcq * jrbl
ftgb: wmph * jslc
qplw: pjdw + pmjb
fqpq: 3
bdpv: dldq * gptn
rlpd: fntc - rlsc
nrlz: 7
lmph: 4
zfzv: 2
hcpp: 3
sgjg: 13
rhth: 11
mgln: 2
gpjt: 2
cgjn: 3
bglm: 2
hdvr: hqdc + wvrl
jmdz: tswl + gvcj
mlmj: wglf - pnwp
qpdz: dgjl + zrbp
pczj: gwml + gqzf
grpd: jdqh - rlqh
mvbt: qslg * nbfg
rcsr: 2
vrsn: 4
ldrz: 9
zdtn: 3
zffh: 3
wmff: gnph + rpmd
szgr: whnr + vpsw
vrch: 15
jdzq: jnwq + qznm
wzdt: tnlq * zcjs
phfl: mhvh * sqds
zgzd: mqjh * lgdh
zhfp: 2
wqvz: gfnw / tdlb
zrtm: 2
lhsz: 2
vncz: jpcs - mpbh
nmcn: 5
fzhd: gfps + dfnt
vpsw: 3
wbrz: mssm * bwdn
jrpz: 3
zzdc: 2
mdnv: dhzh / stpr
scrb: twtl * hnts
pqfz: 3
zlww: 3
lcbg: hzwm * lhmd
wggf: jrmf - fhwg
vtsc: vlsc * qntj
mtrd: vfbp * pgqs
gvjs: jzdl + wbsc
wfqq: 20
dwpw: tjvc + bzlq
fpbv: 2
rcpc: htgv * nrmh
hlfw: bcch * fdlh
blgl: 2
wwps: pttp + vgbb
dsfj: 3
bfqz: prrl * htvb
bcqm: mtfv + pmzz
bdnm: 2
dhsh: 2
pgfv: bzvl + zwtw
nrmh: 2
gpvs: 5
qrpw: nssz / dctm
mhgv: lqsc + htbz
wqbg: 17
zlbn: gzmw / dnht
rzsb: nnnv / zdtn
psgh: 2
scct: 5
nvsr: gllj * dcpl
pmzz: vgmq + cmmb
qjmh: 5
llzr: 3
sfbz: 2
ttcc: mcbf + zfqv
phwz: jdnw * lbqf
swbn: hndd * mqlz
qbfv: 4
bsgr: 4
gjvc: sldt + cbtz
spjp: vqgq * sjqt
hcdz: 10
qhgq: 4
dbdm: 11
fjdm: 7
zcpr: 3
fplf: htfs * hqpl
zsjz: 2
crrp: gtbr + ffdl
zgzp: 3
hcfd: 3
tzqt: jmmc * ddlp
pvnd: bsjw * qwcv
vfbp: 2
jrmf: 10
zjfl: cplp * qjzl
sldt: nccd / rqqc
vrhr: 5
gbcj: mzwm / qbtb
pbgg: mvnb + fhvf
wjjb: 17
wnlb: 1
mjhf: tlrc * zshr
hglg: gmsv - djmf
wlhn: pbzp * sqsz
lldd: zsqz + pgqf
drmf: 4
whfl: 3
prln: 5
zwll: blgl + jhjl
frqg: hcqt * lmnm
qhld: 5
vdql: 4
srrm: grcq * lhnc
gtcf: 4
lrfq: 4
nftt: fghr * zmrv
nbnn: 3
ztsb: 2
zcjs: 12
rcvz: dwgv + zffh
jcrg: 4
csmf: sdrs + jngq
sjbs: 2
hqpv: 2
mrnr: wtwh * vpwt
vqgq: 19
znln: 2
rhff: mrsq * rdzz
fplg: 3
sjsn: lqvb * csqw
qntj: 2
hqhq: pmqg + bcqm
pclp: llzr * lhzl
jhrn: sfvv * ztrh
jhvn: hlbn + gvcw
hthb: 3
cmmb: trnb - vpst
qbsb: 2
mqwl: hfrf + rhmw
tzwt: 4
bqvp: 5
mrsq: 2
dmzp: nzjp + bflc
cszc: 5
tmzb: 9
qvnb: bvcg * ndzl
tptp: hqfg * hwns
snwq: 7
fwfp: zttd * lsbb
rgfr: zdmc * shpg
qnpc: fmgg * ptwc
bpfq: pgdg * djnb
mzhc: 4
pgdg: mjqg * gjnm
wzzh: stll - lvdf
prcd: mmzq * lrdw
chjs: 16
tfnc: fjdm + rzsb
jdnw: gcln + llpl
mljm: 12
vjdj: sjsn * lmtb
zprg: fwfp + nrzs
pgqf: 1
pgbv: 3
gzjv: 2
bpff: dhww * dwlc
zsnd: 2
vjhc: lrhg - hzps
sjrq: 2
qsdt: pbrm * nbpg
prrl: 2
mlnv: 3
tglc: 1
gssc: hwrj + wlhn
rrrv: 4
zpqf: 6
slwd: 8
bnnb: scvz * rcsr
rmwn: 3
nvdr: 2
cwcp: qrpw + hglg
pmjb: 15
pmbd: wcbz - zmsb
hvvj: dfqf + sssf
dzhc: dprs * pclp
dwlc: mcbv + zmzd
zmcl: 19
zmnh: mgbq * djzw
zjjh: 2
mczw: lzrq * thpr
gzmw: nbjs - rchf
cfwb: 3
fdhh: 4
swqs: 2
swrp: 5
mgmb: ghrf + jqrz
hcqt: jlbp + dcmn
bzwg: 3
mfqj: slhj * pftp
zmrv: 4
jmls: 19
gpmm: wwmw + bwdr
nzmh: pfvz * hwhs
dqnz: 3
dvfs: 2
qgfv: 4
dbjg: nvzf + rhzd
fvvg: 18
fmsm: 19
qlfl: 1
wsmh: 20
crdg: nwbc * vnsj
gwgf: 2
ltzc: 4
rrjh: 8
wljp: pjhm * fvnf
phzl: bffw + ssfh
vjqj: clvq + lpjz
lgdh: 3
wshh: 2
lvbv: 2
rqhb: bpfq * pdmt
rpjp: 11
gmbv: lgvw + dhsh
pdtl: 4
mqlz: wbvz * dsfc
pfgm: nrhm + glwz
cpmj: 13
mgzc: 5
mhvh: 6
rdsw: 5
wvqm: 3
trcj: dlgv * sjbs
wnzm: 4
trcv: nhvd + wsmh
zbcq: 2
rjdj: rhgh + wwrv
pvfg: 4
lgcg: 1
bdzt: crts * bwmt
mjrc: 2
swfb: 5
ghzw: mhlc / lvbv
pbzp: 3
vzzn: zvhw * fhfh
ghsl: bzwg * rfsw
smmv: 5
hdth: nttd - sdbc
qgcb: wshh * hrqb
dndz: 3
dwms: 4
qcqm: 4
dscj: 2
svfw: qqsq / cfwb
jnfs: 2
vtsb: 6
ztrh: 2
lhmd: 3
lslm: 1
qmcn: 3
fzzz: 3
ndnw: 4
cmqt: 4
rhvf: pzpb + jbrm
rfqf: 2
tlsm: vcbt * lnpn
fqvq: 2
rscb: 2
jtwb: 1
lgfc: 5
qtzt: 17
pjvb: 8
tvms: qvdq * qsdt
nmzq: rswb * bdtq
nrjr: scrb + wffv
swcg: mjhq - jmdz
vzdl: ggcf * jwdm
fwzb: ztgt + zsjz
hzzt: 2
rbwp: 11
vvcf: 4
cfbm: jpmr - qtct
twpz: dvfs * lhsg
vhgj: 1
fpdd: 10
fcws: dfhw / psbh
fgts: 4
mmrh: 15
zwjz: 3
grdz: 4
mpwt: 3
fmjd: 2
jlbp: hqmw * bnzz
ssrr: sjlb * gvtg
jpcs: qshz * chph
cfrl: cqtt * fjlb
wtrn: 5
bzsr: 2
jzgm: rrrv * tgbv
jpcf: 4
nnnv: vnhz * vdql
cssp: stmf * zrzq
tcrd: szqt * nsqd
qdlf: bbnf * vlch
dhbn: 7
qqlh: 2
pnss: pwrd * vtsb
gdfn: 4
nrhm: brvj + hcdz
rbbz: mmft + tglc
wrqt: 7
drhp: nzmh + mrdt
nrtt: rrts * lhsz
rbhd: lvmz * mzqf
jtln: 5
vmjq: bccm / nwph
jnqt: 6
vgbb: gpww * jgtw
pnnc: 2
jngl: 20
qmbc: 2
fqqp: 2
lsls: 3
pvwf: fvvg * fsmf
nsqd: 3
bdjw: 6
rwwv: 9
jqgw: dlwm + wsqv
mjmq: 7
drlc: 2
nwhm: 8
bdtj: 2
hfzj: pnnc * vtsc
rlcd: mcsj + hnnw
jzrv: vmnt + svth
jslc: 2
bsjw: 5
hszf: cczm * cpbb
hzrc: 3
bwmt: 3
rnbh: brmq * vzjj
phhl: 7
zrpw: jwjr * gwsl
bzvl: dvtn * lfqd
dtfc: 2
tmlt: 3
cgrs: 3
lqjc: lcps * pbjq
zzrb: 5
bdct: 17
vzsj: sqls + rwrw
rqfr: cmqt * mpgr
lvdf: wfrg + mhvz
rtsv: 2
rshw: 6
pdrq: 5
tgcm: 12
ltsm: nrjr / gclp
tvlw: njmh + qrcq
stjm: 4
dvch: rhff * zzdc
wrpg: 5
qvnz: zlbn + hbzq
vlfz: 2
hcqm: 2
lwwl: 2
zrzq: 3
dvtn: dqwj + nbzl
mdsh: 3
nlbc: 2
shgt: prln * zsmq
cfnm: 12
lhzl: lwjf / wmmf
lhrn: 6
twcj: gwjj - rrbz
gqzf: spjp * ftlm
flgw: zzhf * hmpv
hlzz: 2
lgvw: 5
mhvz: sbvs * sbtw
zpth: 2
pqnb: twcj / jrfv
crbb: 2
mrdf: pjvb + zhrt
vpwt: dqnw * zsnd
rfgs: bfnq + bfqz
vsvp: jpnh + rglz
vpnq: vlfz * rpjp
hdrn: 4
cgjq: lqjc + tgwm
mpbh: wvqm * scct
wwrv: wggf * zpth
nmjz: ltcr * sfbz
lrql: vmsp + ftgb
rwrw: bfbd * gftc
vvbg: lffc * gnwg
hcfn: jpjr * zbcq
scqf: 2
htvb: lgnw / mhzp
nbzl: 6
jdsl: 2
fdcg: 2
zwct: 2
bvcg: 2
bccl: vzqf * cqrn
wtgl: 2
vlsc: sgzv + zmgn
vmdr: 2
jmwv: 3
mhbg: fqvq * jjmg
spnj: 2
ttjq: nmln / vcdl
zzzw: ccjr * pvff
zzhf: vrsn * dlrf
mmhq: mvwm * hvvj
mzqf: 4
nssz: svfw - mczw
pmpv: 1
bflc: 1
vzfq: 5
nvzv: 3
fhwg: 3
vzws: 2
dlpj: 5
smsj: lzbf * chjs
qmrr: qbfv + rbwp
cjmz: cbvt + phwz
tnlq: tmnm * swhl
nsqp: 12
rpmd: wmsh / bqvp
hbzl: svhg + cqsd
jrvm: grdz * rpll
wvrl: szgr * gsjf
dbdl: jlnf * vccn
bwdr: 11
fddt: wgsc * wgmj
mtmq: snwq * cqtl
nvzf: humn - ptcw
srmq: vhgj + sgjg
mwzd: nnmq * jlbl
vpbm: 3
ljnr: jclm + pfnb
jrpd: 2
cdcb: qtzl + mvlz
pjqr: tfdf + glsj
nlbn: zwll * hltn
hpmc: 5
svhg: lmbs + drbj
zwzh: 2
fwzh: 3
zmwg: 3
ghrf: nvdh - qzzc
vjzr: 2
hptp: dznv * wdrf
drbj: 2
ftns: 4
zrbp: 6
fpnm: pnss + djzq
bfpl: 5
jslh: mqvz + lpcl
nwph: 7
pcpc: 2
cmwj: 9
vnqc: cwcp * glgp
gtrn: 5
lgnw: lrql * csvf
fwgh: hrss / qqlh
sbvs: 12
nmgq: 6
wcgj: pmdv * nnmj
gmft: trcv * spsq
ndtn: 11
pwrd: 11
hnnw: nfgf + gcwj
dvrs: 5
qjvh: 3
mmpr: 8
gswf: hmdf + wrzn
jznw: bdpv / dsqp
phdl: wlbb + mszf
hftr: hcfn * qcrj
hnts: 5
glpg: lpwh + nhzf
root: jwcq + swbn
nrhc: 4
cbvt: zdtq + scqw
vsrf: qtzt * tppm
fntc: rwlq * fjbz
dfpc: 3
dsqp: 2
qznm: 2
hzps: zrpw - qpwj
mjqg: 5
cbrt: cmwj * qvfj
hhjc: 2
jwcq: nrwg * vpgj
hwcs: rvrb * wfpf
wzmd: 3
pdqm: sncw / bbdv
mmft: fjnb * stqp
zsvt: wtrn + ggbt
gsjl: 3
sjct: lshv * lltl
wtwh: 18
jrwd: 2
bfnq: jhvn + tvvn
ctlf: 13
cbtz: dbqb - bdct
ddjv: zcmw * thvp
wnls: jngl + rcrs
pgpt: cbrt + gwhp
nqhp: 15
thvp: mfqj + hprt
cgqj: qzlh + hqhq
jfhf: 7
dlgv: 3
dfhw: wrqt + ncjl
mpgr: 2
mqqn: 11
chph: twpz + vwnl
jfrh: pgfv * rpfj
rqgl: vbfg + cgqj
sszs: 2
hqfr: hlfw + zlwh
hzdm: wzmd + dsbm
wvgz: ftdc + lwvz
wwbw: rtsv * rqpc
jzdl: 3
jmdf: 12
wmsh: nhbv - ddhj
nnmm: 2
nfnv: cgdf * rscb
mhgr: 3
cdpg: mzhc * jctl
jcpn: 2
sqjg: 3
whdb: 2
lbcg: 3
jqzj: cszc * fnsh
rfrm: lbvw * jbhn
czqc: rmwq * tbcc
qzlh: qnpc + smfj
mtfv: csdb * htzv
rwhc: rfrm / sjzl
qncl: qmcn + jzrv
zdcb: 6
ntcs: 4
rwlq: sbzj + cdpg
dhww: 6
sjqv: 2
lspl: 12
mvpr: 11
jpmr: mqlg / nglg
wffv: swcg * njdn
jctl: crbb * zzzw
znvq: 7
qcrj: 2
gftc: vjzr * wrpg
rbvm: 5
bshl: lttb * jcpn
jpnh: 10
qrtr: 2
qjzl: qmrr + jqhm
zrtg: 3
ndzl: 3
nbhz: vbsv * cfnm
ctjd: 5
fhfh: 6
rrtz: tljt + vnqc
hqpl: jnfs + ldrz
srtc: 5
dchn: fdhh * vfvr
gjnm: 5
mcsj: qvnz * fqmp
smfj: dchn - zdrq
bhwd: hqhd + vnrz
wbht: 2
vpgj: wgtb * prmn
sjqt: 5
fjnb: 2
tfqr: mvbt * znvq
clrc: 14
lffc: qlfl + nfnv
lzrq: tvlw * clfd
wnjr: 11
bdtq: 3
jwvq: gmft + vsrf
swhl: 3
vwwl: dlhh * qdwz
mngd: lcbm + wnlb
gjzt: vvfw - hdth
dsfc: cjmz * nmlz
crbr: 1
vbsv: 7
stpr: 5
blwj: fddt + ntcs
rwmg: qgfv + bjcd
dprs: nsql - cqdn
tlcv: 19
hqhd: 8
rtss: lldd * flfc
wcrn: 2
flfc: tsqg / mgcb
grfs: 9
qwvf: 3
ghcz: 2
frmn: 7
cdtd: 1
vhqn: 11
jjpc: 16
spsq: dphq + tmnv
hcrb: 3
lcbm: 6
ngpm: lsls * tqjw
srcq: zgzd + qqnj
pvvz: 17
prnq: 4
jbtz: 13
sbtw: 11
ccdv: 3
cqrn: 2
jlpq: 9
slhp: 9
tmnn: ftrz * rfgd
lpcl: qrtr + dlpj
shpg: 2
bbdv: 4
bwwn: hcfd * pgbv
jfnb: 3
rlnm: 4
rpfj: rtdg + vpjl
wvhz: dpvd + qdhr
gwgn: 3
fsmf: 3
dbbn: 5
nvsm: mzcw * wzft
tfdf: 2
fmwm: 2
nswm: 8
cfqf: cblg + qsth
sjfw: 3
slnp: ghzw + bpff
zbcf: cdmp + nrhc
vflc: 16
qdhr: mzqb * hqjm
zhtm: sbhg * swqs
dsbm: 3
vjjf: 7
jrqb: 9
zmlb: lqwh * gmnm
wtdg: 5
wwmw: qgcb * jtls
bplb: 3
brmq: 3
mtpq: pvnd + pvfg
nbpg: 11
djzq: fgts + svsj
ncjl: sbbm / pmgv
jmbz: fgtb * jdvn
zfpj: 3
hbvq: lsgq + hgsv
mzqb: gtzg * mtpq
fbzj: nqhp + nmlv
vnhz: lcbg - njqm
jlzb: 4
sgln: nbnn * zwjz
bqln: gqqg + tzqt
gdwh: 3
pjcw: zgjm * wnzm
ltgb: 2
hwns: 3
ftrz: mjhf / phcr
jwdm: 2
qcwb: 17
jmhl: wmff + cfqf
humn: 2411
bvwh: 2
stmm: 5
cssw: qcqm * sjfw
zvrg: 5
ghzp: 4
pzpb: 17
nbfg: 9
sgml: bglm * vfdd
sdbc: qlpt + brdb
mngg: vjjf * wflw
fqmp: cfvg * swrp
svsj: wtdg * mvpr
hqdc: tmzb + gpzw
phcr: 2
dbqb: lfmh * glpg
glgp: 2
gqmc: sjrq * fccp
pjrz: 3
nflq: 2
trbd: clrc + hmmb
cwbw: cslb * tfnc
wglf: wjrj + dwsw
cnbs: 12
nlbv: vpnq / zvpt
qvhs: prng * gpvs
zrhr: 3
fmgg: 5
bfwm: ccdv * gpvz
mvtj: zmwg * wpfz
mjhq: dscj * mqwl
tvvn: wqbz + hzrc
tgwm: rhgw + wzdt
ssfh: cwbr + tbzm
wbvz: jmbz * mhmr
wjdt: nsqp + zlww
chnh: 2
gpqn: vdrt + mdnv
ctml: 3
nrfs: 1
lrhg: gjzt / jtln
tvlv: 5
hntz: cpjg + lblc
pcwb: 3
jgrz: rwhc - jfbn
snsh: ttcl + grcp
fvmg: qhgq * tcqc
bwpv: wdlg * jcrg
lwfz: bwwh / pgvf
llnh: rqhb + hgzw
lfdz: dvch - hlrh
zfqv: 6
nhzn: 17
tnhj: 5
jmmc: 5
rgnp: bqln + jzwq
rqpc: 11
zwtw: rbbz * cdcb
hnzp: 11
lqsc: 4
jgqz: mmrh * hcpp
lqqp: 11
gbtd: 5
cjgw: 2
tdlb: 2
jcjn: 3
njmh: 6
whgw: bgff + qplh
lbwh: 4
lqwh: dwrp + tgrf
hprt: dbjg / hlzz
pcch: 11
dphq: 14
rwvv: wgpl + phfl
brrs: pfdz * cldw
vcql: hqpv * stjm
hqjm: 4
bhnm: gpjt * wqvz
dtdn: fcws - ntrh
hfrf: wvhz / jmwv
dlhh: 7
sdfw: flsg * wqbg
njqm: 3
lmbs: mpdd + llft
rlsc: cwzp / pcpc
bdvw: 2
lwjf: vthp * btrp
ffhw: 1
sbhg: gpqn / mrcm
bnph: 3
cwtr: ntjv * fhpf
lblc: brrs * wjdt
ppfh: 3
wfrg: pmms * hdvr
gvgg: 3
tffz: lhnl * cfbm
vcbt: 3
zvqd: vbft * mjrc
vdws: 2
hhmp: 6
nmlv: 14
pfdz: 3
dhwj: 7
htgv: gltw * wrvb
vpfr: 2
cqdn: 3
jcdg: 2
szvs: 2
tppm: zrtm + zbcf
mwpg: slwd + tfmc
wvmh: ddjv - dbbn
mdfs: 5
vrtr: jdzq + nrfs
mcwr: lmph * bshl
jlnf: 4
hrss: trbp * tlcv
rtdg: 7
vlzr: 2
fccp: wbzf + hptp
rglz: 13
slhj: tflm + prjp
qshz: 2
tlgs: dbdm * dtdn
bbls: slln * trcj
mtjv: 5
vmzp: hgsq * nvbp
pfnb: gdng * tmnn
dntw: vwlv + tqdl
vpvj: 2
lbqf: 2
ghdj: 2
hgwb: vmjq - phss
rmbl: 3
qbsw: fqrh + rwmg
qzzc: hnzp + cwtr
gfnw: gzjv * frsc
vcdl: 2
pmms: 2
bfrf: wjfh * zvrg
tzpw: blwj + nswm
pqjs: 3
nwbc: 4
zvhw: jfnb * znln
mmtc: ftmb + mwhv
mmrz: ljnr * gscs
hmdf: 2
lshv: mvmf + tlsm
qlhd: 6
zvpt: 2
zjds: 6
rtbj: fmwm * wvmh
wtcn: jsvf - jlfq
grmh: 3
lbdb: 7
ftdc: 18
scch: 5
hsfc: 12
lgbn: cnvb * jlzb
mcbf: 1
zzdg: 2
qlpz: qncl + bfwm
mwcq: 4
zntt: 8
djnb: 2
vghf: 2
mqjh: dmpn - cgjn
jclm: dwms * rgjg
vmwd: gqmc * tdpj
ptwc: qzqb * rshw
qtct: fmsm * gsfg
wrtj: 1
nttd: bdvw * pgpt
gvtg: 3
gltw: jtzh * zwzh
bbgm: 13
pmgv: 3
drbr: 5
wgsc: 3
vzjj: fmjd * vrtr
fcch: 3
lnpn: 2
lhpw: 8
bgff: bccl * jcdg
zsqz: vqsv + tsvq
dmrd: shlm + wqfz
psvh: hnlr - nprj
rcqf: fcld / dtfc
mrsm: 5
gwwr: 4
hwcr: drmf * zhfp
zttd: 2
dlwm: 7
vqsv: qths * rvnc
hjvn: 4
pftp: 7
wfpf: 2
dqrz: 3
rhzd: rltv + cwmd
bfbd: 13
mdds: 9
ztgt: 5
ftmb: 8
vtdv: 9
tjvc: wprn + rmbl
swnp: vcql - jtwb
thlj: rpqp + lzng
ggcf: 9
mszf: 4
pplj: nvsm - szss
tlrc: wvqd + lvwn
ptcw: qlpz * hwcr
szqt: zzrb * gpmm
vvfw: rqgl * lwwl
tgbv: 2
jcvp: 5
vrpq: qwvf * rjdj
wprn: 8
zdmc: 13
pgqs: lwfm / cqgs
cwzp: dbdl + nvsr
tvtd: 3
lqvb: 11
gsjf: 4
jrbl: 3
wgtb: 3
vbft: 13
vgmq: jrvm - fqpq
lhsg: 4
gsqv: jgrj * dspt
zsrp: cpmj + lqqp
sbbm: pqtc + tcrd
fgtb: 15
fnnl: 4
gvvp: zjfl - qdlf
whlt: 2
wdlg: 4
cttl: 4
fhvf: tmhv + bsgr
dgjl: 1
gmnm: 3
sqsz: 11
cdms: 2
tfmc: 3
tdws: 2
vsvd: llnh * dzhc
csjv: smth * gsjl
nctz: ltsm + wzhg
ttcf: hcrb * ctlf
gcln: rhzc + tgcm
jqhm: 2
qwhm: thlj * djst
rchf: pjmc / nnmm
htzv: 5
qcdp: 3
twtl: rqfr * rlnm
pmjv: 11
chtc: 3
rqqc: 3
crts: 3
jhjl: 5
smth: 3
mjmd: gvft * nnqg
fqrp: pqnf + jwvq
dhhp: mvtj * rhwp
zdrq: 5
lbvm: jslh + bvqd
gfnb: 2
wdbm: 5
ffdn: 9
hntj: hfgt * ggrv
hzpt: 12
djzw: hsfc + mqqn
ppmp: 6
lfbw: 9
csvf: 2
jgtw: 5
qdwz: 3
tjfb: pvgt + hntz
dnht: 8
cfvg: 2
qzqb: 2
hrqb: 4
tbzm: jcvp + ztsb
hgzw: pjqr + wwbw
hzrv: 5
lltl: 2
hmpv: vlcr / srmz
tqnb: 4
llft: jccd * gdfn
qjpt: 5
gcwj: 1
nvbp: 3
dcpl: cprm * lhpw
lbdz: 3
qglg: vffz + fbvb
jsbf: 13
nnqg: mwzd / vzws
qpwj: vzzn - rmwn
djmw: 4
cnfh: szqr * ssrr
qbhs: 3
rrwh: nlbn - hzdm
zvsh: dvrs + mmpr
gbqf: 3
mssm: bzsr * dqrz
wbsc: vlzr + mtjv
qslg: 2
ccjr: 13
qvfj: gbtd * fwzh
zvcm: 13
mvmf: 1
glsj: 7
fmpq: 2
wzhg: cgrs * pbgg
wqfz: hzpt + sjct
hlbn: jznw * drbr
pbrm: 2
rcrs: 3
vdsg: 15
wgmj: 2
mrcm: 5
vgql: 2
nmgn: 5
mpnn: 4
ddhj: gjvc * nmgn
sjzl: 3
djmf: vjqj * qjpt
qbtb: 2
tmnm: 5
sfvv: 17
fbvb: hbvq + ffmg
jngq: 5
pttg: psvh * zjjh
trnb: hzrv * jmls
dwvg: pplj * gjgg
gclp: 2
dqnw: pngt * cttl
dwsw: stmm * fvmg
ltcr: 5
jdqh: plsl + bwqj
sncw: mwpg * fnnl
mhlc: ldtb + dwvg
mvwm: gsvb * pqjs
nvdh: jbwz * mhzh
gptn: fzhd + lbdd
hnlr: shnv + srrm
zlbl: 2
lzmq: hcqm * dmrd
tthb: rbhd / tvqp
zgjm: 3
hccl: 2
ffdl: tdln + mmtc
bzlq: bhwd * qzfg
dwgv: 8
lmch: 2
wvdj: lgbn + nmjz
bjcm: tzpw + jljz
hgsq: 7
hwrj: lgcg + jlpq
tmzl: ltgb * hbzl
cczm: ldrb + cbcc
hmpw: vrch + jcpc
tdln: 9
shnv: whdb * vmzp
qlsv: 2
htsg: 4
szqr: bplb + gtcf
grcq: czqc / jdsl
jvbm: zsvt + fgcl
fllz: ghsl + vjph
hsbg: zcvp + mwcq
jdvn: 6
nsmm: ffhw + rgfr
mhbr: 8
nvvj: 19
htbz: 3
rlqh: 5
pttp: 2
pdmt: pcwb * bfrf
tdlj: bdzt - jtmc
bmqt: 16
gvft: 2
csqw: 3
grcp: 1
rbjt: 3
rdzz: 11
rhwp: mmhq / zfpj
wlbb: mctj * rbjt
lzng: 6
gwml: bjsd + cnbs
pvff: 2
nprj: 13
fqrh: qgpz / ppfh
bwqj: 11
dmpn: 10
fvcp: hjvn * rfjj
bbnf: 3
bfds: 3
jzwq: zsrg * szqs
qlpt: gmbv * dmzn
mnsw: lmch * nmgq
qrsc: nbhz - jdln
mlwj: rzsp * ghdj
wpfz: gvvp * whgw
hmmb: 3
fclp: mtmq + dntw
fpmt: 5
sqls: qrsc + rhth
zgwv: jjpc + hmpw
fdlh: 19
wzft: 2
qqnj: mhbr * hhjc
qhbl: qflf + pczj
hfgt: 3
vggm: nvvj * cwmr
fhnc: dbjl * fwzb
rfjj: 4
rfsw: tmjv + rwwv
dfqf: lbvm * dmzp
pfvc: 2
zmgn: nqlc * jcjn
gsvb: 5
nqqf: 13
snhj: 5
wmzc: hthb + lbwh
dwrp: qlhd + wjjb
cqsd: 16
cprm: 4
bgvn: 16
wbzf: gsqv - pmjv
ggtm: vsvd + vmwd
wbbs: mgfm * ftns
ppjn: 3
tflm: 11
gqqg: 4
jfbn: 5
shlt: hrlr + phdl
hzwm: wdbm * wbvr
zdtq: jcbz + fwgh
tqrr: gsmd + jmhl
vfvr: cnfh / jvrt
vdrt: chzm * dwpw
npht: vfnf * djnv
rrhz: 5
rqfp: mflj + lhrn
ptbr: 5
mwnc: mjcq + pdrq
grnt: 14
pmqg: wcrn * rrbs
fvnf: shlt - zlmg
qgpz: ppjn * wvgz
llpl: vvcf * gqhf
clvq: 6
cglf: plns + grmh
tzcc: 5
trbp: crbc * vzdl
nhbf: qcwb * cfrl
vpst: jsbf + zdcb
tvdj: 5
cwmr: 2
wcbz: mljm + pmpv
lfmh: 3
mzcw: fjqv * mngd
thfg: lbng - jqzj
jgrj: wnjr * tvtd
fjlb: 3
cwbq: cwbw + rlpd
vccn: fplg * lfbw
jjmg: ngpm + hftr
sjlb: 2
lgzj: 9
mqlg: tlgs + lhll
svsd: ltzc * bmqt
fprb: 10
pvgt: fhnc * ghcz
gnwg: 2
lrrr: rqfp * qgmg
hltn: 11
dqwj: tdlj * nvzv
cpnw: 5
rltv: 4
qqbt: tmlt * mlnv
vlcr: jhrn * vpvj
djst: nhzn * lcjr
dwqn: flgw / zntt
gpzw: hbmz + qhld
dcmn: 1
bnzz: 3
rsqh: hrpl + zhtm
fnsh: zjjl + wflc
jljz: rrjh * vpbm
sdrs: vrpf / qbdl
wrvb: 2
mhzp: 2
mjcq: jpcf * ndnw
nnmq: fllz + cdtd
pbjq: 11
qgmg: 5
bwwh: snsh * mgzc
vrpf: nmzq * jzgm
jbrm: 4
gvcw: jmdf * bnnb
bjcd: 2
gtzg: 2
ssmq: lslm + bcph
brvj: 1
ftlm: 2
nvnc: gtrn + npht
tmjv: 8
psbh: 9
cvzc: 2
nfgf: 8
cdmp: 3
hrpl: slhp * sdfw
rhzc: vggm + mhgr
gtbr: hwcs * vrhr
jtls: fcch * hzzt
jqrz: zmcl * mcwr
nccd: lfdz + bzdz
dznv: 3
ldtm: hmbb + nsmm
qvdq: 2
scqw: shgt * grnt
lzgn: vgql * ttcc
btrp: hszf + fpdd
glwz: bdjw * vpwz
lvmz: lwfz * phhl
lpwh: 5
csns: vmdr * swnp
rqwr: phzl * lsnd
hndd: wzzh * vntd
jwfh: ctjd * wbbs
wmmf: 5
vwlv: smsj + hhjj
qtpq: 3
fjbz: 3
sttv: gswf + mjhn
zsrg: hpmc * lbcg
lqwg: 2
rpqp: 1
ggds: 2
rvrb: hdrn + qpld
jlfq: 1
gscs: 2
hqfg: gwwr + pqfz
nbjs: hgwb * ppmp
zsmq: 3
pgvf: 5
lmnm: wtcn + dwqn
ppww: jgrz - sqjg
tljt: nhbf + zmlb
nttp: 3
hrlr: 17
fwcr: 3
cszf: mhbg / vghf
mjmp: 3
mflj: 1
rswz: mhzc * rfqf
sqds: mjmq + mdfs
cwmd: wcgj + qvbv
mfsc: tqrr / cjww
vpwz: 2
lcps: nmcn * jrwd
rhgw: vsvp * gdwh
lwfm: zlbl * bhnm
jzrj: 3
qplh: fzzz * tjfb
lttb: 3
jrfv: 4
fhpf: 2
mmzq: 3
rpll: cqrh - tdws
rlzq: mlwj + rgnp
bffw: rhvf * jfhf
cslb: 19
rvnc: 6
vpjl: gggp * sszs
stll: cszf * qhbl
mwjn: qplw + cglf
cqtl: rcvz * qbhs
jsvf: smmv + qbsb
crbc: 3
chzm: 2
cjww: 2
pfsp: chnh * mrdf
jbhn: 9
lzbf: 2
hgsv: crrp * tqnb
gsmd: pfgm * vhqn
qbdl: 2
hqmw: 2
ndbj: frqg / lbdb
qttg: fqqp * hsbg
mctj: flft * hhmp
ntrh: prcd * mpwt
flft: 2
ldrb: 5
fjfv: swfb * whlt
rrts: tptp + zfzv
mhmr: nrtt + wrtj
sbzj: ppww + wbrz
wgpl: pvwf + rrhz
mgcb: 2
wshg: cjgw * tvch
prng: rsqh + rswz
hhwr: 2
wvqd: 6
lsgq: qvhs - mrnr
lvwn: 19
vmsp: pjrz + sttv
ljhb: bvwh * gbcj
vnrz: 5
jcbz: bfpl * vflc
cwbr: wvdj * bwhp
svth: 9
fjqv: 2
djnv: 2
zlmg: 2
zshr: 2
whnr: nvnc * djmw
bcch: 2
jlbl: 2
qths: 3
rrbz: thfg / zcfd
mhzh: 4
gdng: mcgv * dhbn
hhjj: jnqt + qbsw
zjjl: 2
prjp: whfl * wtgl
lhll: rlzq + vjdj
cpbb: gbqf + prnq
lfqd: zgwv * drlc
jbwz: jqgw * dndz
wftl: 3
gllj: nwhm + gmhh
dlrf: 2
nhvd: tgtv / bdtj
dbhj: mdsh * scqf
cplp: 5
wmph: 3
csdb: 3
tvch: 5
szqs: 15
qwcv: 11
dmzn: 5
vnsj: ggdz * dfpc
cpjg: tfqr + tthb
zvjz: lgfc * grpd
hlrh: 1
fjls: 11
dldq: 2
tsqg: lljn * cvzc
lpjz: 7
prmn: 10
vlch: 6
rfll: tnhj * ssmq
zmsb: 2
gfps: 2
dbjl: 2
fpmd: zrtg * rrlr
svrr: 3
mpdd: 3
fnbp: 4
jcpc: tzwt * mpnn
dpvd: tffz - rtss
dspt: 3
tgrf: zjds * znpj
gvcj: zmnh + bpjn
lwvz: 5
rhgh: 3
nqlc: 3
mhvf: 7
pfvz: wmwm / nflq
gwsl: 7
hmbb: vqht + qttg
lbdd: szvs * pvvz
jffr: 1
njdn: 2
wbvr: 2
wdrf: cssw + ndtn
hlth: jwfh - lgzj
fgcl: tvlv * qlsv
mlgd: pcch * ggds
znpj: 5
pmdv: 15
mcgv: rbsr + fqrp
lmtb: csjv + lqwg
fwpz: lrrr * nttp
hbmz: bdnm * nftt
tmnv: 3
pjdw: 4
nrzs: pttg + sgml
cblg: lbgs + ldtm
ggbt: 18
flsg: 3
ffmg: fpmd * gvjs
bjsd: bbgm * wmzc
vffz: hqfr * jrpd
ntjv: 9
dhzh: vzfq * rwvv
mwhv: wbht * fjls
frsc: rcpc + fwpz
gsfg: jrqb * fwcr
gfdg: mgln * hlth
nhzf: 12
mvlz: ddpq * tvms
cmdn: 2
mgbq: 17
pngt: 3
szss: 5
zgjb: 4
sgpd: zsrp / vpfr
vzqf: zvjz - grfs
jtmc: 2
lbgs: zgjb * wfqq
vbfg: qglg / vdpc
dctm: 3
srmz: 4
fghr: 3
stqp: rnbh - qqbt
mjhn: rdsw + vncz
jtzh: 17
mgfm: 2
gjgg: 3
bcph: vdws * wqst
rfgd: nrlz * wwps
gpmj: 2
rbsr: slnp + zprg
htfs: mmrz + dhhp
sssf: rfgs + rqwr
tswl: 11
hwhs: cpnw + fpbv
jwjr: srmq + jgqz
gqhf: pjcw + hhwr
ldtb: rcqf + fljd
stmf: 17
rrbs: 7
cbcc: 2
qqsq: mngg + rtbj
jnwq: 4
qtzl: drhp * ctml
zcvp: qvnb + jffr
vmnt: 20
jvrt: 6
wznq: tzcc * gssc
rrlr: qpdz + fjfv
glbs: trbd + csmf
qvbv: dsjq * pfvc
qpld: 7
zlwh: tmzl / nlbc
gmhh: 5
wqbz: cssp * zcpr
vdpc: 3
wjrj: nqqf * ttcf
jccd: 2
lhnc: 3
nhbv: fmpq * rrtz
tbcc: 2
tsvq: zwct * qncq
lsnd: 7
gmsv: cwbq / sjqv
wjfh: 2
tcqc: 11
slln: bfds * mrsm
cgdf: 9
wrzn: lzgn * gvgg
phss: dqnz * mjmd
rgjg: ggtm + mdps
lhnl: 2
bhqt: zgzp * qcdp
vntd: tvdj * fpnm
cnvb: 4
gpww: gwgn * vtdv
lljn: 13
mrdt: sgpd * dghz
jpjr: 7
brdb: jbtz * scch
gpvz: hntj + pdtl
gggp: hfzj / htsg
thpr: 2
tqjw: 3
pnwp: zpqf * vvbg
bwdn: 6
lcjr: 2
plns: lbdz * qjvh
vqht: qtpq * zvsh
lbvw: 9
lbng: ghzp * rlcd
bpjn: mnsw * fbzj
bzdz: 14
qflf: fnbp * mlgd`,
    output: 232974643455000
  });

  Utils.check(solve, dataset, "21a");
})();
