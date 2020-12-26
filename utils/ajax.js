export default function(url, data = {}, method = "GET") {
  let cookie = wx.getStorageSync("cookies")

  if (cookie) {
    cookie = JSON.parse(cookie)
    // console.log(cookies)
  } else {
    cookie = ""
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: "http://wangkai.zone:3000" + url,
      data,
      method,
      header: {
        cookie
      },
      success: (res) => {
        if (data.isLogin) {
          // 读取到cookies
          const cookiesList = res.cookies;
          const cookies = cookiesList.filter((item) => {
            return item.indexOf("MUSIC_U") === 0
          })
          // 设置到Storage中
          wx.setStorage({
            key: 'cookies',
            data: JSON.stringify(cookies[0]),
          })
        }
        resolve(res.data)
      }
    })
  })

}