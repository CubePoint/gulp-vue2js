;

(function (global) {
  var Backbtn = {
    type: 'pack',
    url: './Component/pack/allCom.js',
    name: 'Backbtn'
  };
  global._comObj = {
    render: function render() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', [_c('h1', [_vm._v(" Hello! by CubePoint ")]), _vm._v(" "), _c('m-backbtn')], 1);
    },
    script: {
      components: {
        'm-backbtn': Backbtn
      },
      data: function data() {
        return {};
      },
      methods: {}
    },
    style: {
      scoped: true,
      inner: ' h1 { color: cadetblue; } '
    }
  };
})(window);