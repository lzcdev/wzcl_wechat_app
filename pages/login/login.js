
const network = require('../../utils/network.js')
const util = require('../../utils/util')


// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    passwd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var version = util.getSystemInfo('version');
    // console.log(version);
   
  },
  bindMobieInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindPasswordInput: function (e) {
    this.setData({
      passwd: e.detail.value
    })
  },
  login: function (e) {

    var that = this
    network.post({
      url: '/p/login',
      params: {
        'device': {
          'code': 'B1333D78-8FCE-45B4-8592-1273A13EE21E',
          'mobileType': util.getSystemInfo('model'),
          'osVersion': util.getSystemInfo('system')
        },
        'user': {
          'mobile': this.data.mobile,
          'passwd': this.data.passwd,

        }
      },
      success: res => {
        console.log('登录接口:', res);
        try {
          console.log('登录成功')
          wx.setStorageSync('UserModel', res.data.user)
          wx.navigateBack({
            delta: 1
           })
        } catch (e) {
        }
    

      },
      fail: err => {
        console.log('fail' + err)
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