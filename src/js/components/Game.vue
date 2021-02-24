<template>
  <div class="game">
    <div class="game-header">
      <div class="title">Крестики нолики</div>
      <!--TODO: player info block -->
    </div>
    <div class="game-field">
      <!--TODO: game field block -->
    </div>
  </div>
</template>

<script>
const X = 'X'
const O = 'O'

export default {
  name: 'Game',
  // TODO
}
</script>

<style lang="scss">
.game {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.game-header {
  display: flex;
  flex-direction: column;
  align-self: center;
}

.game-field {
  display: flex;
  width: 350px;
  flex-wrap: wrap;
  justify-content: center;
  align-self: center;
}

.game-button {
  cursor: pointer;
  border: 1px solid;
  border-radius: 5px;
  padding: 5px;
  margin-top: 15px;
  text-align: center;
}
</style>