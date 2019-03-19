var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var walk = require('walk');
var watch = require('gulp-watch');

var src;
var dist ;

function task_default(_src,_dist) {
  src = _src;
  dist = _dist;
  runConcat();
  watch([src+'/*.js'], runConcat).on('error',function() {});
}

function runConcat() {
  console.log('change')

  var walker  = walk.walk(src, { followLinks: false, filters: []});
  let in_coms = '';
  walker.on('file', function(roots, stat, next) {
    if (roots != src) {next();return;}
    let fstr = fs.readFileSync(roots+'\\'+stat.name, 'utf8');
    let fname = stat.name.slice(0,-3);
    in_coms += `
  ${fstr}
  addCom('${fname}');
    `;
    next();
  });
  walker.on('end', function() {
    let in_file = `
  ;(function(global) {
    global._comObjs = {};
    function addCom(name) {
      global._comObjs[name] = global._comObj;
      global._comObj = undefined;
    }
    ${in_coms}
  })(window);
    `;
    writeFile(dist,in_file,{flag:'w+'});
  });
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

module.exports = {
  task_default
}