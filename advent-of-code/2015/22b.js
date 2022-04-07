(() => {
  function solve(input) {
    var lines = Utils.read(input);
    var hpEnemy = parseInt(lines[0].split(" ")[2]);
    var damageEnemy = parseInt(lines[1].split(" ")[1]);

    var mana = 500;
    var hp = 50;

    var initialState = {
      hp,
      mana,
      hpEnemy,
      damageEnemy,
      shieldTurns: 0,
      poisonTurns: 0,
      rechargeTurns: 0,
      usedMana: 0,
      armor: 0
    };

    var states = [];
    states.push(initialState);
    var minMana = Infinity;

    while (states.length > 0) {
      var state = states.pop();
      if (state.usedMana < minMana) {
        var [nextStates, minMana] = next(state, minMana);
        states = states.concat(nextStates);
      }
    }

    return minMana;
  }

  function next(state, minMana) {
    state.hp--;
    if (lose(state)) {
      return [[], minMana];
    }

    effects(state);

    if (win(state)) {
      minMana = state.usedMana;
      return [[], minMana];
    }

    var nextStates = [];

    if (state.mana >= 53) nextStates.push(magicMissile(Utils.duplicate(state)));
    if (state.mana >= 73) nextStates.push(drain(Utils.duplicate(state)));
    if (state.mana >= 113 && state.shieldTurns == 0)
      nextStates.push(shield(Utils.duplicate(state)));
    if (state.mana >= 173 && state.poisonTurns == 0)
      nextStates.push(poison(Utils.duplicate(state)));
    if (state.mana >= 229 && state.rechargeTurns == 0)
      nextStates.push(recharge(Utils.duplicate(state)));

    return [nextStates, minMana];
  }

  function magicMissile(state) {
    state.mana -= 53;
    state.usedMana += 53;
    state.hpEnemy -= 4;
    enemyTurn(state);
    return state;
  }

  function drain(state) {
    state.mana -= 73;
    state.usedMana += 73;
    state.hpEnemy -= 2;
    state.hp += 2;
    enemyTurn(state);
    return state;
  }

  function shield(state) {
    state.mana -= 113;
    state.usedMana += 113;
    state.shieldTurns = 6;
    enemyTurn(state);
    return state;
  }

  function poison(state) {
    state.mana -= 173;
    state.usedMana += 173;
    state.poisonTurns = 6;
    enemyTurn(state);
    return state;
  }

  function recharge(state) {
    state.mana -= 229;
    state.usedMana += 229;
    state.rechargeTurns = 5;
    enemyTurn(state);
    return state;
  }

  function enemyTurn(state) {
    effects(state);
    if (state.hpEnemy > 0) {
      var damage = Math.max(1, state.damageEnemy - state.armor);
      state.hp -= damage;
    }
  }

  function effects(state) {
    if (state.shieldTurns > 0) {
      state.armor = 7;
      state.shieldTurns--;
    } else {
      state.armor = 0;
    }
    if (state.poisonTurns > 0) {
      state.hpEnemy -= 3;
      state.poisonTurns--;
    }
    if (state.rechargeTurns > 0) {
      state.mana += 101;
      state.rechargeTurns--;
    }
  }

  function win(state) {
    return state.hpEnemy <= 0;
  }

  function lose(state) {
    return state.hp <= 0;
  }

  var dataset = [];

  dataset.push({
    input: `Hit Points: 58
Damage: 9`,
    hp: 50,
    mana: 500,
    output: 1309
  });

  Utils.check(solve, dataset, "22b");
})();
