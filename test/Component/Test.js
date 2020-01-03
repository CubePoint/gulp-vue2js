;

(function (global) {
  global._comObj = {
    render: function render() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', [_c('div', {
        staticClass: "m-backbtn-main",
        on: {
          "click": _vm.back
        }
      }, [_vm._v("返回")])]);
    },
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
      inner: ' .m-backbtn-main { position: fixed; width: 50px; height: 50px; right: 50px; top: 250px; background-color: bisque; color: #666; display: flex; justify-content: center; align-items: center; border-radius: 100%; font-size: 15px; } '
    }
  };
})(window);