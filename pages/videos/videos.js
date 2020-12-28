// pages/videos/videos.js
import ajax from "../../utils/ajax.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    currentid: 58100,
    videosList: [],
    triggered: false,
    scrollsId: ""
  },
  // image切换到视屏
  showVideos(event) {
    console.log(event, "showVideos")
  },
  // 处理点击播放
  handlePlay(event) {
    // console.log(event, "handlePlay")
    let id = event.currentTarget.id;
    let preVideoId = this.preVideoId
    if (preVideoId && preVideoId !== id) {
      let currentvideo = wx.createVideoContext(preVideoId)
      currentvideo.pause()
    }
    this.preVideoId = id;
  },
  // 点击事件
  async handleTap(event) {
    let res = event.target.dataset.currentid;
    let id = event.target.id
    if (res) {
      this.setData({
        currentid: res,
        scrollsId: id
      })
    }
    wx.showLoading({
      title: "数据请求中"
    })
    this.setData({
      videosList: []
    })
    await this.getVideosList()
    wx.hideLoading()
  },
  async getVideosList() {
    const val = await ajax("/video/group", {
      id: this.data.currentid
    })

    if (val.datas) {
      const videosList = val.datas.map((item) => {
        return {
          title: item.data.title,
          nickname: item.data.creator.nickname,
          urlInfo: item.data.urlInfo.url,
          id: item.data.urlInfo.id,
          commentCount: item.data.commentCount,
          shareCount: item.data.shareCount,
          coverUrl: item.data.coverUrl
        }
      })
      this.setData({
        videosList
      })
    }

  },
  async handleFresherrefresh() {
    // console.log("handleFresherrefresh")
    await this.getVideosList()
    this.setData({
      triggered: false
    })
  },
  handlescrolltolower() {
    // console.log("handlescrolltolower")
    if (this.flag) return;
    this.flag = true
    setTimeout(() => {
      let falseData = JSON.parse(JSON.stringify(this.data.videosList))
      this.setData({
        videosList: [...this.data.videosList, ...falseData]
      })
      this.flag = false
    }, 3000)

    // console.log(falseData)

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
    const result = await ajax("/video/group/list")
    let navList = result.data.splice(0, 14)
    this.setData({
      navList,
      currentid: navList[0].id,
    })
    this.getVideosList()

    let cookies = wx.getStorageSync("cookies");
    if (!cookies) {
      wx.showModal({
        title: "请先登录",
        content: "该功能需要登录账号",
        success: ({
          confirm
        }) => {
          console.log(confirm)
          if (!confirm) {
            wx.switchTab({
              url: "/pages/index/index"
            })
          } else {
            wx.navigateTo({
              url: "/pages/login/login"
            })
          }
        }
      })
    }
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
    console.log("onPullDownRefresh")
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