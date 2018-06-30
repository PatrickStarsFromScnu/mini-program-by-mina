App({
  onLaunch: function () {
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    experimentInfo: {},
    idArr: [] // 已预约的实验的id
  }
})