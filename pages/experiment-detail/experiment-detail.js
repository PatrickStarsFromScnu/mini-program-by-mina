const app = getApp()

Page({
  data: {
    experimentsInfo: {
    }
  },
  onLoad() {
    const ctx = this
    ctx.setData({
      experimentsInfo: app.globalData.experimentInfo
    })
  }
}) 