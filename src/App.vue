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

</style>
