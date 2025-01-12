(() => {
  function solve(input) {
    let lines = Utils.read(input);
    let rules = {};
    let i;
    for (i = 0; lines[i] != ""; i++) {
      let condition = lines[i].split("{")[0];
      let rest = lines[i].split("{")[1];
      rest = rest.substring(0, rest.length - 1);
      let rule = rest.split(",");
      rules[condition] = rule;
    }

    let arr = combinations(rules, "in", 1, 4000, 1, 4000, 1, 4000, 1, 4000);
    let sum = 0;
    let minX = 1;

    while (minX <= 4000) {
      let maxX = 4000;
      let arr2 = [];
      for (el of arr) {
        if (el[0] <= minX && el[1] >= minX) {
          maxX = Math.min(maxX, el[1]);
          arr2.push(el);
        } else if (el[0] > minX) {
          maxX = Math.min(maxX, el[0] - 1);
        }
      }
      let minM = 1;
      while (minM <= 4000) {
        let maxM = 4000;
        let arr3 = [];
        for (el of arr2) {
          if (el[2] <= minM && el[3] >= minM) {
            maxM = Math.min(maxM, el[3]);
            arr3.push(el);
          } else if (el[2] > minM) {
            maxM = Math.min(maxM, el[2] - 1);
          }
        }
        let minA = 1;
        while (minA <= 4000) {
          let maxA = 4000;
          let arr4 = [];
          for (el of arr3) {
            if (el[4] <= minA && el[5] >= minA) {
              maxA = Math.min(maxA, el[5]);
              arr4.push(el);
            } else if (el[4] > minA) {
              maxA = Math.min(maxA, el[4] - 1);
            }
          }
          let minS = 1;
          while (minS <= 4000) {
            let maxS = 4000;
            let arr5 = [];
            for (el of arr4) {
              if (el[6] <= minS && el[7] >= minS) {
                maxS = Math.min(maxS, el[7]);
                arr5.push(el);
              } else if (el[6] > minS) {
                maxS = Math.min(maxS, el[6] - 1);
              }
            }
            if (arr5.length > 0) {
              sum +=
                (maxX - minX + 1) *
                (maxM - minM + 1) *
                (maxA - minA + 1) *
                (maxS - minS + 1);
            }
            minS = maxS + 1;
          }
          minA = maxA + 1;
        }
        minM = maxM + 1;
      }
      minX = maxX + 1;
    }
    return sum;
  }

  function combinations(
    rules,
    workflow,
    minX,
    maxX,
    minM,
    maxM,
    minA,
    maxA,
    minS,
    maxS
  ) {
    let arr = [];
    if (
      workflow === "R" ||
      minX > maxX ||
      minM > maxM ||
      minA > maxA ||
      minS > maxS
    ) {
      return [];
    }
    if (workflow === "A") {
      return [[minX, maxX, minM, maxM, minA, maxA, minS, maxS]];
    }
    let rule = rules[workflow];
    for (let i = 0; i < rule.length - 1; i++) {
      let ruleEl = rule[i];
      let parameter = ruleEl[0];
      let value = Number(ruleEl.substring(2).split(":")[0]);
      let result = ruleEl.substring(2).split(":")[1];
      switch (parameter) {
        case "x":
          if (ruleEl[1] === ">") {
            arr = arr.concat(
              combinations(
                rules,
                result,
                Math.max(minX, value + 1),
                maxX,
                minM,
                maxM,
                minA,
                maxA,
                minS,
                maxS
              )
            );
            maxX = Math.min(maxX, value);
          } else {
            arr = arr.concat(
              combinations(
                rules,
                result,
                minX,
                Math.min(maxX, value - 1),
                minM,
                maxM,
                minA,
                maxA,
                minS,
                maxS
              )
            );
            minX = Math.max(minX, value);
          }
          break;
        case "m":
          if (ruleEl[1] === ">") {
            arr = arr.concat(
              combinations(
                rules,
                result,
                minX,
                maxX,
                Math.max(minM, value + 1),
                maxM,
                minA,
                maxA,
                minS,
                maxS
              )
            );
            maxM = Math.min(maxM, value);
          } else {
            arr = arr.concat(
              combinations(
                rules,
                result,
                minX,
                maxX,
                minM,
                Math.min(maxM, value - 1),
                minA,
                maxA,
                minS,
                maxS
              )
            );
            minM = Math.max(minM, value);
          }
          break;
        case "a":
          if (ruleEl[1] === ">") {
            arr = arr.concat(
              combinations(
                rules,
                result,
                minX,
                maxX,
                minM,
                maxM,
                Math.max(minA, value + 1),
                maxA,
                minS,
                maxS
              )
            );
            maxA = Math.min(maxA, value);
          } else {
            arr = arr.concat(
              combinations(
                rules,
                result,
                minX,
                maxX,
                minM,
                maxM,
                minA,
                Math.min(maxA, value - 1),
                minS,
                maxS
              )
            );
            minA = Math.max(minA, value);
          }
          break;
        case "s":
          if (ruleEl[1] === ">") {
            arr = arr.concat(
              combinations(
                rules,
                result,
                minX,
                maxX,
                minM,
                maxM,
                minA,
                maxA,
                Math.max(minS, value + 1),
                maxS
              )
            );
            maxS = Math.min(maxS, value);
          } else {
            arr = arr.concat(
              combinations(
                rules,
                result,
                minX,
                maxX,
                minM,
                maxM,
                minA,
                maxA,
                minS,
                Math.min(maxS, value - 1)
              )
            );
            minS = Math.max(minS, value);
          }
          break;
      }
    }
    arr = arr.concat(
      combinations(
        rules,
        rule[rule.length - 1],
        minX,
        maxX,
        minM,
        maxM,
        minA,
        maxA,
        minS,
        maxS
      )
    );
    return arr;
  }

  let dataset = [];

  dataset.push({
    input: `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`,
    output: 167409079868000
  });

  dataset.push({
    input: `btl{m>2179:hzd,a>965:js,x<3167:bc,crx}
ktc{x<2922:A,s<469:R,R}
ctl{m<420:A,s>2487:R,A}
mcm{x>3761:A,x>3654:A,a<829:A,R}
bj{x<1257:xc,sr}
mfq{x<3188:rr,x<3650:R,A}
tlh{a>738:R,A}
zn{x>3618:ph,hvb}
rb{s<892:R,a<2337:A,A}
ms{x<3783:A,x>3900:R,A}
prn{m>2248:R,A}
qtq{a>3468:A,m>2263:A,jt}
dx{a<3314:R,m<3567:R,a<3330:R,R}
vt{x>3136:tcz,x>2504:csv,x>2299:smz,kjt}
xt{x<2452:A,R}
xkc{x<2342:A,A}
st{s<3506:R,A}
zz{s<1239:lxb,s>1671:qgb,m>2346:ts,rbp}
lsh{m>2358:A,s>1491:R,R}
cq{m<2723:R,A}
xll{s<586:A,x<2806:A,x<2947:R,R}
csn{m<2108:R,s>714:A,a<760:R,A}
fr{a<1242:R,R}
dvh{m>1842:gt,s>3457:jhg,jgd}
gxq{a>2315:R,a<2256:A,m>3786:A,R}
vc{x<1484:zlf,x>1814:A,s<520:jsc,R}
hxh{a<3821:gpz,s>1853:mtg,mfq}
pbz{a>2928:xtm,x<2843:vz,m<1108:dv,zg}
xr{m>182:A,s>1810:A,x<3330:A,R}
ps{x>2127:hnp,dgb}
lqg{a<3277:zb,m<1525:mdd,qsz}
jn{x>683:A,m>1020:A,R}
fhk{a<543:R,R}
gvp{m>2630:A,m<1098:R,x>1224:A,A}
ptm{x>1764:A,tj}
sq{m>3289:A,a<312:xt,x>2449:A,fxr}
khp{m>3526:A,A}
dc{x<2210:A,m<1269:bqk,A}
qt{s>278:R,m>2866:R,s>172:R,R}
gm{x<363:A,m>3188:A,A}
shn{m<2469:R,s<3668:mbz,R}
vhg{x<608:A,m<1535:R,m<1981:R,R}
hds{s>2670:xv,blj}
ffr{a>2824:mk,s>3257:br,pl}
td{m<3587:R,s>3340:A,a<3441:zv,hdq}
sgx{s>2973:fm,cvm}
tbm{a<3447:R,x<2836:A,x>2953:A,R}
mk{m>2029:mls,s>3309:sx,tnr}
kfx{s>1999:R,s<1809:A,s<1887:A,A}
tl{s<3243:A,m>724:R,s>3595:A,A}
cdm{a<1934:R,x>1474:A,R}
ksc{x>2830:zj,R}
ngp{m<639:A,m<931:R,A}
jmb{a>414:A,R}
kb{a<3227:A,a<3254:R,s>1475:bvm,dd}
sm{x>1966:A,s>3208:A,fhk}
br{a>2604:zr,x<1844:nj,bn}
szc{x>2026:cmt,nl}
ptb{x>3345:A,A}
hfr{s>3267:R,s>3108:A,x>898:R,A}
qzt{a>452:A,A}
bvb{x>3335:A,m>726:R,R}
gh{s>2919:R,A}
frb{x<2808:A,s>2187:R,x>3086:A,R}
nj{s<3562:fj,zdd}
gfn{x>1559:lzh,a<3447:pj,s<2150:pcz,mm}
kpv{s>1913:A,A}
bd{x>3053:zn,s<719:pqb,a>2965:mkc,vr}
dv{s>1488:R,R}
vr{a<2767:rbh,a<2894:pb,m<2321:pbz,xd}
xff{a>3469:R,A}
rl{a<2707:R,x>1355:bpn,A}
nq{m<1201:mmc,m<1568:nmf,x<1120:dtq,sck}
xgx{m<574:R,x>1164:A,a>3805:R,A}
qcm{x>2564:A,x<2198:R,m>1241:R,A}
tb{m>551:R,m>206:R,m>71:A,A}
nrr{x<2955:A,m>2499:R,m<1664:R,A}
fv{s>3065:R,m>744:R,A}
mf{s>695:dls,a<3530:pp,cmk}
gp{m>1636:A,a>2986:A,A}
fdg{a<3799:A,R}
xjp{m<978:bjn,x>755:rx,dq}
dbc{s>340:R,a>3588:R,A}
qsz{s>1368:ch,m>2826:zd,dm}
bs{x>938:A,A}
pjs{s>3520:mh,s>3245:sg,m>2522:A,A}
mfm{m>687:A,m<414:A,a>815:R,R}
jkr{s>3843:R,mzq}
tlq{a>711:npd,qqk}
qq{a<3021:dmg,m<1998:R,a>3061:ln,frq}
mxm{s>2536:A,s<1125:tpx,fr}
dz{x>3321:A,a<3383:R,A}
sqn{m<1108:A,x<2454:R,A}
bbv{x>1695:R,A}
fzb{a>2748:R,m>727:A,A}
tj{x>994:A,x<569:R,A}
rd{m>3082:vx,a>2081:vn,xn}
tq{x>2808:tb,trq}
lp{s<651:A,m<1731:R,x>3723:R,R}
pb{a>2809:R,a<2785:R,x>2882:nrr,lxx}
ndx{x>3705:pkl,m<2521:R,m<3214:R,xjr}
khh{m>569:A,s>941:R,s<347:A,R}
xc{a>3210:A,m<987:R,s<1171:R,A}
vl{m<2436:R,m>2674:A,A}
mbr{a<376:A,R}
ffv{x>1742:R,a<3619:A,s<529:R,A}
lvr{x>331:R,m>3324:klk,s<3015:A,sgg}
sqp{s<3137:jqr,a>130:pgh,s<3505:A,frs}
lbd{a<2568:lsh,x<1405:A,ffs}
qh{a>3400:gfn,nh}
xj{x>2810:A,m<1464:R,qt}
jz{x>3349:R,x>2888:R,x>2581:R,R}
jgd{s>3243:zzg,R}
vbr{a<3686:R,R}
hk{m>1142:R,m>991:A,A}
vx{a<1949:R,s>1360:A,kc}
tnr{m<1182:A,x<2322:gp,a>3057:R,hr}
ffs{m<1701:A,a>2635:R,A}
klj{x<766:R,a<671:A,x>1199:R,A}
zb{s>2131:ffr,x<2574:kdf,bd}
jhg{m>629:gvv,A}
dj{m>789:A,a>3518:A,A}
krn{m>739:ntr,s>2564:bsz,hzs}
cmk{a<3817:jf,s<378:A,R}
xq{a>813:A,a<773:svl,mz}
mzq{s>3727:R,a>992:A,x<888:A,A}
vqn{x>2380:R,R}
mrf{x<3017:ksc,s<1043:rc,m<319:txc,kbk}
qd{x<859:R,a>3387:tx,A}
cnx{a<3613:A,R}
fgb{x>3100:R,R}
zjq{s<306:R,x>1811:A,R}
qjv{s>1035:qf,tn}
xg{s>2609:A,R}
xv{x<1079:tjh,s<2851:xl,sgx}
lzh{x<1978:ktb,m<937:A,A}
smz{a>534:zdt,x<2415:mv,m<2096:sqn,sq}
lxb{m<1590:mnn,s>488:R,x<3338:bpr,R}
szr{a>292:R,A}
nf{m>2081:R,a>3524:R,m>1915:R,A}
zxh{x<743:A,A}
bjn{s>1703:xgx,m>502:jjx,a>3863:bx,R}
ts{s<1467:A,A}
zfb{a>904:fsj,a>768:R,m<871:qpq,zxh}
tzl{m<2629:dlk,s>2581:R,m>3179:R,prb}
bzf{x>762:R,m<3473:R,R}
zm{x<3028:rzl,s>1458:dg,R}
gmq{m>981:xg,x>3655:A,A}
lbn{s<2515:A,A}
lh{a<504:A,a<885:A,A}
nl{x<1314:R,a>3420:hzr,a<3349:dx,R}
ksm{m<3204:R,A}
rpz{a>3225:ds,x<1030:gm,A}
xb{s<1673:R,s>2816:R,a>1439:A,A}
msc{x<3802:cc,hc}
vk{s>374:R,a>3515:A,A}
md{x<3062:tq,s>2920:ks,gmq}
ntr{s>2551:A,jn}
pl{a<2619:lt,m<1624:hgl,vmx}
cv{s>3403:R,x>3119:R,a<3335:A,A}
pc{a<3417:ptb,x<3314:vdk,s<2948:pv,R}
qhk{m>795:A,s>1386:R,x>1037:A,A}
sn{s<3526:R,a>1248:R,A}
mm{s>3019:st,x<576:A,mzt}
dd{x<2832:A,x<2929:R,A}
tqn{m<3439:A,s<964:R,A}
nkc{x<2397:R,A}
cb{x<1584:gfj,a>3337:nb,R}
bv{m<152:A,a<3361:R,m<260:R,A}
qmm{m>2633:ljk,s<1313:A,fpr}
sx{x<1719:chx,a>3124:qcm,m>770:R,A}
tx{m<2136:R,m>2482:R,a<3464:R,R}
pqb{s>462:jnh,xj}
nzc{a>654:A,s>780:R,R}
rx{s<2123:A,x>1457:A,R}
sls{a>3386:R,s<1305:A,x>3157:kh,A}
fvr{m<3311:A,A}
npd{x<2000:bfv,s>2894:qcz,a>981:tzl,xq}
kf{x<3407:R,x<3652:A,R}
ss{x>2893:R,x<2690:A,a>3086:R,kj}
qk{a>1375:jz,x>2829:lq,a<1229:R,pm}
fqr{s>3038:qtq,x<2313:qd,a<3435:rds,msz}
xd{x>2842:A,s>1412:R,m<3387:R,R}
dg{x>3300:A,x<3173:A,A}
mbz{x<1950:A,A}
zj{s<1270:R,x>2952:A,x>2894:A,A}
ztn{x<2399:vmm,a<666:zjj,btl}
dq{a>3833:R,m<1170:tp,x<323:R,cf}
kk{x>2848:plf,jmb}
cqc{m<1984:R,a<3746:R,m>2346:bbv,R}
cvm{x<1361:A,x>1476:A,R}
nmf{s<1827:sk,qqx}
vbc{a>517:ng,mnb}
kg{s<1832:A,a<3398:A,R}
trq{s<2938:A,R}
nbr{s<3428:A,R}
nb{s>1037:R,x>2105:A,s<410:A,R}
bzs{s>3439:klj,s>3231:A,hcn}
prb{m>2901:A,s<2356:A,m>2759:A,R}
gz{a<3504:qn,qmv}
sf{x>3584:R,a>673:drv,a>384:A,A}
sh{m>1711:A,A}
hr{x<3120:A,m>1725:R,s<2538:R,A}
mlz{x>1121:A,R}
zr{x>2228:ff,A}
bvx{m<3203:A,R}
dtq{x>669:lsk,A}
jf{s<434:R,x>2922:R,m<2086:R,R}
ff{a<2720:R,s>3716:A,s>3513:R,R}
mhh{s<731:prf,kgj}
ljt{a>3420:A,s<1675:A,A}
ktb{a>3433:R,a>3412:A,R}
mzl{m>2308:sz,x>505:vhg,m<1383:A,A}
pt{m<3534:jct,x>1132:R,a<3434:A,A}
pxs{a<888:jc,x<1590:R,s>630:A,R}
fxd{x>1746:R,s>2931:A,x<1473:A,R}
vz{m>1081:A,m<520:A,s<1514:R,R}
pqg{m<341:R,a>492:R,m<513:A,R}
jqr{s<2665:A,A}
mdq{m>1424:R,a<497:ngp,A}
fdn{s<506:rfj,s<789:qrg,A}
dmm{m<274:A,A}
fsx{m<1699:R,x<1215:lh,m>1802:R,lbn}
lc{x>842:bs,x<785:mmg,A}
jx{x>2421:R,a>3815:R,A}
lq{s>817:A,R}
qlj{a>904:A,R}
qrg{a>896:R,R}
tcz{s>648:sf,ndx}
jjp{s>1084:R,A}
hp{x<1315:nbq,s>596:cqc,m>2358:cnx,qns}
lm{a<1592:R,s<2691:A,x<2735:A,R}
rdr{x>1537:zmh,m>3053:dpb,qxp}
vbg{x<2936:nzq,m>2444:nmb,x>3372:dl,fgb}
xp{a<3416:A,tz}
pgh{x<1953:R,a<271:A,R}
rvv{s<3490:A,A}
zdt{a<879:csn,a>1039:R,A}
mx{s<602:kpq,nzc}
bq{m>3798:R,s>401:zpf,lsf}
tr{a>1619:A,x<1673:R,s>1749:A,R}
zzg{s>3380:A,R}
cgx{m<528:A,m>1173:R,x<1284:dj,A}
qxp{x>765:A,x>393:A,R}
nc{a>3563:A,s>1570:R,khh}
tbc{x>353:gqg,nbr}
njp{a>351:R,m>2453:ktc,x>2811:R,dht}
ds{x>883:A,A}
lfc{x>1832:R,s>3439:A,s>3169:R,R}
mt{m>1399:R,m>763:A,A}
vbt{s<3558:A,x<594:R,R}
fg{m>3746:R,a>2323:A,A}
ctp{m>2809:R,m<2504:R,a<1765:R,R}
vv{m>2151:R,A}
rh{s>3304:R,s<3095:A,m<140:R,A}
kdf{a<2917:mp,xsq}
qn{x<1183:R,a<3486:A,a>3496:R,A}
tz{x<3141:R,m>1397:R,s>937:A,R}
nls{m<2817:R,R}
xjl{s<1978:R,x>939:A,R}
lnz{s>3386:mlz,x<1526:vd,m>864:A,A}
mn{x>1476:td,x>743:pt,lvr}
hlm{x>3684:A,s>1106:R,m>1014:A,R}
mtg{m>565:zh,x<3078:R,rt}
hcn{m<3119:R,m>3624:A,A}
hzs{x<1009:R,s<2420:A,a>616:ctl,R}
rmc{m<3127:A,x>3366:R,A}
hzd{m>3173:R,m>2552:qlj,kf}
jbc{x<1179:A,m<647:A,a>3418:A,A}
nvr{m<1005:sls,a<3380:zm,m>1305:xp,jvd}
fpr{m<1187:A,a<472:A,a>860:A,A}
df{s>2631:A,A}
gqg{a>232:R,R}
qns{m>1809:nf,a>3526:zjq,m<1690:msm,R}
cp{m<755:A,a<1604:R,a<2017:R,A}
qmv{x<846:A,R}
bc{m>889:R,s<1465:R,hvg}
ht{a>685:pxs,vc}
hpt{x<2157:dbc,a<3716:vk,s>281:A,A}
xrh{x>3051:ld,x<2974:A,s<625:R,R}
tp{s<1858:A,A}
tcx{s<3127:R,x<705:A,m<1138:A,A}
vmx{x<2184:A,a>2696:zx,a<2659:A,R}
mg{m>2756:R,A}
zh{a<3910:R,A}
kbk{m>444:A,s<1576:R,m>387:dz,kfx}
nzq{a<2309:R,nkc}
pm{a<1302:A,A}
gfj{s>1127:A,m>840:R,m>406:A,A}
pq{s>2315:prd,x>3516:msc,m>638:nvr,mrf}
vg{a>92:A,A}
lsk{x>883:A,R}
xjr{m>3705:A,m<3445:A,A}
mdp{s>2716:R,m>2326:A,R}
ng{a<902:bzs,s>3611:jkr,m>3139:bzf,mxr}
mkc{a>3147:kb,ss}
vn{x>1404:A,m>2663:nls,s>2069:A,A}
mnb{x<657:tbc,x<1083:hzn,x<1315:rvv,bvx}
gr{a<2816:A,gvp}
kpt{x<2223:R,x>2355:R,m>826:A,R}
kq{m<686:A,x<1726:A,A}
krq{a>3559:R,A}
vrc{x>1988:kpt,x<1867:kq,A}
lr{a>877:R,a<672:R,s<1840:A,R}
kpq{x<2274:A,m<1226:A,R}
lz{m>410:A,s<3265:R,A}
gq{s<734:A,A}
kgj{s<940:R,R}
jzf{a<494:szr,dxx}
dxl{a<240:A,s<3664:R,a>393:A,R}
kj{m>1586:A,s<1432:A,A}
zv{s<2784:R,m<3845:A,R}
mmc{m<489:A,x>800:cp,x<492:A,lv}
rfj{x<2731:R,a<932:R,R}
gt{a>535:A,m>2660:R,dxl}
xz{s<919:A,a>3375:R,a<3323:R,R}
msm{x<1902:A,x>2051:R,R}
kv{x<3257:mdp,pz}
hc{m<981:R,m>1233:vcc,A}
svl{m>2596:R,m<1427:A,s<2457:R,R}
jbk{x>2665:R,fdg}
mnn{x>3181:R,a<2055:R,R}
pp{s>379:R,prn}
zd{s>838:qjv,vj}
bqk{a<659:A,R}
lxx{s>1514:R,s<1107:R,A}
rr{m>917:A,A}
qb{m<866:A,x<3264:A,A}
gpz{m<586:A,x<2959:vbr,psk}
nmb{m<3444:R,x<3463:gxq,fg}
dh{s>1463:R,m<1939:R,x<2802:A,R}
dl{x>3628:ms,a<2300:R,m>972:R,rb}
qqk{a>342:sm,m<1336:vrc,m>3048:sqp,xgf}
hl{a<1602:qk,hb}
bx{x>1180:R,x>778:A,a>3924:R,A}
zmh{a>426:A,a>282:A,s>1983:R,R}
zjp{s<2722:R,a<528:R,A}
tpx{m>3219:R,m<2950:A,a<1253:R,R}
klk{m>3694:A,x<183:R,A}
rz{a<3506:lnz,cgx}
bl{s<1061:A,R}
rzl{x>2887:A,s<1195:A,a>3315:A,R}
gjm{s>1424:A,R}
qvp{m<250:R,x<3365:cv,lz}
ll{m>1291:km,x>1101:R,tcx}
zdd{x>950:A,s<3747:R,s>3895:R,R}
pk{s>2497:R,A}
jbq{a>150:R,x<1869:A,s>3035:A,A}
jbg{m>1413:fpl,m>832:bgs,jxk}
xsq{a<3129:qq,m<1811:bj,rpz}
bk{m<801:R,s<1388:R,x>3521:A,A}
vh{m>1098:R,qb}
cf{x>588:R,m<1337:A,x>456:R,R}
cm{x<3470:R,a<767:R,a<841:R,R}
hgl{a<2694:A,x>2481:fzb,s<2721:nvl,R}
ln{s>1320:R,s>587:R,A}
fxr{x>2433:R,a<402:R,x>2425:R,R}
jxk{x>2962:A,A}
hjx{a<1824:A,a>2071:R,A}
ph{s>1228:R,x<3787:lp,m<1465:gq,tv}
gqt{m>3165:gjm,x>1383:xb,m>2542:R,pbs}
dht{a>227:A,A}
txc{x<3296:bv,x<3371:xr,kg}
prd{a>3385:pc,m<586:qvp,vh}
lv{s<2096:R,s>3093:R,a<1943:R,A}
in{a>2381:lqg,kt}
nnc{x<768:R,a<909:A,R}
jck{x>3539:R,A}
kmr{a<534:A,x>695:R,a>784:A,R}
km{x<1307:A,R}
lnb{x<1064:btd,ht}
fvf{x<1348:R,a>622:R,np}
nt{s<3461:R,s>3804:A,A}
rnf{m<3315:A,m>3648:R,R}
rbp{m>1386:dh,x<2829:A,a<2063:xbm,bk}
mh{a<3931:A,a<3977:A,R}
gxx{s>2790:A,m>3143:R,A}
mdd{a>3604:jhm,a>3476:lf,x<2639:qh,pq}
vnz{a>3562:gh,m<899:tc,ll}
hdq{s<2919:A,R}
czc{a<3340:R,A}
hsz{s>1716:R,m<3459:R,R}
sk{m<1435:A,m>1514:A,A}
rlm{s>2276:A,x<3215:R,A}
fm{s<3035:A,a<721:A,A}
qc{x>1032:R,s>3491:A,x<472:R,R}
ks{m>878:hxf,a>3523:xkl,m<331:rh,R}
pbs{a<1399:A,x>611:R,R}
pz{s>2498:zns,x>3535:R,m>2357:qzt,R}
kn{a<2476:R,a>2568:A,R}
jjx{s<1082:A,x>1394:R,a<3796:R,A}
bpr{x<2816:A,a<2100:R,a>2147:R,R}
nbq{s>827:R,x<811:A,R}
jvd{a<3414:A,x<3179:tbm,s<1179:rtb,A}
jfh{x>2953:jck,rf}
xbm{a<2003:R,m>805:R,A}
mxr{m<2849:A,s<3388:R,qc}
qf{s<1147:khp,m>3428:A,a<3755:A,cvb}
kc{x>1142:R,s>808:A,A}
mz{x>2329:A,A}
jtq{a>3533:nc,x<2279:gz,tmn}
xkl{s<3498:R,x<3655:R,m>579:A,R}
dk{m<2597:msd,s>3101:vbc,hds}
pmg{x<982:R,x<1279:A,x>1466:A,R}
sxq{x<522:R,R}
xtm{x<2736:A,m>1180:A,R}
jhm{x>2234:hxh,xjp}
dkd{a<3547:R,s>3418:R,m<205:A,A}
prf{x>104:R,s<361:R,a<175:R,R}
rtb{a>3441:A,x<3362:A,R}
xk{x<2496:tlq,dxt}
tmn{m<683:R,A}
ddg{s<3705:A,s>3809:R,A}
tn{a>3545:jx,x>1940:R,a<3426:xz,tqn}
jc{s>401:A,A}
zns{m>1441:A,R}
sd{x>1272:R,m>3566:R,A}
hvg{m<504:A,s>1752:A,A}
hzr{s<1668:A,R}
lk{a>356:vbt,s>3501:A,hfr}
dpb{m>3385:A,x>666:A,R}
hgt{a>433:jdh,sd}
rf{x>2598:lm,m<2430:xkc,hjx}
mls{a<3004:pr,a>3113:R,a>3043:A,A}
dmg{a>2964:R,s<1321:A,x>964:A,R}
dn{s>1740:A,m>3131:R,A}
js{m>950:cg,m<324:A,bvb}
np{m<3013:R,m>3155:R,R}
kp{s<3049:jbk,a<3841:shn,x>1423:cq,pjs}
vmm{s<1649:qmm,m<2417:gsr,rdr}
kh{s<1884:A,m>825:A,a>3341:A,A}
jnh{a>2750:R,a>2615:R,xll}
pj{x>623:jbc,x>325:R,x>190:zhz,ljt}
sr{m>754:R,R}
xgf{x<2091:jbq,m<2015:R,s>3106:A,R}
bfv{s<2825:R,m<2639:A,a<866:lfc,A}
cmt{x<3271:A,a>3416:hsz,s<1910:czc,A}
sz{m>2962:A,x<403:R,s<608:R,A}
mzt{x>1079:R,m>748:R,x<883:A,A}
mfx{s>2396:A,x<2183:R,R}
bpn{m<1985:A,A}
sgg{s>3658:A,A}
rt{s<3055:R,x<3432:A,x>3756:R,R}
mmg{a>437:R,x<716:R,a>227:R,A}
fsj{a<1063:R,m<1035:R,a>1107:A,A}
pv{m>746:A,x>3612:R,a>3447:A,R}
pkl{x>3867:A,x<3785:A,x>3823:A,A}
rds{m>2024:rlm,x<3330:frb,A}
frq{m<3236:A,R}
qgb{m<2650:A,s<1803:dn,s<1901:A,rmc}
tv{a<2788:R,s>752:A,x<3927:R,A}
dxt{s>3004:dvh,kv}
fj{x>1215:A,x>565:R,R}
vcc{m<1348:A,x<3921:R,A}
drv{s<819:R,A}
lf{s<2369:jtq,x>2551:md,a<3528:rz,vnz}
gsr{a<494:A,x>1443:lr,m>1606:nnc,xjl}
vdk{x<3083:A,A}
lsf{m<3737:A,s<141:A,A}
hb{m<2003:kbz,ctp}
cc{m>736:hlm,R}
xrk{m>425:R,s>2668:A,A}
sck{m>1720:R,s>2392:fxd,sb}
sb{x<1612:R,m<1648:R,R}
bsz{s<2798:xrk,x<559:pqg,dmm}
msd{s>2998:ljz,m<1357:krn,m<1917:kbn,jzf}
ljk{x>1194:R,x<662:R,R}
jsc{a<349:R,s>319:A,m>1497:A,A}
hnp{s>1977:jfh,a<1962:hl,a<2222:zz,vbg}
zx{m<2818:R,R}
zlf{a<446:R,x>1241:R,R}
vj{m<3222:hpt,m<3705:ffv,m<3883:bq,ptm}
cvb{m<3215:R,A}
hzn{m>3285:R,m<2851:mg,a>245:mbr,nt}
pr{m>2749:A,s<3353:R,R}
zjj{s<1735:jbg,a<236:kxv,s>1917:mdq,mt}
kbz{m>1072:R,R}
frs{m<3639:A,A}
qpq{s>3340:A,A}
zhz{s>2384:A,a<3425:A,R}
vp{a<1494:gqt,x<1390:xfs,bh}
xn{x>1056:cdm,A}
kxv{m>2357:A,s<1937:A,A}
jct{m<3233:A,a>3464:R,A}
pcz{a<3458:A,x>684:qhk,xff}
tfm{s<3188:R,s>3536:ddg,m<769:A,hk}
plf{s>603:A,a>529:A,m<873:R,R}
cl{a<672:A,m>3434:R,R}
dm{x>2258:mf,hp}
tc{m<571:dkd,x>1248:tl,a<3550:fv,R}
cg{s<1749:R,m>1649:A,R}
nh{s>2067:tfm,cb}
gd{m>2813:mxm,s<1973:clg,zlv}
zpf{s>611:A,x>2005:A,a>3586:R,R}
crx{m>1372:cm,x>3544:mcm,s<1761:mfm,R}
pvx{x>412:sxq,tlh}
hxf{m<1165:R,s<3478:R,x<3387:R,A}
ld{s<541:R,R}
hvb{m>2487:xf,R}
bgs{m>1139:A,s<1410:R,a<247:R,A}
csv{m<1406:kk,a<727:njp,x>2888:xrh,fdn}
vd{x<712:R,s>3036:R,R}
bvm{m<1633:A,a>3264:R,R}
xfs{s<1729:jjp,s>3009:R,a<1591:rnf,R}
lt{a<2497:df,s>2781:vv,m<1694:mfx,ct}
rbh{x<2891:A,s>1660:A,a<2615:kn,A}
mp{s<885:rl,a>2713:gr,lbd}
knn{s>1107:ztn,x<2166:lnb,vt}
dlk{x>2261:A,x>2129:R,x>2072:R,A}
dgb{m<1995:nq,a>1664:rd,a<1348:gd,vp}
mv{a<268:vg,x<2362:A,s>559:R,vqn}
kt{a>1146:ps,s<2172:knn,x>1653:xk,dk}
kjt{m>2495:cl,x<2239:dc,mx}
nvl{x>1280:R,s>2377:R,R}
bn{a>2486:R,x<2690:sh,A}
jdh{a>842:A,x>1214:A,m>3586:R,A}
qcz{s>3420:R,A}
clg{s<688:R,vl}
chx{m>848:A,A}
sg{x>651:A,A}
zlv{s<2655:A,s>3252:sn,s<2901:A,R}
bh{a>1576:tr,a<1546:R,x<1711:fvr,kpv}
fkf{x>546:A,ksm}
dxx{a>905:A,A}
jt{x>1660:R,R}
gvv{x<3220:A,A}
blj{s>2421:pmg,x<842:fkf,m<3248:fvf,hgt}
xf{x<3424:R,x<3546:A,s>839:R,A}
kbn{x<963:pk,fsx}
ljz{a>575:zfb,lk}
qqx{a<1756:R,s<2864:A,a<2156:A,R}
dls{a<3555:A,x<3232:A,m<1998:bl,R}
msz{a<3499:qnq,s>2353:krq,a>3546:A,A}
btd{x>678:lc,a>482:pvx,x<257:mhh,mzl}
tjh{s<2953:gxx,kmr}
psk{x<3637:R,R}
xl{s>2768:R,m>3161:R,zjp}
zg{a<2914:R,a<2920:A,R}
ch{a>3595:kp,m<2854:fqr,s<2250:szc,mn}
qnq{x<3299:A,m<1979:R,a>3470:R,R}
fpl{m<2606:R,a<272:A,x>3396:R,A}
ct{s>2351:A,R}
rc{s<587:A,R}

{x=30,m=1468,a=2095,s=832}
{x=291,m=42,a=1683,s=2618}
{x=304,m=174,a=1204,s=1552}
{x=519,m=19,a=8,s=2512}
{x=351,m=650,a=1814,s=479}
{x=1888,m=2669,a=304,s=1144}
{x=1577,m=787,a=449,s=2384}
{x=439,m=189,a=468,s=1163}
{x=1735,m=1839,a=514,s=978}
{x=677,m=2379,a=279,s=3588}
{x=2535,m=864,a=1,s=144}
{x=2201,m=13,a=384,s=184}
{x=661,m=609,a=223,s=1274}
{x=1253,m=2548,a=106,s=2549}
{x=357,m=184,a=491,s=828}
{x=288,m=1049,a=256,s=2296}
{x=1995,m=2523,a=1487,s=659}
{x=2028,m=445,a=1788,s=1788}
{x=1387,m=2372,a=273,s=22}
{x=48,m=2361,a=2070,s=2}
{x=2091,m=45,a=222,s=3005}
{x=1460,m=105,a=1024,s=1152}
{x=176,m=2650,a=462,s=320}
{x=2020,m=185,a=47,s=987}
{x=1624,m=564,a=252,s=42}
{x=2440,m=177,a=1593,s=445}
{x=78,m=504,a=3709,s=2}
{x=405,m=457,a=1543,s=732}
{x=1098,m=450,a=176,s=331}
{x=270,m=2383,a=1434,s=561}
{x=732,m=245,a=2194,s=157}
{x=437,m=1041,a=345,s=969}
{x=889,m=1480,a=2534,s=1197}
{x=1096,m=310,a=1996,s=18}
{x=1627,m=61,a=472,s=260}
{x=20,m=51,a=135,s=565}
{x=1800,m=894,a=194,s=708}
{x=12,m=2267,a=2116,s=299}
{x=3053,m=311,a=9,s=90}
{x=1139,m=1033,a=373,s=1042}
{x=873,m=997,a=1511,s=581}
{x=1888,m=435,a=325,s=1121}
{x=2255,m=634,a=1674,s=521}
{x=109,m=344,a=370,s=1376}
{x=37,m=1166,a=876,s=342}
{x=491,m=55,a=1324,s=313}
{x=435,m=125,a=1458,s=2500}
{x=270,m=1685,a=2144,s=133}
{x=2206,m=601,a=1892,s=2193}
{x=2000,m=33,a=1963,s=146}
{x=582,m=556,a=67,s=203}
{x=473,m=2514,a=1622,s=645}
{x=3233,m=100,a=301,s=1136}
{x=3125,m=1441,a=116,s=2545}
{x=60,m=1107,a=1346,s=120}
{x=1799,m=310,a=486,s=2576}
{x=614,m=3421,a=233,s=742}
{x=374,m=171,a=636,s=1310}
{x=1578,m=106,a=2625,s=2158}
{x=1584,m=3382,a=35,s=24}
{x=342,m=2716,a=639,s=107}
{x=1060,m=430,a=1286,s=857}
{x=21,m=1364,a=3339,s=505}
{x=94,m=733,a=1353,s=103}
{x=867,m=103,a=705,s=1848}
{x=1903,m=12,a=1022,s=690}
{x=656,m=1527,a=1847,s=400}
{x=1992,m=2053,a=188,s=1163}
{x=1499,m=122,a=575,s=799}
{x=132,m=556,a=1274,s=623}
{x=215,m=1,a=985,s=905}
{x=863,m=3,a=2174,s=588}
{x=483,m=40,a=1438,s=604}
{x=282,m=479,a=331,s=441}
{x=335,m=55,a=552,s=832}
{x=972,m=1415,a=2113,s=72}
{x=1218,m=1772,a=1019,s=3715}
{x=2111,m=1344,a=175,s=1745}
{x=1938,m=1538,a=846,s=2248}
{x=12,m=49,a=1178,s=256}
{x=3341,m=558,a=257,s=2343}
{x=1134,m=579,a=530,s=929}
{x=2490,m=3368,a=1767,s=2483}
{x=2770,m=2724,a=48,s=1316}
{x=404,m=81,a=2311,s=1219}
{x=3758,m=1010,a=247,s=2868}
{x=1036,m=818,a=34,s=1522}
{x=1567,m=916,a=3743,s=1340}
{x=56,m=197,a=2229,s=449}
{x=1362,m=933,a=399,s=168}
{x=64,m=1299,a=133,s=276}
{x=400,m=2046,a=2616,s=604}
{x=76,m=1689,a=1694,s=1157}
{x=3495,m=421,a=318,s=141}
{x=1946,m=1287,a=1537,s=781}
{x=3455,m=116,a=1096,s=2497}
{x=340,m=28,a=1653,s=756}
{x=835,m=1199,a=2735,s=3386}
{x=1360,m=331,a=1525,s=447}
{x=1897,m=54,a=1499,s=785}
{x=1397,m=137,a=3133,s=73}
{x=404,m=618,a=110,s=2929}
{x=2181,m=1486,a=200,s=267}
{x=1393,m=459,a=978,s=3242}
{x=20,m=732,a=717,s=901}
{x=122,m=1659,a=1380,s=1062}
{x=88,m=280,a=830,s=3223}
{x=1849,m=299,a=914,s=469}
{x=332,m=1083,a=69,s=101}
{x=29,m=73,a=294,s=122}
{x=643,m=50,a=1870,s=542}
{x=432,m=3087,a=1676,s=540}
{x=1076,m=133,a=488,s=75}
{x=928,m=590,a=41,s=1120}
{x=2118,m=433,a=15,s=108}
{x=503,m=850,a=936,s=454}
{x=1413,m=2695,a=2012,s=302}
{x=605,m=1234,a=3678,s=1865}
{x=486,m=265,a=1297,s=567}
{x=339,m=1762,a=2151,s=301}
{x=1791,m=1541,a=649,s=433}
{x=1544,m=232,a=168,s=1350}
{x=1341,m=727,a=333,s=2885}
{x=1886,m=193,a=1203,s=1036}
{x=68,m=82,a=429,s=2446}
{x=495,m=1587,a=677,s=859}
{x=1343,m=197,a=24,s=3101}
{x=349,m=292,a=711,s=1088}
{x=104,m=320,a=143,s=2128}
{x=963,m=771,a=69,s=668}
{x=1064,m=661,a=1968,s=1494}
{x=1014,m=678,a=2934,s=801}
{x=2602,m=347,a=1408,s=205}
{x=864,m=1564,a=1397,s=102}
{x=1619,m=1208,a=948,s=83}
{x=809,m=7,a=60,s=1191}
{x=2038,m=114,a=3360,s=1076}
{x=95,m=2987,a=426,s=6}
{x=381,m=1444,a=761,s=2737}
{x=1015,m=1787,a=234,s=1468}
{x=278,m=553,a=1181,s=560}
{x=320,m=1392,a=1290,s=477}
{x=319,m=2859,a=222,s=1168}
{x=1,m=877,a=1309,s=707}
{x=1955,m=1966,a=708,s=1380}
{x=73,m=57,a=395,s=130}
{x=1976,m=3300,a=1230,s=3208}
{x=1936,m=1835,a=189,s=1643}
{x=1870,m=23,a=105,s=3217}
{x=934,m=1711,a=356,s=1080}
{x=89,m=509,a=177,s=2545}
{x=1482,m=294,a=354,s=53}
{x=584,m=1489,a=473,s=2022}
{x=1763,m=41,a=868,s=540}
{x=41,m=1101,a=1061,s=1343}
{x=1482,m=497,a=1497,s=1471}
{x=2955,m=25,a=1569,s=1167}
{x=238,m=875,a=1452,s=169}
{x=228,m=1486,a=7,s=1355}
{x=803,m=3175,a=1845,s=882}
{x=2991,m=1441,a=1185,s=939}
{x=1005,m=2013,a=711,s=1203}
{x=759,m=548,a=1201,s=1640}
{x=1868,m=935,a=1333,s=1135}
{x=503,m=710,a=34,s=611}
{x=595,m=865,a=2702,s=2969}
{x=10,m=1488,a=616,s=341}
{x=2304,m=1845,a=72,s=1269}
{x=2233,m=804,a=2966,s=1606}
{x=30,m=803,a=353,s=937}
{x=313,m=1348,a=2274,s=648}
{x=1250,m=632,a=222,s=595}
{x=696,m=1498,a=314,s=497}
{x=910,m=602,a=3207,s=2059}
{x=1026,m=1378,a=355,s=910}
{x=2862,m=3299,a=1324,s=1437}
{x=136,m=10,a=7,s=1813}
{x=388,m=1008,a=583,s=1480}
{x=439,m=44,a=2516,s=427}
{x=242,m=1041,a=2178,s=408}
{x=2245,m=291,a=1358,s=694}
{x=198,m=2155,a=365,s=327}
{x=271,m=24,a=332,s=3150}
{x=3419,m=1641,a=48,s=2530}
{x=1248,m=166,a=2678,s=99}
{x=286,m=139,a=2293,s=356}
{x=1201,m=35,a=612,s=1236}
{x=549,m=115,a=175,s=241}
{x=991,m=1606,a=718,s=2651}
{x=93,m=2205,a=835,s=206}
{x=719,m=64,a=2252,s=2722}
{x=2468,m=1167,a=92,s=674}
{x=202,m=92,a=1905,s=1400}
{x=128,m=526,a=385,s=666}
{x=102,m=1285,a=166,s=687}
{x=650,m=2611,a=2686,s=10}
{x=1307,m=2221,a=489,s=884}
{x=902,m=961,a=9,s=309}
{x=629,m=1339,a=174,s=3762}
{x=282,m=69,a=3507,s=119}`,
    output: 131550418841958
  });

  Utils.check(solve, dataset, "19b");
})();
