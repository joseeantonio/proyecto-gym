<template>
  <main>

    <h1 v-if="this.$store.state.username" >Cesta de la compra de {{this.$store.state.username}}</h1>
    <div class="producto" v-for="producto in productos">
      <router-link :to="`/producto/`+producto.id">
        <Producto :producto="producto"/>
      </router-link>
    </div>

  </main>

</template>

<script>

import gymApi from "@/api/gymApi";

export default {

  components: {},

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
          })
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
</style>