<template lang="html">
  <div class="container">
    <div class="score-container">
      <div class="first-tier">
        <div class="rounds">Rounds: {{getRounds}}</div>
        <div class="ones" @click.once="ones()">Ones: {{getOnes}}</div>
        <div class="twos" @click.once="twos()">Twos: {{getTwos}}</div>
        <div class="threes" @click.once="threes()">Threes: {{getThrees}}</div>
        <div class="fours" @click.once="fours()">Fours: {{getFours}}</div>
        <div class="fives" @click.once="fives()">Fives: {{getFives}}</div>
        <div class="sixes" @click.once="sixes()">Sixes: {{getSixes}}</div>
        <div class="total-first">Total: {{getSumFirst}}</div>
        <div class="bonus">Bonus: {{getBonus}}</div>
      </div>
      <div class="second-tier">
        <div class="pairs" @click.once="pair()">Pairs: {{getPair}}</div>
        <div class="two-pairs" @click.once="twoPairs()">Two Pairs: {{getTwoPairs}}</div>
        <div class="three-kind" @click.once="threeKind()">Three of a kind: {{getThreeKind}}</div>
        <div class="four-kind" @click.once="fourKind()">Four of a kind: {{getFourKind}}</div>
        <div class="full-house" @click.once="fullHouse()">Full House: {{getFullHouse}}</div>
        <div class="small-straight" @click.once="smallStraight()">Small Straight: {{getSmallStraight}}</div>
        <div class="large-straight" @click.once="largeStraight()">Large Straight: {{getLargeStraight}}</div>
        <div class="yatzy" @click.once="yatzy()">Yatzy: {{getYatzy}}</div>
        <div class="chance" @click.once="chance()">Chance: {{getChance}}</div>
        <div class="total-second">Total: {{getGrandTotal}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //Calls functions in the store
  methods: {
    ones: function() {
      this.$store.commit('ones');
    },
    twos: function() {
      this.$store.commit('twos');
    },
    threes: function() {
      this.$store.commit('threes');
    },
    fours: function() {
      this.$store.commit('fours');
    },
    fives: function() {
      this.$store.commit('fives');
    },
    sixes: function() {
      this.$store.commit('sixes');
    },
    pair: function() {
      this.$store.commit('pair');
    },
    twoPairs: function() {
      this.$store.commit('twoPairs')
    },
    threeKind: function() {
      this.$store.commit('threeKind')
    },
    fourKind: function() {
      this.$store.commit('fourKind')
    },
    fullHouse: function() {
      this.$store.commit('fullHouse')
    },
    smallStraight: function() {
      this.$store.commit('smallStraight')
    },
    largeStraight: function() {
      this.$store.commit('largeStraight')
    },
    yatzy: function() {
      this.$store.commit('yatzy')
    },
    chance: function() {
      this.$store.commit('chance')
    },

  },
  //Getter for the states in store
  computed: {
    getRounds: function() {
      return this.$store.state.rounds;
    },
    getOnes: function() {
      return this.$store.state.firstTier[0].value;
    },
    getTwos: function() {
      return this.$store.state.firstTier[1].value;
    },
    getThrees: function() {
      return this.$store.state.firstTier[2].value;
    },
    getFours: function() {
      return this.$store.state.firstTier[3].value;
    },
    getFives: function() {
      return this.$store.state.firstTier[4].value;
    },
    getSixes: function() {
      return this.$store.state.firstTier[5].value;
    },
    getSumFirst: function() {
      return this.$store.state.sumFirst;
    },
    getBonus: function() {
      return this.$store.state.bonus;
    },
    getPair: function() {
      return this.$store.state.secondTier[0].value;
    },
    getTwoPairs: function() {
      return this.$store.state.secondTier[1].value;
    },
    getThreeKind: function() {
      return this.$store.state.secondTier[2].value;
    },
    getFourKind: function() {
      return this.$store.state.secondTier[3].value;
    },
    getFullHouse: function() {
      return this.$store.state.secondTier[4].value;
    },
    getSmallStraight: function() {
      return this.$store.state.secondTier[5].value;
    },
    getLargeStraight: function() {
      return this.$store.state.secondTier[6].value;
    },
    getYatzy: function() {
      return this.$store.state.secondTier[7].value;
    },
    getChance: function() {
      return this.$store.state.secondTier[8].value;
    },
    getGrandTotal: function() {
      return this.$store.state.secondTier[9].value;
    },
  }
}
</script>

<style lang="css" scoped>
.score-container{
  width: 20%;
}
.first-tier div{
  background-color: #47c6c0;
  border: 3px solid black;
  border-radius: 10px;
  padding: 4px;
  margin: 3px;
  height: 25px;
  font-size: 15pt;
  cursor: pointer;
}
.second-tier div{
  background-color: #c64747;
  border: 3px solid black;
  border-radius: 10px;
  padding: 4px;
  margin: 3px;
  height: 25px;
  font-size: 15pt;
  cursor: pointer;
}
.first-tier div:hover{
  background-color: #2c7a76;
}
.second-tier div:hover{
  background-color: #7f2f2f;
}
.ones{
  background-color: #fff;
}
</style>
