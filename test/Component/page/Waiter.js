;

(function (global) {
  global._comObj = {
    template: ' <div> <h1> i am the Docs </h1> <Footer></Footer> </div>',
    script: {
      name: 'Docs',
      data: function data() {
        return {
          val: true
        };
      },
      methods: {}
    },
    style: {
      scoped: true,
      inner: 'h1 { color: chocolate;}'
    }
  };
})(window);