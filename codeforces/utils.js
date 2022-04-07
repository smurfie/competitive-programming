var inputLine = 0;
var input = inputData.split("\n");
var output = "";

function readline() {
  return input[inputLine++];
}

function print(s) {
  if (output != "") output += "\n";
  output += s;
}
