/**
 * 命令行参数处理
 */

'use strict';

const minimist = require('minimist');
const CONFIG = require('./config');

let cfg = {};
let cli = {};

function initCli() {
    const COMMANDS = CONFIG.COMMANDS

    COMMANDS.forEach((cmd) => {
        cli[cmd] = require(`./cli/${cmd}`)
    });
}

function execCli() {
    cfg.args = minimist(process.argv);
    Object.keys(cfg.args).some((cmd) => {
        if(cmd === 'version'){
            cli['version'].init();
        }else if(cmd === 'v'){
            cli['version'].init();
        }
    });
}
module.exports = {
    init: () => {
        initCli();
        execCli();
    }
};