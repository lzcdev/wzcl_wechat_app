
const network = require('../../utils/network.js')
const util = require('../../utils/util')


// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    passwd: '',
    isClick: true,
    yzm: '获取验证码'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var version = util.getSystemInfo('version');
    // console.log(version);
   
  },
  // 获取验证码
  get_yzm: function(e) {
    var that = this
    var count = 3
    if (this.data.mobile == '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      isClick: false
    })
    var time = setInterval(function () {
      that.setData({
        yzm: count.toString() + '秒后重发'
      })
      count--
      if (count == 0) {
        clearInterval(time);
        that.setData({
          yzm: '获取验证码',
          isClick: true
        })
      }
    },1000)

    network.get({
      url: '/p/sendVerifyCode',
      params: {
        'mobile': this.data.mobile
      },
      success: res => {
        console.log('获取验证码接口:', res);
        wx.showToast({
          title: '验证码发送成功',
          icon: 'none',
          duration: 2000
        })

      },
      fail: err => {
        console.log('fail' + err)
      }
    })

  },
  // 用户服务协议
  goAgreement: function (e) {
    
  },
  // 手机号
  bindMobieInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 验证码
  bindPasswordInput: function (e) {

    this.setData({
      passwd: e.detail.value
    })
  },
  // 登录
  login: function (e) {

    var that = this
    network.post({
      url: '/p/quickLogin',
      params: {
        'device': {
          'code': 'B1333D78-8FCE-45B4-8592-1273A13EE21E',
          'mobileType': util.getSystemInfo('model'),
          'osVersion': util.getSystemInfo('system')
        },
        'user': {
          'mobile': this.data.mobile
        },
        'verifyCode': this.data.passwd
      },
      success: res => {
        console.log('登录接口:', res);
        try {
          console.log('登录成功')
          wx.setStorageSync('UserMsg', res.data)
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