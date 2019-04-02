<template>
  <div>
      <Navbar></Navbar>
      <Hero/>
      <login></login>
  </div>
</template>

<script>
import Hero from '@/components/AboutHero.vue'
import Login from "@/components/Login.vue";

  export default {
     components: {
       Hero,
       Login
     }    
  }
</script>

<style scoped>

</style>