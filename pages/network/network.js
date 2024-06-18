// 网络请求页面


Page({
  data: {
    siteList: [],
    user:null,
    username:'',
    sid:'',
    cookie:null
  },
  onLoad: function(options) {
    // 获取全局数据
    const app = getApp();
    this.setData({
      user: app.globalData.user,
      sid: app.globalData.sid,
      username: app.globalData.username,
      cookie: app.globalData.cookie

    });
    console.log(this.data.user);
    console.log(this.data.sid);
    console.log(this.data.username);
  },
  getSiteList: function() {
    console.log("开始请求站点列表...cookie: " + this.data.cookie);
    wx.request({
      url: 'http://192.168.1.249:5002/siteList',
      method: 'GET',
      header: {
        'Content-type': 'application/json',
        'Cookie': this.data.cookie
      },
      data: { 'region': "APAC" },
      success: (res) => {
        console.log(this.data.cookie); // 打印请求结果
        console.log(res.data.siteList); // 打印请求结果

        // 使用 this.setData 更新 siteList 数据，触发页面重新渲染
        this.setData({
          siteList: res.data.siteList
        }, () => {
          // 在更新数据后打印最新的 data
          console.log(this.data.siteList);
        });
      }
    });
  },
  getDevicesBySiteName: function(e) {
    let location=e.currentTarget.dataset.location;
    console.log(location);
    this.navigateToDeviceList(location);
},
  navigateToDeviceList: function(location) {
     wx.navigateTo({
      url: '/pages/network/devicelist/devicelist?location='+location,
      success: (result)=>{
      },
      fail: ()=>{},
      complete: ()=>{}
    })
    },
  });