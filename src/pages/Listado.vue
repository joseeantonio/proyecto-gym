<template>
  <main v-if="!cargando">
    <div class="marcas">
      <div class="marca"> <router-link to="/productos/Hammer"><h1>Hammer</h1></router-link></div>
      <div class="marca"> <router-link to="/productos/Matrix"><h1>Matrix</h1></router-link></div>
    </div>
    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="productos">
      <div class="producto" v-for="producto in productos">
        <router-link :to="`/producto/`+producto.id">
          <Producto :producto="producto"/>
        </router-link>
      </div>
    </div>
    <div v-if="limite<39 && !loading" class="div-boton">
      <button class="cargar-mas"  @click="cargarMas"><i class="fa fa-plus" aria-hidden="true"></i></button>
    </div>
  </main>
  <main v-else>
    <div class="div-cargando">
      <loading v-model:active="cargando"
               :can-cancel="true"
               :is-full-page="true"/>
    </div>
  </main>
</template>

<script>
import gymApi from "@/api/gymApi";
import Producto from "@/components/Producto.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: {Producto,Loading},
  data() {
    return {
      todosLosProductos:null,
      productos:null,
      limite:12,
      productosHammer:null,
      hammer:null,
      productosMatrix:null,
      matrix:null,
      cargando:true,
    }
  },
  methods:{
    cargarMas(){
      this.limite += 12
    },
    async getApi(){
      this.cargando = true
      gymApi.get(`/productos/paginacion/${this.limite}`)
          .then(res => {this.productos = res.data
            this.cargando = false})
          .catch((e)=>{
            console.log(e)
          })
    },
  }
  ,
  watch:{
    limite(){
      this.getApi()
    }
  }
  ,
  created() {
    this.getApi()
  },
}
</script>



<style scoped>
main{
  min-height: 700px;
  background-color: rgba(0, 0, 0, 0.61);
}

.cargar-mas{
  display: flex;
  justify-content: center;
  padding: 12px;
  text-align: center;
  border-radius: 50%;
  background-color: black;
  color: white;
}

a{
  text-decoration: none;
}
.marcas{
  display: flex;
  justify-content: center;
}
.marca{
  margin: 100px;
}
.marca h1{
  font-size: 70px;
  color: black;
}
button{
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