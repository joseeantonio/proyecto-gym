<template>
  <img :src=producto.image>
  <h1>{{producto.name}}</h1>
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

</style>