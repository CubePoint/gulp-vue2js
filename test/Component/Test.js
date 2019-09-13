;

(function (global) {
  global._comObj = {
    template: ' <div> <div class="m-backbtn-main" @click="back">返回</div> </div>',
    script: {
      data: function data() {
        return {};
      },
      methods: {
        back: function back() {
          this.$router.back();
        }
      }
    },
    style: {
      scoped: false,
      inner: '.m-backbtn-main { position: fixed; width: 50px; height: 50px; right: 50px; top: 250px; background-color: bisque; color: #666; display: flex; justify-content: center; align-items: center; border-radius: 100%; font-size: 15px;}'
    }
  };
})(window);