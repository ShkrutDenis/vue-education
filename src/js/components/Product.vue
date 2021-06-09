<template>
  <div>
    <div>{{ id }}</div>
    <div>{{ name }}</div>
    <div>{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    id: {
      type: Number,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: false
    },
  }
}
</script>

<style scoped>

</style>
