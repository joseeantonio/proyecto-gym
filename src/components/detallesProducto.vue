<template>

  <main>
    <section v-if="producto">
      <img :src="producto.image" alt="">
      <div>
        <h1>{{producto.name}}</h1>
        <p>descripcion: {{producto.description}}</p>
        <h3>Precio : {{producto.size}}€</h3>
      </div>
    </section>
    <button @click="anadirCarrito()" >+ Añadir a carrito</button>
  </main>
</template>

<script>

import gymApi from "@/api/gymApi";

export default {

  components: {},

  data() {
    return {
      producto:null,
    }
  },
  async created() {
    await gymApi.get(`productos/${this.$route.params.id}`)
        .then(res => {
          this.producto = res.data
        })
        .catch((e) => {
          console.log(e)
        })
  },
  methods:{
    anadirCarrito(){debugger
      gymApi.post(`/cestas/anadirProducto/cesta/${this.producto.id}*${this.$store.state.username}`)
          .then(res =>  res.data)
          .catch((e)=>{
            console.log(e)
          })

    }
  }
}
</script>



<style scoped>

main{
  min-height: 700px;
  background-color: rgba(0, 0, 0, 0.61);
}

section{
  display: flex;
  justify-content: space-around;
  padding-top: 90px;
  padding-bottom: 90px;
}
img{
  max-height: 200px;
}
h1{
  font-size: 50px;
}
p{
  margin: 50px;
}
button{
  margin-left: 45%;
}

</style>