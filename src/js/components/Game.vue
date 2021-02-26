<template>
  <div class="game">
    <div class="game-header">
      <div class="title">Крестики нолики</div>
      <div v-if="!gameOver" class="subtitle">
        Ходит: {{ stepLabel }}
      </div>
      <div v-else>
        <div class="subtitle">{{ winner ? `Ура! Победитель "${winner}"` : 'Ничья' }}</div>
      </div>
    </div>
    <div class="game-field">
      <field v-for="(f, i) in fields" :key="i"
             :id="i"
             :is-winner="f.isWinner"
             :value="f.value"
             :game-over="gameOver"
             @fill="changeValue">
      </field>
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
  computed: {
    stepLabel() {
      return this.turn === X ? 'Крестик' : 'Нолик'
    }
  },
  watch: {
    turn(newValue, oldValue) {
      if (this.hasWinner(oldValue)) {
        this.winner = oldValue
        this.gameOver = true
        return
      }
      this.gameOver = this.isDraw()
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
          value: ''
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
    hasWinner(value) {
      if (this.winnerInVertical(value)) {
        return true
      }
      if (this.winnerInHorizontal(value)) {
        return true
      }
      return this.winnerInDiagonal(value);
    },
    winnerInVertical(value) {
      for (let i = 0; i < 3; i++) {
        if (this.fields[i].value === value &&
            this.fields[i + 3].value === value &&
            this.fields[i + 6].value === value) {
          this.fields[i].isWinner = this.fields[i + 3].isWinner = this.fields[i + 6].isWinner = true
          return true;
        }
      }
      return false
    },
    winnerInHorizontal(value) {
      for (let i = 0; i < 3; i++) {
        if (this.fields[i * 3].value === value &&
            this.fields[i * 3 + 1].value === value &&
            this.fields[i * 3 + 2].value === value) {
          this.fields[i * 3].isWinner = this.fields[i * 3 + 1].isWinner = this.fields[i * 3 + 2].isWinner = true
          return true
        }
      }
      return false
    },
    winnerInDiagonal(value) {
      if (this.fields[0].value === value &&
          this.fields[4].value === value &&
          this.fields[8].value === value) {
        this.fields[0].isWinner = this.fields[4].isWinner = this.fields[8].isWinner = true
        return true
      }
      if (this.fields[2].value === value &&
          this.fields[4].value === value &&
          this.fields[6].value === value) {
        this.fields[2].isWinner = this.fields[4].isWinner = this.fields[6].isWinner = true
        return true
      }
      return false
    },
    isDraw() {
      let isDraw = true
      this.fields.forEach(i => {
        if (!i.value) {
          isDraw = false
        }
      })
      return isDraw
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