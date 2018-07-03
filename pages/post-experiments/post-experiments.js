const addExperiment = require('../../api/data').addExperiment

Page({
  data: {
    typeArray: ['行为实验', '脑电实验', '问卷', '核磁共振', '皮肤电实验', '其他'],
    index: 0,
    step: 1,
    experimentInfo: {},
    userId: null,
    userName: null
  },
  handleComplete: function(e) {
    const ctx = this
    const data = e.detail.value
    if (ctx.data.step === 1) {
      if (data.title.trim() === '' || data.duration.trim() === ''||data.pay.trim() === '') {
        ctx.warnTips('请填将信息填写完整！')
        return
      }
    } else if (ctx.data.step === 2) {
      if (data.position.trim() === '' || data.period.trim() === '') {
        ctx.warnTips('请填将信息填写完整！')
        return
      }
    } else if (ctx.data.step === 3) {
      if (data.application.trim() === '') {
        ctx.warnTips('请填将信息填写完整！')
        return
      }
    } else if (ctx.data.step === 4) {
      console.log(data)
      if (data.request.trim() === '') {
        data.request = '无'
      }
      if (data.others.trim() === '') {
        data.others = '无'
      }
      if (ctx.data.userId === null || ctx.data.userName === null) {
        throw new Error('未获取到userID或userName')
      }
      addExperiment({
        publisher_id: ctx.data.userId,
        publisher_name: ctx.data.userName,
        title: data.title,
        type: ctx.data.typeArray[ctx.data.index],
        duration: data.duration,
        pay: data.pay,
        position: data.position,
        request: data.request,
        period: data.period,
        others: data.others,
        time: new Date(),
        application: data.application
      })
      .then(res => {
        wx.showToast({
          title: '发布成功！',
          icon: 'success',
          duration: 2000
        })
        setTimeout(()=>{
          wx.navigateBack()
        }, 2000)
      })
      .catch(err => {
        wx.showToast({
          title: '发布失败了！',
          icon: 'none',
          duration: 3000
        })
        console.log(err)
      })
    }
    if (ctx.data.step !== 4) {
      ctx.setData({
        step: ++ctx.data.step
      })
    }
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  warnTips: function(content) {
    wx.showModal({
      title: '错误',
      content: content,
      showCancel: false
    })
  },
  onLoad() {
    const ctx = this
    wx.getStorage({
      key: 'userId',
      success: res => {
        ctx.setData({
          userId: res.data
        })
      }
    })
    wx.getStorage({
      key: 'userName',
      success: res => {
        ctx.setData({
          userName: res.data
        })
      }
    })
  }
})