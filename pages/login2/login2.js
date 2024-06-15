// pages/index/index.js
Page({
  data:{
    msg:''
  },
  formSubmit: function(e) {
    console.log(e.detail.value)
    const that = this
    wx.request({
      url: 'http://192.168.1.249:5020/',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: {
        digits: e.detail.value.slider,
        username: e.detail.value.username,
        password: e.detail.value.password
      },
      success: function (res) {
        console.log(res.statusCode=== 200)
        console.log(res.data.message)
        wx.setStorageSync('username', e.detail.value.username);
        wx.setStorageSync('password', e.detail.value.password);
        if (res.statusCode === 200) {
          wx.showToast({
            title: 'Login Success',
            icon:'success',
            duration: 2000  // 持续时间
          });
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/home/home',
              success: (result)=>{
              },
              fail: ()=>{},
              complete: ()=>{}
            });
          }, 1000);
        }
        else if (res.statusCode === 401) {
          that.setData({
            msg: res.data.message
          })
          wx.showToast({
            title: "Check Your Credentials",
            icon: 'error',
            duration: 2000
          })
        }
        else if (res.statusCode === 403) {
          that.setData({
            msg: res.data.message
          })
          wx.showToast({
            title: "User Not Allowed",
            icon: 'error',
            duration: 2000
          })
        }
        else if (res.statusCode === 404) {
          that.setData({
            msg: res.data.message
          })
          wx.showToast({
          title: "User Not Found",
          icon: 'error',
          duration: 2000
        })
      }
      }
    })
  }
})
