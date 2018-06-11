const login = require('./api/data').login

App({
  onLaunch: function () {
    wx.showModal({
      title: '登录',
      content: '允许应用获取您的信息吗？',
      showCancel: false,
      success: res => {
        if (res.confirm) {
          wx.showLoading()
          wx.login({
            // 启动app时，执行登录逻辑，拿到code（有效期五分钟）
            success: res => {
              if (res.code) {
                // 获取用户信息，保持到本地存储 storage
                wx.getUserInfo({
                  success: info => {
                    wx.setStorage({
                      key: 'userName',
                      value: info.userInfo.nickName
                    })
                    wx.setStorage({
                      key: 'picture',
                      value: info.userInfo.avatarUrl
                    })
                    // 调用登录接口，发送用户name和头像地址，发送code给后端以便后端获取用户的openid
                    login({
                      code: res.code,
                      userName: info.userInfo.nickName,
                      picture: info.userInfo.avatarUrl
                    })
                    .then( res => {
                      wx.hideLoading()
                      let data = res.data.data
                      wx.setStorage({
                        key: 'token',
                        value: data.token,
                        success: () => {
                          console.log('token 存储成功')
                        }
                      })
                    })
                    .catch( err => {
                      // 获取token失败时，登录失败
                      wx.hideLoading()
                      wx.showToast({
                        title: '登录失败',
                        icon: 'none',
                        duration: 3000
                      })
                      console.log('获取token失败！' + err)
                    })
                  }
                })
              } else {
                // 获取code失败时，登录失败
                wx.showToast({
                  title: '登录失败',
                  icon: 'none',
                  duration: 3000
                })
                console.log('获取code失败！' + res.errMsg)
              }
            }
          })
        }
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