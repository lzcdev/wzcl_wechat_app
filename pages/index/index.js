// pages/index/index.js
// 'use strict'
const network = require('../../utils/network.js')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: []
  },
  goLogin: function (e) {
    try {
      console.log('清除缓存成功')
      wx.removeStorageSync('UserMsg')
    } catch (e) {
      // Do something when catch error
    }
  },
  // 添加车辆
  addCar: function(e) {
    var hasLogin = util.hasLogin()
    if (hasLogin) {
      console.log('已登录')
      wx.navigateTo({
        url: '../addCar/addCar',
      })
    } else {
      console.log('未登录')
      wx.navigateTo({
        url: '../login/login',
      })
    }

  },
  goWfList: function(e) {
    console.log('违法处理界面')
    wx.navigateTo({
      url: "../wfList/wfList?title=浙J · UU249",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取车辆列表
    this.getCarList();

  },

  getCarList: function(e) {
    var that = this;
    network.get({
      url: '/getUserVehList',
      params: {},
      success: res => {
        console.log(res.data)
        res.data.forEach((item) => {
          // 处理号牌号码
          item.hphm = item.hphm.substr(0, 1) + ' · ' + item.hphm.substr(1, item.hphm.length-1); 
        })
        // 模拟多条
        res.data = res.data.concat(res.data)
        res.data = res.data.concat(res.data)

        that.setData({
          carList: res.data

        })
      },
      fail: err => {
        console.log(err)
      }      
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})