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
    console.log(ctx.data.step)
    const data = e.detail.value
    if (ctx.data.step === 1) {
      if (data.title.trim() === '' || data.duration.trim() === ''||data.pay.trim() === '') {
        ctx.warnTips('请将信息填写完整')
        return
      }
      let pay = data.pay.trim()
      if (pay.match(/\D/g)) {
        ctx.warnTips('报酬只能输入数字')
        return
      }
      let duration = data.duration.trim()
      if (duration.match(/\D/g)) {
        ctx.warnTips('时长只能输入数字')
        return
      }
    } else if (ctx.data.step === 2) {
      if (data.position.trim() === '' || data.period.trim() === '') {
        ctx.warnTips('请将信息填写完整')
        return
      }
    } else if (ctx.data.step === 3) {
      if (data.application.trim() === '') {
        console.log(data.application)
        ctx.warnTips('请将信息填写完整')
        return
      }
    } else if (ctx.data.step === 4) {
      console.log(data)
      if (data.textRequest.trim() === '') {
        data.textRequest = '无'
      }
      if (data.others.trim() === '') {
        data.others = '无'
      }
      if (data.content.trim() === '') {
        ctx.warnTips('请将信息填写完整')
        return
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
        request: data.textRequest,
        period: data.period,
        others: data.others,
        time: new Date(),
        application: data.application,
        content: data.content
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
      content,
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