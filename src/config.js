/**
 * 配置文件
 */

'use strict';

module.exports = {
    DEFAULT_CMD: 'help',
    COMMAND: [
        'shorturl',
        'help',
        'version',
    ],
    CLI_PARAMS: {
        v: 'version',
        version: 'version',
        h: 'help',
        help: 'help',
    },
    CLI_MAP: {
        s: 'shorturl',
    },
}; 