// pages/recommendSong/recommendSong.js

import ajax from "../../utils/ajax.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: "",
    month: ""
  },
  handleSongId(event) {
    let songId = event.currentTarget.dataset.songid;
    wx.navigateTo({
      url: "/pages/song/song?songId=" + songId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let day = new Date().getDate()
    let month = new Date().getMonth() + 1
    this.setData({
      day,
      month
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
  onShow: async function() {
    const result = await ajax("/recommend/songs");
    let songList = result.recommend.slice(0, 14);
    this.setData({
      songList: songList
    })
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