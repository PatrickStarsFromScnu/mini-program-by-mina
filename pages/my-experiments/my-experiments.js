Page({
  data: {
    move: 'light-right',
    experimentsInfo: [
      {
        name: '实验一，这是一个实验',
        type: '行为实验',
        pay: '10',
        duration: '20',
        publisher: 'holy',
        picture: '../../images/portrait.png'
      },
      {
        name: '实验一，这是一个实验',
        type: '行为实验',
        pay: '10',
        duration: '20',
        publisher: 'holy',
        picture: '../../images/portrait.png'
      },
      {
        name: '实验一，这是一个实验',
        type: '行为实验',
        pay: '10',
        duration: '20',
        publisher: 'holy',
        picture: '../../images/portrait.png'
      }
    ]
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
  navigateToReleaseExperiments() {
    wx.navigateTo({
      url: '../release-experiments/release-experiments'
    })
  }
})