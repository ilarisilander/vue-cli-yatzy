import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    allDice: [
      {id: 1, value: 1, selected: false},
      {id: 2, value: 2, selected: false},
      {id: 3, value: 3, selected: false},
      {id: 4, value: 4, selected: false},
      {id: 5, value: 5, selected: false},
      {id: 6, value: 6, selected: false},
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
    ],

    diceRolls: 0,
  },
  mutations: {

  }
});
