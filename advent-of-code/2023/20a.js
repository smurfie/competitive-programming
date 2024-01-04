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
        inputs: []
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

    let lowPulses = 0;
    let highPulses = 0;
    let pulses = [];

    for (let i = 0; i < 1000; i++) {
      pulses.push([BROADCASTER, LOW, ""]);
      while (pulses.length > 0) {
        let pulse = pulses.shift();
        let ini = pulse[0];
        let module = modules[ini];
        let pulseType = pulse[1];
        let previous = pulse[2];
        if (pulseType === LOW) {
          lowPulses++;
        } else {
          highPulses++;
        }
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
        }
      }
    }

    return lowPulses * highPulses;
  }

  let dataset = [];

  dataset.push({
    input: `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`,
    output: 32000000
  });

  dataset.push({
    input: `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`,
    output: 11687500
  });

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
    output: 818649769
  });

  Utils.check(solve, dataset, "20a");
})();
