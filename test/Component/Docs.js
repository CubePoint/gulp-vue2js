
(function(global) {
  var Footer = './public/Footer';
  global._comObj = {
    template: ' <div> <h1> i am the Docs </h1> <Footer></Footer> </div>',
    script: {
      
    name: 'Docs',
    data() { 
      return {
        val: true
      }
    },
    components:{Footer},
    methods: {
    }   
  
    },
    style: {
      scoped: true,
      inner: 'h1 { color: chocolate;}'
    }
  }
})(window)
    