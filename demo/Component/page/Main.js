;

(function (global) {
  global._comObj = {
    render: function render() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', [_c('h1', [_vm._v(" Welcome to use vue2js ")]), _vm._v(" "), _c('router-link', {
        attrs: {
          "to": "/About"
        }
      }, [_vm._v("about")])], 1);
    },
    script: {
      data: function data() {
        return {};
      },
      methods: {}
    },
    style: {
      scoped: true,
      inner: ' h1 { color: chocolate; } '
    }
  };
})(window);