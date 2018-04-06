/**
 * 短网址命令模块
 */

'use strict';

const data = require('../data')
const http = require('http')
const chalk = require('chalk')


function getShortURL(url_long){
    http.get(data.url.replace('${url_long}', url_long), (res) => {

        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;

        if (statusCode !== 200) {
            error = new Error('请求失败。\n' +
                            `状态码: ${statusCode}`);
        }

        if (error) {
            console.error(error.message);
            // 消耗响应数据以释放内存
            res.resume();
            return;
        }

        res.setEncoding('utf8');

        let rawData = '';

        res.on('data', (chunk) => { rawData += chunk; });

        res.on('end', () => {
            try {
            const parsedData = JSON.parse(rawData);
            console.log('原网址：' + parsedData[0].url_long);
            console.log(chalk.blue('短网址：' + parsedData[0].url_short));
            } catch (e) {
            console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`错误: ${e.message}`);
    });
}


module.exports = {
    init: (args) => {
        getShortURL(args._[1]);
    }
};