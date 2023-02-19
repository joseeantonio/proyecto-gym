<template>
  <div>
    <ul>
      <li v-for="producto in productos">
        {{producto.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    productos: {
      type: Array,
      required: true,
    }
  }
}
</script>


<style scoped>

</style>