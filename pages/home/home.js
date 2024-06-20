Page({
  data: {
    height: 20,
    focus: false,
    cookie:null,
    pList:null,
    vList:null,
    newList:null,
    showOrNot1: false,
    
  },
  onLoad: function (options) {
    const app = getApp();
    console.log('ck is '+getApp().globalData.cookie)
    this.setData({
      cookie: app.globalData.cookie
    });
  },
  getInfo_Of_User: function(e) {
    const name=e.detail.value
    this.setData({
      showOrNot1:!this.data.showOrNot1
    });
    console.log(name);
    var that = this;
    wx.request ({
      url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/get_user',
      method: 'GET',
      data: {
        'displayName': name
      },
      header: {
        'Content-type': 'application/json',
        'Cookie': getApp().globalData.cookie,
        'ngrok-skip-browser-warning': 'true'
      },
      success: function(res) {
        console.log(res.data.list)
        that.setData({
          newList: res.data.list
        });
        console.log('NewList is ' + that.data.newList);
      }
  }) 
},
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
  },
  goBack_To_Home: function(e) {
    this.setData({
      showOrNot1:!this.data.showOrNot1
    });

  },
})
