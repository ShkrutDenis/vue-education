<template>
  <div class="game">
    <div class="game-header">
      <div class="title">Крестики нолики</div>
      <div v-if="!gameOver" class="subtitle">Ходит: {{ stepLabel }}</div>
      <div v-else>
        <div class="subtitle">{{ winner ? `Ура! Победитель "${winner}"` : 'Ничья'}}</div>
      </div>
    </div>
    <div class="game-field">
      <field v-for="(f,i) in fields" :key="i"
             :id="i"
             :is-winner="f.isWinner"
             :value="f.value"
             @fill="changeValue"
      ></field>
      <div v-if="gameOver" class="game-button" @click="init">Играть снова</div>
    </div>
  </div>
</template>

<script>
const X = 'X'
const O = 'O'

export default {
  name: 'Game',
  data() {
    return {
      fields: [],
      turn: X,
      gameOver: false,
      winner: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.fields = []
      for (let i = 0; i < 9; i++) {
        this.fields.push({
          isWinner: false,
          value: null
        })
      }
      this.turn = X
      this.gameOver = false
      this.winner = null
    },
    changeValue(id) {
      this.fields[id].value = this.turn
      this.turn = this.turn === X ? O : X
    },
    hasWinner(player) {
      if (this.hasWinnerHorizontal(player)) {
        return true
      }
      if (this.hasWinnerVertical(player)) {
        return true
      }
      return this.hasWinnerDiagonal(player)
    },
    hasWinnerHorizontal(player) {
      for (let i = 0; i <= 2; i++) {
        let index = i * 3
        if (this.fields[index].value === player && this.fields[index+1].value === player && this.fields[index+2].value === player) {
          this.fields[index].isWinner = this.fields[index+1].isWinner = this.fields[index+2].isWinner = true
          return true
        }
      }
      return false
    },
    hasWinnerVertical(player) {
      for (let i = 0; i <= 2; i++) {
        if (this.fields[i].value === player && this.fields[i+3].value === player && this.fields[i+6].value === player) {
          this.fields[i].isWinner = this.fields[i+3].isWinner = this.fields[i+6].isWinner = true
          return true
        }
      }
      return false
    },
    hasWinnerDiagonal(player) {
      if (this.fields[0].value === player && this.fields[4].value === player && this.fields[8].value === player) {
        this.fields[0].isWinner = this.fields[4].isWinner = this.fields[8].isWinner = true
        return true
      }
      if (this.fields[2].value === player && this.fields[4].value === player && this.fields[6].value === player) {
        this.fields[2].isWinner = this.fields[4].isWinner = this.fields[6].isWinner = true
        return true
      }
      return false
    },
    isDraw() {
      return this.fields.every(f => !!f.value)
    }
  },
  computed: {
    stepLabel() {
      return this.turn === X ? 'Крестик' : 'Нолик'
    }
  },
  watch: {
    turn(newVal, oldVal) {
      if (this.hasWinner(oldVal)) {
        this.winner = oldVal
        this.gameOver = true
        return
      }
      this.gameOver = this.isDraw()
    }
  }
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