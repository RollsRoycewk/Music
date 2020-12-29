// pages/song/song.js
import ajax from "../../utils/ajax.js"
import PubSub from 'pubsub-js'
let appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songsList: [],
    songId: "",
    audioSrc: "",
    isPlay: false
  },
  // 发送请求公共函数
  async getSongListAsync() {
    let result = await ajax("/song/detail", {
      ids: this.data.songId
    })

    this.setData({
      songsList: result.songs[0],
      // songId
    })

    wx.setNavigationBarTitle({
      title: this.data.songsList.name
    })

  },
  // 点击切换
  handleTypeSwitch(event) {
    let {
      id
    } = event.currentTarget;
    PubSub.publish('switchType', id);
    this.getSongListAsync()
  },
  async handlePlayStop() {
    // 全局北京音乐
    if (!this.data.audioSrc) {
      // 发送请求获取音乐
      let audioSrc = await ajax("/song/url", {
        id: this.data.songId
      })
      audioSrc = audioSrc.data[0].url
      this.setData({
        audioSrc
      })
    }
    let BackgroundAudioManager = wx.getBackgroundAudioManager()

    if (this.data.isPlay) {
      BackgroundAudioManager.pause();
      this.setData({
        isPlay: false
      })
      
      appInstance.globalData.isPlay = false
      // console.log("点击了暂停按钮", appInstance.globalData.isPlay)
    } else {
      BackgroundAudioManager.src = this.data.audioSrc
      BackgroundAudioManager.title = this.data.songsList.name
      BackgroundAudioManager.play()
      this.setData({
        isPlay: true
      })
      appInstance.globalData.isPlay = true;
      appInstance.globalData.videoId = this.data.songId;
      // console.log("点击了播放按钮", appInstance.globalData.isPlay, appInstance.globalData.videoId)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let {
      songId
    } = options;

    this.setData({
      songId
    })
    // let result = await ajax("/song/detail", {
    //   ids: songId
    // })

    // this.setData({
    //   songsList: result.songs[0],
    //   songId
    // })

    // wx.setNavigationBarTitle({
    //   title: this.data.songsList.name
    // })
    this.getSongListAsync()
    PubSub.subscribe('changeId', (msg, data) => {
      // console.log(msg, data)
      this.setData({
        songId: data
      })
      this.getSongListAsync()
    });

    // console.log(appInstance.globalData.isPlay)
    let {
      isPlay,
      videoId
    } = appInstance.globalData;
    // console.log(isPlay, videoId)

    if (videoId === this.data.songId) {
      this.setData({
        isPlay: true
      })
    }
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