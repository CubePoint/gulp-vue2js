
;(function(global) {
  
  global._comObj = {
    template: ' <div> <h1> i am the Main </h1> <router-link to="/Docs">go to Docs</router-link> <Footer></Footer> </div> ',
    script: {
      
    data() { 
      return {
        val: true
      }
    },
    methods: {
    }   
  
    },
    style: {
      scoped: true,
      inner: ' h1 { color:royalblue;}'
    }
  }
})(window);
    