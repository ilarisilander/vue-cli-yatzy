<template>
  <div id="app">
    <Dice></Dice>
    <ScoreBoard></ScoreBoard>
    <WinnerBox></WinnerBox>
  </div>
</template>

<script>
import Dice from './components/Dice.vue';
import ScoreBoard from './components/ScoreBoard';
import WinnerBox from './components/WinnerBox';

export default {
  name: 'app',
  components: {
    Dice,
    ScoreBoard,
    WinnerBox,
  }
}
</script>

<style>
body{
  background-color: rgba(61, 12, 84, 0.6);
}
@media screen and (min-width: 768px){
  #app{
    width: 400px;
    margin-left: 40%;
  }
}
/*Mobile*/
@media screen and (max-width: 767px){
  #app{
    width: 300px;
    margin-left: 10%;
  }

}
</style>
