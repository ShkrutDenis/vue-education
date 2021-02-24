<template>
  <!--TODO -->
</template>

<script>
export default {
  name: 'Field',
  // TODO
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