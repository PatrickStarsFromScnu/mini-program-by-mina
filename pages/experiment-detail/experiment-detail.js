const addSubExperiment = require('../../api/data').addSubExperiment
const deleteSubscription = require('../../api/data').deleteSubscription
const getMySubsciptionId = require('../../api/data').getMySubsciptionId
const app = getApp()

Page({
  data: {
    experimentsInfo: {
    },
    subscribed: false // 此实验是否已经预约
  },
  manageSubExperiment() {
    const ctx = this
    if (ctx.data.subscribed) {
      wx.showModal({
        title: '确认',
        content: '是否已与主试联系，取消了预约实验？',
        success: res => {
          if (res.confirm) {
            const userId = wx.getStorageSync('userId')
            deleteSubscription({
              experiment_id: ctx.data.experimentsInfo.experiment_id,
              user_id: userId
            })
            .then(res => {
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 3000
              })
              ctx.setData({
                subscribed: false
              })
              // 取消成功后更新globalData中的idArr
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
            })
            .catch(err => {
              wx.showToast({
                title: '取消失败！请稍后再尝试！',
                icon: 'none',
                duration: 3000
              })
              console.log(err)
            })
          }
        },
        fail: err => console.log(err)
      })
    } else {
      wx.showModal({
        title: '确认',
        content: '是否已与主试联系，预约了该实验？',
        success: res => {
          if (res.confirm) {
            const userId = wx.getStorageSync('userId')
            addSubExperiment({
              experiment_id: ctx.data.experimentsInfo.experiment_id,
              user_id: userId
            })
            .then(() => {
              wx.showToast({
                title: '数据库同步成功',
                icon: 'success',
                duration: 3000
              })
              ctx.setData({
                subscribed: true
              })
              // 预约成功后更新globalData中的idArr
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
            })
            .catch(err => {
              wx.showToast({
                title: '标记失败！请稍后再尝试！',
                icon: 'none',
                duration: 3000
              })
              console.log(err)
            })
          }
        },
        fail: err => console.log(err)
      })
    }
    
  },
  onLoad() {
    const ctx = this
    let globalData = app.globalData
    ctx.setData({
      experimentsInfo: globalData.experimentInfo
    })
    if (globalData.idArr.indexOf(globalData.experimentInfo.experiment_id) !== -1) {
      ctx.setData({
        subscribed: true
      })
    }
  }
}) 