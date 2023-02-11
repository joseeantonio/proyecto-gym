<template>
  <main>
    <p>Marca: Hammer <input type="checkbox" v-model="hammer"  name="marca" value="hammer">  Matrix <input type="checkbox" v-model="matrix" name="marca" value="matrix"></p>
    <div class="productos">
      <div v-if="matrix && !hammer" class="producto" v-for="producto in productosMatrix">
        <router-link :to="`/producto/`+producto.id">
          <Producto :producto="producto"/>
        </router-link>
      </div>
      <div v-if="!matrix && hammer" class="producto" v-for="producto in productosHammer">
        <router-link :to="`/producto/`+producto.id">
          <Producto :producto="producto"/>
        </router-link>
      </div>
      <div v-else class="producto" v-for="producto in productos">
        <router-link :to="`/producto/`+producto.id">
          <Producto :producto="producto"/>
        </router-link>
      </div>
    </div>
    <div class="div-boton">
      <button @click="cargarMas">Cargar mas</button>
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
      todosLosProductos:null,
      productos:null,
      limite:12,
      productosHammer:null,
      hammer:null,
      productosMatrix:null,
      matrix:null,
    }
  },
  methods:{
    cargarMas(){
      this.limite += 12
    },
    async getApi(){
      gymApi.get(`/productos/paginacion/${this.limite}`)
          .then(res => {this.productos = res.data})
          .catch((e)=>{
            console.log(e)
          })
      gymApi.get(`/productos/marca/Hammer`)
          .then(res => {this.productosHammer = res.data})
          .catch((e)=>{
            console.log(e)
          })
      gymApi.get(`/productos/marca/Matrix`)
          .then(res => {this.productosMatrix = res.data})
          .catch((e)=>{
            console.log(e)
          })
    }
  }
  ,
  watch:{
    limite(){
      debugger
      this.getApi()
    }
  }
  ,
  mounted() {
    this.getApi()
  },

}
</script>



<style scoped>

main{
  min-height: 700px;
  background-color: rgba(0, 0, 0, 0.61);
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