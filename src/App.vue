
<template>

  <div>
    <NavBar/>
    <router-view />
    <Footer/>
  </div>

</template>


<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import Register from "@/components/Register.vue";
import Login from "@/components/Login.vue";
export default {
  components:{
    Login,
    Register,
    Footer,
    NavBar
  }
}
</script>

<style scoped>

</style>
