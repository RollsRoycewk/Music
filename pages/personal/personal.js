// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touchMove: "",
    transitionName: "",
    userInfo: {}
  },

  handleTouch(event) {
    // console.log("handleTouch", event)
    this.startY = event.touches[0].clientY
    // console.log(event.touches[0].clientY)
  },
  handleTouchMove(event) {
    // console.log("handleTouchMove", event)
    // console.log(event.touches[0].clientY)
    let transfrom = Math.floor(event.touches[0].clientY - this.startY)
    if (transfrom < 0 || transfrom > 80) return;
    this.setData({
      touchMove: transfrom
    })
    // console.log(transfrom)
  },
  handleTouchEnd() {
    this.setData({
      touchMove: "",
      transitionName: "transform,400ms"
    })
  },
  loginBtn() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    // const res = await wx.getStorage({
    //   key: "userInfo"
    // })
    const res = wx.getStorageSync("userInfo")
    if (res) {
      this.setData({
        userInfo: JSON.parse(res)
      })
    }
    // console.log(JSON.parse(res.data))
    // this.setData({
    //   userInfo: JSON.parse(res.data)
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})