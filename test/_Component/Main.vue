<template>
  <div>
    <h1>
      i am the Main
    </h1>
    <router-link to="/Docs">go to Docs</router-link>
    <Footer></Footer>
  </div> 
</template>

<script>
  export default {
    data() { 
      return {
        val: true
      }
    },
    methods: {
    }   
  }
</script>
 
<style scoped>  
h1 {
  color:royalblue;
}
</style>