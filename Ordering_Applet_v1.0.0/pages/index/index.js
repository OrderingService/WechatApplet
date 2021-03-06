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
    showModalStatus: false,
    cartList: [],
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
            "price": 12
          },
          {
            "image_url": "../../images/noodles/noodles2.jpg",
            "name": "林氏盖饭杯面",
            "price": 11
          },
          {
            "image_url": "../../images/noodles/noodles3.jpg",
            "name": "维他命b1脑面",
            "price": 14
          },
          {
            "image_url": "../../images/noodles/noodles4.jpg",
            "name": "饺子重击面",
            "price": 12
          },
          {
            "image_url": "../../images/noodles/noodles5.jpg",
            "name": "泰式绿咖喱面",
            "price": 9
          },
          {
            "image_url": "../../images/noodles/noodles6.jpg",
            "name": "明太子乌冬面",
            "price": 15
          },
          {
            "image_url": "../../images/noodles/noodles7.jpg",
            "name": "培根蛋酱风味乌冬面",
            "price": 13
          },
          {
            "image_url": "../../images/noodles/noodles8.jpg",
            "name": "意面杯面",
            "price": 11
          },
          {
            "image_url": "../../images/noodles/noodles9.jpg",
            "name": "酸奶咖喱面",
            "price": 12
          },
          {
            "image_url": "../../images/noodles/noodles10.jpg",
            "name": "菠萝拉面",
            "price": 12
          },
          {
            "image_url": "../../images/noodles/noodles11.jpg",
            "name": "巧克力炒面",
            "price": 13
          },
          {
            "image_url": "../../images/noodles/noodles12.jpg",
            "name": "草莓蛋糕炒面",
            "price": 15
          },
          {
            "image_url": "../../images/noodles/noodles13.jpg",
            "name": "芥末蛋黄酱炒面",
            "price": 12
          },
          {
            "image_url": "../../images/noodles/noodles14.jpg",
            "name": "香菜炒面",
            "price": 10
          },
          {
            "image_url": "../../images/noodles/noodles15.jpg",
            "name": "纳豆炒面",
            "price": 11
          }
        ]
      },
      {
        "name": "开胃美味",
        "foods": [
          {
            "image_url": "../../images/foods/appetizer1.jpg",
            "name": "鸡肉芝士凯撒沙拉",
            "price": 10
          },
          {
            "image_url": "../../images/foods/appetizer2.jpg",
            "name": "炸鸡软骨",
            "price": 7
          },
          {
            "image_url": "../../images/foods/appetizer3.jpg",
            "name": "牛油焗扇贝",
            "price": 14
          },
          {
            "image_url": "../../images/foods/appetizer4.jpg",
            "name": "烤鱿鱼",
            "price": 12
          },
          {
            "image_url": "../../images/foods/appetizer5.jpg",
            "name": "和风比萨(照烧鸡)",
            "price": 28
          }
        ]
      },
      {
        "name": "主食菜色",
        "foods": [
          {
            "image_url": "../../images/foods/entree1.jpg",
            "name": "牛肉锅烧乌冬",
            "price": 12
          },
          {
            "image_url": "../../images/foods/entree2.jpg",
            "name": "广岛风铁板炒面",
            "price": 11
          },
          {
            "image_url": "../../images/foods/entree3.jpg",
            "name": "石锅猪肉饭",
            "price": 14
          },
          {
            "image_url": "../../images/foods/entree4.jpg",
            "name": "猪骨汤拉面",
            "price": 12
          },
          {
            "image_url": "../../images/foods/entree5.jpg",
            "name": "特盛牛肉饭",
            "price": 13
          },
          {
            "image_url": "../../images/foods/entree6.jpg",
            "name": "鲜味虾煲",
            "price": 13
          },
          {
            "image_url": "../../images/foods/entree7.jpg",
            "name": "牛腩咖喱",
            "price": 13
          }
        ]
      },
      {
        "name": "饭后甜品",
        "foods": [
          {
            "image_url": "../../images/foods/dessert1.jpg",
            "name": "软雪布丁",
            "price": 8
          },
          {
            "image_url": "../../images/foods/dessert2.jpg",
            "name": "抹茶雪糕",
            "price": 5
          },
          {
            "image_url": "../../images/foods/dessert3.jpg",
            "name": "法芙娜巧克力松饼",
            "price": 12
          },
          {
            "image_url": "../../images/foods/dessert4.jpg",
            "name": "芒果鸡肉三明治",
            "price": 8
          },
          {
            "image_url": "../../images/foods/dessert5.jpg",
            "name": "纸杯蛋糕",
            "price": 5
          },
          {
            "image_url": "../../images/foods/dessert6.jpg",
            "name": "百香果汁",
            "price": 7
          },
          {
            "image_url": "../../images/foods/dessert7.jpg",
            "name": "草莓奶茶",
            "price": 10
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
    var a = this.data
    var addItem = {
      "name": a.listData[type].foods[index].name,
      "price": a.listData[type].foods[index].price,
      "number": 1,
      "sum": a.listData[type].foods[index].price,
    }
    var sumMoney = a.sumMoney + a.listData[type].foods[index].price;
    var cartList = this.data.cartList;
    cartList.push(addItem);
    this.setData({
      cartList: cartList,
      showModalStatus: false,
      sumMoney: sumMoney,
      foodNumber: a.foodNumber + 1
    });
    console.log(this.data.cartList)
  },

  showCartList: function () {
    console.log(this.data.showCart)
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }
  },

  clearCartList: function () {
    this.setData({
      cartList: [],
      showCart: false,
      sumMoney: 0,
      foodNumber: 0
    });
  },

  addNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;
    cartList[index].number++;
    var sum = this.data.sumMoney + cartList[index].price;
    cartList[index].sum += cartList[index].price;
    this.setData({
      cartList: cartList,
      sumMoney: sum,
      foodNumber: this.data.foodNumber + 1
    });
  },

  decNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;
    var sum = this.data.sumMoney - cartList[index].price;
    cartList[index].sum -= cartList[index].price;
    cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--;
    this.setData({
      cartList: cartList,
      sumMoney: sum,
      showCart: cartList.length == 0 ? false : true,
      foodNumber: this.data.foodNumber - 1
    });
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