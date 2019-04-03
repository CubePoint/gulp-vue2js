#!/usr/bin/env node
var vue2js = require('./parse');
var argv = process.argv;
var path = require('path');
var fs = require('fs');

if (argv.length < 4) {
    console.log('请输入正确的参数，vue2js vue目录 js输出目录 如： vue2js ./test/_Component ./test/Component');
    process.exit(1);
}
var vuePathBase = path.resolve(argv[2]);
var jsPathBase = path.resolve(argv[3]);
if (!fs.existsSync(vuePathBase)) {
  console.log(`${vuePathBase}文件夹不存在`);
} else if (!fs.existsSync(jsPathBase)) {
  console.log(`${jsPathBase}文件夹不存在`);
} else {
  vue2js.task_default(vuePathBase,jsPathBase);
}