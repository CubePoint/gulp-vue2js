#!/usr/bin/env node
var js2pack = require('./concat.js');
var argv = process.argv;
var path = require('path');
var fs = require('fs');

if (argv.length < 4) {
    console.log('请输入正确的参数，js2pack js目录 pack输出文件地址 如： js2pack ./test/Component/ ./test/Component/pack/allCom.js');
    process.exit(1);
}
var jsPathBase = path.resolve(argv[2]);
var packPathBase = path.resolve(argv[3]);
if (!fs.existsSync(jsPathBase)) {
  console.log(`${jsPathBase}文件夹不存在`);
} else {
  js2pack.task_default(jsPathBase,packPathBase);
}