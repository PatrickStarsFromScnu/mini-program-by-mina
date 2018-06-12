const getAllExperiments = require('../../api/data').getAllExperiments

Page({
  data: {
    picture: '',
    userName: '',
    imgUrls: [
      '../../images/a.jpeg',
      '../../images/timg.jpg'
    ],
    experimentsInfo: [
    ]
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
  getExperiments() {
    let ctx = this
    getAllExperiments()
    .then(res => {
      this.setData({
        experimentsInfo: res.data.data
      })
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
      console.log('getExperiment: ', err)
    })
  },
  onLoad() {
    wx.getStorage({
      key: 'userName',
      success: res => {
        this.setData({
          userName: res.data
        })
      }
    })
    wx.getStorage({
      key: 'picture',
      success: res => {
        this.setData({
          picture: res.data
        })
      }
    })
    this.getExperiments()
  }
}) 