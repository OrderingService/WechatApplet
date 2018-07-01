// index.js
// 获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMoney: 0,
    foodNumber: 0,
    orderNum: "",
    objectId: "",
    createDate: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://172.18.146.154:8888/OrderingSystem/Insert?func=createOrder',
      method: 'POST',
      data: {
        userName: app.globalData.userInfo.nickName,
        price: wx.getStorageSync('sumMoney'),
        dishArray: JSON.stringify(wx.getStorageSync('cartList'))
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          orderNum: res.data.orderNum,
          objectId: res.data.objectId,
          createDate: res.data.createDate
        })
      }
    })
    this.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMoney: wx.getStorageSync('sumMoney'),
      foodNumber: wx.getStorageSync('foodNumber')
    })
  },
})