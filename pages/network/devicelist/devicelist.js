Page({
  data: {
    location: '',
    devicelist: {}
  },

  onLoad: function (options) {
    console.log("跳转到了" + options.location);
    this.setData({
      location: options.location
    });
    this.getDevicelist();
  },

  getDevicelist: function () {
    console.log("开始请求设备列表...");
    wx.request({
      url: 'http://192.168.1.249:5003/devices', // 确保这个 URL 是正确的
      data: { 'location': this.data.location },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log("请求成功:", res.data);
          this.setData({
            devicelist: res.data.devices
          });
          console.log("设备列表:", this.data.devicelist);
        } else {
          console.error("服务器错误:", res.statusCode);
        }
      },
      fail: (error) => {
        console.error("网络错误:", error);
      },
      complete: () => {
        console.log("请求完成");
      }
    });
  },
  navigateToConfiguration: function (event) {
    console.log("跳转到配置页面...");
    const hostname= event.currentTarget.dataset.hostname;
    wx.navigateTo({
      url: '/pages/network/configuration/configuration?hostname='+hostname,
      success: (result)=>{
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    }
})