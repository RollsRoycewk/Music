export default function(url, data = {}, method) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: "http://localhost:3000" + url,
      data,
      method,
      success: (res) => {
        console.log(res)
        resolve(res.data)
      }
    })
  })

}