;

(function (global) {
  global._comObj = {
    template: ' <div> <h1> Welcome to use vue2js </h1> <router-link to="/About">about</router-link> </div>',
    script: {
      data: function data() {
        return {};
      },
      methods: {}
    },
    style: {
      scoped: true,
      inner: 'h1 { color: chocolate;}'
    }
  };
})(window);