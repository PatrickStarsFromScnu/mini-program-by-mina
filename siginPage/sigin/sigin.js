const login = require('../../api/data').login

Page({
  data: {
    // 用户是否授权，默认已授权
    authDeny: true,
    code: null
  },
  // 将登录有关的代码提取出来，因为有两种登录情况，但登录过程一致。
  mylogin(params) {
    login(params)
    .then( res => {
      // 存放token并跳转到首页
      wx.hideLoading()
      let data = res.data.data
      wx.setStorage({
        key: 'token',
        data: data.token,
        success: () => {
          console.log('token 存储成功')
        }
      })
      wx.setStorage({
        key: 'userId',
        data: data.userId,
        success: () => {
          console.log('userId 存储成功')
        }
      })
      wx.redirectTo({
        url: '../../pages/index/index'
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
  },
  // 当用户还未授权，需要通过button按钮进行授权
  myGetUserInfo(e) {
    //授权后从e.detail中拿到相关用户信息
    const ctx = this
    const info = e.detail
    wx.setStorage({
      key: 'userName',
      data: info.userInfo.nickName
    })
    wx.setStorage({
      key: 'picture',
      data: info.userInfo.avatarUrl
    })
    // 调用登录接口，发送用户name和头像地址，发送code给后端以便后端获取用户的openid
    ctx.mylogin({
      code: ctx.data.code,
      userName: info.userInfo.nickName,
      picture: info.userInfo.avatarUrl
    })
  },

// 如果用户已经授过权，那可以直接调用wx.getUserInfo来获取用户信息用于登录
  onReady() {
    // 查看storage中是否有已存在的token
    wx.showLoading()
    wx.getStorage({
      key: 'token',
      success: token => {
        if (token !== '') {
          wx.hideLoading()
          wx.redirectTo({
            url: '../../pages/index/index'
          })
          console.log('处于登录状态')
        }
      },
      fail: () => {
        wx.hideLoading()
        const ctx = this
        wx.login({
          // 启动app时，执行登录逻辑，拿到code（有效期五分钟）
          success: res => {
            if (res.code) {
              ctx.setData({
                code: res.code
              })
              // 获取用户信息，保持到本地存储 storage
              wx.getUserInfo({
                success: info => {
                  wx.setStorage({
                    key: 'userName',
                    data: info.userInfo.nickName
                  })
                  wx.setStorage({
                    key: 'picture',
                    data: info.userInfo.avatarUrl
                  })
                  // 调用登录接口，发送用户name和头像地址，发送code给后端以便后端获取用户的openid
                  ctx.mylogin({
                    code: res.code,
                    userName: info.userInfo.nickName,
                    picture: info.userInfo.avatarUrl
                  })
                },
                // 失败表示用户未授权，弹出button按钮引导用户进行授权
                fail: err => {
                  console.log(err)
                  ctx.setData({
                    authDeny: false
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
    })
  }
})