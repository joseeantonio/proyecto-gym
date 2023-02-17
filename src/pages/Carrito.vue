<template>
  <main>
    <h1 v-if="this.$store.state.username" >Cesta de la compra de {{this.$store.state.username}}</h1>

    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="carrito-vacio" v-else-if="productos===null ||productos.length===0">
      <h1>AÑADE ALGO A LA CESTA </h1>
    </div>
    <div v-else class="productos">
      <div v-if="productos" class="producto" v-for="producto in productos">
        <router-link :to="`/producto/`+producto.id">
          <Producto :producto="producto"/>
        </router-link>
        <h1>Cantidad : {{producto.cantidad}}</h1>
        <button @click="eliminar(producto.id)" ><i class="fa fa-trash" aria-hidden="true"></i>
        </button>
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
      loading:true,
    }
  },
  methods:{
     getcarrito(){
       this.loading=true
      gymApi.get(`cestas/productosCesta/${this.$store.state.username}`)
          .then(res => {
            this.productos = res.data
            this.loading=false
          })
          .catch((e) => {
            console.log(e)
          })
    },
    eliminar(productoid){
      this.loading=true
      gymApi.delete(`/cestas/anadirProducto/cesta/${productoid}*${this.$store.state.username}`)
          .then(res =>
          {console.log(res.data)
            this.productos = res.data
            this.loading=false
          }
          )
          .catch((e) => {
            console.log(e)
          })
    }
  }
  ,
  created() {
    this.loading=true
    this.getcarrito()
    this.loading=false
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
.carrito-vacio{
  display: flex;
  justify-content: center;
}
.carrito-vacio>h1{
  margin: 150px;
  font-size: 30px;
}
</style>