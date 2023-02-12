<template>
  <main>
    <div class="marca"><h1>{{this.$route.params.marca}}</h1></div>
    <div>
      <input v-model="peso" type="radio" value="pesoLibre" name="peso">
      <label >Peso Libre</label>
    </div>
    <div>
      <input v-model="peso" type="radio" value="pesoGuiado" name="peso">
      <label >Peso Guiado</label>
    </div>
    <div class="productos">
      <div v-if="this.peso==='pesoLibre'" class="producto" v-for="producto in productosPesoLibre">
        <Producto :producto="producto"/>
      </div>
      <div v-else-if="this.peso==='pesoGuiado'" class="producto" v-for="producto in productosPesoGuiado">
        <Producto :producto="producto"/>
      </div>
      <div v-else class="producto" v-for="producto in productos">
        <Producto :producto="producto"/>
      </div>
    </div>

  </main>
</template>

<script>

import gymApi from "@/api/gymApi";
import Producto from "@/components/Producto.vue";

export default {

  components: {Producto},

  data() {
    return {
      productos:null,
      productosPesoLibre:null,
      productosPesoGuiado:null,
      peso:null,
    }
  },
  methods: {
    async getApi() {
      gymApi.get(`productos/marca/${this.$route.params.marca}`)
          .then(res => {
            this.productos = res.data
          })
          .catch((e) => {
            console.log(e)
          })
      gymApi.get(`productos/marca/${this.$route.params.marca}/peso-guiado`)
          .then(res => {
            this.productosPesoGuiado = res.data
          })
          .catch((e) => {
            console.log(e)
          })
      gymApi.get(`productos/marca/${this.$route.params.marca}/peso-libre`)
          .then(res => {
            this.productosPesoLibre = res.data
          })
          .catch((e) => {
            console.log(e)
          })
    }
  }
  ,
  mounted() {
    this.getApi()
  }
}
</script>



<style scoped>

main{
  min-height: 700px;
  background-color: rgba(0, 0, 0, 0.61);
}
.marca{
  padding: 100px;
  text-align: center;
}
.marca h1 {
  font-size: 70px;
  color: black;
}

button{
  width: 120px;
  height: 20px;
  display: flex;
  margin: 20px auto;
}

.productos{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.producto{
  text-align: center;
  margin: 20px 10px 40px;
}
.div-boton{
  padding: 10px;
}

</style>