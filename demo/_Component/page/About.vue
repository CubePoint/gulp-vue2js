<template>
  <div>
    <h1>
      Hello! by CubePoint
    </h1>
    <m-backbtn></m-backbtn>
  </div>
</template>

<script>
  import {Backbtn} from './Component/pack/allCom.js';
  export default {
    components: {
      'm-backbtn': Backbtn,
    },
    data() { 
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
h1 {
  color: cadetblue;
}
</style>