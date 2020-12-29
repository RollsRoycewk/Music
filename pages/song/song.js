// pages/song/song.js
import ajax from "../../utils/ajax.js"
import PubSub from 'pubsub-js'
import moment from "moment"

let appInstance = getApp();
let BackgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songsList: [],
    songId: "",
    audioSrc: "",
    isPlay: false,
    currentTime: "00:01",
    totaltime: "00:00",
    currentWidth: 0
  },
  // 背景音乐事件
  backgroundEvent() {
    wx.onBackgroundAudioPlay(() => {
      // console.log("onBackgroundAudioPlay");
      this.setData({
        isPlay: true
      })
      appInstance.globalData.isPlay = true;
    })
    wx.onBackgroundAudioPause(() => {
      // console.log("onBackgroundAudioPause")
      this.setData({
        isPlay: false
      })
      appInstance.globalData.isPlay = false;
    })
    // // 背景音频时间
    // const duration = BackgroundAudioManager.duration;
    // console.log(duration)
    BackgroundAudioManager.onTimeUpdate(() => {
      // 背景音频时间
      let duration = BackgroundAudioManager.duration;
      // 当前播放音频的位置
      let currentTime = BackgroundAudioManager.currentTime;
      let currentWidth = (currentTime / duration) * 100;
      this.setData({
        currentWidth,
        currentTime: moment(currentWidth * 1000).format('mm:ss')
      })
    })
  },
  // 获取音乐url
  async getMusicUrl() {
    // 发送请求获取音乐
    let audioSrc = await ajax("/song/url", {
      id: this.data.songId
    })
    audioSrc = audioSrc.data[0].url
    this.setData({
      audioSrc
    })

  },
  // 发送请求公共函数
  async getSongListAsync() {
    let result = await ajax("/song/detail", {
      ids: this.data.songId
    })

    this.setData({
      songsList: result.songs[0],
      // songId
      totaltime: moment(result.songs[0].dt).format('mm:ss')
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
  },
  async handlePlayStop() {
    // 全局北京音乐
    if (!this.data.audioSrc) {
      // // 发送请求获取音乐
      // let audioSrc = await ajax("/song/url", {
      //   id: this.data.songId
      // })
      // audioSrc = audioSrc.data[0].url
      // this.setData({
      //   audioSrc
      // })

      // 一定要加await,否则后面先执行没有数据报错
      await this.getMusicUrl();
    }
    // let BackgroundAudioManager = wx.getBackgroundAudioManager()

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
    PubSub.subscribe('changeId', async(msg, data) => {
      // console.log(msg, data)
      this.setData({
        songId: data
      })
      // 获取当前音乐detail
      this.getSongListAsync();
      // 获取音乐url
      // 注意,注意,一定要加await  否则报错
      await this.getMusicUrl();
      // 播放歌曲
      BackgroundAudioManager.src = this.data.audioSrc
      BackgroundAudioManager.title = this.data.songsList.name
    });
    // 处理背景播放事件
    this.backgroundEvent()

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