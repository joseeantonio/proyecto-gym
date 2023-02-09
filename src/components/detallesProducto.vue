<template>

  <h1>{{id}}</h1>

</template>

<script>

export default {

  components: {},

  data() {
    return {
      id : this.$route.params.id
    }
  },
}
</script>



<style scoped>

</style>