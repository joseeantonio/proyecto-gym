<template>
  <footer>
    <a href="#">Cookie</a>
    <a href="#">Politica de Privacidad</a>
    <a href="#">Aviso Legal</a>
    <div>
      <i className="fab fa-instagram"></i>
      <i className="fab fa-facebook"></i>
      <i className="fab fa-twitter-square"></i>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>



<style scoped>
footer{
  height: 63px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
a{
  color: white;
}
footer>div>i{
  margin: 4px;
}


</style>