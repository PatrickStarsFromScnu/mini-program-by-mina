const util = require('../utils/util')

function request (method, url, data) {
  if (util.isLowerCase(method)) {
    method = method.toUpperCase()
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
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
