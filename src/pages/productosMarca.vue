<template>
  <main>
    <div class="marca"><h1>{{this.$route.params.marca}}</h1></div>
    <div>
      <input v-model="peso" type="radio" value="peso-libre" name="peso">
      <label >Peso Libre</label>
    </div>
    <div>
      <input v-model="peso" type="radio" value="peso-guiado" name="peso">
      <label >Peso Guiado</label>
    </div>
    <div class="productos">
      <div v-if="this.peso!=='peso-libre' && this.peso!=='pesolguiado'" class="producto" v-for="producto in productos">
        <Producto :producto="producto"/>
      </div>
      <div v-else class="producto" v-for="producto in productosCategory">
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
      productosCategory:null,
      peso:null,
      productosPrecioMayorAMenor:null,
      productosPrecioMenorAMayor:null,
    }
  },
  methods: {
    async getApi() {
      debugger
      gymApi.get(`productos/marca/${this.$route.params.marca}/category/${this.peso}`)
          .then(res => {
            this.productosCategory = res.data
          })
          .catch((e) => {
            console.log(e)
          })
      gymApi.get(`productos/marca/${this.$route.params.marca}/alto-bajo`)
          .then(res => {
            this.productosPrecioMayorAMenor = res.data
          })
          .catch((e) => {
            console.log(e)
          })
      gymApi.get(`productos/marca/${this.$route.params.marca}/bajo-alto`)
          .then(res => {
            this.productosPrecioMenorAMayor = res.data
          })
          .catch((e) => {
            console.log(e)
          })
    }
  },
  watch:{
    peso(){
      debugger
      this.getApi()
    }
  }
  ,
  mounted() {
    this.getApi()
    gymApi.get(`productos/marca/${this.$route.params.marca}`)
        .then(res => {
          this.productos = res.data
        })
        .catch((e) => {
          console.log(e)
        })
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