<template>
  <main>
    <div class="caja-de-fuera">
      <div class="caja">
        <h1>INICIO DE SESION</h1>
        <form class="formulario" @submit="iniciarSesion">
          <label type="name">Nombre de usuario</label>
          <input type="txt" v-model="username">

          <label type="password">Contraseña</label>
          <input type="password" v-model="password">

          <input class="btn btn-dark" type="submit" value="INICIAR SESION">

          <div>
            <h1 class="error" v-for="error in errores">{{error}}</h1>
          </div>

        </form>
      </div>
    </div>
  </main>

</template>

<script>
import gymApi from "@/api/gymApi";
import router from "@/router/router";
import Swal from "sweetalert2";

export default {

  data(){
    return{
      errores:[],
      username:null,
      password:null,
      mensaje:null,
    }
  },

  methods: {
    iniciarSesion(){
      this.errores=[]
      if (!this.password || !this.username){
        this.errores.push('Rellene todos los campos por favor')
      }else{
        const datos = {
          password:this.password,
          username:this.username
        }
        gymApi.post(`users/autentificacion/`,datos)
            .then(res => {
              if (res.data.msg ==='registrado'){
                this.$router.push('/listado')
                this.setUsername()
                Swal.fire({
                  title: `Has iniciado sesion`,
                  confirmButtonText: "OK",
                });
              }else {
                this.errores.push('Debes de registrarte')
              }
            })
      }
    },
    setUsername(){
      this.$store.commit('loginUsername',this.username)
    },
  },

}
</script>



<style scoped>
input{
  width: 300px;
  text-align: center;
}
label{
  width: 300px;
}
main>div>div>h1{
  text-align: center;
  margin: 30px;
}
.caja-de-fuera{
  padding-top: 150px;
}
.error{
  color: red;
}
.caja{
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  margin: auto;
  background-color: white;
  border-radius: 15px;
}
main{
  min-height: 700px;
  background-color: rgba(0, 0, 0, 0.61);
}
.formulario{
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto 30px;
  width: 400px;
}
.formulario>*{
  margin: 0 auto 10px;
}

</style>