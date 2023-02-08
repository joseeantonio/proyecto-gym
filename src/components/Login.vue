<template>
  <main>
    <div class="caja-de-fuera">
      <div class="caja">
        <h1>INICIO DE SESION</h1>
        <form class="formulario">
          <label type="name">Nombre de usuario</label>
          <input type="txt">

          <label type="password">Contraseña</label>
          <input type="password">

          <button class="btn btn-dark" type="submit">Iniciar Sesion</button>
        </form>
      </div>
    </div>
  </main>

</template>

<script>
export default {

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