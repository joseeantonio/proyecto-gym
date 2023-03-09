<template>
  <header>
    <section>
      <nav>
        <img src="/src/assets/images/img.png">
        <ul>
          <li v-if="this.$store.state.username" ><router-link to="/updatePerfil">ACTUALIZAR PERFIL</router-link></li>
          <li><router-link to="/listado">MAQUINAS</router-link></li>
          <li v-if="this.$store.state.username" ><router-link to="/carrito">CARRITO</router-link></li>
          <li v-if="this.$store.state.username" ><button @click="cerrarSesion" >CERRAR SESION</button></li>
          <li v-if="!this.$store.state.username" ><router-link to="/login">INICIAR SESION</router-link></li>
          <li v-if="!this.$store.state.username" ><router-link to="/register">REGISTRARME</router-link></li>
        </ul>
      </nav>
    </section>
  </header>
</template>

<script>
export default {
methods:{
  cerrarSesion(){
      this.$store.commit('logoutUsername')
    this.$router.push('/login')
    }
  }
}
</script>


<style scoped>
  header>section>nav>ul>li>a{
    color: white;
  }
  a{
    text-decoration: none;
  }
  header img {
    margin: 7px;
    max-height: 54px;
  }
  nav {
    width: 100%;
    height: 100%;
  }
  section{
    height: 63px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
  }
  header>section>nav{
    display: flex;
  }
  header>section>nav>ul{
    display: flex;
    width: 100%;
    justify-content: end;
  }
  header>section>nav>ul>li{
    margin: 27px;
  }
  button{
    border-radius: 5px;
    background-color: white;
    padding: 8px;
    margin: -8px;
  }
</style>