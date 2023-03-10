<template>
  <main v-if="!cargando">
    <div class="marca"><h1>{{this.$route.params.marca}}</h1></div>
    <section class="filtros">
      <div class="busqueda">
          <input v-on:keyup.enter="buscando" class="input-busqueda" v-model="busqueda" type="search" placeholder="Buscar" />
        <button @click="buscando" class="btn btn-primary">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div class="filtros-categoria-peso">
        <div class="precio">
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
        <div class="categoria" >
          <h4>Categoria:</h4>
          <div>
            <input v-model="peso" type="radio" value="peso-libre" name="categoria">
            <label >Peso Libre</label>
          </div>
          <div>
            <input v-model="peso" type="radio" value="peso-guiado" name="categoria">
            <label >Peso Guiado</label>
          </div>
        </div>
      </div>
      <button class="reset" @click="reset">Restablecer Filtros</button>
    </section>
    <div class="productos">
      <div v-if="estadoBusqueda" class="producto" v-for="producto in productosBusqueda">
        <Producto :producto="producto"/>
      </div>
      <div v-else-if="this.peso===null && this.precio===null" class="producto" v-for="producto in productos">
        <Producto :producto="producto"/>
      </div>
      <div v-else class="producto" v-for="producto in productosFiltro">
        <Producto :producto="producto"/>
      </div>
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
      cargando:true,
      productos:null,
      peso:null,
      precio:null,
      busqueda:null,
      estadoBusqueda:false,
      productosBusqueda:null,
      productosFiltro: null,
      spinnerColor: '#00000'
    }
  },
  methods: {
    async getApi() {
      this.cargando = true
      if (this.peso!==null && this.precio===null){
        gymApi.get(`productos/marca/${this.$route.params.marca}/category/${this.peso}`)
            .then(res => {
              this.productosFiltro = res.data
              this.cargando = false
            })
            .catch((e) => {
              console.log(e)
            })
      }
      else if (this.peso===null && this.precio!==null){
        gymApi.get(`productos/marca/${this.$route.params.marca}/${this.precio}`)
            .then(res => {
              this.productosFiltro = res.data
              this.cargando = false
            })
            .catch((e) => {
              console.log(e)
            })
            .finally(()=> this.cargando = false)
      }else if (this.peso!==null && this.precio!==null){
        gymApi.get(`productos/marca/${this.$route.params.marca}/${this.precio}`)
            .then(res => {
              const listaPrecio = res.data
              let peso = this.peso.replace('-',' ')
              let lista = []
              for (let i=0;i<listaPrecio.length;i++){
                if (listaPrecio[i].category===peso){
                  lista.push(listaPrecio[i])
                }
              }
              this.productosFiltro = lista
              this.cargando = false
            })
            .catch((e) => {
              console.log(e)
            })
      }else{
        this.cargando = false
      }
    },
    reset(){
      this.precio = null
      this.peso = null
      this.estadoBusqueda=false
      this.productosBusqueda=null
      this.busqueda = null
      this.cargando = false
    },
    buscando(){
      this.cargando = true
      this.estadoBusqueda=true
      gymApi.get(`productos/marca/${this.$route.params.marca}/busqueda/${this.busqueda}`)
          .then(res => {
            this.productosBusqueda = res.data
          })
          .catch((e) => {
            console.log(e)
          })
          .finally(()=> this.cargando = false)
    },
  },
  watch:{
    peso(){
      this.getApi()
    },
    precio(){
      this.getApi()
    }
  }
  ,
  created() {
    this.getApi()
    this.cargando = true
    gymApi.get(`productos/marca/${this.$route.params.marca}`)
        .then(res => {
          this.productos = res.data
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(()=> this.cargando = false)
  }
}
</script>


<style scoped>


input[type=radio]{
  height: 20px;
  width: 20px;
  border-radius: 100%;
  left: 15px;
}

.div-cargando{
  height: 700px;
}

.filtros{
  margin-bottom: 60px;
}

.reset{
  padding-bottom: 50px;
  padding-top: 15px;
  font-size: 20px;
  border-radius: 6px;
  color: white;
  background-color: black;
}

.filtros-categoria-peso{
  display: flex;
  justify-content: center;
  margin: 40px;
}
.filtros>div>div>div{
  margin-bottom: 10px;
}

.filtros-categoria-peso>*{
  margin: 30px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
}

.filtros-categoria-peso h4 {
  font-size: 20px;
  margin-bottom: 20px;
}
.precio{
  margin-right: 140px;
}


main{
  min-height: 700px;
  background-color: rgba(0, 0, 0, 0.61);
}
a{
  text-decoration: none;
}
.marca{
  padding: 80px;
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