(() => {
  function solve(input, length) {
    var lines = Utils.read(input);
    var data = lines[0];

    while (data.length < length) {
      data = data + "0" + reverse(data);
    }

    data = data.substring(0, length);

    data = checksum(data);
    while (data.length % 2 == 0) {
      data = checksum(data);
    }

    return data;
  }

  function reverse(s) {
    return s
      .split("")
      .reverse()
      .map((i) => (parseInt(i) + 1) % 2)
      .join("");
  }

  function checksum(s) {
    var ch = "";
    for (var i = 0; i < s.length; i += 2) {
      ch += s[i] == s[i + 1] ? "1" : "0";
    }
    return ch;
  }

  var dataset = [];

  dataset.push({
    input: `10000`,
    length: 20,
    output: "01100"
  });

  dataset.push({
    input: `00111101111101000`,
    length: 272,
    output: "10011010010010010"
  });

  Utils.check(solve, dataset, "16a");
})();
