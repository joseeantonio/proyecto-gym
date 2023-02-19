<template>
  <main>
    <div class="caja-de-fuera">
      <div class="caja">
        <h1>{{this.$store.state.username}} ¿Quieres cambiar algo de tu perfil?</h1>
        <form class="formulario" @submit="checkForm">
          <label type="email">Correo electronico</label>
          <input type="email" v-model="email">

          <label type="password">Contraseña</label>
          <input type="password" v-model="password">

          <label type="password_rep">Repetir contraseña</label>
          <input type="password" v-model="password_rep">

          <input class="btn btn-dark" type="submit" value="CONFIRMAR">
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
import Swal from "sweetalert2";
export default {
  data(){
    return{
      errores : [],
      email : null,
      password : null,
      password_rep : null,
    }
  },
  methods:{
    checkForm(e) {
      var datos = {}
      this.errores = []
      let okey = true

      if (!this.email && !this.password){
        this.errores.push('Complete al menos un campo.')
      }
      else {
        if (this.email){
          if (!/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(this.email)){
            this.errores.push('Email incorrecto.')
            okey = false
          }else{
            datos.email=this.email
          }
        }
        if (this.password){
          if (this.password !== this.password_rep){
            this.errores.push('Las contraseñas no coinciden.')
            okey = false
          }else {
            datos.password=this.password
          }
        }
        if (okey){
          gymApi.patch(`/users/update/${this.$store.state.username}`,datos)
              .then(res => {
                if (res.data.msg==='actualizado'){
                  this.$router.push('/carrito')
                  //npm install --save sweetalert2       instalo la libreria de sweetalert para mostrar que ha sido registrado
                  Swal.fire({
                    title: `Usuario ${this.$store.state.username} actualizado`,
                    confirmButtonText: "Aceptar",
                  });
                }
              })
        }
      }
    },
    setUsername(){
      debugger
      this.$store.commit('setUsername',this.name)
    },
  },
}
</script>


<style scoped>
.error{
  color: red;
  font-weight: bolder;
}
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
  padding-top: 120px;
  padding-bottom: 120px;
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
.ckeckbox{
  width: 20px;
}
</style>