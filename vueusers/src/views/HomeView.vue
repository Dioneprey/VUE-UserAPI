<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <router-link to="/login"><h1>LOGIN</h1></router-link>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
h1 {
  font-size: 50px;
}
</style>