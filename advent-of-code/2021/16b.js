(() => {
  function solve(input) {
    var binary = input
      .split("")
      .map((i) => hex2bin(i))
      .join("");

    return packet(binary, 0)[1];
  }

  function packet(str, i) {
    var typeId = parseInt(str.substring(i + 3, i + 6), 2);
    var i = i + 6;
    var num;
    if (typeId == 4) {
      num = "";
      while (str[i] == 1) {
        num += str.substring(i + 1, i + 5);
        i = i + 5;
      }
      num += str.substring(i + 1, i + 5);
      num = parseInt(num, 2);
      i += 5;
    } else {
      var lengthTypeId = parseInt(str[i++]);
      if (lengthTypeId == 0) {
        var totalLength = parseInt(str.substring(i, i + 15), 2);
        i += 15;
        var oldPacket;
        while (totalLength > 0) {
          var newPacket = packet(str, i);
          totalLength -= newPacket[0] - i;
          i = newPacket[0];
          if (oldPacket) {
            newPacket[1] = operate(oldPacket[1], newPacket[1], typeId);
          }
          oldPacket = newPacket;
        }
        num = oldPacket[1];
      } else {
        var nOfSubpackets = parseInt(str.substring(i, i + 11), 2);
        i += 11;
        var oldPacket;
        while (nOfSubpackets-- > 0) {
          var newPacket = packet(str, i);
          i = newPacket[0];
          if (oldPacket) {
            newPacket[1] = operate(oldPacket[1], newPacket[1], typeId);
          }
          oldPacket = newPacket;
        }
        num = oldPacket[1];
      }
    }
    return [i, num];
  }

  function operate(p1, p2, typeId) {
    switch (typeId) {
      case 0:
        return p1 + p2;
      case 1:
        return p1 * p2;
      case 2:
        return Math.min(p1, p2);
      case 3:
        return Math.max(p1, p2);
      case 5:
        return p1 > p2 ? 1 : 0;
      case 6:
        return p1 < p2 ? 1 : 0;
      case 7:
        return p1 == p2 ? 1 : 0;
    }
  }

  function hex2bin(a) {
    switch (a) {
      case "0":
        return "0000";
      case "1":
        return "0001";
      case "2":
        return "0010";
      case "3":
        return "0011";
      case "4":
        return "0100";
      case "5":
        return "0101";
      case "6":
        return "0110";
      case "7":
        return "0111";
      case "8":
        return "1000";
      case "9":
        return "1001";
      case "A":
        return "1010";
      case "B":
        return "1011";
      case "C":
        return "1100";
      case "D":
        return "1101";
      case "E":
        return "1110";
      case "F":
        return "1111";
    }
  }
  var dataset = [];

  dataset.push({
    input: `C200B40A82`,
    output: 3
  });

  dataset.push({
    input: `04005AC33890`,
    output: 54
  });

  dataset.push({
    input: `880086C3E88112`,
    output: 7
  });

  dataset.push({
    input: `CE00C43D881120`,
    output: 9
  });

  dataset.push({
    input: `D8005AC2A8F0`,
    output: 1
  });

  dataset.push({
    input: `F600BC2D8F`,
    output: 0
  });

  dataset.push({
    input: `9C005AC2F8F0`,
    output: 0
  });

  dataset.push({
    input: `9C0141080250320F1802104A08`,
    output: 1
  });

  dataset.push({
    input: `420D610055D273AF1630010092019207300B278BE5932551E703E608400C335003900AF0402905009923003880856201E95C00B60198D400B50034400E20101DC00E10024C00F1003C400B000212697140249D049F0F8952A8C6009780272D5D074B5741F3F37730056C0149658965E9AED7CA8401A5CC45BB801F0999FFFEEE0D67050C010C0036278A62D4D737F359993398027800BECFD8467E3109945C1008210C9C442690A6F719C48A351006E9359C1C5003E739087E80F27EC29A0030322BD2553983D272C67508E5C0804639D4BD004C401B8B918E3600021D1061D47A30053801C89EF2C4CCFF39204C53C212DABED04C015983A9766200ACE7F95C80D802B2F3499E5A700267838803029FC56203A009CE134C773A2D3005A77F4EDC6B401600043A35C56840200F4668A71580043D92D5A02535BAF7F9A89CF97C9F59A4F02C400C249A8CF1A49331004CDA00ACA46517E8732E8D2DB90F3005E92362194EF5E630CA5E5EEAD1803E200CC228E70700010A89D0BE3A08033146164177005A5AEEB1DA463BDC667600189C9F53A6FF6D6677954B27745CA00BCAE53A6EEDC60074C920001B93CFB05140289E8FA4812E071EE447218CBE1AA149008DBA00A497F9486262325FE521898BC9669B382015365715953C5FC01AA8002111721D4221007E13C448BA600B4F77F694CE6C01393519CE474D46009D802C00085C578A71E4001098F518639CC301802B400E7CDDF4B525C8E9CA2188032600E44B8F1094C0198CB16A29180351EA1DC3091F47A5CA0054C4234BDBC2F338A77B84F201232C01700042A0DC7A8A0200CC578B10A65A000601048B24B25C56995A30056C013927D927C91AB43005D127FDC610EF55273F76C96641002A4F0F8C01CCC579A8D68E52587F982996F537D600`,
    output: 911945136934
  });

  Utils.check(solve, dataset, "16b");
})();
