<template>
  <div class="game">
    <div class="game-header">
      <div class="title">Крестики нолики</div>
      <div v-if="!gameOver" class="subtitle">Ходит: {{ stepLabel }}</div>
      <div v-else>
        <div class="subtitle"> {{ winner ? `'Ура! Победитель "${winner}"` : 'Ничья' }}</div>
      </div>
    </div>
    <div class="game-field">
      <field v-for="(f, i) in fields" :key="i"
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
  watch: {
    turn(newVal, oldVal) {
      if (this.hasWinner(oldVal)) {
        this.winner = oldVal
        this.gameOver = true
        return
      }
      this.gameOver = this.isDraw()
    }
  },
  computed: {
    stepLabel() {
      return this.turn === X ? 'Крестик' : 'Нолик'
    }
  },
  methods: {
    init() {
      this.fields = []
      for (let i = 0; i < 9; i++) {
        this.fields.push({
          isWinner: false,
          value: null,
        })
      }
      this.turn = X
      this.gameOver = false
      this.winner = null
    },
    changeValue(i) {
      if (this.gameOver) return
      this.fields[i].value = this.turn
      this.turn === X ? this.turn = O : this.turn = X
    },
    isDraw() {
      return !this.fields.some(f => {
        if (!f.value) {
          return true
        }
      })
    },
    hasWinner(winner) {
      if (this.checkWinnerOnLines(winner)) {
        return true
      }
      return this.checkWinnerOnDiagonals(winner)
    },
    checkWinnerOnLines(winner) {
      for (let i = 0; i < 3; i++) {
        let index = i
        // check vertical line
        if (this.fieldsIsSame(this.fields[index].value, this.fields[index + 3].value, this.fields[index + 6].value, winner)) {
          this.fields[index].isWinner = this.fields[index + 3].isWinner = this.fields[index + 6].isWinner = true
          return true
        }
        // check horizontal line
        index = i + 2 * i
        if (this.fieldsIsSame(this.fields[index].value, this.fields[index + 1].value, this.fields[index + 2].value, winner)) {
          this.fields[index].isWinner = this.fields[index + 1].isWinner = this.fields[index + 2].isWinner = true
          return true
        }
      }
      return false
    },
    checkWinnerOnDiagonals(winner) {
      if (this.fieldsIsSame(this.fields[0].value, this.fields[4].value, this.fields[8].value, winner)) {
        this.fields[0].isWinner = this.fields[4].isWinner = this.fields[8].isWinner = true
        return true
      }
      if (this.fieldsIsSame(this.fields[2].value, this.fields[4].value, this.fields[6].value, winner)) {
        this.fields[2].isWinner = this.fields[4].isWinner = this.fields[6].isWinner = true
        return true
      }
      return false
    },
    fieldsIsSame(f1, f2, f3, w) {
      return f1 === f2 && f2 === f3 && f3 === w
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