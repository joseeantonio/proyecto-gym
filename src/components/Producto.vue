<template>
    <router-link :to="`/producto/`+producto.id">
      <img :src=producto.image>
      <h1>{{producto.name}}</h1>
    </router-link>
</template>

<script>

export default {

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
  },
}
</script>



<style scoped>
img{
  max-height: 218px;
}
h1{
  color: white;
  margin: 10px;
}

</style>