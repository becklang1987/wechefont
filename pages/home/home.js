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
  bindButtonTap: function() {
    console.log('globaCookie is '+getApp().globalData.cookie)
    var that = this;
    wx.request ({
      url: 'https://167e-103-170-26-63.ngrok-free.app/get_user',
      method: 'GET',
      header: {
        'Content-type': 'application/json',
        'Cookie': getApp().globalData.cookie,
        'ngrok-skip-browser-warning': 'true'
      },
      success: function(res) {
        console.log(res)
        const  pList= res.data.plist;
        const vList=res.data.vlist;
        
        const maxLength = Math.max(pList.length, vList.length);
        let newList = [];
        
        for (let i = 0; i < maxLength; i++) {
          newList.push({
            pItem: pList[i] || '',
            vItem: vList[i] || ''
          });
        }

        that.setData({
          pList: pList,
          vList: vList,
          newList: newList
        });
        console.log('PList is '+that.data.pList);
        console.log('VList is '+that.data.vList);
        console.log('NewList is ' + that.data.newList);
      }
  }) 
},
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
  }
})

