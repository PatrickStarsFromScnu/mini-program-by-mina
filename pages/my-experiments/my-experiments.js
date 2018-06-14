const getMyExperiments = require('../../api/data').getMyExperiments
const getMySubsciption = require('../../api/data').getMySubsciption

Page({
  data: {
    move: 'light-left',
    subExperimentsInfo: [],
    pubsubExperimentsInfo: []
  },
  tapTopRight() {
    this.setData({
      move: 'light-right'
    })
  },
  tapTopLeft() {
    this.setData({
      move: 'light-left'
    })
  },
  getPubExperiments(tips) {
    const ctx = this
    const userId = wx.getStorageSync('userId')
    getMyExperiments({
      user_id: userId
    })
    .then(res => {
      tips && tips.success()
      ctx.setData({
        pubExperimentsInfo: res.data.data
      })
    })
    .catch(err => {
      tips && tips.fail()
      console.log('getPubExperiments Error: ', err)
    })
  },
  getSubExperiments(tips) {
    const ctx = this
    const userId = wx.getStorageSync('userId')
    getMySubsciption({
      user_id: userId
    })
    .then(res => {
      tips && tips.success()
      ctx.setData({
        subExperimentsInfo: res.data.data
      })
    })
    .catch(err => {
      tips && tips.fail()
      console('getSubExperiments Error: ', err)
    })
  },
  onPullDownRefresh() {
    const ctx = this
    const tips = {
      success: () => {
        wx.showToast({
          title: '刷新成功',
          icon: 'none'
        })
      },
      fail: () => {
        wx.showToast({
          title: '刷新失败！',
          icon: 'none',
          duration: 3000
        })
      }
    }
    if (ctx.data.move === 'light-left') {
      ctx.getPubExperiments(tips)
    } else {
      ctx.getSubExperiments(tips)
    }
  },
  navigateToReleaseExperiments() {
    wx.navigateTo({
      url: '../release-experiments/release-experiments'
    })
  },
  onLoad() {
    const ctx = this
    ctx.getSubExperiments()
  }
})