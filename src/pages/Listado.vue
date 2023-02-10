<template>
  <main>
    <div v-for="producto in productos">
      <router-link :to="`/producto/`+producto.id">
        <Producto :producto="producto"/>
      </router-link>
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
      limite:20,
    }
  },
  methods:{
  }
  ,
  mounted() {
        gymApi.get(`/productos/paginacion/${this.limite}`)
        .then(res => {this.productos = res.data})
        .catch((e)=>{
          console.log(e)
        })
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