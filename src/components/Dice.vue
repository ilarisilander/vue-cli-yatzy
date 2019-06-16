<template lang="html">
  <div class="container">
    <div class="roll-button">
      <button class="button" type="button" @click="rollDice" v-if="isRollButtonVisible">Roll Dice</button>
      <button class="button" :class="{skipped: skipSelected}" type="button" @click="skip">Skip</button>
    </div>

    <div class="dice-container">
      <div class="dice" v-for="dice in getDice"
        :value="dice.value"
        :key="dice.id"
        :class="{selected: dice.selected}"
        @click="isSelected(dice.id)">
        <p>{{dice.value}}</p>

        <!-- <img class="diceImage" v-bind:src="dice.image"> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //Calls functions in the store
  methods: {
    rollDice: function() {
      this.$store.commit("rollDice");
    },
    skip: function() {
      this.$store.commit('skip');
    },
    isSelected(payload) {
      this.$store.commit('isSelected', payload);
    },
  },
  //Getter for the states in store
  computed: {
    getDice() {
      return this.$store.state.allDice;
    },
    isRollButtonVisible() {
      return this.$store.state.isRollButtonVisible;
    },
    selected() {
      return this.$store.state.selected;
    },
    skipSelected() {
      return this.$store.state.skipSelected;
    }
  }
}
</script>

<style lang="css" scoped>
.dice:hover{
  background-color: #b20000;
}
/*Desktop*/
@media screen and (min-width: 768px) {
  .container{
    width: 100%;
  }
  .dice-container{
    display:inline-block;
    margin-left: 2%;
  }
  .dice{
    display: inline-block;
    width: 40px;
    height: 45px;
    margin: 8px;
    padding-left: 14px;
    border: 2px solid red;
    font-size: 14pt;
    font-weight:bold;
    font-family:monospace;
    color: white;
    background-color: #ff0000;
    border-radius: 10px;
    border: 3px solid #8c0000;
    box-shadow: 0 9px rgba(0,0,0,0.6);
  }
  .dice p {
    font-size: 20pt;
    text-align:center;
    margin-top: 18%;
    margin-right: 32%;
  }
  .dice:hover{
    cursor: pointer;
  }
  .roll-button{
    margin-left: 20%;
  }
  .button{
    font-family: 'Passion One', cursive;
    background-color: #47c6c0;
    border: 2px solid black;
    border-radius: 12px;
    color: black;
    padding: 10px 20px;
    text-align: center;
    display: inline-block;
    font-size: 18px;
    box-shadow: 0 9px rgba(0,0,0,0.6);
    margin: 10px;
  }
  .button:hover{
    background-color: #2c7a76;
    cursor: pointer;
  }
  .button:active{
    box-shadow: 0 5px rgba(0,0,0,0.6);
    transform: translateY(4px);
  }
  .selected{
    background-color: #b20000;
    box-shadow: 0 5px rgba(0,0,0,0.6);
    transform: translateY(4px);
  }
  .skipped{
    box-shadow: 0 5px rgba(0,0,0,0.6);
    transform: translateY(4px);
    background-color: #2c7a76;
  }
}
@media screen and (max-width: 767px){
  .container{
    width: 100%;
  }
  .dice-container{
    display:inline-block;
    margin-left: 2%;
  }
  .dice{
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 4px;
    margin-bottom: 12px;
    padding-left: 14px;
    border: 2px solid red;
    font-size: 10pt;
    font-weight:bold;
    font-family:monospace;
    color: white;
    background-color: #ff0000;
    border-radius: 10px;
    border: 3px solid #8c0000;
    box-shadow: 0 9px rgba(0,0,0,0.6);
  }
  .dice p {
    font-size: 14pt;
    text-align:center;
    margin-top: 18%;
    margin-right: 32%;
  }
  .dice:hover{
    cursor: pointer;
  }
  .roll-button{
    margin-left: 20%;
  }
  .button{
    font-family: 'Passion One', cursive;
    background-color: #47c6c0;
    border: 2px solid black;
    border-radius: 12px;
    color: black;
    padding: 10px 20px;
    text-align: center;
    display: inline-block;
    font-size: 18px;
    box-shadow: 0 9px rgba(0,0,0,0.6);
    margin: 10px;
  }
  .button:hover{
    background-color: #2c7a76;
    cursor: pointer;
  }
  .button:active{
    box-shadow: 0 5px rgba(0,0,0,0.6);
    transform: translateY(4px);
  }
  .selected{
    background-color: #b20000;
    box-shadow: 0 5px rgba(0,0,0,0.6);
    transform: translateY(4px);
  }
  .skipped{
    box-shadow: 0 5px rgba(0,0,0,0.6);
    transform: translateY(4px);
    background-color: #2c7a76;
  }
}
</style>
