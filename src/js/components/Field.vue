<template>
  <div :class="{field:true, winner: isWinner, active: isActive}"
       @click="fill">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'Field',
  props: {
    id: {
      type: Number,
      require: true
    },
    isWinner: {
      type: Boolean,
      require: false,
      default: false
    },
    value: {
      type: String,
      require: false,
      default: ''
    }
  },
  computed: {
    isActive() {
      return !this.value
    }
  },
  methods: {
    fill() {
      if (this.isActive) {
        this.$emit('fill', this.id)
      }
    }
  }
}
</script>

<style lang="scss">
.field {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  font-size: 50px;

  &.winner {
    background-color: green;
  }

  &.active {
    cursor: pointer;
  }
}
</style>