<template>
  <main>

    <h1 v-if="this.$store.state.username" >Cesta de la compra de {{this.$store.state.username}}</h1>
    <h1 v-else >Cesta de la compra</h1>
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