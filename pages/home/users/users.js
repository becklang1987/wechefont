// pages/home/users/users.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id;
    this.setData({
      id: id
    });
  this.getInfo_of_ID(id);
},
  getInfo_of_ID: function(id) {
    console.log("开始请求用户信息...");
    wx.request({
      url: 'http://192.168.1.249:5030',
      data: {
        id: id
      },
      method: 'GET',
      success: (res) => {
        console.log(res.data);
        },
      })
    }});
