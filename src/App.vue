<template>
  <div id="app">
    <Dice></Dice>
    <ScoreBoard></ScoreBoard>
  </div>
</template>

<script>
import Dice from './components/Dice.vue';
import ScoreBoard from './components/ScoreBoard';

export default {
  name: 'app',
  components: {
    Dice,
    ScoreBoard,
  }
}
</script>

<style>

</style>
