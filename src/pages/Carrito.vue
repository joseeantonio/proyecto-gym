<template>
  <main>

    <h1>Cesta de la compra de {{this.$store.state.username}}</h1>
    <div>
      <h3>listado de la compra</h3>
    </div>

  </main>

</template>

<script>

export default {

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