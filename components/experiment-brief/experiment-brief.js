const getExperiment = require('../../api/data').getExpriment
const app = getApp()

Component({
  behaviors: [],
  properties: {
    experimentId: Number,
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
  methods: {
    getExperimentInfo() {
      const ctx = this
      getExperiment({experiment_id: ctx.properties.experimentId})
      .then(res => {
        app.globalData.experimentInfo = res.data
        wx.navigateTo({
          url: '../../pages/experiment-detail/experiment-detail'
        })
      })
      .catch(err => {
        console.log('getExperimentInfo Error: ', err)
      })
    } 
  },
  ready() {
    // 图片懒加载，通过class找到当前组件的image标签，监听它是否出现在了viewport内。
    // .brief-image-index 放在组件experiment-brief上
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
