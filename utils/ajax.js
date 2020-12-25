export default function(url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: "http://wangkai.zone:3000" + url,
      data,
      method,
      success: (res) => {
        resolve(res.data)
      }
    })
  })

}