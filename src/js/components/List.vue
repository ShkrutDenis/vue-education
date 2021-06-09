<template>
  <div>
    <product v-for="(p, i) in items" :key="i">
      {{p.Name}}
    </product>
    <product
  </div>
</template>

<script>
import axios from "axios";
import Product from "./Product.vue";

export default {
  name: "List",
  components: {Product},
  data() {
    return {
      items: [],
      meta: {}
    }
  },
  methods: {
    async getData() {
      await axios.get('http://localhost:12012/call').then(res => {
        this.items = res.data.items
        this.meta = res.data.meta
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
</style>
