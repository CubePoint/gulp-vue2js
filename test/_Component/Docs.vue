<template>
  <div>
    <h1>
      i am the Docs
    </h1>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from './public/Footer';

  export default {
    name: 'Docs',
    data() { 
      return {
        val: true
      }
    },
    components:{Footer},
    methods: {
    }   
  }
</script>

<style scoped>
h1 {
  color: chocolate;
}
</style>