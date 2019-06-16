<template>
  <div class="modalBox" v-if="this.$store.state.rounds == 15">
    <div class="modalContent">
        <div class="player-score">
            <h1>Your Score!</h1>
            <h2>{{score}}</h2>
        </div>
        <div>
            <button class="again-button" type="button" @click="replay()">Play Again!</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
      //This function will get the boolean if the modal box should be visible or not.
      score: function(){
        return this.$store.state.secondTier[9].value;
      }
  },
  methods: {
      //This function will reset several states so that the game is replayable. It's called from the play again button.
      replay: function() {
        this.$store.commit('replay');
      },
  }
}
</script>

<style scoped>
.modalBox {
  font-family: 'Passion One', cursive;
  width: 20%;
  height: 100%;
  position: fixed;
  top: 0;
  border: 1px solid black;
  background-color: rgba(255,255,255,1);
}
.modalContent {
  text-align: center;
  background-size: contain;
  background-repeat: repeat;
  padding: 20px 30px;
  color: black;
  font-size: 18px;
  margin: 5% auto;
  width: 60%;
  height: 75vh;
}
h1{
  margin: 0px;
}

.again-button{
  font-family: 'Passion One', cursive;
  background-color: #fff;
  border: 3px solid black;
  border-radius: 12px;
  color: black;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  font-size: 18px;
  box-shadow: 0 9px rgba(0,0,0,0.8);
  margin: 10px;
}
.again-button:hover{
  background-color: #4da0d1;
  cursor: pointer;
}
.again-button:active{
  background-color: #4da0d1;
  box-shadow: 0 5px rgba(0,0,0,0.8);
  transform: translateY(4px);
}
</style>
