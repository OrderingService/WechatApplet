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
    /*
    wx.showLoading({
      title: '努力加载中',
    })
    //后台暂时使用easy-mock的接口，所有数据一次请求完
    wx.request({
      url: 'https://easy-mock.com/mock/5af5a51db758743d3788fa65/PML/menu',
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
    */
    that.setData({
      listData: [{
        "name": "泡面系列",
        "foods": [
          {
            "image_url": "../../images/noodles/noodles1.jpg",
            "name": "抹茶海鲜杯面",
            "price": 12,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles2.jpg",
            "name": "林氏盖饭杯面",
            "price": 11,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles3.jpg",
            "name": "维他命b1脑面",
            "price": 14,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles4.jpg",
            "name": "饺子重击面",
            "price": 12,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles5.jpg",
            "name": "泰式绿咖喱面",
            "price": 9,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles6.jpg",
            "name": "明太子乌冬面",
            "price": 15,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles7.jpg",
            "name": "培根蛋酱风味乌冬面",
            "price": 13,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles8.jpg",
            "name": "意面杯面",
            "price": 11,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles9.jpg",
            "name": "酸奶咖喱面",
            "price": 12,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles10.jpg",
            "name": "菠萝拉面",
            "price": 12,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles11.jpg",
            "name": "巧克力炒面",
            "price": 13,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles12.jpg",
            "name": "草莓蛋糕炒面",
            "price": 15,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles13.jpg",
            "name": "芥末蛋黄酱炒面",
            "price": 12,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles14.jpg",
            "name": "香菜炒面",
            "price": 10,
            "buy_num": 0
          },
          {
            "image_url": "../../images/noodles/noodles15.jpg",
            "name": "纳豆炒面",
            "price": 11,
            "buy_num": 0
          }
        ]
      },
      {
        "name": "开胃美味",
        "foods": [
          {
            "image_url": "../../images/foods/appetizer1.jpg",
            "name": "鸡肉芝士凯撒沙拉",
            "price": 10,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/appetizer2.jpg",
            "name": "炸鸡软骨",
            "price": 7,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/appetizer3.jpg",
            "name": "牛油焗扇贝",
            "price": 14,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/appetizer4.jpg",
            "name": "烤鱿鱼",
            "price": 12,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/appetizer5.jpg",
            "name": "和风比萨(照烧鸡)",
            "price": 28,
            "buy_num": 0
          }
        ]
      },
      {
        "name": "主食菜色",
        "foods": [
          {
            "image_url": "../../images/foods/entree1.jpg",
            "name": "牛肉锅烧乌冬",
            "price": 12,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/entree2.jpg",
            "name": "广岛风铁板炒面",
            "price": 11,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/entree3.jpg",
            "name": "石锅猪肉饭",
            "price": 14,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/entree4.jpg",
            "name": "猪骨汤拉面",
            "price": 12,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/entree5.jpg",
            "name": "特盛牛肉饭",
            "price": 13,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/entree6.jpg",
            "name": "鲜味虾煲",
            "price": 13,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/entree7.jpg",
            "name": "牛腩咖喱",
            "price": 13,
            "buy_num": 0
          }
        ]
      },
      {
        "name": "饭后甜品",
        "foods": [
          {
            "image_url": "../../images/foods/dessert1.jpg",
            "name": "软雪布丁",
            "price": 8,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/dessert2.jpg",
            "name": "抹茶雪糕",
            "price": 5,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/dessert3.jpg",
            "name": "法芙娜巧克力松饼",
            "price": 12,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/dessert4.jpg",
            "name": "芒果鸡肉三明治",
            "price": 8,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/dessert5.jpg",
            "name": "纸杯蛋糕",
            "price": 5,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/dessert6.jpg",
            "name": "百香果汁",
            "price": 7,
            "buy_num": 0
          },
          {
            "image_url": "../../images/foods/dessert7.jpg",
            "name": "草莓奶茶",
            "price": 10,
            "buy_num": 0
          }
        ]
      }],
      loading: true
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