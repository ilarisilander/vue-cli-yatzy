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
      {id: 10, label: 'Total', value: 0, selected: false},
    ],
    isRollButtonVisible: true,
    diceRolls: 0,
    rounds: 0,
    sumFirst: 0,
    sumSecond: 0,
    bonus: 0,
    selected: false,
    skipSelected: false,
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
    //This toggles the state of the skip button (selected or not)
    skip: function(state) {
      state.skipSelected = !state.skipSelected;
    },
    //This toggles the state of the dice state (selected or not)
    isSelected: function(state, payload) {
      if(state.allDice[payload - 1].value != null){
        state.allDice[payload - 1].selected = !state.allDice[payload -1].selected;
      }
    },
    //This function resets everything back to default so that the game is playable again.
    replay: function(state) {
      for(var i = 0; i < state.allDice.length; i++) {
        state.allDice[i].value = null;
        state.allDice[i].selected = false;
      }
      for(var j = 0; j < state.firstTier.length; j++) {
        state.firstTier[j].value = null;
      }
      for(var k = 0; k < state.secondTier.length; k++) {
        state.secondTier[k].value = null;
      }
      state.isRollButtonVisible = true;
      state.diceRolls = 0;
      state.rounds = 0;
      state.sumFirst = 0;
      state.sumSecond = 0;
      state.bonus = 0;
      state.selected = false;
      state.secondTier[9].value = 0;
    },

    // This function is looking for the value 1 of the dice
    ones: function(state) {
      //This will keep track of all the successful clicks of the firstTier field
      var counter = 0;
      //Checks if skip button is selected, then it will set the fields value to 0 and increase the counter.
      if(state.skipSelected == true && state.firstTier[0].value == null && state.firstTier[0].value != 0) {
        state.firstTier[0].value = 0;
        counter++;
      }

      for(var i = 0; i < state.allDice.length; i++) {
        //Check if there are any "ones" in the array
        if(state.allDice[i].value == 1 && state.firstTier[0].value != 0 && state.firstTier[0].value == null) {
          //If there are any "ones", then set the value of firstTier to the sum of all "ones" and increase the counter
          state.firstTier[0].value += state.allDice[i].value;
          state.sumFirst += state.allDice[i].value;
          state.secondTier[9].value += state.allDice[i].value;
          counter++;
          //If the sum of the firstTier goes above 63, then the bonus field is set to 50
          if(state.sumFirst >= 63) {
            state.bonus = 50;
          }
        }
        else{
          continue;
        }
      }
      //This will reset all the dice, the dice rolls, visibility of the roll button and the skip button state.
      if(state.firstTier[0].value != null || state.firstTier[0].value != 0) {
        for(var j = 0; j < state.allDice.length; j++) {
          state.allDice[j].value = null;
          state.allDice[j].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      //Check if there were any successful clicks on the tier field, and if there was, then set the rounds state to +1
      if(counter > 0) {
        state.rounds++;
      }
    },
    twos: function(state) {
      var counter = 0;
      if(state.skipSelected == true && state.firstTier[1].value == null && state.firstTier[1].value != 0) {
        state.firstTier[1].value = 0;
        counter++;
      }
      //Check if there are any "twos" in the array
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].value == 2 && state.firstTier[1].value != 0 && state.firstTier[1].value == null) {
          //If there is, then set the value of firstTier to the sum of all "twos"
          state.firstTier[1].value += state.allDice[i].value;
          state.sumFirst += state.allDice[i].value;
          state.secondTier[9].value += state.allDice[i].value;
          counter++;
          if(state.sumFirst >= 63) {
            state.bonus = 50;
          }
        }
        else{
          continue;
        }
      }

      if(state.firstTier[1].value != null || state.firstTier[1].value == 0) {
        for(var j = 0; j < state.allDice.length; j++) {
          state.allDice[j].value = null;
          state.allDice[j].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },
    threes: function(state) {
      var counter = 0;
      if(state.skipSelected == true && state.firstTier[2].value == null && state.firstTier[2].value != 0) {
        state.firstTier[2].value = 0;
        counter++;
      }
      //Check if there are any "threes" in the array
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].value == 3 && state.firstTier[2].value != 0 && state.firstTier[2].value == null) {
          //If there is, then set the value of firstTier to the sum of all "threes"
          state.firstTier[2].value += state.allDice[i].value;
          state.sumFirst += state.allDice[i].value;
          state.secondTier[9].value += state.allDice[i].value;
          counter++;
          if(state.sumFirst >= 63) {
            state.bonus = 50;
          }
        }
        else{
          continue;
        }
      }
      if(state.firstTier[2].value != null || state.firstTier[2].value == 0) {
        for(var j = 0; j < state.allDice.length; j++) {
          state.allDice[j].value = null;
          state.allDice[j].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },
    fours: function(state) {
      var counter = 0;
      if(state.skipSelected == true && state.firstTier[3].value == null && state.firstTier[3].value != 0) {
        state.firstTier[3].value = 0;
        counter++;
      }
      //Check if there are any "fours" in the array
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].value == 4 && state.firstTier[3].value != 0 && state.firstTier[3].value == null) {
          //If there is, then set the value of firstTier to the sum of all "fours"
          state.firstTier[3].value += state.allDice[i].value;
          state.sumFirst += state.allDice[i].value;
          state.secondTier[9].value += state.allDice[i].value;
          counter++;
          if(state.sumFirst >= 63) {
            state.bonus = 50;
          }
        }
        else{
          continue;
        }
      }
      if(state.firstTier[3].value != null || state.firstTier[3].value == 0) {
        for(var j = 0; j < state.allDice.length; j++) {
          state.allDice[j].value = null;
          state.allDice[j].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },
    fives: function(state) {
      var counter = 0;
      if(state.skipSelected == true && state.firstTier[4].value == null && state.firstTier[4].value != 0) {
        state.firstTier[4].value = 0;
        counter++;
      }
      //Check if there are any "fives" in the array
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].value == 5 && state.firstTier[4].value != 0 && state.firstTier[4].value == null) {
          //If there is, then set the value of firstTier to the sum of all "sixes"
          state.firstTier[4].value += state.allDice[i].value;
          state.sumFirst += state.allDice[i].value;
          state.secondTier[9].value += state.allDice[i].value;
          counter++;
          if(state.sumFirst >= 63) {
            state.bonus = 50;
          }
        }
        else{
          continue;
        }
      }
      if(state.firstTier[4].value != null || state.firstTier[4].value == 0) {
        for(var j = 0; j < state.allDice.length; j++) {
          state.allDice[j].value = null;
          state.allDice[j].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },
    sixes: function(state) {
      var counter = 0;
      if(state.skipSelected == true && state.firstTier[5].value == null && state.firstTier[5].value != 0) {
        state.firstTier[5].value = 0;
        counter++;
      }
      //Check if there are any "sixes" in the array
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].value == 6 && state.firstTier[5].value != 0 && state.firstTier[5].value == null) {
          //If there is, then set the value of firstTier to the sum of all "sixes"
          state.firstTier[5].value += state.allDice[i].value;
          state.sumFirst += state.allDice[i].value;
          state.secondTier[9].value += state.allDice[i].value;
          counter++;
          if(state.sumFirst >= 63) {
            state.bonus = 50;
          }
        }
        else{
          continue;
        }
      }
      if(state.firstTier[5].value != null || state.firstTier[5].value == 0) {
        for(var j = 0; j < state.allDice.length; j++) {
          state.allDice[j].value = null;
          state.allDice[j].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },

    pair: function(state) {
      var counter = 0;
      if(state.skipSelected == true && state.secondTier[0].value == null) {
        state.secondTier[0].value = 0;
        counter++;
      }
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();

      for(var j = 0; j < diceValue.length -1; j++) {
        if(diceValue[j] != null && diceValue[j] == diceValue[j + 1] && state.secondTier[0].value == null && state.secondTier[0].value != 0) {
          state.secondTier[0].value = diceValue[j] + diceValue[j + 1];
          state.secondTier[9].value += diceValue[j] + diceValue[j + 1];
          counter++;
        }
        else{
          continue;
        }
      }

      if(state.secondTier[0].value != null) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },

    twoPairs: function(state) {
      var counter = 0;
      if(state.skipSelected == true) {
        state.secondTier[1].value = 0;
        counter++;
      }
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      if(diceValue[0] == diceValue[1] &&
        diceValue[2] == diceValue[3] && diceValue[3] > diceValue[0] && state.secondTier[1].value != 0) {
        state.secondTier[1].value = diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3];
        counter++;
      }
      else if(diceValue[0] == diceValue[1] &&
        diceValue[3] == diceValue[4] && diceValue[3] > diceValue[0] && state.secondTier[1].value != 0) {
        state.secondTier[1].value = diceValue[0] + diceValue[1] + diceValue[3] + diceValue[4];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[3] + diceValue[4];
        counter++;
      }
      else if(diceValue[1] == diceValue[2] &&
        diceValue[3] == diceValue[4] && diceValue[3] > diceValue[0] && state.secondTier[1].value != 0) {
        state.secondTier[1].value = diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        state.secondTier[9].value += diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        counter++;
      }
      if(state.secondTier[1].value != null || state.secondTier[1].value == 0) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },

    threeKind: function(state) {
      var counter = 0;
      if(state.skipSelected == true) {
        state.secondTier[2].value = 0;
        counter++;
      }
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      for (var j = 0; j < 3; j++) {
        if (diceValue[j] != null && diceValue[j] == diceValue[j + 1] && diceValue[j + 1] == diceValue[j + 2] &&
        state.secondTier[2].value == null && state.secondTier[2].value != 0) {
          state.secondTier[2].value = diceValue[j] + diceValue[j + 1] + diceValue[j + 2];
          state.secondTier[9].value += diceValue[j] + diceValue[j + 1] + diceValue[j + 2];
          counter++;
        }
      }
      if(state.secondTier[2].value != null || state.secondTier[2].value == 0) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },

    fourKind: function(state) {
      var counter = 0;
      if(state.skipSelected == true) {
        state.secondTier[3].value = 0;
        counter++;
      }
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      for(var j = 0; j < 2; j++) {
        if(diceValue[j] != null && diceValue[j] == diceValue[j + 1] && diceValue[j + 1] == diceValue[j + 2] && diceValue[j + 2] == diceValue[j + 3] &&
        state.secondTier[3].value == null && state.secondTier[3].value != 0) {
          state.secondTier[3].value = diceValue[j] + diceValue[j + 1] + diceValue[j + 2] + diceValue[j + 3];
          state.secondTier[9].value += diceValue[j] + diceValue[j + 1] + diceValue[j + 2] + diceValue[j + 3];
          counter++;
        }
      }
      if(state.secondTier[3].value != null || state.secondTier[3].value == 0) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },

    fullHouse: function(state) {
      var counter = 0;
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.skipSelected == true) {
          state.secondTier[4].value = 0;
          counter++;
          break;
        }
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      if(state.secondTier[4].value != 0 && ((diceValue[0] == diceValue[1] && diceValue[1] == diceValue[2]) && (diceValue[3] == diceValue[4]) &&
      (diceValue[0] < diceValue[4])) || ((diceValue[0] == diceValue[1]) && (diceValue[2] == diceValue[3] &&
      diceValue[3] == diceValue[4]) && (diceValue[0] < diceValue[4]))) {
        state.secondTier[4].value = diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        counter++;
      }
      if(state.secondTier[4].value != null || state.secondTier[4].value == 0) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },

    smallStraight: function(state) {
      var counter = 0;
      if(state.skipSelected == true) {
        state.secondTier[5].value = 0;
        counter++;
      }
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      if(diceValue[0] == 1 && diceValue[1] == 2 && diceValue[2] == 3 && diceValue[3] == 4 && diceValue[4] == 5 &&
      state.secondTier[5].value == null && state.secondTier[5].value != 0) {
        state.secondTier[5].value = diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        counter++;
      }
      if(state.secondTier[5].value != null || state.secondTier[5].value == 0) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },

    largeStraight: function(state) {
      var counter = 0;
      if(state.skipSelected == true) {
        state.secondTier[6].value = 0;
        counter++;
      }
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      if (diceValue[0] == 2 && diceValue[1] == 3 && diceValue[2] == 4 && diceValue[3] == 5 && diceValue[4] == 6 &&
      state.secondTier[6].value == null && state.secondTier[6].value != 0) {
        state.secondTier[6].value = diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        counter++;
      }
      if(state.secondTier[6].value != null  || state.secondTier[6].value == 0) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },

    yatzy: function(state) {
      var counter = 0;
      if(state.skipSelected == true) {
        state.secondTier[7].value = 0;
        counter++;
      }
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();
      if(diceValue[0] != null && diceValue[0] == diceValue[1] && diceValue[1] == diceValue[2] &&
      diceValue[2] == diceValue[3] && diceValue[3] == diceValue[4] && state.secondTier[7].value == null && state.secondTier[7].value != 0) {
        state.secondTier[7].value = 50;
        state.secondTier[9].value += 50;
        counter++;
      }

      if(state.secondTier[7].value != null || state.secondTier[7].value == 0) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    },

    chance: function(state) {
      var counter = 0;
      if(state.skipSelected == true) {
        state.secondTier[8].value = 0;
        counter++;
      }
      var diceValue = [];
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      diceValue.sort();

      if(diceValue[0] != null && state.secondTier[8].value == null && state.secondTier[8].value != 0) {
        state.secondTier[8].value += diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3] + diceValue[4];
        counter++;
      }

      if(state.secondTier[8].value != null || state.secondTier[8].value == 0) {
        for(var x = 0; x < state.allDice.length; x++) {
          state.allDice[x].value = null;
          state.allDice[x].selected = false;
        }
        state.diceRolls = 0;
        state.isRollButtonVisible = true;
        state.skipSelected = false;
      }
      if(counter > 0) {
        state.rounds++;
      }
    }
  }
});
