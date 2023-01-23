const loaderUtils = require("loader-utils");

module.exports = function (content) {

    return content;
}

/**
 * 
 * @param {*} remainingRequest 剩余的请求******!xxxxx.css
 * @param {*} precedingRequest 完成的请求****-loader.js
 * @param {*} data 
 */
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    console.log(remainingRequest);

    console.log(loaderUtils.stringifyRequest(this, '!!' + remainingRequest));
}