App({
  onLaunch: function () {
    console.log('App Launch')
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: 'https://www.holyzheng.top/auth/login',
            data: {
              code: '023QjR7f1hHels0jpV4f1UDQ7f1QjR7D',
              userName: 'holyZhengs',
              picture: 'https://wx.qlogo.cn/mmopen/vi_32/l83EXfs9NjE8mg6VBoqrqVTNPaiaiaicmic4J3q4axTiaJXkNiastCA2XEiaa7WB4orHQ5fPIdHWawsiay3KvFTYnFTnibQ/132'
            },
            success: (res) => {
              console.log(res)
            },
            fail: err => {
              console.log(err)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    }),
    wx.getUserInfo({
      success: res => {
        console.log(res)
      }
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  }
})