<template>
    <router-link :to="`/producto/`+producto.id">
      <div class="carta">
        <img :src=producto.image>
        <h1>{{producto.name}}</h1>
      </div>
    </router-link>
</template>

<script>
export default {
  // Componente que utilizo para mostrar imagen y nombre a la hora del listado, la cesta.
  props:{
    producto: {
      type:Object,
      required:true,
    }
  },
  components: {},
  data() {
    return {
    }
  }
}
</script>



<style scoped>
img{
  max-height: 218px;
}
h1{
  color: black;
  margin: 10px;
  font-size: 20px;
  padding: 3px;
  background-color: white;
  border-radius: 10px;
}
.carta{
  background-color: rgba(130, 137, 148, 0.63);
  border-radius: 15px;
  padding-top: 20px;
  padding-bottom: 10px;
}
</style>