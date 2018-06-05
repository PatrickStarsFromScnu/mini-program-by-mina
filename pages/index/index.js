Page({
  data: {
    url: '../../images/portrait.png',
    imgUrls: [
      '../../images/a.jpeg',
      '../../images/timg.jpg'
    ],
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
  navigateToMyExperiments() {
    wx.navigateTo({
      url: '../my-experiments/my-experiments'
    })
  },
  navigateToExperimentType() {
    wx.navigateTo({
      url: '../experiment-type/experiment-type'
    })
  },
  navigateToExperimentDeatil() {
    wx.navigateTo({
      url: '../experiment-detail/experiment-detail'
    })
  }
}) 