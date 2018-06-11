const request = require('./request')

/** 
 * 小程序mina框架解耦做的不好
 * 为了不出现请求分散夹杂在各个文件中难以维护
 * 封装 wx.request 函数, 并在次对所有请求统一
 * 管理，并将异步处理方式由 回调 改为 链式 的方式处理
*/
function login (params) {
  return request('POST', 'https://www.holyzheng.top/auth/login', params)
}

module.exports = {
  login
}