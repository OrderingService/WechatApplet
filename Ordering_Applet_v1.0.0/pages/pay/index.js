// index.js
// 获取应用实例
const app = getApp()
// 获取Bmob
var Bmob = require('../../utils/dist/Bmob-1.1.1.min.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMoney: 0,
    foodNumber: 0,
    order_id: "",
    order_time: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求Bmob，生成新订单数据 
    const query = Bmob.Query('orderForm');
    query.set("user_name", app.globalData.userInfo.nickName)
    query.set("prices", wx.getStorageSync('sumMoney'))
    query.set("order", wx.getStorageSync('cartList'))
    query.save().then(res => {
      console.log(res)
      this.setData({
        order_id: res.objectId,
        order_time: res.createdAt
      })
    }).catch(err => {
      console.log(err)
    })

    this.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMoney: wx.getStorageSync('sumMoney'),
      foodNumber: wx.getStorageSync('foodNumber')
    })
  },
})