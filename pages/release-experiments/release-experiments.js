Page({
  data: {
    move: 'light-right',
    show: false,
    selectData: ['行为实验', '脑电实验', '问卷', '核磁共振', '皮肤电实验', '其他'],
    index:0
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
  }
})