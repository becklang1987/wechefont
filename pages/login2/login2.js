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
      url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app',
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
          url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/login',
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
