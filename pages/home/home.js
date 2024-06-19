Page({
  data: {
    height: 20,
    focus: false,
    cookie:null,
    pList:null,
    vList:null,
    newList:null
    
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
    console.log(name);
    var that = this;
    wx.request ({
      url: 'https://81d8-240e-39a-edf-bc80-d00a-42c-f1ff-5d60.ngrok-free.app/get_user',
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
  getInfo: function(e) {
    const id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/home/users/users?id=' + id
    })
  },
})
