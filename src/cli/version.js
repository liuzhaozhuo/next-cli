/**
 * 版本命令模块
 */

'use strict';

const packageFile = require('../../package.json');

module.exports = {
    init: () => {
        console.log('v' + packageFile.version);
    }
};