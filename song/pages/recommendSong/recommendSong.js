// pages/recommendSong/recommendSong.js

import ajax from "../../../utils/ajax.js"
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: "",
    month: "",
    songList: [],
    currentindex: null
  },
  handleSongId(event) {
    let {
      songid,
      currentindex
    } = event.currentTarget.dataset;

    this.setData({
      currentindex
    })


    wx.navigateTo({
      url: "/song/pages/song/song?songId=" + songid,
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let day = new Date().getDate()
    let month = new Date().getMonth() + 1
    this.setData({
      day,
      month
    })

    const result = await ajax("/recommend/songs");
    let songList = result.recommend.slice(0, 14);
    this.setData({
      songList: songList
    })

    PubSub.subscribe('switchType', (msg, data) => {
      // console.log(msg, data)
      let {
        currentindex,
        songList
      } = this.data

      if (data === "next") {
        if (currentindex >= songList.length - 1) {
          currentindex = 0
        } else {
          currentindex++
        }
      }
      if (data === "pre") {
        if (currentindex === 0) {
          currentindex = songList.length - 1;
        } else {
          currentindex--
        }
      }
      this.setData({
        currentindex
      })

      // 发布消息
      PubSub.publishSync('changeId', songList[currentindex].id);
    });
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