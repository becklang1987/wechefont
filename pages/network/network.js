// 网络请求页面


Page({
  data: {
    siteList: []
  },
  getSiteList: function() {
    wx.request({
      url: 'http://192.168.1.249:5002/siteList',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: { 'region': "APAC" },
      success: (res) => {
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