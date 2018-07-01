// index.js
// 获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/banner/banner1.jpg',
      '../../images/banner/banner2.jpg',
      '../../images/banner/banner3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    listData: [],
    activeIndex: 0,
    toView: 'a0',
    scrollTop: 100,
    screenWidth: 667,
    cartList: [],
    isInCart: [],
    sumMoney: 0,
    foodNumber: 0,
    showCart: false,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var sysinfo = wx.getSystemInfoSync().windowHeight;
    console.log(sysinfo)

    wx.showLoading({
      title: '努力加载中',
    })
    //后台暂时使用easy-mock的接口，所有数据一次请求完
    wx.request({
      url: 'http://172.18.146.154:8888/OrderingSystem/Select?func=getMenu',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res)
        that.setData({
          listData: res.data,
          loading: true
        })
      }
    })
  },

  selectMenu: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      activeIndex: index,
      toView: 'a' + index,
    })
    console.log(this.data.toView);
  },

  addToCart: function (e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    var isInCart = this.data.isInCart;
    var cartList = this.data.cartList;
    var listData = this.data.listData;
    var item = {
      "index": 15 * type + index,
      "name": this.data.listData[type].foods[index].name,
      "price": this.data.listData[type].foods[index].price,
      "number": 1
    };
   
    if (isInCart[item.index]) {
      for (var i in cartList) {
        if (cartList[i].name == item.name) {
          cartList[i].number++;
          this.data.listData[type].foods[index].buy_num = cartList[i].number;
          break;
        }
      }
    } else {
      cartList.push(item);
      isInCart[item.index] = true;
      this.data.listData[type].foods[index].buy_num = 1;
    }

    this.setData({
      listData: listData,
      cartList: cartList,
      isInCart: isInCart,
      sumMoney: this.data.sumMoney + item.price,
      foodNumber: this.data.foodNumber + 1
    });
    console.log(this.data.cartList);
    console.log(this.data.isInCart);
  },

  removeFromCart: function (e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    var isInCart = this.data.isInCart;
    var cartList = this.data.cartList;
    var listData = this.data.listData;
    var item = {
      "index": 15 * type + index,
      "name": this.data.listData[type].foods[index].name,
      "price": this.data.listData[type].foods[index].price,
    };
    if (!isInCart[item.index])
      return;
    for (var i in cartList) {
      if (cartList[i].name == item.name) {
        if (cartList[i].number != 1) {
          cartList[i].number--;
          this.data.listData[type].foods[index].buy_num = cartList[i].number;
        } else {
          cartList.splice(i, 1);
          isInCart[item.index] = false;
          this.data.listData[type].foods[index].buy_num = 0;
        }
        break;
      }
    }
    
    this.setData({
      listData: listData,
      cartList: cartList,
      isInCart: isInCart,
      sumMoney: this.data.sumMoney - item.price,
      foodNumber: this.data.foodNumber - 1
    });
    console.log(this.data.cartList);
    console.log(this.data.isInCart);
  },

  showCartList: function () {
    if (this.data.foodNumber != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }
    console.log(this.data.showCart);
  },

  clearCartList: function () {
    this.setData({
      cartList: [],
      isInCart: [],
      showCart: false,
      sumMoney: 0,
      foodNumber: 0
    });
  },

  addNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    var cartList = this.data.cartList;
    var listData = this.data.listData;
    cartList[index].number++;
    for (var i in listData) {
      for (var j in listData[i].foods) {
        if (listData[i].foods[j].name == cartList[index].name) {
          listData[i].foods[j].buy_num = cartList[index].number;
          break;
        }
      }
    }
    this.setData({
      listData: listData,
      cartList: cartList,
      sumMoney: this.data.sumMoney + cartList[index].price,
      foodNumber: this.data.foodNumber + 1
    });
  },

  decNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    var isInCart = this.data.isInCart;
    var cartList = this.data.cartList;
    var listData = this.data.listData;
    var sumMoney = this.data.sumMoney - cartList[index].price;
    if (cartList[index].number == 1) {
      isInCart[cartList[index].index] = false;
      for (var i in listData) {
        for (var j in listData[i].foods) {
          if (listData[i].foods[j].name == cartList[index].name) {
            listData[i].foods[j].buy_num = 0;
            break;
          }
        }
      }
      cartList.splice(index, 1);
    } else {
      cartList[index].number--;
      for (var i in listData) {
        for (var j in listData[i].foods) {
          if (listData[i].foods[j].name == cartList[index].name) {
            listData[i].foods[j].buy_num = cartList[index].number;
            break;
          }
        }
      }
    }
    this.setData({
      listData: listData,
      cartList: cartList,
      isInCart: isInCart,
      sumMoney: sumMoney,
      showCart: cartList.length != 0,
      foodNumber: this.data.foodNumber - 1
    });
  },

  scroll: function (e) {
    var activeIndex;
    var windowHeight = wx.getSystemInfoSync().windowHeight + 64;
    if (e.detail.scrollTop < 1057 * windowHeight / 736) {
      activeIndex = 0;
    } else if (e.detail.scrollTop < 1424 * windowHeight / 736) {
      activeIndex = 1;
    } else if (e.detail.scrollTop < 1775 * windowHeight / 736) {
      activeIndex = 2;
    } else {
      activeIndex = 3;
    }
    this.setData({
      activeIndex: activeIndex
    });
    // console.log(e.detail.scrollTop);
    // console.log(activeIndex);
  },

  goBalance: function () {
    if (this.data.sumMoney != 0) {
      wx.setStorageSync('cartList', this.data.cartList);
      wx.setStorageSync('sumMoney', this.data.sumMoney);
      wx.setStorageSync('foodNumber', this.data.foodNumber);
      wx.navigateTo({
        url: '../order/index'
      })
    }
  },

})