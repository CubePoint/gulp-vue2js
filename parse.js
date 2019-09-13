var gulp = require('gulp');
var babel = require("@babel/core");
var fs = require('fs');
var path = require('path');
var walk = require('walk');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

var src;
var dest;

function task_default(vuePathBase,jsPathBase) {
  console.log('[gulp] starting default...')
  src = vuePathBase;
  dest = jsPathBase;
  livereload.listen();
   
  var walker  = walk.walk(src, { followLinks: false });
  walker.on('file', function(roots, stat, next) {
    let event = {path: roots+'\\'+stat.name,event:'change'}
    watchEvent(event);
    next();
	});
  watch('./',function(event) {
    livereload.changed(event.path);
  }).on('error',function() {})
  watch([src+'/**/*.vue'], watchEvent).on('error',function() {});

  function watchEvent(event) {
    console.log(event.event)
    try {
      if (event.event == 'unlink') {
        deleteEvent(event);
      }else {
        changeEvent(event);
      }
    } catch (error) {
      console.log(error)
    }
  }

  function deleteEvent(event) {
    let n_dest = event.path.replace(src,dest).replace(/vue$/,'js');
    fs.unlinkSync(n_dest);
  }

  function changeEvent(event) {
    let n_dest = event.path.replace(src,dest).replace(/vue$/,'js');
    let fname = event.path.slice(event.path.lastIndexOf('\\'), -3);
    let fstr = fs.readFileSync(event.path, 'utf8');

    let first_idx = 0;
    let last_idx = 0;

    // 解析template
    let in_template = '';
    first_idx = fstr.indexOf('<template>');
    last_idx = fstr.lastIndexOf('</template>');
    in_template = fstr.slice(first_idx+10, last_idx);
    in_template = in_template.replace(/\'/g,'\\\'').replace(/\r\n/g,'').replace(/\s+/g,'\ ');

    // 解析script 1.提取引用组件 2.提取外部变量 3.提取组件对象
    let in_script = '';
    first_idx = fstr.indexOf('<script>');
    last_idx = fstr.lastIndexOf('</script>');
    in_script = fstr.slice(first_idx+8, last_idx);
    first_idx = in_script.indexOf('export default {');
    last_idx = in_script.lastIndexOf('}');
    let comChild = '';
    let comChild2 = '';
    let in_script_imports = in_script.slice(0,first_idx)
    in_script_imports1 = in_script_imports.split('import');
    in_script_imports1.shift();
    if (in_script_imports1.length > 0)
      for (let i of in_script_imports1) {
        let j = i.split('from');
        j[0] = j[0].trim();
        j[1] = j[1].trim();
        let z = j[1].match(/^[\'\"].*((?:[\'\"])|(?:;))/);
        comChild2 += j[1].slice(z[0].length);

        let comVar = j[0];
        if (/^\{.*\}$/.test(comVar)) {
          let comVarAry = comVar.slice(1,-1).split(',');
          for (let c of comVarAry) {
            c = c.trim();
            comChild += `\n  var ${c} = { type: 'pack', url: ${z[0].replace(/;$/,'')}, name: '${c}' };`;
          }
        }else {
          comChild += `var ${j[0]} = ${z[0]}`;
        }
      }
    else 
      comChild2 += in_script_imports.trim();
    in_script = in_script.slice(first_idx+16, last_idx);


    // 解析style
    let in_style = '';
    first_idx = fstr.indexOf('<style');
    last_idx = fstr.lastIndexOf('</style>');
    let style_tag = fstr.match(/<style(.*?)>/)[0];
    let in_style_scoped = style_tag.includes('scoped');
    in_style = fstr.slice(first_idx+style_tag.length, last_idx);
    in_style = in_style.replace(/\'/g,'\\\'').replace(/\r\n/g,'').replace(/\s+/g,'\ ');

    let in_file = `
;(function(global) {
  ${comChild}${comChild2}
  global._comObj = {
    template: '${in_template}',
    script: {
      ${in_script}
    },
    style: {
      scoped: ${in_style_scoped},
      inner: '${in_style}'
    }
  }
})(window);
    `;
    try {
      in_file = babel.transformSync(in_file,{presets: ["@babel/preset-env"],sourceType:"script"}).code;
    } catch (error) {
      console.warn("警告ES语法错误：",error)
    }
    writeFile(n_dest, in_file,{flag:'w+'});
  }
}

// 自动生成文件夹
function createFlod(dstpath) {
  dstpath = dstpath.replace(/\\/g,'/');
	var dirary = dstpath.split('/');
	var dirtmp = dirary[0];
	for (var i=1;i<dirary.length;i++) {
		dirtmp += '/' + dirary[i];
		try {
			fs.accessSync(dirtmp, fs.constants.F_OK | fs.constants.W_OK);
		}catch (err) {
			fs.mkdirSync(dirtmp);
		}
	}
}
// 创建文件自动生成文件夹
function writeFile(dstpath,infile,opt) {
	dstpath = dstpath.replace(/\\/g,'/');
	var dirary = dstpath.split('/');
	var dirtmp = dirary[0];
	for (var i=1;i<dirary.length-1;i++) {
		dirtmp += '/' + dirary[i];
		try {
			fs.accessSync(dirtmp, fs.constants.F_OK | fs.constants.W_OK);
		}catch (err) {
			//不存在
			fs.mkdirSync(dirtmp);
		}
	}
  fs.writeFileSync(dstpath, infile,opt);
}
// 删除目录
function deleteDir(dstpath) {
  var walker  = walk.walk(dstpath,{followLinks: false});
  var dirs = [];
  walker.on('file', function(roots, stat, next) {
    fs.unlinkSync(roots+'\\'+stat.name);
    next();
  });
  walker.on('directory', function(roots, stat, next) {
    dirs.push(roots+'\\'+stat.name);
    next();
  });
  return new Promise(function(resolve,reject) {
    walker.on('end', function() {
      for (var i=dirs.length-1;i>=0;i--) {
        fs.rmdirSync(dirs[i]);
      }
      resolve();
    });
  })
}
// 复制文件或目录
function copyFile(src,dest) {
  return new Promise(function(resolve,reject) {
    fs.stat(src,function(err,st) {
      if (err) throw err;
      if (st.isFile()) {
        writeFile(dest, fs.readFileSync(src),{flag:'w+'});
        resolve();
      } else if (st.isDirectory()) {
        let walker  = walk.walk(src,{followLinks: false});
        walker.on('file', function(roots, stat, next) {
          let src_path = roots + '\\' + stat.name;
          let dest_path = src_path.replace(src,dest);
          writeFile(dest_path, fs.readFileSync(src_path),{flag:'w+'});
          next();
        });
        walker.on('directory', function(roots, stat, next) {
          let src_path = roots + '\\' + stat.name;
          let dest_path = src_path.replace(src,dest);
          createFlod(dest_path);
          next();
        });
        walker.on('end', function() {
          resolve();
        });
      }
    });
  })
}

module.exports = {
  task_default
}