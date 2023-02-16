<template>
  <main>
    <div class="marca"><h1>{{this.$route.params.marca}}</h1></div>
    <section class="filtros">
      <div class="busqueda">
          <input class="input-busqueda" v-model="busqueda" type="search" placeholder="Buscar" />
        <button @click="buscando" class="btn btn-primary">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div v-if="peso===null && estadoBusqueda!==true" class="precio">
        <h4>Precio:</h4>
        <div>
          <input v-model="precio" type="radio" value="alto-bajo" name="precio">
          <label >De Mayor a Menor</label>
        </div>
        <div>
          <input v-model="precio" type="radio" value="bajo-alto" name="precio">
          <label >De Menor a Mayor</label>
        </div>
      </div>
      <div v-if="estadoBusqueda!==true" class="categoria" >
        <h4>Categoria:</h4>
        <div>
          <input @click="resetPrecio" v-model="peso" type="radio" value="peso-libre" name="peso">
          <label >Peso Libre</label>
        </div>
        <div>
          <input @click="resetPrecio" v-model="peso" type="radio" value="peso-guiado" name="peso">
          <label >Peso Guiado</label>
        </div>
      </div>
      <button class="reset" @click="reset">Restablecer Filtros</button>
    </section>
    <div class="productos">
      <div v-if="estadoBusqueda" class="producto" v-for="producto in productosBusqueda">
        <Producto :producto="producto"/>
<!--        Controlar si la busqueda no devuelve ningun objeto-->
      </div>
      <div v-else-if="this.peso===null && this.precio===null" class="producto" v-for="producto in productos">
        <Producto :producto="producto"/>
      </div>
      <div v-else-if="this.precio!==null" class="producto" v-for="producto in productosPrecio">
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
      productosPrecio:null,
      precio:null,
      busqueda:null,
      estadoBusqueda:false,
      productosBusqueda:null,
    }
  },
  methods: {
    async getApi() {
      gymApi.get(`productos/marca/${this.$route.params.marca}/category/${this.peso}`)
          .then(res => {
            this.productosCategory = res.data
          })
          .catch((e) => {
            console.log(e)
          })
      gymApi.get(`productos/marca/${this.$route.params.marca}/${this.precio}`)
          .then(res => {
            this.productosPrecio = res.data
          })
          .catch((e) => {
            console.log(e)
          })
    },
    reset(){
      this.precio = null
      this.peso = null
      this.estadoBusqueda=false
      this.productosBusqueda=null
      this.busqueda = null
    },
    resetPrecio(){
      this.precio = null
    },
    buscando(){
      this.estadoBusqueda=true
      debugger
      gymApi.get(`productos/marca/${this.$route.params.marca}/busqueda/${this.busqueda}`)
          .then(res => {
            this.productosBusqueda = res.data
          })
          .catch((e) => {
            console.log(e)
          })
    },
  },
  watch:{
    peso(){
      debugger
      this.getApi()
    },
    precio(){
      debugger
      this.getApi()
    }
  }
  ,
  created() {
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
.btn{
  width: 40px;
  height: 40px;
  margin: 0px;
}
.fas{
  margin-top: 5px;
}
.busqueda{
  display: flex;
  justify-content: center;
}
.reset{
  width: 150px;
  height: 25px;
  display: flex;
  justify-content: center;
}

</style>