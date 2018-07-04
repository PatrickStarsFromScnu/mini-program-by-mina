const getAllExperiments = require('../../api/data').getAllExperiments
const getMySubsciptionId = require('../../api/data').getMySubsciptionId
const checkAuthority = require('../../utils/util').checkAuthority
const app = getApp()

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
  onPullDownRefresh() {
    let ctx = this
    wx.showLoading()
    getAllExperiments({
      limit: 5, 
      offset: 0
    })
    .then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '刷新成功',
        icon: 'none',
        duration: 3000
      })
      // 重置 times
      ctx.setData({
        times: 1
      })
      if (res.data.data.length === 0) {
        ctx.setData({
          noMoreExperiments: true
        })
      } else {
        // 下拉刷新成功就重置 experimentInfo noMoreExperiments
        ctx.setData({
          experimentsInfo: res.data.data,
          noMoreExperiments: false
        })
      }
    })
    .catch(err => {
      wx.hideLoading()
      console.log('getExperiments Error: ', err)
    })
  },
  onReachBottom() {
    const ctx = this
    // 如果没有请求完，可以继续触发。
    if (!ctx.data.noMoreExperiments) {
      getAllExperiments({limit: 5, offset: (ctx.data.times - 1)*5})
      .then(res => {
        if (res.data.data.length === 0) {
          ctx.setData({
            noMoreExperiments: true
          })
        } else {
          ctx.setData({
            experimentsInfo: ctx.data.experimentsInfo.concat(res.data.data)
          })
        }
      })
      .catch(err => {
        wx.showToast({
          title: '加载更多失败！',
          icon: 'none'
        })
        console.log('getExperiments Error: ', err)
      })
      ctx.setData({
        times: ++ctx.data.times
      })
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
    wx.showLoading()
    getAllExperiments({limit: 5, offset: 0})
    .then(res => {
      wx.hideLoading()
      if (res.data.data.length === 0) {
        ctx.setData({
          noMoreExperiments: true
        })
      } else {
        ctx.setData({
          experimentsInfo: res.data.data
        })
      }
    })
    .catch(err => {
      wx.hideLoading()
      console.log('getExperiments Error: ', err)
    })
    const userId = wx.getStorageSync('userId')
    getMySubsciptionId({user_id: userId})
    .then(res => {
      let idArr = [] // 已预约的实验id
      res.data.data.forEach(item => {
        idArr.push(item.experiment_id)
      })
      app.globalData.idArr = idArr
    })
    .catch(err => {
      console.log('getMySubsciptionId Error: ', err)
    })
  }
})
