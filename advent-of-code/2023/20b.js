(() => {
  const BROADCASTER = "broadcaster";
  const FLIP_FLOP = "%";
  const CONJUNCTION = "&";
  const LOW = 0;
  const HIGH = 1;
  const OFF = 0;
  const ON = 1;

  function solve(input) {
    let lines = Utils.read(input);
    let modules = {};

    for (let line of lines) {
      let ini = line.split(" -> ")[0];
      let end = line.split(" -> ")[1].split(", ");
      let type = BROADCASTER;
      if (ini !== BROADCASTER) {
        type = ini.substring(0, 1);
        ini = ini.substring(1);
      }
      modules[ini] = {
        type,
        end,
        state: OFF,
        inputs: [],
      };
    }

    for (let line of lines) {
      let ini = line.split(" -> ")[0];
      let end = line.split(" -> ")[1].split(", ");
      let type = BROADCASTER;
      if (ini !== BROADCASTER) {
        type = ini.substring(0, 1);
        ini = ini.substring(1);
      }
      for (let endModule of end) {
        if (modules[endModule]?.type === CONJUNCTION) {
          modules[endModule].inputs.push([ini, LOW]);
        }
      }
    }

    let pulses = [];
    // There are 4 different modules that need to send a HIGH signal for "rx" to activate
    // For sending a high signal they need to receive a LOW signal.
    // After studying the circuit we see that those 4 modules are in circuits totally independant
    // So they will be activated in cycles. We have to calculate the cycle (find the a and b of ax+b) for each one

    let vtA = 0;
    let vtB = 0;
    let skA = 0;
    let skB = 0;
    let xcA = 0;
    let xcB = 0;
    let kkA = 0;
    let kkB = 0;

    for (
      let i = 1;
      vtA === 0 || vtB === 0 || skA === 0 || skB === 0 || xcA === 0 || xcB === 0 || kkA === 0 || kkB === 0;
      i++
    ) {
      pulses.push([BROADCASTER, LOW, ""]);
      while (pulses.length > 0) {
        let pulse = pulses.shift();
        let ini = pulse[0];
        let module = modules[ini];
        let pulseType = pulse[1];
        let previous = pulse[2];
        if (module) {
          switch (module.type) {
            case BROADCASTER:
              for (let endModule of module.end) {
                pulses.push([endModule, pulseType, ini]);
              }
              break;
            case FLIP_FLOP:
              if (pulseType === LOW) {
                module.state = (module.state + 1) % 2;
                for (let endModule of module.end) {
                  pulses.push([endModule, module.state, ini]);
                }
              }
              break;
            case CONJUNCTION:
              if (ini === "vt" && pulseType === LOW) {
                if (vtB === 0) {
                  vtB = i;
                } else if (vtA === 0) {
                  vtA = i - vtB;
                }
              }
              if (ini === "sk" && pulseType === LOW) {
                if (skB === 0) {
                  skB = i;
                } else if (skA === 0) {
                  skA = i - skB;
                }
              }
              if (ini === "xc" && pulseType === LOW) {
                if (xcB === 0) {
                  xcB = i;
                } else if (xcA === 0) {
                  xcA = i - xcB;
                }
              }
              if (ini === "kk" && pulseType === LOW) {
                if (kkB === 0) {
                  kkB = i;
                } else if (kkA === 0) {
                  kkA = i - kkB;
                }
              }
              let highPulses = true;
              for (let input of module.inputs) {
                if (input[0] === previous) {
                  input[1] = pulseType;
                }
                if (input[1] === LOW) {
                  highPulses = false;
                }
              }
              for (let endModule of module.end) {
                pulses.push([endModule, highPulses ? LOW : HIGH, ini]);
              }
          }
        } else if (ini === "rx" && pulseType === LOW) {
          return i + 1;
        }
      }
    }

    // It seems that a===b in ax+b, then we can simplify to ax and find the lcm of the 4 modules

    return Utils.mcm(vtA, Utils.mcm(skA, Utils.mcm(xcA, kkA)));
  }

  let dataset = [];

  dataset.push({
    input: `%gv -> lq, pm
%rv -> jd, nh
%nh -> rs, jd
&vt -> tj
%zv -> pm, gv
%gh -> jd, vd
%hh -> bf, qm
%kx -> nf
%st -> pm, zc
%bh -> qm, pv
&sk -> tj
%hl -> nf, pn
%mt -> st, pm
&jd -> ts, gh, vd, dc, xc
%zm -> hm
%pv -> vv
%zf -> nf, cz
&xc -> tj
%bf -> qm
%ts -> sg
%ht -> ch, nf
%pb -> rv, jd
%nx -> fc
%mb -> mt
%mh -> jd, pb
%lc -> bh
%xg -> mb, pm
%vd -> dc
broadcaster -> gh, dl, xg, fb
%sg -> mh, jd
%qq -> ts, jd
%dl -> nf, sv
%vv -> sm, qm
%zc -> tb
%sr -> zv, pm
%dc -> gb
%cz -> nf, zm
%rs -> jd
%hm -> nf, hl
%gd -> sr
&qm -> lc, pv, nx, fb, kk
&tj -> rx
%gb -> qq, jd
%xf -> zf
%tb -> lg
%sm -> qm, hh
%fb -> dr, qm
%lq -> pm
&nf -> zm, dl, ch, xf, vt
&pm -> sk, zc, tb, gd, mb, xg
%pn -> nf, kx
%fc -> xb, qm
%ch -> xf
&kk -> tj
%lg -> pm, gd
%sv -> nf, ht
%xb -> qm, lc
%dr -> nx, qm`,
    output: 246313604784977,
  });

  Utils.check(solve, dataset, "20b");
})();
