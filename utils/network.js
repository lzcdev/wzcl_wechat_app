var baseUrl = "https://api.lujingkeji.com/go_web";

var requestHandler = {
  url: '',
  params: {},
  success: function(res) {
    console.log('success:', res)
  },
  fail: function(err) {
    console.log('err:', err)
  }
}

function get(requestHandler) {
  request('GET', requestHandler)
}

function post(requestHandler) {
  request('POST', requestHandler)
}

function request(method, requestHandler) {
  var params = requestHandler.params
  var url = requestHandler.url

  wx.request({
    url: baseUrl + url,
    data: params,
    method: method,
    header: {
      'content-type': 'application/json',
      'XBToken': 'lsOLXbNDThGyGGHGZx/pUL7zz6C6UlgOUOlAioNfah8='
    },
    success: function(res) {
      if (res.statusCode == 518) {

        var lujing_error = JSON.parse(decodeURIComponent(JSON.stringify(res.header['lujing_error'])));
        // console.log(lujing_error)

        wx.showToast({
          title: lujing_error,
          icon: 'none',
          duration: 2000
        })
      } else if (res.statusCode == 404) {
        wx.showToast({
          title: '资源未找到，请稍后重试',
          icon: 'none',
          duration: 2000
        })
      } else if (res.statusCode == 403) {
        wx.showToast({
          title: '登录过期，请重新登录',
          icon: 'none',
          duration: 2000
        })
      } else {
        requestHandler.success(res)
      }


    },
    fail: function(err) {
      requestHandler.fail(err)
    }
  })
}

module.exports = {
  get: get,
  post: post
}  