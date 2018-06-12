const util = require('../utils/util')

function request (method, url, data) {
  let token = ''
  if (util.isLowerCase(method)) {
    method = method.toUpperCase()
  }
  try {
    token = wx.getStorageSync('token')
    console.log(token)
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
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

module.exports = request
