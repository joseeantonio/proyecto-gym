<template>
  <main>
    <div>
      <div v-for="producto in productos">
        <router-link :to="`/producto/`+producto.id">
          <Producto :producto="producto"/>
        </router-link>
      </div>
    </div>
    <button @click="cargarMas">Cargar mas</button>
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
      limite:4,
    }
  },
  methods:{
    cargarMas(){
      this.limite += 4

    },
    async getApi(){
      gymApi.get(`/productos/paginacion/${this.limite}`)
          .then(res => {this.productos = res.data})
          .catch((e)=>{
            console.log(e)
          })
    }
  }
  ,
  watch:{
    limite(){
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
  margin: 20px;
}

div{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

</style>