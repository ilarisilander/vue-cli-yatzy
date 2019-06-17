import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    //Dice objects and their attributes
    allDice: [
      {id: 1, value: null, selected: false},
      {id: 2, value: null, selected: false},
      {id: 3, value: null, selected: false},
      {id: 4, value: null, selected: false},
      {id: 5, value: null, selected: false},
    ],
    //The objects for the scoreboard (first tier)
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
    //The objects for the scoreboard (second tier)
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
    //Roll button visibility (true/false)
    isRollButtonVisible: true,
    //Amount of dice rolls (0-3)
    diceRolls: 0,
    //Rounds (0-15)
    rounds: 0,
    //Sum of the first tier
    sumFirst: 0,
    //Sum of the second tier
    sumSecond: 0,
    //The bonus which will be 50 if the sum of the first tier is 63 or higher
    bonus: 0,
    //Checks if the dice are selected or not (true/false)
    selected: false,
    //Checks if the skip button is selected or not (true/false)
    skipSelected: false,
  },
  mutations: {
    //This function starts the rolling of the dice
    rollDice: function(state) {
      //Iterate through all the dices and check if they are selected
      for(var i = 0; i < state.allDice.length; i++) {
        if(state.allDice[i].selected) {
          continue;
        }
        //If they are not selected, then give the dice a random value
        else {
          state.allDice[i].value = Math.floor(Math.random() * 6) + 1;
        }
      }
      //Increase the amount of dice rolls
      state.diceRolls++;
      //Toggles the visibility of the roll button to "off" if 3 rolls has been made
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

    /*
      All the functions in the first tier are similar. There is room for a lot of
      optimization here. Documentation only needed for the first function of the first tier.
    */

    //This function checks if any of the dice are of value 1
    ones: function(state) {
      //Counter for knowing if any clicks were successful (tier field to 0 or > 0)
      var counter = 0;
      //This checks if the skip button is selected or not
      if(state.skipSelected == true && state.firstTier[0].value == null) {
        //Set value of firstTier (Ones) to 0
        state.firstTier[0].value = 0;
        //Increase the "successful clicks" counter with 1
        counter++;
        //Checks if the value of "ones" is 0. If it is 0 this will reset some values
        if(state.firstTier[0].value == 0) {
          //Resets all dice values to null and all dice "selected" to false
          for(var j = 0; j < state.allDice.length; j++) {
            state.allDice[j].value = null;
            state.allDice[j].selected = false;
          }
          //Resets the dice rolls to 0
          state.diceRolls = 0;
          //Rests the roll buttons visibility to true
          state.isRollButtonVisible = true;
        }
      }
      //Checks if the value of "ones" is null
      else if(state.firstTier[0].value == null) {
        //Iterate through all the dice in the dice array (in state)
        for(var i = 0; i < state.allDice.length; i++) {
          //Checks if the current die has the value of 1
          if(state.allDice[i].value == 1) {
            //Sets first tier (ones) to it's current value + the value of the current die
            state.firstTier[0].value += state.allDice[i].value;
            //Sets the sum counter of the first tier to it's current value + the current die value
            state.sumFirst += state.allDice[i].value;
            //Sets the second tiers grand total to it's current value + the die value
            state.secondTier[9].value += state.allDice[i].value;
            //Increases the "successful click" counter to +1
            counter++;
            //Checks if the sum of the first tier has reached 63
            if(state.sumFirst >= 63) {
              //Sets the bonus field to 50
              state.bonus = 50;
            }
          }
          //If the dice value is something else than 1, then iterate again
          else{
            continue;
          }
        }
        //If the field of "ones" is more than 0, then reset dice, dice rolls and roll button (visibility)
        if(state.firstTier[0].value > 0) {
          for(var k = 0; k < state.allDice.length; k++) {
            state.allDice[k].value = null;
            state.allDice[k].selected = false;
          }
          state.diceRolls = 0;
          state.isRollButtonVisible = true;
        }
      }
      //Checks if the has been any successful clicks
      if(counter > 0) {
        //Increase the amount of rounds to +1
        state.rounds++;
      }
      //Deselect the skip button
      state.skipSelected = false;
    },
    //This function checks if any of the dice are of value 2
    twos: function(state) {
      var counter = 0;
      if(state.skipSelected == true && state.firstTier[1].value == null) {
        state.firstTier[1].value = 0;
        counter++;
        if(state.firstTier[1].value == 0) {
          for(var j = 0; j < state.allDice.length; j++) {
            state.allDice[j].value = null;
            state.allDice[j].selected = false;
          }
          state.diceRolls = 0;
          state.isRollButtonVisible = true;
        }
      }
      else if(state.firstTier[1].value == null) {
        for(var i = 0; i < state.allDice.length; i++) {
          if(state.allDice[i].value == 2) {
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
        if(state.firstTier[1].value > 0) {
          for(var k = 0; k < state.allDice.length; k++) {
            state.allDice[k].value = null;
            state.allDice[k].selected = false;
          }
          state.diceRolls = 0;
          state.isRollButtonVisible = true;
        }
      }
      if(counter > 0) {
        state.rounds++;
      }
      state.skipSelected = false;
    },
    //This function checks if any of the dice are of value 3
    threes: function(state) {
      var counter = 0;
      if(state.skipSelected == true && state.firstTier[2].value == null) {
        state.firstTier[2].value = 0;
        counter++;
        if(state.firstTier[2].value == 0) {
          for(var j = 0; j < state.allDice.length; j++) {
            state.allDice[j].value = null;
            state.allDice[j].selected = false;
          }
          state.diceRolls = 0;
          state.isRollButtonVisible = true;
        }
      }
      else if(state.firstTier[2].value == null) {
        for(var i = 0; i < state.allDice.length; i++) {
          if(state.allDice[i].value == 3) {
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
        if(state.firstTier[2].value > 0) {
          for(var k = 0; k < state.allDice.length; k++) {
            state.allDice[k].value = null;
            state.allDice[k].selected = false;
          }
          state.diceRolls = 0;
          state.isRollButtonVisible = true;
        }
      }
      if(counter > 0) {
        state.rounds++;
      }
      state.skipSelected = false;
    },
    //This function checks if any of the dice are of value 4
    fours: function(state) {
      var counter = 0;
      if(state.skipSelected == true && state.firstTier[3].value == null) {
        state.firstTier[3].value = 0;
        counter++;
        if(state.firstTier[3].value == 0) {
          for(var j = 0; j < state.allDice.length; j++) {
            state.allDice[j].value = null;
            state.allDice[j].selected = false;
          }
          state.diceRolls = 0;
          state.isRollButtonVisible = true;
        }
      }
      else if(state.firstTier[3].value == null) {
        for(var i = 0; i < state.allDice.length; i++) {
          if(state.allDice[i].value == 4) {
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
        if(state.firstTier[3].value > 0) {
          for(var k = 0; k < state.allDice.length; k++) {
            state.allDice[k].value = null;
            state.allDice[k].selected = false;
          }
          state.diceRolls = 0;
          state.isRollButtonVisible = true;
        }
      }
      if(counter > 0) {
        state.rounds++;
      }
      state.skipSelected = false;
    },
    //This function checks if any of the dice are of value 5
    fives: function(state) {
      var counter = 0;
      if(state.skipSelected == true && state.firstTier[4].value == null) {
        state.firstTier[4].value = 0;
        counter++;
        if(state.firstTier[4].value == 0) {
          for(var j = 0; j < state.allDice.length; j++) {
            state.allDice[j].value = null;
            state.allDice[j].selected = false;
          }
          state.diceRolls = 0;
          state.isRollButtonVisible = true;
        }
      }
      else if(state.firstTier[4].value == null) {
        for(var i = 0; i < state.allDice.length; i++) {
          if(state.allDice[i].value == 5) {
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
        if(state.firstTier[4].value > 0) {
          for(var k = 0; k < state.allDice.length; k++) {
            state.allDice[k].value = null;
            state.allDice[k].selected = false;
          }
          state.diceRolls = 0;
          state.isRollButtonVisible = true;
        }
      }

      if(counter > 0) {
        state.rounds++;
      }
      state.skipSelected = false;
    },
    //This function checks if any of the dice are of value 6
    sixes: function(state) {
      var counter = 0;
      if(state.skipSelected == true && state.firstTier[5].value == null) {
        state.firstTier[5].value = 0;
        counter++;
        if(state.firstTier[5].value == 0) {
          for(var j = 0; j < state.allDice.length; j++) {
            state.allDice[j].value = null;
            state.allDice[j].selected = false;
          }
          state.diceRolls = 0;
          state.isRollButtonVisible = true;
        }
      }
      else if(state.firstTier[5].value == null) {
        for(var i = 0; i < state.allDice.length; i++) {
          if(state.allDice[i].value == 6) {
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
        if(state.firstTier[5].value > 0) {
          for(var k = 0; k < state.allDice.length; k++) {
            state.allDice[k].value = null;
            state.allDice[k].selected = false;
          }
          state.diceRolls = 0;
          state.isRollButtonVisible = true;
        }
      }
      if(counter > 0) {
        state.rounds++;
      }
      state.skipSelected = false;
    },
    //This function checks if there are any ONE pair, and chooses the highest pair
    pair: function(state) {
      var counter = 0;
      if(state.skipSelected == true && state.secondTier[0].value == null) {
        state.secondTier[0].value = 0;
        counter++;
      }
      //Create a temporary array
      var diceValue = [];
      //Iterate through all dice and push them into the temporary array
      for(var i = 0; i < state.allDice.length; i++) {
        diceValue.push(state.allDice[i].value);
      }
      //Sort the temporary array
      diceValue.sort();
      //Iterate through the temporary array
      for(var j = 0; j < diceValue.length -1; j++) {
        //Checks if the value of it's neighbor index holds the same value, and if it does, then it's a pair.
        if(diceValue[j] != null && diceValue[j] == diceValue[j + 1] && state.secondTier[0].value == null && state.secondTier[0].value != 0) {
          //Sets the second tier (pairs) to the value of the pair
          state.secondTier[0].value = diceValue[j] + diceValue[j + 1];
          state.secondTier[9].value += diceValue[j] + diceValue[j + 1];
          counter++;
        }
        else{
          continue;
        }
      }
      //Resets dice values, dice selected, rolls, roll button visibility, deselect skip button
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
    //This function checks if there are any TWO pairs
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
      //Checks if index 0 is the same as index 1 and index 2 is same as index 3
      if(diceValue[0] == diceValue[1] &&
        diceValue[2] == diceValue[3] && diceValue[3] > diceValue[0] && state.secondTier[1].value != 0) {
        state.secondTier[1].value = diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[2] + diceValue[3];
        counter++;
      }
      //Checks if index 0 == index 1 and index 3 == index 4
      else if(diceValue[0] == diceValue[1] &&
        diceValue[3] == diceValue[4] && diceValue[3] > diceValue[0] && state.secondTier[1].value != 0) {
        state.secondTier[1].value = diceValue[0] + diceValue[1] + diceValue[3] + diceValue[4];
        state.secondTier[9].value += diceValue[0] + diceValue[1] + diceValue[3] + diceValue[4];
        counter++;
      }
      //Checks if index 1 == index 2 and index 3 == index 4
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
    //This function checks if there are 3 of the same value
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
        //Checks if the current dice is the same as the following two neighbors [2,2,2,4,6] ex. 0 == 0 + 1 etc.
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
    //This function checks for 4 values of the same kind
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
        //Same as the function above (threeKind) except that this checks for one more index
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
    //This function checks if there are 3 of the same and 2 of the same (full house)
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
    //This function checks if there is a small straight in the dice array ([1,2,3,4,5])
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
    //This function checks if there is a large straight in the dice array ([2,3,4,5,6])
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
      //Checks from 2 to 6 in the array
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
    //This function checks for 5 dice that holds the same value
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
      //Checks that all index are the same and then give the tier field "yatzy" 50 points
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
    //This function adds all the dice values
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
      //Sum of index 1,2,3,4 and 5
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
