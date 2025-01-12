(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var json = { "/": {} };
    var curDir = json["/"];
    var fileSystem = 70000000;
    var need = 30000000;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var params = line.split(" ");
      if (params[0] == "$") {
        if (params[1] == "cd") {
          if (params[2] == "/") {
            curDir = json["/"];
          } else if (params[2] == "..") {
            curDir = curDir["parent"];
          } else {
            curDir = curDir[params[2]];
          }
        }
      } else if (params[0] == "dir") {
        curDir[params[1]] = { parent: curDir };
      } else {
        curDir[params[1]] = Number(params[0]);
      }
    }
    calcSums(json);

    var freeSpace = fileSystem - json["/"]["totalSum"];
    var freeNeed = need - freeSpace;
    return minFolder(json, freeNeed);
  }

  function calcSums(json) {
    var s = 0;
    for (var el in json) {
      if (el != "parent") {
        if (typeof json[el] == "object") {
          s += calcSums(json[el]);
        } else {
          s += json[el];
        }
      }
    }
    json["totalSum"] = s;
    return s;
  }

  function minFolder(json, freeNeed) {
    var min = Infinity;
    for (var el in json) {
      if (el != "parent" && typeof json[el] == "object") {
        min = Math.min(min, minFolder(json[el], freeNeed));
      }
    }
    if (json["totalSum"] >= freeNeed) {
      min = Math.min(min, json["totalSum"]);
    }
    return min;
  }

  var dataset = [];

  dataset.push({
    input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
    output: 24933642
  });

  dataset.push({
    input: `$ cd /
$ ls
dir cgw
dir fbhz
dir lvrzvt
224312 vngq
dir vwlps
$ cd cgw
$ ls
dir jpmf
dir rfb
dir tjtccqtm
$ cd jpmf
$ ls
dir ncfcchsz
dir rfb
dir tjtccqtm
$ cd ncfcchsz
$ ls
205103 ntpprbt.pvt
$ cd ..
$ cd rfb
$ ls
331667 tjtccqtm.qzv
$ cd ..
$ cd tjtccqtm
$ ls
dir jvbb
175277 tpc
304201 vtgzj.hnb
69381 wnq.npz
dir zgpb
$ cd jvbb
$ ls
dir fbhz
$ cd fbhz
$ ls
dir wjj
$ cd wjj
$ ls
255580 mgft
$ cd ..
$ cd ..
$ cd ..
$ cd zgpb
$ ls
57622 bgpm.gqf
44482 jvbb
156048 tpc
$ cd ..
$ cd ..
$ cd ..
$ cd rfb
$ ls
25370 gjptbqsm.mvm
$ cd ..
$ cd tjtccqtm
$ ls
359767 pcpqw.wvn
9514 wplftrb
$ cd ..
$ cd ..
$ cd fbhz
$ ls
dir fbhz
328535 fbhz.fbd
51958 fbhz.fbp
37508 fcjgf.crj
dir llfdghs
dir ncfcchsz
222206 srvhswd.mcg
dir tbnq
62795 vtgzj.hnb
dir zhj
$ cd fbhz
$ ls
363951 psm.lsv
182275 sssdht.pqt
44558 zvntd.hvr
$ cd ..
$ cd llfdghs
$ ls
126845 flg
dir hsz
dir mlvl
199117 mzz.pbj
141875 srvhswd.mcg
dir tvtqs
309288 wrbrmh
$ cd hsz
$ ls
dir fbhz
72585 mwlqg.rfg
265089 ncfcchsz.cgj
dir qsvh
202721 vtgzj.hnb
$ cd fbhz
$ ls
163444 nsrgjtl.dts
$ cd ..
$ cd qsvh
$ ls
260300 srvhswd.mcg
dir tjtccqtm
$ cd tjtccqtm
$ ls
311932 dhcmbc.ljq
$ cd ..
$ cd ..
$ cd ..
$ cd mlvl
$ ls
55902 rfb.jnd
$ cd ..
$ cd tvtqs
$ ls
dir fbhz
dir hgr
dir njvsjmmj
dir tjtccqtm
356368 tpc
dir vgj
$ cd fbhz
$ ls
196969 ncfcchsz.tfn
176294 wzfchcvz.wwv
$ cd ..
$ cd hgr
$ ls
dir tjtccqtm
$ cd tjtccqtm
$ ls
360282 vtgzj.hnb
$ cd ..
$ cd ..
$ cd njvsjmmj
$ ls
dir gbrjnrh
$ cd gbrjnrh
$ ls
270925 psm.lsv
$ cd ..
$ cd ..
$ cd tjtccqtm
$ ls
dir nlqt
dir tjtccqtm
47866 vtgzj.hnb
144250 zdg.brf
$ cd nlqt
$ ls
49935 tpc
$ cd ..
$ cd tjtccqtm
$ ls
178987 sgpdvcf
$ cd ..
$ cd ..
$ cd vgj
$ ls
213820 mcbph.srq
$ cd ..
$ cd ..
$ cd ..
$ cd ncfcchsz
$ ls
267915 fbhz
dir tjtccqtm
205385 zghlv.mtv
$ cd tjtccqtm
$ ls
334824 ptbdgpn.wnz
$ cd ..
$ cd ..
$ cd tbnq
$ ls
138692 dzwgs
70126 gjps.vbz
dir jvbb
dir nzl
196653 rsshtl.qlg
110016 srvhswd.mcg
217737 vngq
$ cd jvbb
$ ls
dir wshhs
dir ztrb
$ cd wshhs
$ ls
dir bpcv
285906 ntptv.hld
182940 rfb.wfd
24187 wgfmq
$ cd bpcv
$ ls
108995 ncfcchsz.rmg
304028 srvhswd.mcg
$ cd ..
$ cd ..
$ cd ztrb
$ ls
88425 pfzbdqmw
$ cd ..
$ cd ..
$ cd nzl
$ ls
dir fbhz
dir jzvvr
dir mghww
131115 qcpdd.jfb
208300 rqhtgdf.rqf
dir tnfg
$ cd fbhz
$ ls
317958 fbhz.pws
$ cd ..
$ cd jzvvr
$ ls
292945 dnqfmf.cwg
8055 mwtrbv.sfm
119001 rfb
dir srgrvcm
214676 srvhswd.mcg
$ cd srgrvcm
$ ls
dir cfwmvbjq
dir dqwwtrr
102903 grhqhm.bhm
360122 qmgtr.qmn
dir tjtccqtm
$ cd cfwmvbjq
$ ls
91385 vtgzj.hnb
$ cd ..
$ cd dqwwtrr
$ ls
151683 htg.ncm
178927 vngq
236079 vtgzj.hnb
$ cd ..
$ cd tjtccqtm
$ ls
334582 psm.lsv
$ cd ..
$ cd ..
$ cd ..
$ cd mghww
$ ls
48114 msvbqh
$ cd ..
$ cd tnfg
$ ls
172920 jhn.ghz
$ cd ..
$ cd ..
$ cd ..
$ cd zhj
$ ls
dir dqzgfcd
dir jvbb
dir ncnhjjs
$ cd dqzgfcd
$ ls
dir ppmbn
dir rfb
dir srlvzvr
225107 srvhswd.mcg
353094 vngq
dir vtdvdgdv
297817 vtgzj.hnb
dir vwhnlp
dir wsmvrf
$ cd ppmbn
$ ls
6037 vngq
$ cd ..
$ cd rfb
$ ls
293304 nzhchfrv.nst
194726 rfb.gfs
287537 tpc
137637 vtgzj.hnb
dir wdm
$ cd wdm
$ ls
61473 psm.lsv
152521 srvhswd.mcg
$ cd ..
$ cd ..
$ cd srlvzvr
$ ls
dir dlp
274123 whc.cjc
$ cd dlp
$ ls
dir rfpgt
$ cd rfpgt
$ ls
281038 jvbb.mnq
312481 mmjcgss
186883 vdpq.qzn
194336 wvjrhdq.llv
$ cd ..
$ cd ..
$ cd ..
$ cd vtdvdgdv
$ ls
dir rfb
dir tjtccqtm
$ cd rfb
$ ls
196456 dprdjqnp.wqc
67720 psm.lsv
820 rfb.jrh
170351 tpc
$ cd ..
$ cd tjtccqtm
$ ls
269007 bsrvltnf
$ cd ..
$ cd ..
$ cd vwhnlp
$ ls
dir fbhz
30697 ncfcchsz.dlh
dir rfb
dir tjtccqtm
185165 vtgzj.hnb
$ cd fbhz
$ ls
dir dstmnnd
65237 dvhhwv.zqz
156937 gtbzgp
dir jvbb
dir ncfcchsz
dir wdpqfl
$ cd dstmnnd
$ ls
334642 grbvbw
dir jvbb
$ cd jvbb
$ ls
187235 bgrhrn.wmt
$ cd ..
$ cd ..
$ cd jvbb
$ ls
dir dcszm
280304 fbhz.bfq
161981 jrgqlf
dir mvcfwwlm
194182 psm.lsv
dir rfb
40787 zrscw
$ cd dcszm
$ ls
178161 gfc.nss
$ cd ..
$ cd mvcfwwlm
$ ls
284005 hvzzlc
$ cd ..
$ cd rfb
$ ls
295068 fbhz.ccj
dir jvbb
73713 mqs
dir ncfcchsz
99417 psps.pnc
dir rhmmtvv
$ cd jvbb
$ ls
62151 hlblqv.cbq
318565 jvbb.rgv
230913 ppq.chd
$ cd ..
$ cd ncfcchsz
$ ls
133380 srvhswd.mcg
$ cd ..
$ cd rhmmtvv
$ ls
270217 qms.zrf
$ cd ..
$ cd ..
$ cd ..
$ cd ncfcchsz
$ ls
dir bzpz
dir fmhdlm
dir wqctddqc
$ cd bzpz
$ ls
270136 tpc
271633 vtgzj.hnb
$ cd ..
$ cd fmhdlm
$ ls
273720 mgf.pdm
23453 rfb.lvs
49685 tld.vbh
$ cd ..
$ cd wqctddqc
$ ls
dir ncfcchsz
$ cd ncfcchsz
$ ls
111237 vqvs
$ cd ..
$ cd ..
$ cd ..
$ cd wdpqfl
$ ls
dir fmrclsn
258435 fzgtz.bhg
dir mwwmbpgr
dir nsf
dir tfpqqjw
118118 tjtccqtm
219688 tjtccqtm.tst
$ cd fmrclsn
$ ls
271116 gzbqm.tnj
216909 jvbb
167454 qnfdzw.slr
252140 tsrzcnjb
$ cd ..
$ cd mwwmbpgr
$ ls
dir jvbb
dir rqfqbw
$ cd jvbb
$ ls
44631 tjtccqtm
$ cd ..
$ cd rqfqbw
$ ls
dir cqpwhrtp
$ cd cqpwhrtp
$ ls
305787 vjndql.qqv
$ cd ..
$ cd ..
$ cd ..
$ cd nsf
$ ls
211811 ggztzqp
69628 vtgzj.hnb
$ cd ..
$ cd tfpqqjw
$ ls
295011 ncfcchsz.dnn
88554 psm.lsv
$ cd ..
$ cd ..
$ cd ..
$ cd rfb
$ ls
51633 ncfcchsz
318667 psm.lsv
49231 qnsldrn
240239 sdcmgc.gdt
dir tgcr
121575 vtgzj.hnb
$ cd tgcr
$ ls
198742 rfb.nsl
$ cd ..
$ cd ..
$ cd tjtccqtm
$ ls
dir vnwpw
$ cd vnwpw
$ ls
338543 htwmhv
18782 lvwjtn.dcz
212005 ncfcchsz
dir rfb
dir tjhvvl
95069 vtgzj.hnb
117084 wsfvhn
$ cd rfb
$ ls
89621 fbhz.vnm
$ cd ..
$ cd tjhvvl
$ ls
262643 clmfhnct.wrt
dir fbhz
101520 ncfcchsz
169089 vtf.bmc
72983 zgjw.wpn
74431 zlwvcwn.gzf
$ cd fbhz
$ ls
213519 zpvhg
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd wsmvrf
$ ls
dir ccbw
dir nqjpdlc
253007 rfb
dir sjgjgwb
dir zprqg
$ cd ccbw
$ ls
dir crjsgdv
dir dthrqpvv
dir ncfcchsz
dir ppqhd
dir tjtccqtm
dir ztsmqn
$ cd crjsgdv
$ ls
dir jgstsj
169620 vngq
$ cd jgstsj
$ ls
251288 vtgzj.hnb
$ cd ..
$ cd ..
$ cd dthrqpvv
$ ls
234510 fldrtqh.cbq
$ cd ..
$ cd ncfcchsz
$ ls
177247 dbt.fsb
$ cd ..
$ cd ppqhd
$ ls
21458 psm.lsv
20155 tjtccqtm.rsn
$ cd ..
$ cd tjtccqtm
$ ls
71907 psm.lsv
$ cd ..
$ cd ztsmqn
$ ls
124096 gjzgbrj.sjn
$ cd ..
$ cd ..
$ cd nqjpdlc
$ ls
dir jvbb
dir ltwl
143570 lwcgls.qvp
$ cd jvbb
$ ls
266605 qvwfhw.qvh
$ cd ..
$ cd ltwl
$ ls
dir lrgjbbn
$ cd lrgjbbn
$ ls
68291 tjtccqtm.rlr
$ cd ..
$ cd ..
$ cd ..
$ cd sjgjgwb
$ ls
265194 ddv
dir ghqtfhcz
dir jwzmtqff
15930 mzgtdwsg
$ cd ghqtfhcz
$ ls
dir gtlfvjpg
$ cd gtlfvjpg
$ ls
dir vwz
$ cd vwz
$ ls
252002 tpc
$ cd ..
$ cd ..
$ cd ..
$ cd jwzmtqff
$ ls
238465 gsr.mrj
332865 gzfcfqn.lbd
$ cd ..
$ cd ..
$ cd zprqg
$ ls
148532 nzjwc
179858 plznjhb
70176 tpc
$ cd ..
$ cd ..
$ cd ..
$ cd jvbb
$ ls
dir bnllsz
dir cqdr
293380 hrszhbzc.rrq
253762 jvbb
dir jwn
251152 lchdqwvg
dir lrh
dir nfbhj
dir nnflrw
dir rfb
293144 srvhswd.mcg
104936 vtgzj.hnb
$ cd bnllsz
$ ls
216397 vngq
$ cd ..
$ cd cqdr
$ ls
272746 psm.lsv
81840 tpc
$ cd ..
$ cd jwn
$ ls
224049 fhl.mrh
342246 tpc
233666 zmbg
$ cd ..
$ cd lrh
$ ls
139676 mcdv
$ cd ..
$ cd nfbhj
$ ls
49779 rfb.tnm
$ cd ..
$ cd nnflrw
$ ls
56516 hgtjdb
79167 psm.lsv
$ cd ..
$ cd rfb
$ ls
65765 mcdv
$ cd ..
$ cd ..
$ cd ncnhjjs
$ ls
dir jvbb
276470 ncfcchsz
273860 vngq
$ cd jvbb
$ ls
9420 psmrjhmp.dfj
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd lvrzvt
$ ls
26201 ncfcchsz.zrn
267647 ncppww
dir qzddwnm
345874 tpc
115177 vtgzj.hnb
dir zzwqlz
$ cd qzddwnm
$ ls
214814 psm.lsv
$ cd ..
$ cd zzwqlz
$ ls
181990 pcz.ctb
258280 tjtccqtm
37664 vtgzj.hnb
$ cd ..
$ cd ..
$ cd vwlps
$ ls
dir fbhz
dir jvbb
347635 psm.lsv
101891 pzzt.prc
dir rfb
dir tjtccqtm
322963 tjtccqtm.swf
$ cd fbhz
$ ls
dir fbhz
$ cd fbhz
$ ls
dir mnnzbnl
115 zhgrzjt.hlq
$ cd mnnzbnl
$ ls
624 vngq
$ cd ..
$ cd ..
$ cd ..
$ cd jvbb
$ ls
149547 jtng.qfh
84714 wqqnqpc.crj
$ cd ..
$ cd rfb
$ ls
dir ddcjgrdb
26416 jvbb.nbg
dir lwjvv
dir mtzbmlnp
dir nsq
42884 pmzdjzmv
305628 sgc
109079 srvhswd.mcg
303802 tpc
$ cd ddcjgrdb
$ ls
dir jvbb
dir rfb
$ cd jvbb
$ ls
348073 jgwzvs
$ cd ..
$ cd rfb
$ ls
dir tjtccqtm
119113 tpc
$ cd tjtccqtm
$ ls
357579 rfb
124868 srvhswd.mcg
$ cd ..
$ cd ..
$ cd ..
$ cd lwjvv
$ ls
212416 fbglfwjn
dir hhjlvjds
158555 tpc
dir tvqng
287589 vngq
dir zcn
$ cd hhjlvjds
$ ls
57297 przml.gfn
173735 psm.lsv
245882 srvhswd.mcg
244645 tjtccqtm.gnh
289149 vngq
dir zmzj
$ cd zmzj
$ ls
28824 vngq
$ cd ..
$ cd ..
$ cd tvqng
$ ls
136988 fbhz.wnl
$ cd ..
$ cd zcn
$ ls
dir czczrddv
$ cd czczrddv
$ ls
239586 zjwswstd.mdj
$ cd ..
$ cd ..
$ cd ..
$ cd mtzbmlnp
$ ls
dir fbhz
dir jvbb
231169 mnrbmhvt
dir nhfsqbb
dir sjmm
dir ttsjtcc
$ cd fbhz
$ ls
dir lhtc
dir tjtccqtm
9513 vtgzj.hnb
$ cd lhtc
$ ls
100051 fbhz.cvg
$ cd ..
$ cd tjtccqtm
$ ls
193182 psm.lsv
$ cd ..
$ cd ..
$ cd jvbb
$ ls
224879 hvswfzqc.zmc
dir rfb
202937 rflsltm.bcc
dir tjtccqtm
$ cd rfb
$ ls
238032 fbhz
dir fgctrfr
306802 jvbb
225954 ncfcchsz.lcs
dir tjtccqtm
$ cd fgctrfr
$ ls
dir dqjrndw
103974 jmmjds
233363 mqr.zhm
334730 psm.lsv
dir rbbw
281420 tjtccqtm
dir zgrrdb
$ cd dqjrndw
$ ls
295822 tpc
$ cd ..
$ cd rbbw
$ ls
dir hrwj
$ cd hrwj
$ ls
dir zlhhnwrv
$ cd zlhhnwrv
$ ls
168370 tjtccqtm.dnn
$ cd ..
$ cd ..
$ cd ..
$ cd zgrrdb
$ ls
84053 vtgzj.hnb
$ cd ..
$ cd ..
$ cd tjtccqtm
$ ls
297111 jpnzcw.srg
$ cd ..
$ cd ..
$ cd tjtccqtm
$ ls
dir jfmc
dir qwrd
dir tjtccqtm
$ cd jfmc
$ ls
dir fbhz
dir fjqnrb
dir mpc
dir ncfcchsz
139767 vtgzj.hnb
$ cd fbhz
$ ls
dir rfb
dir tqmtbvb
$ cd rfb
$ ls
304548 jhrjt
$ cd ..
$ cd tqmtbvb
$ ls
62368 vngq
$ cd ..
$ cd ..
$ cd fjqnrb
$ ls
dir qdrmjmds
dir rfb
dir sdtdrmz
$ cd qdrmjmds
$ ls
dir qscgv
dir rfb
$ cd qscgv
$ ls
173814 ncfcchsz.nch
$ cd ..
$ cd rfb
$ ls
1592 vtgzj.hnb
$ cd ..
$ cd ..
$ cd rfb
$ ls
237598 dvbnmp.bcw
$ cd ..
$ cd sdtdrmz
$ ls
43253 sqdd
$ cd ..
$ cd ..
$ cd mpc
$ ls
dir bdsnl
$ cd bdsnl
$ ls
175855 psm.lsv
$ cd ..
$ cd ..
$ cd ncfcchsz
$ ls
dir ctqnwzgn
dir dddjjbrs
dir nbnn
dir tjtccqtm
$ cd ctqnwzgn
$ ls
211637 ncfcchsz
$ cd ..
$ cd dddjjbrs
$ ls
160464 bjbdh.mtr
139283 jjgblbjc.bvn
dir lqpsr
155029 szcpzjz.vtv
$ cd lqpsr
$ ls
314159 mdzgl.jqd
$ cd ..
$ cd ..
$ cd nbnn
$ ls
218457 tpc
$ cd ..
$ cd tjtccqtm
$ ls
dir rfb
109587 tfw
dir vqsjdd
$ cd rfb
$ ls
240479 rblwfbn
$ cd ..
$ cd vqsjdd
$ ls
253970 srvhswd.mcg
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd qwrd
$ ls
dir dgf
$ cd dgf
$ ls
340237 fbsfq.mls
dir tjtccqtm
dir ttqnbdjn
$ cd tjtccqtm
$ ls
dir msgtcp
$ cd msgtcp
$ ls
245596 fbhz
$ cd ..
$ cd ..
$ cd ttqnbdjn
$ ls
dir gvll
$ cd gvll
$ ls
dir bhhzh
$ cd bhhzh
$ ls
153339 wcqpmnb.slt
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd tjtccqtm
$ ls
dir nzbzjpnl
$ cd nzbzjpnl
$ ls
72123 dzpjf.wmb
35136 ncfcchsz.qnz
234519 vhq.vrr
$ cd ..
$ cd ..
$ cd ..
$ cd ..
$ cd nhfsqbb
$ ls
109518 tqnct.jvf
51666 vngq
$ cd ..
$ cd sjmm
$ ls
263022 psm.lsv
dir qrpr
dir rfb
$ cd qrpr
$ ls
51657 tpc
$ cd ..
$ cd rfb
$ ls
185213 fllcngdc
$ cd ..
$ cd ..
$ cd ttsjtcc
$ ls
dir fbhz
dir tjbnz
$ cd fbhz
$ ls
112216 slzn.jls
$ cd ..
$ cd tjbnz
$ ls
73261 fbhz.wtd
$ cd ..
$ cd ..
$ cd ..
$ cd nsq
$ ls
93689 srvhswd.mcg
$ cd ..
$ cd ..
$ cd tjtccqtm
$ ls
232421 vngq`,
    output: 9847279
  });

  Utils.check(solve, dataset, "7b");
})();
