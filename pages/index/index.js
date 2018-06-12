const getAllExperiments = require('../../api/data').getAllExperiments

Page({
  data: {
    picture: '',
    userName: '',
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
  getExperiments() {
    let ctx = this
    getAllExperiments()
    .then(res => {
      console.log(res)     
    })
  },
  onLoad() {
    wx.getStorage({
      key: 'userName',
      success: res => {
        this.setData({
          userName: res.data
        })
      }
    })
    wx.getStorage({
      key: 'picture',
      success: res => {
        this.setData({
          picture: res.data
        })
      }
    })
    this.getExperiments()
  }
}) 