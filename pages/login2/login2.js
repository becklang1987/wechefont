// pages/index/index.js
Page({
  data:{
    msg:'',
    cookie:''
  },
login:function(){
    console.log('login')
    var that = this;
    wx.request({  
      url: 'https://81d8-240e-39a-edf-bc80-d00a-42c-f1ff-5d60.ngrok-free.app',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      success: function(res) { 
        console.log(res)
        console.log(res.header['Set-Cookie'])
        that.setData({
          cookie: res.header['Set-Cookie']
        })
        wx.request({
          url: 'https://81d8-240e-39a-edf-bc80-d00a-42c-f1ff-5d60.ngrok-free.app/login',
          method: 'GET',
          header: {
            'content-type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'cookie': that.data.cookie
          },

          success: (res) => {
          console.log(res)
          if(res.statusCode == 200){
            wx.navigateTo({
              url: '/pages/web-view/web-view?url=' + encodeURIComponent(res.data)
              })
           }},
        fail: ()=>{},
        complete: ()=>{}
        });
        
      }}
    )}
     })
