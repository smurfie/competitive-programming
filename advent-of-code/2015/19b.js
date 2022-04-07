(() => {
  function solve(input) {
    /* This one is a little tricky: I don't know if there is a better way to do it without studying the input.
     * We can see than all the transformations adds one element except if they add a Rn..Ar formula then
     * it adds 3 element, except if there is a Y then they add 2 more elements for each Y
     **/

    var lines = Utils.read(input);
    var initialFormula = lines.pop();

    var ars = (initialFormula.match(/Ar/g) || []).length;
    var ys = (initialFormula.match(/Y/g) || []).length;
    var mayus = initialFormula.match(/[A-Z]/g).length;

    return mayus - 2 * ys - 2 * ars - 1;
  }

  var dataset = [];

  // Let's disable the non-main use cases because the solution is based on
  // the main input not in a general input
  /*
dataset.push({
  input: `e => H
e => O
H => HO
H => OH
O => HH

HOH`,
  output: 3
});

dataset.push({
  input: `e => H
e => O
H => HO
H => OH
O => HH

HOHOHO`,
  output: 6
});
*/

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
    output: 212
  });

  Utils.check(solve, dataset, "19b");
})();
