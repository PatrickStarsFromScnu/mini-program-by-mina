function isLowerCase (str) {
  return /[a-z]/.test(str)
}

// 当返回状态码401时，表示登录过期或失效
// 删除storage中的token，并提示用户重新登录
function checkAuthority (res) {
  if (res.data.code === 401) {
    wx.removeStorageSync('token')
    wx.removeStorageSync('userId')
    wx.showModal({
      title: '登录已过期',
      content: '请重新登录小程序',
      showCancel: false,
      success: res => {
        wx.redirectTo({
          url: '../../siginPage/sigin/sigin'
        })
      },
      fail: err => {
        console.log('重新登录失败', err)
      }
    })
  }
}

module.exports = {
  isLowerCase,
  checkAuthority
}
