class Utils {
  static print(text, className) {
    document.getElementById("text").innerHTML +=
      "<span class='" + className + "'>" + text + "</span><br>";
    console.log(text);
  }

  static printSol(text, sol, testCase, time) {
    var className = text == sol ? "correct" : "wrong";
    this.print(
      "#" +
        testCase +
        ": Expected: " +
        sol +
        " ; Actual: " +
        text +
        " (" +
        time +
        "ms)",
      className
    );
  }

  static read(input) {
    return input.split("\n");
  }

  static readNums(input, separator) {
    return input.split(separator).map((i) => parseInt(i));
  }

  static duplicate(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  static sum(arr) {
    return arr.reduce((p, c) => p + c, 0);
  }

  static prod(arr) {
    return arr.reduce((p, c) => p * c, 1);
  }

  static matrix(x, y, value) {
    var m = [];
    for (var i = 0; i < x; i++) {
      m[i] = [];
      for (var j = 0; j < y; j++) {
        m[i][j] = value;
      }
    }
    return m;
  }

  static mcd(a, b) {
    var tmp;
    while (b !== 0) {
      tmp = b;
      b = a % b;
      a = tmp;
    }
    return a;
  }

  // Returns a possible x and y for a*x + b*y = mcd
  static mcdExtended(a, b) {
    var x = 1n;
    var y = 0n;
    var x1 = 0n;
    var y1 = 1n;
    var tmp;
    while (b !== 0n) {
      tmp = a / b;
      [x, x1] = [x1, x - tmp * x1];
      [y, y1] = [y1, y - tmp * y1];
      [a, b] = [b, a - tmp * b];
    }
    return [a, x, y];
  }

  static mcm(a, b) {
    return (a / this.mcd(a, b)) * b;
  }

  // a and n must be coprime (mcd(a,n) == 1)
  static modInverse(a, n) {
    var res = this.mcdExtended(a, n);
    if (res[0] != 1n) console.error("Error!");
    return (res[1] + n) % n;
  }

  static powMod(a, b, n) {
    var tmp = a;
    var res = b % 2n == 1n ? tmp : 1n;
    b = b / 2n;
    while (b > 0n) {
      tmp *= tmp;
      tmp %= n;
      if (b % 2n == 1n) {
        res *= tmp;
        res %= n;
      }
      b = b / 2n;
    }
    return res;
  }

  static mod(x, y) {
    return ((x % y) + y) % y;
  }

  static queue = [];
  static running = false;
  static queueTime = 0;
  static debug = false; // Activate debug mode to run the tests sync

  static check(solve, dataset, problem, message) {
    this.queue.push({ solve, dataset, problem, message });
    if (!this.running) {
      if (this.queue.length > 0) {
        this.running = true;
        this.queueTime = 0;
        if (this.queue[0].message != undefined)
          Utils.print(this.queue[0].message);
        if (this.debug) {
          this.run();
        } else {
          setTimeout(() => {
            this.run();
          }, 100);
        }
      }
    }
  }

  static run() {
    if (this.queue.length == 0) {
      this.running = false;
      Utils.print("Total time: " + this.queueTime.toFixed(2) + "ms");
    } else {
      var { solve, dataset, problem } = this.queue.shift();
      Utils.print("PROBLEM: #" + problem, "bold");
      Utils.print("-".repeat(10 + problem.length));
      var testCase = 0;

      var totalTime = 0;
      for (var data of dataset) {
        testCase++;
        var startTime = performance.now();
        var res = solve(...Object.values(data));
        var endTime = performance.now();
        var time = endTime - startTime;
        totalTime += time;
        if (data.output != undefined)
          Utils.printSol(res, data.output, testCase, time.toFixed(2));
        else
          Utils.print(
            "#" + testCase + ": " + res + " (" + time.toFixed(2) + "ms)"
          );
      }
      this.queueTime += totalTime;
      Utils.print("Problem time: " + totalTime.toFixed(2) + "ms");
      Utils.print("");
      if (this.queue.length > 0) {
        if (this.queue[0].message != undefined)
          Utils.print(this.queue[0].message);
        if (this.debug) {
          this.run();
        } else {
          setTimeout(() => {
            this.run();
          }, 10);
        }
      } else {
        Utils.print("Total time: " + this.queueTime.toFixed(2) + "ms");
        this.running = false;
      }
    }
  }
}
