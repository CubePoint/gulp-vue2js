(function(global) {
  var childComPools = {};
  var comMainf = {};

  // 嵌入钩子工厂
  var pageStyleMg = {
    current: '',
    scoped: true,
    makeEnter(comName,scoped) {
      var self = this;
      return function(to, from, next) {
        if (comName == self.current) { next();return; }

        if (self.current != '') {
          var from_comName = self.current;
          var from_scoped = self.scoped;
          setTimeout(function() {
            var outstyle = document.getElementById(from_comName);
            if (outstyle && from_scoped) 
              outstyle.disabled = true;
          },0)
        }
        var instyle = document.getElementById(comName);
        if (instyle) 
          instyle.disabled = false;
        self.current = comName;
        self.scoped = scoped;
        next();
      };
    }
  }

  function loadRouterCom(comName) {
    //cp 未做同时请求用一组件处理
    return function(resolve,reject) {
      var com = Vue.component(comName);
      if (com != undefined) {
        resolve(com);
      }else{
        loadRouterEp(comName,function(comEp) {
          resolve(
            Vue.component(comName,comEp)
          );
        });
      }
    }
  }
  function loadChildCom(comName) {
    var comNameAry = comName.split('.');
    if (comNameAry.length == 1){
      return loadChildComUrl(comMainf[ comNameAry[0] ]);
    }else if (comNameAry.length == 2) {
      return loadPackComUrl(comMainf[ comNameAry[0] ], comNameAry[1]);
    }else {
      throw Error("loadChildCom: comName Error!");
    }
  }
  function loadChildComUrl(url) {
    //cp 未做同时请求用一组件处理
    return function(resolve,reject) {
      var com = childComPools[url];
      if (com != undefined) {
        resolve(com);
      }else{
        loadChildEp(url,function(comEp) {
          childComPools[url] = comEp;
          resolve(
            comEp
          );
        });
      }
    }
  }
  function loadPackComUrl(url,comName) {
    return function(resolve,reject) {
      var com = childComPools[url+'.'+comName];
      if (com != undefined) {
        resolve(com);
      }else {
        loadPackEp(url,function(coms) {
          for (var key in coms)
            childComPools[url+'.'+key] = coms[key];
          com = coms[comName];
          if (com != undefined)
            resolve(com);
          else 
            throw Error('loadPackComUrl: comName Not Exist!');
        });
      }
    }
  }
  function loadRouterEp(comName,completeCb) {
    loadJs(comMainf[comName],function() {
      var comObj = window._comObj;
      window._comObj = undefined;

      var dom_style = document.createElement('style');
      dom_style.innerHTML = comObj.style.inner;
      dom_style.id = comName;
      document.head.appendChild(dom_style);

      var fextends = {
        beforeRouteEnter: pageStyleMg.makeEnter(comName,comObj.style.scoped)
      }

      var comEp = comObj.script;
      comEp['template'] = comObj.template;
      comEp['extends'] = fextends;
      if (comEp['components']) {
        for (var comn in comEp['components']) {
          var comurl = comEp['components'][comn]+'.js';
          comEp['components'][comn] = loadChildComUrl(comurl);
        }
      }
      comEp = Vue.extend(comEp);
      completeCb&&completeCb(comEp);
    });
  }
  function loadChildEp(url,completeCb) {
    loadJs(url,function() {
      var comObj = window._comObj;
      window._comObj = undefined;

      var dom_style = document.createElement('style');
      dom_style.innerHTML = comObj.style.inner;
      document.head.appendChild(dom_style);

      var comEp = comObj.script;
      comEp['template'] = comObj.template;
      comEp = Vue.extend(comEp);
      completeCb&&completeCb(comEp);
    });
  }
  function loadPackEp(url,completeCb) {
    loadJs(url,function() {
      var comObjs = window._comObjs;
      window._comObjs = undefined;
      var coms = {};

      var dom_style = document.createElement('style');
      for (var key in comObjs) {
        var comObj = comObjs[key];
        dom_style.innerHTML += comObj.style.inner;
        
        var comEp = comObj.script;
        comEp['template'] = comObj.template;
        comEp = Vue.extend(comEp);
        coms[key] = comEp;
      }
      document.head.appendChild(dom_style);
      completeCb&&completeCb(coms);
    });
  }
  function loadJs(src,completeCb) {
    var scriptjs = document.createElement('script');
    if(scriptjs.readyState){
      scriptjs.onreadystatechange=function(){
        if(scriptjs.readyState == "loaded" || scriptjs.readyState == "complete"){
          completeCb&&completeCb();
        }
      }
    }else {
      scriptjs.onload=function(){
        completeCb&&completeCb();
      }
    }
    scriptjs.src = src;
    document.head.appendChild(scriptjs);
  }

  function setComMainf(obj) {
    Object.assign(comMainf,obj);
  }

  global.loadChildCom = loadChildCom;
  global.loadRouterCom = loadRouterCom;
  global.setComMainf = setComMainf;
})(window)


