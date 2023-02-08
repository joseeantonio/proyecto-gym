<template>
  <main>

    <div v-for="producto in productos">
      <img :src=producto.image>
      <h1>{{producto.name}}</h1>
    </div>

  </main>

</template>

<script>
import productos from '/src/productos.json'

export default {
  components: {},

  data() {
    return {
      productos: [],
    }
  },
  created() {
    productos.map((producto)=>{this.productos.push(producto)})
  }

}
</script>



<style scoped>

main{
  min-height: 700px;
  background-color: rgba(0, 0, 0, 0.61);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>