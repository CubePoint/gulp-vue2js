<template>
  <div>
    <div class="m-backbtn-main" @click="back">返回</div>
  </div>
</template>

<script>
  export default {
    data() { 
      return {
      }
    },
    methods: {
      back() {
        this.$router.back();
      }
    }
  }
</script>

<style>
.m-backbtn-main {
  position: fixed;
  width: 50px;
  height: 50px;
  right: 50px;
  top: 250px;
  background-color: bisque;
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  font-size: 15px;
}
</style>