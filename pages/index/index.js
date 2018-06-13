const getAllExperiments = require('../../api/data').getAllExperiments

Page({
  data: {
    picture: '',
    userName: '',
    imgUrls: [
      '../../images/a.jpeg',
      '../../images/timg.jpg'
    ],
    experimentsInfo: [],
    times: 1, // 请求实验列表的次数
    noMoreExperiments: false // 是否已经把全部实验请求到了。
  },
  navigateToMyExperiments() {
    wx.navigateTo({
      url: '../my-experiments/my-experiments'
    })
  },
  navigateToExperimentType() {
    wx.navigateTo({
      url: '../experiment-type/experiment-type'
    })
  },
  navigateToExperimentDeatil() {
    wx.navigateTo({
      url: '../experiment-detail/experiment-detail'
    })
  },
  getExperiments(params) {
    let ctx = this
    wx.showLoading()
    getAllExperiments(params)
    .then(res => {
      wx.hideLoading()
      if (res.data.data.length === 0) {
        ctx.setData({
          noMoreExperiments: true
        })
      } else {
        ctx.setData({
          experimentsInfo: ctx.data.experimentsInfo.concat(res.data.data)
        })
      }
      // 借助首页的请求，当返回状态码401时，表示登录失效
      // 删除storage中的token，并提示用户重新登录
      if (res.data.code === 401) {
        wx.removeStorageSync('token')
        wx.showModal({
          title: '登录已过期',
          content: '请重新登录小程序',
          showCancel: false,
          success: res => {
            wx.redirectTo({
              url: '../sigin/sigin'
            })
          },
          fail: err => {
            console.log('重新登录失败', err)
          }
        })
      }
    })
    .catch(err => {
      wx.hideLoading()
      console.log('getExperiments Error: ', err)
    })
  },
  getNextExperiments() {
    const ctx = this
    // 实验数目比上次多的话，说明没有请求完，可以继续触发。
    if (!ctx.data.noMoreExperiments) {
      ctx.setData({
        times: ++ctx.data.times
      })
      ctx.getExperiments({amount: 5, times: ctx.data.times})
    } else {
      wx.showToast({
        title: '没有更多了哦',
        icon: 'none'
      })
    }
  },
  onLoad() {
    const ctx = this
    wx.getStorage({
      key: 'userName',
      success: res => {
        ctx.setData({
          userName: res.data
        })
      }
    })
    wx.getStorage({
      key: 'picture',
      success: res => {
        ctx.setData({
          picture: res.data
        })
      }
    })
    ctx.getExperiments({amount: 5, times: 1})
  }
})
