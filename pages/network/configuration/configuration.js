// pages/network/configuration/configugration.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hostname: '',
    options: ['interface','interface2','interface3'],
    selectedOption: '',
    displayText: '',
    output: '',
    displayCmd:'',
    showInput:''
  },
  bindPickerChange: function(e) {
    console.log('picker 发生选择改变，携带值为', e.detail.value);
    this.setData({
      selectedOption: this.data.options[e.detail.value]
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      hostname: options.hostname
    });
    const username = wx.getStorageSync('username');
    const password = wx.getStorageSync('password');
    console.log(username);
    console.log(password);
    console.log(this.data.hostname);
  },
  cmdTap: function(e) { 
    const cmd=e.currentTarget.dataset.cmd;
    console.log(cmd+" 被点击");
    this.setData({
      displayCmd:this.data.displayCmd+' '+cmd,
    });
  },
  cmdConfirm: function(e) {
    console.log("cmdTap-input 被点击");
    console.log(e.detail.value)
    this.setData({
      displayCmd:this.data.displayCmd +' ' + e.detail.value,
     });
    },
  resetTap1: function () {
      console.log("Reset 被点击");
      this.setData({
        displayCmd:'',
        showInput: '', // 清空 textarea 内容
      });
    },
  cmdBlur: function (e) {
    console.log("cmdTap-input 失去焦点");
    this.setData({
      displayCmd: e.detail.value
    });
  },  
  sendTap: function (e) {
      console.log("sendTap 被点击");
      console.log(this.data.displayCmd);
      wx.request({
        url: 'http://192.168.1.249:5010/show',
        data: {
          username: wx.getStorageSync('username'),
          password: wx.getStorageSync('password'),
          hostname: this.data.hostname,
          command: this.data.displayCmd
        },
        method: 'POST',
        header: {'content-type':'application/json'},
        dataType: 'json',
        success: (result)=>{
          console.log(result.data.output);
          this.setData ({
            output:''}),
          this.setData({
            output:result.data.output
          });
        },
        fail: ()=>{},
        complete: ()=>{
        }
      });
    },
  cmdBlur2: function (e) {
    console.log("cmdTap-input 失去焦点");
    this.setData({
      displayText: e.detail.value
    });
  },  
  resetTap2: function () {
    console.log("Reset 被点击");
    this.setData({
      displayText: '', // 清空 textarea 内容
    });
  },
  sendTap2: function (e) {
    console.log("sendTap2 被点击");
    console.log(this.data.displayText);
    wx.request({
      url: 'http://192.168.1.249:5010/show',
      data: {
        username: wx.getStorageSync('username'),
        password: wx.getStorageSync('password'),
        hostname: this.data.hostname,
        config: this.data.displayText
      },
      method: 'POST',
      header: {'content-type':'application/json'},
      dataType: 'json',
      success: (result)=>{  
        console.log(result.data.output);
        this.setData ({
          output:''}),
        this.setData({
          output:result.data.output
        });
      },
      fail: ()=>{},
      complete: ()=>{
      }
    });
  },
})  
