;

(function (global) {
  var Backbtn = {
    type: 'pack',
    url: './Component/pack/allCom.js',
    name: 'Backbtn'
  };
  global._comObj = {
    template: ' <div> <h1> Hello! by CubePoint </h1> <m-backbtn></m-backbtn> </div>',
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
      inner: 'h1 { color: cadetblue;}'
    }
  };
})(window);