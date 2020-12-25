// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: ""
  },

  handlePhone(event) {
    console.log("handlePhone", event)
    this.setData({
      phone: event.detail.value
    })
  },
  handlePassword(event) {
    console.log("handlePassword", event)
    this.setData({
      password: event.detail.value
    })
  },

  handleLogin(event) {
    // console.log(event)
    let type = event.currentTarget.dataset.type;
    let value = event.detail.value;
    // console.log(type, value)

    this.setData({
      [type]: value
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
  onShow: function() {

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