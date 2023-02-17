<template>
  <main>
    <div class="caja-de-fuera">
        <div class="caja">
          <h1>REGISTRO</h1>
          <form class="formulario" @submit="checkForm">
            <label type="name">Nombre de usuario</label>
            <input type="text" v-model="name">

            <label type="email">Correo electronico</label>
            <input type="email" v-model="email">

            <label type="password">Contraseña</label>
            <input type="password" v-model="password">

            <label type="password_rep">Repetir contraseña</label>
            <input type="password" v-model="password_rep">

            <div><input class="ckeckbox" type="checkbox" v-model="terminos">Acepto el acuerdo de terminos</div>
            <input class="btn btn-dark" type="submit" value="REGISTRARME">
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
      name : null,
      email : null,
      password : null,
      password_rep : null,
      terminos : null,
    }
  },
  methods:{
    checkForm(e) {
      this.errores = []
      let okey = true
      if (!this.name || !this.email || !this.password || !this.password_rep){
        this.errores.push('Complete todos los campos, son obligatorios.')
        okey = false
      }else{
          if (!/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(this.email)){
            this.errores.push('Email incorrecto.')
            okey = false
          }
          if (this.password.length<6){
            this.errores.push('La contraseña debe de tener al menos 6 caracteres.')
            okey = false
          }else {
            if (this.password !== this.password_rep){
              this.errores.push('Las contraseñas no coinciden.')
              okey = false
            }
          }
      }
      if (okey === true){
        if (!this.terminos){
          this.errores.push('Acepta los terminos.')
        }else {
          const datos = {
            email:this.email,
            password:this.password,
            username:this.name
          }
          gymApi.post(`/users/`,datos)
              .then(res => {this.productosHammer = res.data
                const self=this
                Swal.fire({
                  title: `Te has registrado correctamente ${self.username}`,
                  confirmButtonText: "Aceptar",
                });
                this.$router.push('/login')
              })
              .catch((e)=>{
                console.log(e)
              })
        }
      }
    },
  }

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