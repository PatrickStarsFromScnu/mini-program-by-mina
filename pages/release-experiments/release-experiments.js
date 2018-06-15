const addExperiment = require('../../api/data').addExperiment

Page({
  data: {
    move: 'light-right',
    show: false,
    selectData: ['行为实验', '脑电实验', '问卷', '核磁共振', '皮肤电实验', '其他'],
    index:0,
    userId: null,
    userName: null
  },
  // 点击下拉显示框
  selectTap() {      
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  PubExperiment(e) {
    const ctx = this
    const data = e.detail.value
    addExperiment({
      publisher_id: ctx.data.userId,
      publisher_name: ctx.data.userName,
      title: data.title,
      type: ctx.data.selectData[ctx.data.index],
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