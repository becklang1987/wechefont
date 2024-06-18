Page({
  data: {
    location: '',
    devicelist: {},
    sid:'',
    user:null,
    username:'',
    cookie:null,
  },

  onLoad: function (options) {
    console.log("跳转到了" + options.location);
    const app = getApp();
    this.setData({
      location: options.location,
      sid:app.globalData.sid,
      user:app.globalData.user,
      username:app.globalData.username,
      cookie:app.globalData.cookie
    });
    this.getDevicelist();
  },

  getDevicelist: function () {
    console.log("开始请求设备列表...");
    wx.request({
      url: 'http://192.168.1.249:5003/devices', // 确保这个 URL 是正确的
      data: { 'location': this.data.location},
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'cookie': this.data.cookie
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
  setCredentials: function (e) {
    console.log("设置凭证");
    console.log(e.detail.value);
    const app = getApp();
    app.globalData.network_ssh_username = e.detail.value.username;
    app.globalData.network_ssh_password = e.detail.value.password;
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