/**
 * 命令行参数处理
 */

'use strict';

const minimist = require('minimist');
const CONFIG = require('./config');

let cfg = {};
let cli = {};

const priva = {
  getCli: (args) => {
    if (!args) {
      return CONFIG.DEFAULT_CMD;
    }

    let res;
    const cmds = args._ || {};

    Object.keys(args).some((key) => {
      if (CONFIG.CLI_PARAMS[key]) {
        res = CONFIG.CLI_PARAMS[key];
        return true;
      }

      return false;
    });

    if (!res) {
      cmds.some((key) => {
        if (CONFIG.CLI_MAP[key]) {
          res = CONFIG.CLI_MAP[key];
          return true;
        }

        return false;
      });
    }

    return res || CONFIG.DEFAULT_CMD;
  },

  initArgs: () => {
    const args = cfg.args;
    let cliName = priva.getCli(args);

    // 命令不存在
    if (!cli[cliName]) {
      cliName = CONFIG.DEFAULT_CMD;
    }

    cli[cliName].init(args);
  },

  initCli: () => {
    const COMMAND = CONFIG.COMMAND;

    COMMAND.forEach((cmd) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      cli[cmd] = require(`./cli/${cmd}.js`);
    });
  },

  init: () => {
    priva.initCli();
    priva.initArgs();
  },
};

module.exports = {
  init: () => {
    // 参数解析
    cfg.args = minimist(process.argv.slice(2));

    // 初始化入口
    priva.init();
  },
};