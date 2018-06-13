Component({
  behaviors: [],
  properties: {
    experimentName: String,
    type: String,
    pay: String,
    duration: String,
    publisher: String,
    picture: String,
    index: Number // 为图片懒加载服务，区分image标签
  },
  data: {
    load: false,
    defaultPicture: '../../images/default.png'
  },
  ready() {
    // 图片懒加载，通过class找到当前组件的image标签，监听它是否出现在了viewport内。
    const ctx = this
    let className = '.brief-image-' + ctx.properties.index
    wx.createIntersectionObserver().relativeToViewport().observe(className, res => {
      if (res.intersectionRatio > 0) {
        ctx.setData({
          load: true
        })
      }
    })
  }
})
