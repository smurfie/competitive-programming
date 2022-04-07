(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var formula = lines.pop();
    lines.pop();

    var formulas = {};

    for (var i = 0; i < lines.length; i++) {
      var ini = lines[i].split(" => ")[0];
      var end = lines[i].split(" => ")[1];
      var index = formula.indexOf(ini);
      while (index >= 0) {
        var newFormula =
          formula.substring(0, index) +
          end +
          formula.substring(index + ini.length);
        formulas[newFormula] = true;
        index = formula.indexOf(ini, index + 1);
      }
    }

    return Object.keys(formulas).length;
  }

  var dataset = [];

  dataset.push({
    input: `H => HO
H => OH
O => HH

HOH`,
    output: 4
  });

  dataset.push({
    input: `H => HO
H => OH
O => HH

HOHOHO`,
    output: 7
  });

  dataset.push({
    input: `Al => ThF
Al => ThRnFAr
B => BCa
B => TiB
B => TiRnFAr
Ca => CaCa
Ca => PB
Ca => PRnFAr
Ca => SiRnFYFAr
Ca => SiRnMgAr
Ca => SiTh
F => CaF
F => PMg
F => SiAl
H => CRnAlAr
H => CRnFYFYFAr
H => CRnFYMgAr
H => CRnMgYFAr
H => HCa
H => NRnFYFAr
H => NRnMgAr
H => NTh
H => OB
H => ORnFAr
Mg => BF
Mg => TiMg
N => CRnFAr
N => HSi
O => CRnFYFAr
O => CRnMgAr
O => HP
O => NRnFAr
O => OTi
P => CaP
P => PTi
P => SiRnFAr
Si => CaSi
Th => ThCa
Ti => BP
Ti => TiTi
e => HF
e => NAl
e => OMg

CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF`,
    output: 535
  });

  Utils.check(solve, dataset, "19a");
})();
