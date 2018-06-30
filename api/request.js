const util = require('../utils/util')

/**
 * 通过promise 封装 request 用于请求
 * 将token加入头部
 * 检查登录是否过期 
 */

function request (method, url, data) {
  let token = ''
  if (util.isLowerCase(method)) {
    method = method.toUpperCase()
  }
  try {
    token = wx.getStorageSync('token')
  } catch (err) {
    console.log('此请求未取得token，若不是登录请求，请查找原因：', err)
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: {
        'Authorization': 'Bearer ' + token
      },
      success: res => {
        // 当返回状态码401时，表示登录过期或失效
        // 删除storage中的token，并提示用户重新登录
        util.checkAuthority(res)
        if (res.statusCode === 200 || res.statusCode === 304 || res.statusCode === 301 || res.statusCode === 302) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

module.exports = request
