const getExperimentsByType = require('../../api/data').getExperimentsByType

Page({
  data: {
    type: '行为',
    experimentsInfo: [
    ],
    times: 1, // 请求次数，用于分组请求数据
    noMore: false
  },
  // 获取实验
  getExperiments(params) {
    const ctx = this
    getExperimentsByType(params)
    .then(res => {
      wx.hideLoading()
      if (res.data.data.length) {
        ctx.setData({
          times: ++ ctx.data.times,
          experimentsInfo: ctx.data.experimentsInfo.concat(res.data.data)
        })
      } else {
        ctx.setData({
          noMore: true
        })
      }
    })
    .catch(err => {
      wx.hideLoding()
      console.log('getExperimentsByType Error: ', err)
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    wx.showLoading()
    const ctx = this
    getExperimentsByType({
      type: ctx.data.type,
      amount: 8,
      times: 1
    })
    .then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '刷新成功',
        icon: 'none'
      })
      ctx.setData({
        times: 1
      })
      if (res.data.data.length) {
        ctx.setData({
          experimentsInfo: res.data.data,
          noMore: false
        })
      } else {
        ctx.setData({
          noMore: true
        })
      }
    })
    .catch(err => {
      wx.hideLoding()
      console.log('getExperimentsByType Error: ', err)
    })
  },
  // 上拉触底加载更多
  onReachBottom() {
    const ctx = this
    if (!ctx.data.noMore) {
      ctx.getExperiments({
        type: ctx.data.type,
        amount: 8,
        times: ctx.data.times
      })
    } else {
      wx.showToast({
        title: '没有更多了哦',
        icon: 'none'
      })
    }
  },
  onLoad(option) {
    const ctx = this
    ctx.setData({
      type: option.type
    })
    wx.showLoading()
    ctx.getExperiments({
      type: option.type,
      amount: 8,
      times: ctx.data.times
    })
  }
})