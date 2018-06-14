Page({
  navigateByType(e) {
    wx.navigateTo({
      url: `../experiment-list/experiment-list?type=${e.currentTarget.dataset.type}`
    })
  }
})