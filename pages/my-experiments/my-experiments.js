const getMyExperiments = require('../../api/data').getMyExperiments
const getMySubsciption = require('../../api/data').getMySubsciption
const deleteMyExperiment = require('../../api/data').deleteMyExperiment

Page({
  data: {
    move: 'light-left',
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
  // 获取我发布的实验
  getPubExperiments(tips) {
    const ctx = this
    const userId = wx.getStorageSync('userId')
    getMyExperiments({
      user_id: userId
    })
    .then(res => {
      tips && tips.success()
      ctx.setData({
        pubExperimentsInfo: res.data
      })
    })
    .catch(err => {
      tips && tips.fail()
      console.log('getPubExperiments Error: ', err)
    })
  },
  // 获取我订阅的实验
  getSubExperiments(tips) {
    const ctx = this
    const userId = wx.getStorageSync('userId')
    getMySubsciption({
      user_id: userId
    })
    .then(res => {
      tips && tips.success()
      ctx.setData({
        subExperimentsInfo: res.data
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
    // 判断处于哪个子页面，作相应的下拉刷新
    if (ctx.data.move === 'light-left') {
      ctx.getSubExperiments(tips)
    } else {
      ctx.getPubExperiments(tips)
    }
  },
  navigateToReleaseExperiments() {
    wx.showModal({
      title: '提示',
      content: '发布实验服务只允许发布与心理学实验有关的信息，若发布无关或不良信息，经举报会进行惩罚哦！',
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../post-experiments/post-experiments'
          })
        }
      }
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
    ctx.getSubExperiments()
  }
})