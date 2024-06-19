// pages/web-view/web-view.js
Page({
  data: {
    url: '',
    message: '',
    user: null,
    username:'',
    cookie:'123',
    sessionID:''
  },
  onLoad: function(query) {
    this.setData({
      url: decodeURIComponent(query.url)
    });
  },
 loadMessage: function(e) {
    console.log(e);
    this.setData({
      message: e.detail.data[0]['message'],
      username:e.detail.data[0]['username'],
      sessionID:e.detail.data[0]['sid']
    });
    console.log(this.data.sessionID);
    console.log("requesting cookie");
  const app = getApp();
  app.globalData.username = this.data.username;
  app.globalData.sid = this.data.sessionID;
  this.getCookies(e);
  },
 getCookies: function(e) {
  wx.request ({
    url:'https://81d8-240e-39a-edf-bc80-d00a-42c-f1ff-5d60.ngrok-free.app/get_cookie',
    method:'POST',
    data:{
      'sid':this.data.sessionID
    },
    success:(res)=>{
      console.log(res);
      this.setData({
        cookie:res.header['Set-Cookie']
      });
      console.log("cookie is "+this.data.cookie);
      this.setGlobalCookike();
    },
    });
},
  setGlobalCookike: function() {
    const app = getApp();
    app.globalData.cookie= this.data.cookie;
  }
})