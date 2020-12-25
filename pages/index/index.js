// qqq.js
import ajax from "../../utils/ajax.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendList: [],
    slideshowList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 推荐歌曲
    // wx.request({
    //   url: "http://localhost:3000/personalized",
    //   success: (res) => {
    //     this.setData({
    //       recommendList: res.data.result
    //     })
    //   }
    // })
    ajax("/personalized").then((res) => {
      this.setData({
        recommendList: res.result
      })
    })


    // 轮播图
    // wx.request({
    //   url: "http://localhost:3000/banner",
    //   success: (res) => {
    //     this.setData({
    //       slideshowList: res.data.banners
    //     })
    //   }
    // })
    ajax("/banner", {
      type: 2
    }).then((res) => {
      this.setData({
        slideshowList: res.banners
      })
    })
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