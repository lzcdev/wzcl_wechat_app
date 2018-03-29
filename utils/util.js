const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 获取系统信息
const getSystemInfo = msg => {
  var model, pixelRatio, windowWidth, windowHeight, language, version, platform, system
      wx.getSystemInfo({
      success: function (res) {
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)
        // console.log(res.platform)
        model = res.model
        pixelRatio = res.pixelRatio
        windowWidth = res.windowWidth
        windowHeight = res.windowHeight
        language = res.language
        version = res.version
        platform = res.platform
        system = res.system

      }
    })
  switch (msg) {
    case 'model': return model; break;
    case 'pixelRatio': return pixelRatio; break;
    case 'windowWidth': return windowWidth; break;
    case 'windowHeight': return windowHeight; break;
    case 'language': return language; break;
    case 'version': return version; break;
    case 'platform': return platform; break;
    case 'system': return system; break;
  }  
}

// 获取系统信息同步接口(暂时写4个)
const getSystemInfoSync = msg => {
  var brand, model, system, platform
  wx.getSystemInfoSync({
    success: function (res) {
      brand = res.brand
      model = res.model
      system = res.system
      platform = res.platform
    }
  })
  switch (msg) {
    case 'brand': return brand; break;
    case 'model': return model; break;
    case 'system': return system; break;
    case 'platform': return platform; break;
  }
}

// 已登录
const hasLogin = () => {
  try {
    var value = wx.getStorageSync('UserMsg')
    if (value) {
      // Do something with return value
      return true
    } else {
      return false
    }
  } catch (e) {
    // Do something when catch error
  }
}

// 获取token
const getToken = () => {
  return wx.getStorageSync('UserMsg').token
}

module.exports = {
  formatTime: formatTime,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfoSync,
  hasLogin: hasLogin,
  getToken: getToken
}
