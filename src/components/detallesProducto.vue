<template>
  <main>
    <div class="flecha" >
      <router-link to="/listado"><i class="fas fa-reply"></i></router-link>
    </div>
    <section v-if="producto">
      <img :src="producto.image" alt="">
      <div>
        <h1>{{producto.name}}</h1>
        <p>descripcion: {{producto.description}}</p>
        <h3>Precio : {{producto.size}}€</h3>
      </div>
    </section>
    <button :disabled="loading"  @click="confirmarAnadir()" >+ Añadir a carrito</button>
  </main>
</template>

<script>
import gymApi from "@/api/gymApi";
import Swal from "sweetalert2";
export default {
  components: {},
  data() {
    return {
      producto:null,
      loading:false,
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
    //llamada a la api para que me añada el producto a el carrito de ese usuario almacenado en el backend
    anadirCarrito(){
      this.loading=true
      gymApi.post(`/cestas/anadirProducto/cesta/${this.producto.id}*${this.$store.state.username}`)
          .then(res => {
                res.data
            this.loading=false
              }
          )
          .catch((e)=>{
            console.log(e)
          })
    },
    confirmarAnadir(){
      Swal
          .fire({
            title: `${this.producto.name}`,
            text: "¿Añadir a carrito?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: "Sí, añadir",
            cancelButtonText: "Cancelar",
          })
          .then(resultado => {
            if (resultado.value) {
              this.anadirCarrito()
            }
          });
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
.fas{
  color: white;
  font-size: 80px;
}
.flecha{
  padding-top: 50px;
  padding-left: 80px;
}

</style>