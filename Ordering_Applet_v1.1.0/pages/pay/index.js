// index.js
// 获取应用实例
const app = getApp()
// 获取Bmob
// var Bmob = require('../../utils/dist/Bmob-1.1.1.min.js');

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
    // 请求Bmob，生成新订单数据 
    // const query = Bmob.Query('orderForm');
    // query.set("user_name", app.globalData.userInfo.nickName)
    // query.set("prices", wx.getStorageSync('sumMoney'))
    // query.set("order", wx.getStorageSync('cartList'))
    // query.save().then(res => {
    //   console.log(res)
    //   this.setData({
    //     order_id: res.objectId,
    //     order_time: res.createdAt
    //   })
    // }).catch(err => {
    //   console.log(err)
    // })

    var that = this;
    wx.request({
      url: 'http://172.18.146.154:8080/OrderingSystem/Insert?func=createOrder',
      // url: 'http://localhost:8080/test/Insert?func=createOrder',
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