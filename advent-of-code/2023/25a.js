(() => {
  function solve(input) {
    let lines = Utils.read(input);
    let graph = {};
    let edgeList = [];

    for (let line of lines) {
      let v1 = line.split(": ")[0];
      let v2s = line.split(": ")[1].split(" ");
      for (let v2 of v2s) {
        addEdge(graph, v1, v2);
        edgeList.push([v1, v2]);
      }
    }

    let vertexs = Object.keys(graph);
    let bags = {};
    let bagn = 1;

    for (let i = 0; i < vertexs.length - 1; i++) {
      let v1 = vertexs[i];
      if (!bags[v1]) {
        bags[v1] = bagn++;
        for (let j = i + 1; j < vertexs.length; j++) {
          let v2 = vertexs[j];
          if (!bags[v2]) {
            let n = 0;
            let edgesVisited = {};
            // If there is at least 4 independant ways of going from a node to the other nodes bag
            // They will be in the same "bag" as they can not be disconnected deleting 3 edges
            while (dfs(graph, v2, edgesVisited, bags, bags[v1]) && n < 4) {
              n++;
            }
            if (n === 4) {
              bags[v2] = bags[v1];
            }
          }
        }
      }
    }

    if (bagn > 3) {
      // If this happens then we have extra work to do. It would be the same problem but tinnier:
      // Each bag would be a node and a edge will be added between bags if exists and edge between
      // some of each internals nodes. Luckily for us in the examples didn't happened
      console.error("More than 2 bags");
    }
    var a = Object.values(bags).filter((i) => i === 1).length;

    return a * (vertexs.length - a);
  }

  function dfs(graph, vIni, edgesVisited, bags, bag) {
    let nodesVisited = {};
    nodesVisited[vIni] = true;
    let queue = [[vIni]];
    while (queue.length > 0) {
      let list = queue.shift();
      let v1 = list[list.length - 1];
      for (let v2 of graph[v1]) {
        if (!edgesVisited[v1 + "," + v2] && !nodesVisited[v2]) {
          if (bag === bags[v2]) {
            for (let i = 0; i < list.length - 1; i++) {
              edgesVisited[list[i] + "," + list[i + 1]] = true;
              edgesVisited[list[i + 1] + "," + list[i]] = true;
            }
            edgesVisited[list[list.length - 1] + "," + v2] = true;
            edgesVisited[v2 + "," + list[list.length - 1]] = true;
            return true;
          }
          queue.push(list.concat(v2));
          nodesVisited[v2] = true;
        }
      }
    }
    return false;
  }

  function addEdge(graph, v1, v2) {
    if (!graph[v1]) {
      graph[v1] = [];
    }
    if (!graph[v2]) {
      graph[v2] = [];
    }
    graph[v1].push(v2);
    graph[v2].push(v1);
  }

  let dataset = [];

  dataset.push({
    input: `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`,
    output: 54,
  });

  dataset.push({
    input: `ccq: htb nhm srv
qzd: cmb pfc vxt
nrd: gkm phj hpg
kmj: tkd dgn crq mjf
sdf: zld klp
rrl: qbr
tgr: vcs fvr drf qvk kzc
zdq: kvv
fvd: czc shs
cxr: qdk kgr pdr phl
ltl: sfr hhd bfr rpj
ldq: trr xgg gdz
rcm: kqk pvk hpg
zfm: rsq zps zzh pdd sbq ktm
rxj: lhm
xdr: kcn zkm mpx cvh
hdd: qsc dfx vcn
qln: mgp vfh nct ssp
snn: tdv fkj vmh lps
mgx: nqt ptz
tqz: znz rrx sns
zkk: nrt xhr nch
bff: bqc
kqh: xds vmd
jfp: jgc gmx dzq
xln: tnf gnm
qfs: xxb nsk lzt zjt
klj: nnn gsn mrr hsg
trm: rsd zqg fjh qjm
vnz: lcr bbx vsd
lkg: bqq ngf mmt
shp: fxb jlq cvp
pgv: svq kkv
vpj: xnj xjq knz
dbf: zkk gth ckf
dvn: rzl pnx
vnj: tgz qrv rdx cpv rrc kps
ctr: qdx pmc jfg qbk
ncz: fxv qsc
dfm: mgp jzp rrv dqj
krl: zhs pmc nxh mll
crv: cpc rgg rxj kxn
zvb: fpg mrh
rrx: zps
rvp: sxx rkg xvq
nkj: vrs qtt llp
bls: lcv mgh fhr xqs
qjb: mrz sjf kqg cpc
xhh: xcf tsp mtq qzc
vzm: nbr mjs lmq hjz
ffj: tkd vpj pcg qvg
qsl: lgp rvd zhs
vxc: ljj ckf zdq mxx
rxm: tzf sjn clp mhh
sng: fvj ssp fxx qgh lzs
srt: hpg qqs qmp
zsr: hbj zvb
lrc: kpb
lcq: lhm zst jnn rgb
ccl: phc lsq ztf
tjm: bfg rbm xcs
drx: fmq mgr xgc
npf: mzf
dng: klp pvn xfx nxb
vdl: phr
kkg: qbh fxl zmg
pjc: hlk fjx frx
qxx: mkz rsj bjz qtl
skk: djc
kvl: zng
lzg: dcg kfx fjg xsr
gzv: thd kzx hkn
phg: vhg jgc kmf qxq
zft: nrd fxv rdm mll
mjf: ctn zqg vjh dpt
qst: xrk hrf
crq: hvt
rsq: nht
qct: cnn tgz prm rdl
rtb: kps vhg rxl
fkg: nms
vqb: jnh gqg ffp rgp
qsx: fnb xfk
sdt: rkg rlk qrs nbp zkz
plp: nzm gvd mtl prj
ffp: cgd xxb
ftj: vms
dkh: xjb vpj zcd dfg
qpr: gnr qld ffd zpq
snr: djk jfv kpx
hkn: ncx gql
nhc: jsg mfl
jnd: sxq dpg rzz
fmr: cbb hlk qrv ctn xjq
qnj: mxk
prf: jnn
vht: zmq zbc fgf
cnm: rrz nrf vdl nbd
ggd: gth vpk
hks: sqv
fmm: cjt hrf xjb ddc
dpg: vkx cln
qgn: bks jfq vzh qvs
zfp: jht qkg qlx
nch: rvj rcv
kgb: gdm lnp dfx hmz
gqn: mtm htb vxp vtt
xdf: lvj tps
msf: kjx njs djg
kxh: rzl
vxp: mlr
vpr: gjp zhb
fzc: hqq lhb zbg xcp
bqr: mvt sgd mth tgv
zbf: vvm dcg rht xqs
ctn: mzb rmf sdk hmn
jcs: pdd sjn clp rkc
dxl: vcx
jgc: cnr cbb dvv vmp bvk
ghv: bzv hfk njh
xrb: vdk
vmf: tns kcp xvq pgv qlb hzp
rzl: rgb
ttc: qjz gdv prm vzx dxf
tmj: tfs rzv rcq dxf
xfb: tzf spn fvr hzg qrd
bks: dnp
rfk: lpb fjx nrx
vzf: vvv hdr
htb: sxl
fmk: bmp csx tnz kmv pnd
mvs: vdr
rkg: slp
lpn: xgp vsk zmk rrg scf
nzd: fjj zpp lzt hlx
nfl: ghk dff
hgx: nms pjz rcg vzx
bsz: snq gvd nht jzh
tfn: zgj
hgt: qzv dnl rrg vxp
psb: czj jnh hzp bsb
rrc: drh pzn sxl
tmd: ghn hzj jhh
cjd: cnk
hvx: rbp qqm
qcv: ghn rmf pfq
cct: msc bph
zbc: zkm rdl
fjh: dvv
kcx: xgx zpr
clx: pdn zst mkp pkr
xbq: rrr mcf lvf zsq lgv
jfv: xpn stt pph
mnk: njs qtv
rgd: jst chx
vbq: dpt chq
mcs: sbr hmn bdf
qkm: xdq dfr qqm
kzr: kkr hvt vpk flb nch
ksp: nqt tdx
scz: hgz lgk tbx hds cpr xqj pxf
qvn: gsd sjn djd
dqh: xdq fxb mdd dlh
pnz: qkg
crg: sbb
xnk: xkp rms fxb ntj
dsq: msr
njs: fll
xlf: mft pfn zfk svs
nnv: jqz fvg
pcn: vbq kcx khn vzx
jfq: rkb
dsl: bxs
zrz: hmr cpj shg qsl
dqb: msq ldf gzv xkj
ccf: gdv rrl qgp
fcc: dcr gqg htb
ksz: gcx ldq
vnl: sjs mlc llc rhx pnz
mcn: rrr jlf zps
qtd: pkl lbg bxs khp
szj: qhd mpv gjb nkj
bph: stz cxf
qqc: qdk xcx sfr bgl
ppb: jjn mfh msm
gnt: xgx
hjq: zhs npc ksb jsg
ljk: gdz mzk phj lvx sqv
ncm: nbd fqr klr cvp
tns: dxf lvj xlx
rrg: pns fgf
fhs: mjm
xsr: bqq
sbq: tdx
lmr: zth
hbj: qgh
pxf: snf
cgn: dbv pvf jcr
zgm: drz dff
gxn: fpg vbq svf
jzr: rrl zbc flm vkx
qqs: dfx
fhk: qfh knv sdk
jxg: lxj djl cxq hcp
vfz: ssp mjs rjc mgz
krf: pzr pfj
txp: hxz
nnn: kdm
kkr: lvj
nms: zrv
pcf: gfx bgm hfp cpc
hzg: vpv drz
lcr: zpp dqj rkb jtf
lfz: jnj bbq msc nxh ppb sqs
pjz: ltc ffp rlk czs
rhm: zht dpt
mzj: hcb tzj bff nkr xpc
hnd: vjh qtn
ccj: vcx
tzs: rbk
gdv: zpr
phj: rnh
qrb: drh ljn
tbm: scg cnr
kfq: qqk lmr hhd
bfg: mqd
qtq: zcm sqv dqg kmb
lbm: nhm
fnl: vlp
flv: nbv mgk pxp
lxt: rhm vdr qtv ccm
tfl: gzj gsn kql
qrd: ntq hqq
tfs: jkb
qdx: fnb
kfl: gnn
ckg: fgm bqf
gmd: dnl qnq vfq hnd
xkj: dln hvx fjx
lfl: rmp jmv vvm phb
mth: jnl
hbl: jcq hcb
pph: cbj
chq: bjv
sxm: kdm rtx
qgp: xxb kcx tbv
fgb: zmk jkq
xnc: pxp snf bqc
pdd: bcr kkh
frx: fgm
pzv: brd
lgv: rtl qdk kzc
gmv: lvd mrr
zzd: scg gnt lcz hdq
ndx: sbd zdq
xxk: zth xnh
dgv: gvt hqr zdj
zst: rtl
cnn: drh nkr bqn
tfk: dsg kgp nkj dhf
qlp: nxh rnh psm
bvr: bzl hrk zsq
mrh: kmd
zqz: qpg jlj qgr cvh
mzv: kkz mkv
gjd: qvc
kzc: lvd
sgf: njh gzv psp mbs flg
mbd: fdp jxs
cgp: sbd
hpd: fjj ffm knz xrt
xrp: lvx pqp glj kkg
lmn: bqq pjk
skl: vrl qnb ftj
grd: bcs hfh
hsg: pdn zmf rct
sxx: ptx hvt
rkc: sxc fqd nkz snq
blm: mgg tkd vxp
nqb: scl zkm nfv slp jkq
cbg: qxq vht vsk fzl qvg hkm
fcl: tsp pzf ccj
dzz: tmd bpj kps qjz
btj: rsx cqp vjh rhj
bvb: jnd tvp tpc rvp
klr: qpg sph
cvh: vmp pnb hrf
ltf: hzj dlh
bvz: vtt knz ppx vhg vzg ddc
zfj: kgq fjx xqj vjp pxm ckg
nzm: qbh
mxk: hlk
hrf: klb
rjh: djg tvp sdk
sjc: rvk vkt
llf: srl nhc
fjq: xkp
ffd: qtt glg mlk
ngd: mhv cjk xnj mrd
pkr: brr tgb djk
fbr: sgd cpc drq zgm
mss: rdj ftc lbm
mrf: qgm bqc fjq hzj rcg
jzc: nsz gzj mlk szn sdl
qkh: ngz qxr zcg nhc
bjz: xvr
gpr: bdt jqp gkj jfp
cdd: xsx
qmr: qhg vvm hdz xqv
pch: dsl kqb
hlx: zqg
vrc: ngf jfv xhx
bqq: sbn nsh bxb
mnz: shs lkg tgr vnl
xrm: fjq jlh
hqg: rmp xsr xcx crr ktm
rnt: pzf trr
xqv: nqc gkm rnh bsg
bhk: dln vkx
mvt: mpl fjl
dgr: sbb nsz xbn dxl
hcq: dzl ckg rgp lzl rjh
dxq: fvg zmg pmj
mps: sjf xcg qnx glj
vsd: scf ppv rdv
kzj: qxh fjx zjt csl
zbv: zgj llt
fmq: mmq
xcx: cpf hqr
jht: djc
nqt: vcv
bcb: vxt llf zgm qqc
mhh: pfc tvj stt
mnn: rbp rrh knp lvj khn
kng: pvf djc cvl
qgt: bcp dnp xnj lrx
hrk: vjx xnh
nmz: mcr dxg
hqv: xtl mlt vqc mqr
gcz: tzm vzx mxk
zxn: pjm hdz shj crx
pkk: lpz nht fbl kgp
gns: vvt sdx kgt
kpx: tzf kxh
bjt: snf psp knx rdx
vph: ggr
fph: dkf bfq qnx jcp rhx
src: fxx pzn rxx
lmq: mcp
ptk: mrs hxz jxs fph
cpf: phl vcv
xvr: bzb
vsn: kzx hgf xxb
jkx: gdm qbz
phr: vtt msq
bgm: dhf vpv
ccm: fqr nrt qcv
qhd: gvt zmt dxs khp
djd: jfg sfp
pcr: hgz dpt hfk ffm ljf ncx
dmc: vqc kjx
zmt: hlz mkz
gsl: frx cps
lvd: jnl
xzk: ldq glg mmq
mcp: dvv
bzv: jqp fgb hhr
xdc: sxb dlh ddf
fhr: vcv xhx
brr: fqn msm zgj
dgg: xfx vzm hbl dsq
mrz: xgl qqs xfb
kfx: crx vjl cpm
cft: mrp jjs scq
jtz: qxr kms kvk
hgf: jjt zqx
rcc: rjz sjg xjm cvp
qxh: bdf
brn: msr qgh ggd mlt
nxb: bqn htb
qpl: bqf
xlm: rsj vrs
fjg: rtx fzm
vcc: rjc
jpn: fvn nch
kps: jjt
ztl: bks dnp
lkh: xrt prm pfq cbv
thd: xdc jlh
xpc: fjh jlq scf
ddm: gdz xfk
llz: zqx cbb mcp ntj zfb
qtf: trr fpd fqn csq
tvj: jkx pmj vxn
qlh: llt
nrq: nlg
lfr: hjb mtm
jhh: fnl
ljd: mqd
knv: vfq xrr
dsb: skk gpv xkb fnb
dsm: fgq fgg frf gcv
xcg: kkz
tct: jzc ddm rht hqg
npr: vxb nnv nmz xrx vmd
jxp: jdq
blz: mlc lkd kpb mzf
kmv: fdf
ppx: knx cdd sld
ntj: fvn
jfh: vmz zsn
ddf: ppv
dhq: bbx vbq kmv
mcr: vjx kkz qxr kpv gnr
tnf: nqc
xgp: mqt
knj: blm lrl rrz qpl ncx
ssk: rdx
fjl: rpd ntq xmd
gsj: rmf
cpm: sxc sbb
xzl: slp qlb mtz fjx
gsn: qqp qtt
zzv: sxb
kbp: xhh bzl rbm gvb qdk
jzp: knp kgq fvn
xlk: fpj fhs ccq
rgp: ttz cnn
cxq: gnn ptn bzg
rxf: lfz qbh xlm vjl
kms: zng fvg
gnc: vph lrc fdp
vcs: ddm vzq bcr
nsx: gcv jmt mxk
rpt: vzq
fzk: tqv xgt cln
lrx: lpb
hfj: xrk gsk dfg
pdr: zcm gsm
zhl: ftl qqp pph ngf
mxx: dcr fps
lhj: kkr mpx rjq dmc
nrx: czj dxf
qsc: brd sjn
pzr: mgk
zvq: zhs ntc pjk mmq tff vqg
hzj: fjj
pnp: dkj
kvh: kkh gpv dxq nsz
nsc: dcr njv bsd xjm rxx
prm: bjv
fvj: vsn hcp czs tqv
mpn: nrx tfs hcb shp
djk: mkx gpf tff
fgp: nlj lmn
xsx: dsq
lhn: mvs smx
zqg: nhb
qqj: dvv lzs fvj vnz qkk
gvm: hds fqr dzl scg
rsd: zvb mff
pvf: zng
jnj: bfg
shj: phb lcv dxg rpd
pqg: msm gfx lsq
qvs: rcg fgq
gpv: xkb
njr: rdv zzd dnl rjq
qjz: rhl gtd
kjg: lkg rsq rfz
ldf: src klp hlx
rxc: rrx fkx
gmx: ccm vdr
lkm: stz ccj ccl mfl
zlx: ggd nbd
mlq: zst lhb jxs cgn
qhg: ftl
drq: zcg zbf plg
xbg: cmn xzl jfj msr
vpv: dkf fkx
qbj: crg mhd mkz
mxd: tzs rsj zkp
sld: mff czj
cvl: gkm jht
llc: ncd xvr mqd
vbg: pvf qtl bjz bgm
fxx: mqs qkk
cps: knp kmv
mkm: rmf rsx smz bzp
vgg: sbc gmv ggr zgm mzk
lrl: jtf xxz
ntl: hmn lzt
qnq: rbp flg fhs njv jdq fdf
knz: ssk
tmb: zdq kvv xjp tvg
vxm: kkp hqr crx
fsn: bbn hfh pzt jrk
dfx: hdr lsq
pns: ffn kcp
hgr: mvs xrm nfv njv
lvr: rpj gxx sxm hmz
kss: gzd knz fkg nnl
qbq: kng gnm phz pjk
kxp: klp htv fdf jlh
hxj: dqj zsd rxl cnm
prl: tgv gvf bjz
rjz: bsb ckf kps gnt htv mqr
qlb: zfb ghn zkz
znm: qrz rfk fkg rqc xjm hbj
bcs: sxl htb
csq: jql vmd
znz: vrj
qtl: xcf cpf
jrp: kkp qgb nkg cxd
vtv: nnn rrr fvd vzf fnb
gtd: jnh hzj
rvk: zps zfr
bfq: kpv
tdt: fhl tvp hlk jlj
flm: tsj
jsl: xhr
nqn: xtv jqp flm mss nbr
ssv: nms vsk pzr nsk
djl: ffn flm smz
nbv: cdd gqx
gsd: gqb
rzj: sqv jql
bsd: trl msh flv
lhg: lft xjm
ktz: jfq fcc vxp hrs
zkz: lhg gmc
kgr: pzv dgs dkf
gqg: mqt rbp
gfx: gjp ncz
vzq: mlc
mtq: nnn mth kkg
nxj: dkv qmp xxk
bjr: lmn xln vpr
bhz: mqr qbr rgd
ghn: fpg
czs: vjp rjq
zsq: qvc kqk
dzq: sxl
tkp: nxh ngf nhc txp
sqs: nrq
fzp: qbr thd htv kht
mjs: rsx csl
gjb: lrc qpj
hds: fvn
pqp: nkz fkj
qnn: rdl xhr
qmp: sjf glk
spn: lbn mhd qgb
pgt: zfb trl qst lpb
vkv: pnz llf stz tff sqs
mtn: mrh xdf
gjx: pzn cjk zzv pkt fhs lhn xrt
tdb: hdq dln hzp
bqn: ghn
jxs: qxd
lpt: zrv xjb fzk nbp zrr
vrz: cnm srb rrh
lvv: vms rff sbr
xgc: dsl
nsz: krc
rlk: njh snj
mlv: gjp trr prl hvv
qrz: drh lrx zcd
tzm: bqf mcp kmd
vpc: cnk mqs jkb fll
cmg: mvt hpq znz rct
ksg: mrj ntq bqz mms qzc
tlv: gqg xdc dft
zcs: zmq fgg rhj
fhl: rsx vlp dpg jfh
mhq: glk kpv jnn cpm
xvx: fml ccj fjg cxf
sss: dxl gvf zpc pnx pzr
fsq: ksp bjr
vxb: cxd djd qsx
nrc: qxd xxk qzd xln fqn rjk
bsg: zcg
sdk: xgp
hpg: gkm
zlf: mlc ghk bgl glg
fxl: qlx ftl nqc mtl
drf: mrj sbb
zpc: vvv flq pfc hdd
svs: jsg znz
cgj: flb rms
fht: mtm
pxk: srl ghk rsq pzx brc
pnx: vbj
zvk: jlf lhm sxx sbn
jcq: zrv
ztf: tff vzf
dzd: jfj gcz
xmg: pns pnb fht svv hrs
vbh: lbm psp
rhj: fht
zfg: pqp gjp sbq npf
kmb: sxc
qzc: xcf rjk
qcb: pnz nkz sjc jtz lxz
lnp: mft hmd
xgr: ttz rrv tpc gcz
lps: npc gcx vcx nrq
zkp: vbj
hjb: mtm
rgg: mgr nhx mbd
rbm: xcn
rfd: hrk zfk phm
drc: jsl lnl zcd
fss: jtf scl pdm dvh
nfv: ncx dvv
spl: xnk zqx smz nls
mpx: qbr qxq
mpl: prf lmr
htl: rqc chq vbm xgt
kpb: vkt
sns: srl tjm kfq
snj: ppv rqg
rxh: psp lzs
nsh: kkz
zln: kkz dcl vjl
tnc: cnk fhl kbs csl
zsc: jvj sfg xvr qbj
cbv: fps vml mvs
xjq: chx ntl
zhb: tfn
vbj: mfl
vmz: lcp drc nhb fgm
grx: cxf kpb zth fzm
xcn: czq fqd zhb
jns: mkv
ckr: hbl fdz mtn rsd
tvg: trl fdz qtn
dxg: vjl
pvn: rcg hzr zsn
hdq: mxx vml
cpj: nsh
rld: rjz qxh kzh pmn
nrt: bqn
bzb: ftl
lcv: kpv jnl rxc vph
pxh: hqq fls xcf rvk pmj
hvt: bsb
nrf: rcq zxv ptx
drz: msc
fdc: bph gxx kqh lcq smm
qjm: vms pnp jfp
zfk: rhx pbx
mrd: dft zmq
rcq: pvc dzq
sfp: sxc
hxc: ktz jxp qbl cgj zcs
dbh: qnb bhk trl
qkk: tps vmz csl hcp
nct: zdx vzg dmc
jlj: chq vpk
txh: dvn sjc gmv zts
qbg: rhx mcn mcr
lpz: tsp rhx mgr
mhf: mnv krf nsx rkg
qrv: nbt bjv
pxp: rzv ptn
fpj: nct
jqd: rlp tpg hzd fzv kgt
nfm: thd vcc qgr klb jzr
vhg: djg
sfd: mnk nsk pns fps fjh
sxj: qst vbh smx
fnk: sph xtl tqv xgx
cbb: vlp
pzx: stj rbk zcm
gvf: shs
pnm: lzx gnt
hgz: fht vdr rsx
sjh: cpf tfl vph hdr
tbx: vbh kbs
rzz: ssp sbd
tpc: sdf xrt
kjx: bqf
fzv: mrr rvk sxc
hdz: zfr qbz
qxr: vdk dvk
tdx: hzd
tlb: djl mss sxq qkm
tmc: mgg bdt nct zsr
nzc: rlj zgj qkg rtl
ddd: kkg nlg zfr lnj
pfn: rgb
tmn: lbm zzv qgm ctn tps
nkr: rcv
szn: vrs nlj fmq
gvd: ksp dcg
jqz: gqb
qnl: sxm pqp llt nxj
spq: mcp qqm lhg jgz
sfb: ngf qbk zsq vcn
zzh: sbn sjf kmb
xkl: vms zpr vxg svv
tjk: rnt mkq gjd glk shv
ctb: xgc jht
hfn: zpq qbh stj fvr
pjm: zbf kqh qpf
pmn: bqn csl mtm
fnb: lkd
qkt: sxb grd sxx svf mrd
xns: qpj pqp kkp mlc
jhf: sdf kcp dzl
khf: rsj
zpp: mlr
nbt: pfq jgz rkb
zkx: xnp xhx fqd
rff: jlq dzq pxm
fgf: fpg
mgk: hbj cgj
bfr: gjp fqn mms
xrr: nbr
hcp: svq
xpn: pmc sbc fgp
mnv: zlx klr zcp
mmh: bsg fpl lvf snr vrc
xms: nrq bzb nsh
dtz: nmt xgt dnl mjm mcs
scq: kqb rbk
thl: nqt hlz kdl
qpj: vdk pbx bzb qvk
gqc: jns fmq lnq sbq
hlp: bxb vvv bfg tnf npf
crx: mth txp rpd kvl
rkq: hnd bkk vmz pnm
xpb: rjq
bnb: zbf qxr vcd jnj
hfk: jtf
ssq: qrb nrt xsx
vqc: zkm
mcm: ldq zbv srt tfn gnc
mms: lpz mkv
ksb: sfp
nkg: zmf mfl
dnb: mzf jff shv llp sbb
vhv: ssk rxx cgp
hqs: bjv qnn vfq
bsx: kht lsj czs zcd
pkl: gvt stt lnp
xrk: jxp gsj
cgd: pfj xdf
tvt: czj fpj
jmv: bsg nht
jsj: vvp fbl xcp qlp
fdm: cmb qsx nzm vzf pch
bxb: dvk
njz: rsf phb
zfb: qnj ljn hfj
xnj: nbr
gvc: xrb bvr qxd gjh jzh tsp
qkg: stz tdx rtx
jnc: qtn ffn svq rlk jcq
lhb: dff xbn rtl mqd
dkf: ljd
vdr: lft fgm
nsk: dzq
xhx: tfn
gvr: dbf gqg sld vjh
jjm: fqd xrb zng fph
sbr: cqp
cpr: crq dzd
hfp: ptz jns gjd
glm: qzc jzh msm rgg
glj: fdp ggr
qtv: kkv
njx: hkn pfq pbx htv lzt hmn
xnp: hmd dsl
hqj: jhh gxn gzd
hkp: kvl jxv czq lsq
qpf: hmz llc fhr
gth: hkm xgx
vrl: zxv
frp: gdz brd
phb: ggj
flq: ghk zln rvk
drh: hfh
lgk: fxb
vgh: vdl vqc qrv cgd
lrd: crq knx jhh
rqg: bzg rkb
sxb: vzh
cmn: qcz ltc btj
zql: vfh xnc bsx qfh jsz
vtm: cvl ffl
rdj: knv chx klb
vjh: zxv
khp: pfc
fcm: knx rqg
pcg: flg xxz
rtr: hmd mfh drf brd
clp: jnj ksz
rsm: qlh hmr zvs xlm
lfd: zkp gpf mcf kqk
mdd: pgv rrz
bvs: hrf bvk lzs xnj
zpq: mrj xds
fkz: jhg
sst: flq fnb rsf rsn
phz: pnx drp pnh xgl xmd
rct: vrj zfr
jgz: qxq sxb zlk
vfh: tfs dfr rgp pnb bvk
brc: rnt nmz ggr qbk
vvm: rgb jvj
ztm: vpr xnp qdx qlh fgp zkx
pzj: skk zbv dkt vxn zng gnc
sxq: tzj
kht: vzh gmc nxb
sjs: xkb fls
dfg: bjv pkt
hdc: rdj brn dng lmq
qbf: qnn
jjn: qvc lrc
bvc: xpc ptc xgp jlj
rxl: gqx zqg zht
kcq: lkh pnp vfq knj jnh
rht: tvl
tzj: kvv
jff: zbg sxc kxh
ttz: zxv rzv ntl mqt xtl srv
mcb: bzl ggj gjb mtl mkq fsq
tlq: jlf bls sbn gsn
pmj: pnh
lmd: mbz fsq cbj
knp: vrl
rpj: qtt vjx
scf: tps
hmd: srl
nlj: sxc hrk
txx: hqr gpf kkz gmf
pnv: bqn rrh jsz
vxg: jqp msq
rxk: qnq dkj mmp qrb
xrx: zcg rmp kpx mkp
tpd: fpl xsr xcs mgx xbn
smm: njz gvt nkj
trk: mzf kzc nqc xpt ctb vxt qxd
dkv: gqb nhc
ptz: pnh qbz zmt
ngn: bmp hlk fhk qpg gkj hzj
kpq: fps rrz scl cpl
bbn: xxz bbx
fvr: zmf
fdz: jpn mqt xsx
cmb: gvf bbq
qgr: bzg frx
mkx: bbq zbv
vxn: hjv hks lvx qlx
zmk: kbs fnl
cpv: rtb zsd hzr
jlh: xpb
xjp: jsl mnk slp mtn
vvt: bzl tvl bqz
dvj: nhx czq qlh qhg
jxq: qxz qqp xfk mlk
nxh: khf
xxb: lzs
ptn: lxj
zld: smz kmf
lvf: vcn hjq jff
dcg: xcf kxh
llt: jlf
fgg: qcz mgg
bmp: qpl
kdl: kvk bxb phb cbj
dzl: smz
cqg: lfr djg qjj fkz
lxz: phj rpt
gsk: vjp snj ddf
str: mkx jns tqz vvp
zts: pzx fvg sqs
qnx: jfg hhd dfx
tqn: ztf msc cxf
dgn: zcd
ktm: vmh kqb
ffl: xxk kgp
xqs: vcn dxl
rcg: zpr
mhd: stj khf zzh
gnm: xgg hxz
fkx: dsg
sdl: rsn fxv
mzk: zcm vrs
lnq: gjp njz zfp
hrs: ddf qpl
pzt: kbs pnv
zcp: ckf zsn phr
mkp: dgs jkx
lsj: flk jst xxz ptc
ckf: sbd
hsj: psm gjh tnf gkm cct
qls: fls llt
lnl: srv xpb gsj
zdx: ggd mlr jsl
fml: rpt psm tzs
lgp: dvk llp
zqx: chx
klp: srv
rlj: xcn mlc tvl
mcf: txp
xpz: htv pxm flb svq
vvb: dhq zvb rrl lft
hjk: pjc fkz tsj knz
bqz: fdp
zmf: kqk
pfd: qhg lnj rzj gnm
skp: cpj dhz fdm
ncd: lgp bxb
csh: gvf dvn hjf vkt qtq
glk: pfn
rvj: bzg
zds: tzf ksz rsn hzd
xkb: khf
xtv: jfh vht nbd
nmt: svq
fjn: mlt dnp xgt
vcd: hbh drp xgl gxx
kql: vcv lmr
phc: qlx jmv lhm
gpf: ggj
jrk: hqs vqn vxp
qvk: mfl
jcp: ffl rrx
pvc: zdq
nls: jdq
kdm: vbj
qqk: qkg gqb
mll: kql dqg
qvg: tkd hjb
tbv: vdl rff vqc bdf
ffh: qgr tzv xhr ckf
fpl: pbx jqz
xqj: fjj mtm
xsq: vkx khn rcq kmf
kzh: ptc lrd
mbs: bhk lzx qfh nkr xdq
bcp: bzg smx rjc
zdj: mfl
vqg: gjh rxj
xkf: vjp htb zrr mff
kmd: ffn
xzt: hks gjd fvg lvd
ghh: pzt ptc vmz mzb cnr
qnb: bff kkr hjb
mgj: mtl tgv rfz cvl
nvv: pqp nhc ldq jfg
mzf: ksb
ftc: pxf bdf pxm
bkk: tzj hvx
qzm: xrr nbt jkb
fpd: sst ggr xbn snq
ltc: ljj qnj bff
mgz: cvp vkx vmp mrh
fbl: gzj
rrv: lzx dgn
xhr: ljf
plg: szn vzq pzv dcl
jkq: ljf kgq
jzh: jsg
hlz: mft
hgs: svs gsd glj skp
cjs: mgx gpv thl qls
dxs: lkd
sjg: kcx xtl pfj lrl
bgl: gdm
scl: tzx
pnd: qzm gvr
fbz: tvl gvj ncd zdj
mkv: gxx shv
zgp: sbd mpx xsx pvc
dmd: qcz xjp vxg ndx
dhf: zkp gdz
hmr: prf
stt: fls dqg
vbm: bks qgh mlr
pbx: lsq
tzv: jmt pnm jcq
qgb: pdr rsn
rcv: jjt dcr
njj: gqx hqj ppx gmx
vqd: mcf vdk zfk
mgp: zlk pdm
pjd: kzr dgn skl kzh
vzg: rdl
klq: nnv kdm bxs pzf
hbh: lkg glk nzm
hjf: fkj xsr fvd
zsj: mfh frp vqd dhz
rrr: djc
zbr: xlk mnk rzv rjc
xpj: ptx cbv hcb fks jpn
qxz: kvl gcx
khn: hzr
hjz: csx vdr
xdn: grd ltf vsk
mkq: shs
rpd: xcs
fzm: lvd rzl
xfx: cjd rrh
gtk: mhv nbv fkz ljj
pqr: kkp qpj zdj xms
csx: fps nhm fll jxp cqp
gvb: djc qqs bgl
lcp: ljj pkt hkm
zjt: jmt zlk zld
hjv: xnp hxz mkv vmh mfl
xbf: rcm glg csq dsg
rsf: xcg dsg zng dkt
fll: sph rms
mqs: lvj bdt
mmt: gqb phl
xfk: dkt
hxr: rzh dfr spq dfg bcs
npc: kvk xfk
hhr: sbr bqf hzp
kqg: rht xlm rtx
cxk: gjp llp kxn fzm
tvp: ghn
fxs: xkp hzr kkv
mzp: fjn vpj dbh btj ggd
zcz: cvh gsl zzv snf ttc
mgh: njz ljd mzv
qbz: vmd
lrq: mpx psb kzx cbb
qjp: xvq qgm krf hfk
kqb: mrj
rnh: lsq
gcv: smx rdx
ftf: vpv mbd sxd crn
kxn: mxd prj
htj: qvs fgq bmp
qbl: dkj rxh tvg
kmt: vcc bdf mdd
cjk: qst vht xnk
hrv: ljd qqk rrx rxc fmq
gkb: vpc gsj tdb xdn ftj flk
jcr: bxp bfr hmr dxs lgv
mdt: nhb rjc hzj bbn fdf
mmc: fgf fcm zlk qbf
ddc: flk jfj fgb
ffk: ksb fkx sjh rfd zfr
rtx: jnn
lnj: ljd zhb
vkx: fps
gdm: xvr bzb
pdm: msq sxq rgd
sqc: xgt cdd ppv nct
mmp: ffp lnl qnj
phm: sjh ctb npf nht fhr
lbn: prj sfp jmv psm
hhd: xds
hvv: gsm kgt vxm
vxt: pfn
ntq: hdr
bbx: smx
dql: nrq zgm nqt kqb
gsm: zhb
msh: kjx zqg jjt
cpl: msq zsd rxx
gmc: pvn nms cgp jkb
nkz: pjk
mtz: xnj fxs qxh
xcp: cbj ncz
rzh: mlt xnk rhm dln
cqp: rvj
lzv: jql drz dkv vjl
rjk: cxd rxj
sdx: bfq
rmp: rbk ggj
qhb: zqx ztl kmt fjq
nxt: pcg ftj flb svv cjd kfl
vqn: hcp lxj vtt
lzb: pph snq dxs qqk
bxx: hcb gzd rxh lhg
cvc: qpg htj cnr nms
dhz: qbz zcm
ptc: xrr zht lgk
zsd: qjz vxp
zht: pnb
dlh: gzd
zvs: hzg sjs bqz mkq
zmg: mmt kpb
nhx: vrj
jdq: kmd
lcz: htb pnb
xbr: rpt fbl qvk nkg fcl
snf: rms
tpg: lnj tzs jvj
jtj: ljn kzh lmq vzg nmt
fqr: qgm bks
zmm: sdl krc qbq qbk
sxd: kjg lgp xgg gmf rsj
jsz: njh vbm
qld: crg dgv xnh
lzx: tbx ffn
fqm: qqm pnd djg ztl mqr jst
tgb: jvj hzg nkg
lzf: qvc rzl gpv
gnr: nfl gvt
fks: hgf lpb dcr
ljn: dnp
ngz: xfk pph vmh
sgd: mbz vtm xds
kkh: fdp qqp shv
qzv: qtv xnj hvx
ntc: gmf xzt kgp
dvh: zrr dqj vlp
zzx: hzd pqp drp gsd
dqg: phl
dbv: sdx kmb pnh
gzj: gvj prj
frf: rcv vpk kcp
cln: flg qcz
dkj: vhv gdv
fnd: kpx bjr dxg fjg
zbg: kgt
ljb: nfl vmh rlp gmf
sdz: pvd jfq jhf kvv
fgm: nhb
mfh: mlc vkt
rxs: fcm fnl nls jlq vzh cpr
cjx: drp pch zbg plp frp xrb
tsj: fvn
rfz: qls
nbp: fks rmf
flk: bqf
dxj: gqg sxj hlx xlx
mpv: dcl mft ntq
ffm: fxb zmk
ptx: fgb
tgz: rrh lxj
bvk: dqj
xpt: qbg fxl jzh
thn: dgs crr fcl jql jjn mmq
qrs: xkp gql jst
njv: lvv
bpj: smz xsq gtd
hfq: ljf ccf cgp ssq lrx
bcr: jht zfk
vjp: tbx
pdn: stt fkx bbq
lsb: hlz tqn fkx xcs lvx dvk
crn: qdx jqz zfp mzv
dfz: svf gsk fpj tvt xrm
qfd: mkz xgc hkp gvj
zcg: vmd
qjj: lgk csl xgp
gvj: xnh
crr: xzk fgp
mbz: pmc lkd nlg dsg
lbg: vcx czq vcs
tfh: rlm tlv mgg pnp
vjl: nlg
glf: fxl plg gsn mfh gsm
dfr: ndx
lzl: bhz pzn kmf ghv
kfg: zlx mrd zdx svf
mgr: fxv
bxp: rsj gcx mpl
hms: khp xpn ffl gqc
tdv: hjv djk dkt
bbb: gnn fzl xtl xjb
dgs: gdm
shg: vqg cft kms
mlk: ljd
jhg: ddf vrz xlx zkk sxl
pvk: xzt jnl gjh
zsn: drh
rjs: crn cpj vtm rfz
sbc: bfq cct
cjt: jfj ptn bzp rvj
rdv: zrr
mzb: dsq hkm
xmd: pzv xcg nhx
pvd: tqv vcc mrd kgq
vml: rrz tzx xgp
gqx: bsb
bkc: zmq qgt lft hjz
rlp: prf vcv
sfr: scq fzc xgl
stj: tdx
lzz: tzx msr cjd lfr xvq
xfp: tvt hnd kpq lhn
gql: fll
tlk: fps fgq gsl zsr
cnk: hrf
scg: vxp
mrp: dxl llt lvd
rvd: kvk mlc cft
dft: zrv tzx
krc: xnh
hpq: rzj fqn gns lxz hfn
mhv: qgh rhm
jpb: qrd ktm hks xgg
rhl: njs tbm bhz sph
jnt: dzd gql ltf nls rzz cps
knx: zpp
jjs: rxj drx fkj
sfg: qxz vvv lzv
tgv: skk
czc: hqq xkb
bzp: rdv xpb
jxv: phm rtl dff
svv: gkj ptc
pfj: gsj bdt
tnz: ssk qxh hds trl krf
nnl: msf fkg qfh
mff: gth hlk
dcf: bqr lzf djd crg zfp
qds: ntj zmk kfl tsj
srb: fxb vrl pkt
gnn: hfh
mjm: tbm vmp qbf
vvp: gsd phl
mrr: cxd
qtn: xjb
kzx: bqc xlx
fzl: zmk kkv
jvj: pmc
rqc: rhj ffn
vjx: zth
rdm: dcl rbm czc
rbj: lmd qvn pkk xcg
rlm: jkb pxf xdq
phx: jmt gkj ckg fgq
flj: pnx pqg sdx vcx pzf
hmz: vrj
kcn: kfl jxp nhm kmv pvc
ghk: krc
lpb: vtt
ggm: jcp cpc msc mzf
glg: ghk
nhp: klb nmt qbf bkk
ssl: ssq gkj lcz mmp
mrs: bxs rpt mrr`,
    output: 582590,
  });

  Utils.check(solve, dataset, "25a");
})();
