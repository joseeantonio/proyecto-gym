<template>
  <main>
    <h1 v-if="this.$store.state.username" >Cesta de la compra de {{this.$store.state.username}}</h1>
    <div class="productos">
      <div v-if="productos" class="producto" v-for="producto in productos">
        <router-link :to="`/producto/`+producto.id">
          <Producto :producto="producto"/>
        </router-link>
        <h1>Cantidad : {{producto.cantidad}}</h1>
        <button @click="eliminar(producto.id)" ></button>
      </div>
      <div v-else>
        <h1>Cargando</h1>
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
    }
  },
  methods:{
     getcarrito(){
      gymApi.get(`cestas/productosCesta/${this.$store.state.username}`)
          .then(res => {
            this.productos = res.data
            console.log(res.data)
          })
          .catch((e) => {
            console.log(e)
          })
    },
    eliminar(productoid){
      gymApi.delete(`/cestas/anadirProducto/cesta/${productoid}*${this.$store.state.username}`)
          .then(res =>
          {console.log(res.data)
            this.productos = res.data
          }
          )
          .catch((e) => {
            console.log(e)
          })
    }
  }
  ,
  created() {
    this.getcarrito()
  }

}
</script>



<style scoped>
main{
  min-height: 700px;
  background-color: rgba(0, 0, 0, 0.61);
}
main>h1{
  font-size: 60px;
  text-align: center;
  padding: 20px;
}
.productos{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.producto{
  text-align: center;
  margin: 20px 10px 40px;
}
</style>