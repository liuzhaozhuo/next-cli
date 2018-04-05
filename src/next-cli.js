'use strict'

const minimist = require('minimist');
const version = require('./cli/version')

let cfg = {};

module.exports = {

        init: () => {
            cfg.args = minimist(process.argv)
            console.log(cfg.args)
            const cli = cfg.args._[2]
            if(cli === 'version'){
                version.init()
            }
        }
}