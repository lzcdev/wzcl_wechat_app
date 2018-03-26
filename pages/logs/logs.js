//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    }),
    wx.request({
      url: 'https://yishujia.yicuichina.com/api/artist',
      data: {
        page: 1,
        limit: 10
      },
      method: 'Get',
      header: {'Content-Type': 'application/json'},
      dataType: 'json',
      success: res => {
        console.log(res.data)
      }
    })
  }
})
