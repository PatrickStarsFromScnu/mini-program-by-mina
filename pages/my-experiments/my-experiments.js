const getMyExperiments = require('../../api/data').getMyExperiments
const getMySubsciption = require('../../api/data').getMySubsciption
const deleteMyExperiment = require('../../api/data').deleteMyExperiment

Page({
  data: {
    move: 'light-right',
    picture: '',
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
  deleteExperiment(e) {
    const ctx = this
    const experimentId = e.currentTarget.dataset.experimentid;
    deleteMyExperiment({
      experiment_id: experimentId
    })
    .then(res => {
      ctx.getPubExperiments()
      wx.showToast({
        title: '删除改实验成功',
        icon: 'none',
        duration: 2000
      })
    })
    .catch(err => {
      wx.showToast({
        title: '删除失败, 请稍后再尝试',
        icon: 'none',
        duration: 3000
      })
    })
  },
  onLoad() {
    const ctx = this
    let picture = wx.getStorageSync('picture')
    ctx.setData({
      picture: picture
    })
    ctx.getPubExperiments()
  }
})