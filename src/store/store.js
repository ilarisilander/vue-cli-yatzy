import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    allDice: [
      {id: 1, value: null, selected: false},
      {id: 2, value: null, selected: false},
      {id: 3, value: null, selected: false},
      {id: 4, value: null, selected: false},
      {id: 5, value: null, selected: false},
    ],
    firstTier: [
      {id: 1, label: 'Aces', value: null, selected: false},
      {id: 2, label: 'Twos', value: null, selected: false},
      {id: 3, label: 'Threes', value: null, selected: false},
      {id: 4, label: 'Fours', value: null, selected: false},
      {id: 5, label: 'Fives', value: null, selected: false},
      {id: 6, label: 'Sixes', value: null, selected: false},
      {id: 7, label: 'Total', value: null, selected: false},
      {id: 8, label: 'Bonus', value: null, selected: false},
    ],
    secondTier: [
      {id: 1, label: 'Pair', value: null, selected: false},
      {id: 2, label: 'Two Pairs', value: null, selected: false},
      {id: 3, label: 'Three Of A Kind', value: null, selected: false},
      {id: 4, label: 'Four Of A Kind', value: null, selected: false},
      {id: 5, label: 'Full House', value: null, selected: false},
      {id: 6, label: 'Small Straight', value: null, selected: false},
      {id: 7, label: 'Large Straight', value: null, selected: false},
      {id: 8, label: 'Yatzy', value: null, selected: false},
      {id: 9, label: 'Chance', value: null, selected: false},
      {id: 10, label: 'Total', value: null, selected: false},
    ],
    isRollButtonVisible: true,
    diceRolls: 0,
    sumFirst: 0,
    sumSecond: 0,
    bonus: 0,
    selected: false,
  },
  mutations: {
    //This function starts the rolling of the dice
    rollDice: function(state) {
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].selected) {
          continue;
        }
        else {
          state.allDice[i].value = Math.floor(Math.random() * 6) + 1;
        }
      }
      state.diceRolls++;
      if(state.diceRolls == 3) {
        state.isRollButtonVisible = false;
      }
    },
    isSelected: function(state, payload) {
      if(state.allDice[payload - 1].value != null){
        state.allDice[payload - 1].selected = !state.allDice[payload -1].selected;
      }
    },

    //This function is looking for the value 1 of the dice
    ones: function(state) {
      //Check if there are any "ones" in the array
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].value == 1) {
          //If there is, then set the value of firstTier to the sum of all "ones"
          state.firstTier[0].value += state.allDice[i].value;
          state.sumFirst += state.allDice[i].value;
          state.secondTier[9].value += state.allDice[i].value;
          if(state.sumFirst >= 63) {
            state.bonus = 50;
          }
        }
        else{
          continue;
        }
      }
      if(state.firstTier[0].value != null) {
        for(var j = 0; j < state.allDice.length; j++) {
          state.allDice[j].value = null;
          state.allDice[j].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },
    twos: function(state) {
      //Check if there are any "twos" in the array
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].value == 2) {
          //If there is, then set the value of firstTier to the sum of all "twos"
          state.firstTier[1].value += state.allDice[i].value;
          state.sumFirst += state.allDice[i].value;
          state.secondTier[9].value += state.allDice[i].value;
          if(state.sumFirst >= 63) {
            state.bonus = 50;
          }
        }
        else{
          continue;
        }
      }
      if(state.firstTier[1].value != null) {
        for(var j = 0; j < state.allDice.length; j++) {
          state.allDice[j].value = null;
          state.allDice[j].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },
    threes: function(state) {
      //Check if there are any "threes" in the array
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].value == 3) {
          //If there is, then set the value of firstTier to the sum of all "threes"
          state.firstTier[2].value += state.allDice[i].value;
          state.sumFirst += state.allDice[i].value;
          state.secondTier[9].value += state.allDice[i].value;
          if(state.sumFirst >= 63) {
            state.bonus = 50;
          }
        }
        else{
          continue;
        }
      }
      if(state.firstTier[2].value != null) {
        for(var j = 0; j < state.allDice.length; j++) {
          state.allDice[j].value = null;
          state.allDice[j].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },
    fours: function(state) {
      //Check if there are any "fours" in the array
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].value == 4) {
          //If there is, then set the value of firstTier to the sum of all "fours"
          state.firstTier[3].value += state.allDice[i].value;
          state.sumFirst += state.allDice[i].value;
          state.secondTier[9].value += state.allDice[i].value;
          if(state.sumFirst >= 63) {
            state.bonus = 50;
          }
        }
        else{
          continue;
        }
      }
      if(state.firstTier[3].value != null) {
        for(var j = 0; j < state.allDice.length; j++) {
          state.allDice[j].value = null;
          state.allDice[j].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },
    fives: function(state) {
      //Check if there are any "fives" in the array
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].value == 5) {
          //If there is, then set the value of firstTier to the sum of all "sixes"
          state.firstTier[4].value += state.allDice[i].value;
          state.sumFirst += state.allDice[i].value;
          state.secondTier[9].value += state.allDice[i].value;
          if(state.sumFirst >= 63) {
            state.bonus = 50;
          }
        }
        else{
          continue;
        }
      }
      if(state.firstTier[4].value != null) {
        for(var j = 0; j < state.allDice.length; j++) {
          state.allDice[j].value = null;
          state.allDice[j].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },
    sixes: function(state) {
      //Check if there are any "sixes" in the array
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].value == 6) {
          //If there is, then set the value of firstTier to the sum of all "sixes"
          state.firstTier[5].value += state.allDice[i].value;
          state.sumFirst += state.allDice[i].value;
          state.secondTier[9].value += state.allDice[i].value;
          if(state.sumFirst >= 63) {
            state.bonus = 50;
          }
        }
        else{
          continue;
        }
      }
      if(state.firstTier[5].value != null) {
        for(var j = 0; j < state.allDice.length; j++) {
          state.allDice[j].value = null;
          state.allDice[j].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },

    pair: function(state) {
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }

      diceValue.sort();

      for(var j = 0; j < diceValue.length -1; j++) {
        if(diceValue[j] == diceValue[j + 1]) {
          state.secondTier[0].value = diceValue[j] + diceValue[j + 1];
          state.secondTier[9].value += diceValue[j] + diceValue[j + 1];
        }
      }

      if(state.secondTier[0].value != null) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },

    twoPairs: function(state) {
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      if(diceValue[0] == diceValue[1] && diceValue[2] == diceValue[3] && diceValue[3] > diceValue[0]) {
        state.secondTier[1].value = diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3];
      }
      else if(diceValue[0] == diceValue[1] && diceValue[3] == diceValue[4] && diceValue[3] > diceValue[0]) {
        state.secondTier[1].value = diceValue[0] + diceValue[1] + diceValue[3] + diceValue[4];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[3] + diceValue[4];
      }
      else if(diceValue[1] == diceValue[2] && diceValue[3] == diceValue[4] && diceValue[3] > diceValue[0]) {
        state.secondTier[1].value = diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        state.secondTier[9].value += diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
      }
      if(state.secondTier[1].value != null) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },

    threeKind: function(state) {
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      for (var j = 0; j < 3; j++) {
        if (diceValue[j] == diceValue[j + 1] && diceValue[j + 1] == diceValue[j + 2]) {
          state.secondTier[2].value = diceValue[j] + diceValue[j + 1] + diceValue[j + 2];
          state.secondTier[9].value += diceValue[j] + diceValue[j + 1] + diceValue[j + 2];
        }
      }
      if(state.secondTier[2].value != null) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },

    fourKind: function(state) {
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      for(var j = 0; j < 2; j++) {
        if(diceValue[j] == diceValue[j + 1] && diceValue[j + 1] == diceValue[j + 2] && diceValue[j + 2] == diceValue[j + 3]) {
          state.secondTier[3].value = diceValue[j] + diceValue[j + 1] + diceValue[j + 2] + diceValue[j + 3]
          state.secondTier[9].value += diceValue[j] + diceValue[j + 1] + diceValue[j + 2] + diceValue[j + 3]
        }
      }
      if(state.secondTier[3].value != null) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },

    fullHouse: function(state) {
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      if(((diceValue[0] == diceValue[1] && diceValue[1] == diceValue[2]) && (diceValue[3] == diceValue[4]) &&
      (diceValue[0] < diceValue[4])) || ((diceValue[0] == diceValue[1]) && (diceValue[2] == diceValue[3] &&
      diceValue[3] == diceValue[4]) && (diceValue[0] < diceValue[4]))) {
        state.secondTier[4].value = diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
      }
      if(state.secondTier[4].value != null) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },

    smallStraight: function(state) {
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      if(diceValue[0] == 1 && diceValue[1] == 2 && diceValue[2] == 3 && diceValue[3] == 4 && diceValue[4] == 5) {
        state.secondTier[5].value = diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
      }
      if(state.secondTier[5].value != null) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },

    largeStraight: function(state) {
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      if (diceValue[0] == 2 && diceValue[1] == 3 && diceValue[2] == 4 && diceValue[3] == 5 && diceValue[4] == 6) {
        state.secondTier[6].value = diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
      }
      if(state.secondTier[6].value != null) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },

    yatzy: function(state) {
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      if (diceValue[0] == diceValue[1] && diceValue[1] == diceValue[2] && diceValue[2] == diceValue[3] && diceValue[3] == diceValue[4]) {
        state.secondTier[7] = 50;
        state.secondTier[9].value += 50;
      }

      if(state.secondTier[7].value != null) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    },

    chance: function(state) {
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
        state.secondTier[8].value += diceValue[i];
        state.secondTier[9].value += diceValue[i];
      }
      diceValue.sort();

      if(state.secondTier[8].value != null) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
      }
    }
  }
});
