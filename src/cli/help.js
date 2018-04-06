/**
 * 帮助命令模块
 */

'use strict';

const msee = require('msee');
const fs = require('fs');
const path = require('path');

module.exports = {
  init: (args, options) => {
    let cmd = 'next-cli';

    if (options && options.cmd) {
      cmd = options.cmd;
    }

    const file = path.join(__dirname, '../../doc', `${cmd}.md`);
    let doc;

    if (fs.existsSync(file)) {
      doc = msee.parseFile(file);
      console.log(doc);
    } else {
      console.log('oh! I can\'t help you');
    }
  },
};