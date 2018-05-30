Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMoney: 0,
    foodNumber: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMoney: wx.getStorageSync('sumMoney'),
      foodNumber: wx.getStorageSync('foodNumber')
    })
  },

  gopay: function () {
    if (getApp().globalData.userInfo != null) {
      wx.navigateTo({
        url: '../pay/index'
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  }

})