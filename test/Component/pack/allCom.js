
  ;(function(global) {
    global._comObjs = {};
    function addCom(name) {
      global._comObjs[name] = global._comObj;
      global._comObj = undefined;
    }
    
  
;(function(global) {
  
  global._comObj = {
    template: ' <div> <h1> i am the Docs </h1> <Footer></Footer> </div>',
    script: {
      
    name: 'Docs',
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
      inner: 'h1 { color: chocolate;}'
    }
  }
})(window);
    
  addCom('Docs');
    
  
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
    
  addCom('Main');
    
  })(window);
    