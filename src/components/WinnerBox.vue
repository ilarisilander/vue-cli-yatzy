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
  background-color: rgba(225,225,225,1);
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
.cup{
  height: 20vh;
}
.winning-player{
  margin-top: 10vh;
}
.button-close {
  float:inline-start;
  margin: 0px;
  cursor: pointer;
  float: right;
  border: none;
  font-size: 28px;
  padding: 0px;
  font-weight: bold;
  color: black;
  background: transparent;
}
/*Temporary CSS for the replay button*/
.again-button{
  font-family: 'Passion One', cursive;
  background-color: #fff;
  border: 2px solid black;
  border-radius: 12px;
  color: black;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  font-size: 18px;
  box-shadow: 0 9px #725119;
  margin: 10px;
}
.again-button:hover{
  background-color: #4da0d1;
  cursor: pointer;
}
.again-button:active{
  background-color: #4da0d1;
  box-shadow: 0 5px #493410;
  transform: translateY(4px);
}
.add-button{
  font-family: 'Passion One', cursive;
  background-color: #fff;
  border: 2px solid black;
  border-radius: 12px;
  color: black;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  font-size: 18px;
  box-shadow: 0 9px #725119;
  margin: 10px;
}
.add-button:hover{
  background-color: #4da0d1;
  cursor: pointer;
}
.add-button:active{
  background-color: #4da0d1;
  box-shadow: 0 5px #493410;
  transform: translateY(4px);
}
</style>
