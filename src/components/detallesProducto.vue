<template>
  <main>
    <div class="flecha" >
      <router-link to="/listado"><i class="fas fa-reply"></i></router-link>
    </div>
    <section v-if="producto">
      <div class="caja-afuera-img">
        <div class="imagen">
          <img :src="producto.image" alt="">
        </div>
      </div>
      <div class="detalles">
        <h1>{{producto.name}}</h1>
        <p>{{producto.description}} Es de la marca de {{producto.marca}}, y su categoria es de {{producto.category}}. Todo por un precio de {{producto.size}}.</p>
      </div>
    </section>
    <button class="boton-añadir" :disabled="loading"  @click="confirmarAnadir()" ><i class="fa fa-plus" aria-hidden="true"></i> Añadir a carrito</button>
  </main>
</template>

<script>
import gymApi from "@/api/gymApi";
import Swal from "sweetalert2";

//Utilizo este componente para mostrar todos los detalles de el tiene una opcion de añadir a la cesta.
export default {
  components: {},
  data() {
    return {
      producto:null,
      loading:false,
    }
  },
  async created() {
    //Cogemos los datos del producto
    await gymApi.get(`productos/${this.$route.params.id}`)
        .then(res => {
          this.producto = res.data
        })
        .catch((e) => {
          console.log(e)
        })
  },
  methods:{
    //llamada a la api para que me añada el producto a el carrito de ese usuario almacenado
    anadirCarrito(){
      this.loading=true
      gymApi.post(`/cestas/anadirProducto/cesta/${this.producto.id}*${this.$store.state.username}`)
          .then(res => {
            this.$store.commit('setCantidad',res.data.productos.length)
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
            title: `¿Añadir a carrito?`,
            text: `${this.producto.name}`,
            icon: 'question',
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
.caja-afuera-img{
  display: flex;
  justify-content: center;
}
.imagen{
  text-align: center;
  display: flex;
  justify-content: center;
  width: 400px;
  padding: 1px;
  background-color: rgba(130, 137, 148, 0.63);
  border-radius: 10px 10px 0px 0px;
  border: 3px solid black;
}
.imagen img{
  min-height: 300px;
}
.detalles{
  display: block;
  justify-content: center;
}
.detalles p{
  margin: 0 auto;
  width: 700px;
  font-size: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
  color: white;
}
.boton-añadir{
  padding: 18px;
  margin-bottom: 34px;
  border-radius: 12px;
  background-color: black;
  color: white;
}
img{
  max-height: 200px;
}
h1{
  padding-bottom: 10px;
  padding-top: 10px;
  border-radius: 0px 0px 10px 10px;
  background-color: white;
  width: 400px;
  text-align: center;
  font-size: 50px;
  border: 3px solid black;
  margin: -3px auto 0;
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