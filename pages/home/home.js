Page({
  data: {
    focus: false,
    cookie:null,
    pList:null,
    vList:null,
    newList:null,
    groupList:null,
    showOrNot1: false,
    searchedGroupList:null,
    showOrNot2: false,
    
  },
  onLoad: function (options) {
    const app = getApp();
    console.log('ck is '+getApp().globalData.cookie)
    this.setData({
      cookie: app.globalData.cookie
    });
  },
  getInfo_Of_User: function(e) {
    const name=e.detail.value
    this.setData({
      showOrNot1:!this.data.showOrNot1
    });
    console.log(name);
    var that = this;
    wx.request ({
      url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/get_user',
      method: 'GET',
      data: {
        'displayName': name,
      },
      header: {
        'Content-type': 'application/json',
        'Cookie': getApp().globalData.cookie,
        'ngrok-skip-browser-warning': 'true'
      },
      success: function(res) {
        console.log(res.data.list)
        that.setData({
          newList: res.data.list
        });
        console.log('NewList is ' + that.data.newList);
      }
  }) 
},
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
  },
  goBack_To_Home: function(e) {
    this.setData({
      showOrNot1:!this.data.showOrNot1,
      newList:null,
      groupList:null,
      searchedGroupList:null
    });

  },
  getGroupMembership: function(e) {
    const id=e.currentTarget.dataset.id
    var that = this;
    wx.request ({
      url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/get_user_details',
      method: 'GET',
      data: {
        'id': id
      },
      header: {
        'Content-type': 'application/json',
        'Cookie': getApp().globalData.cookie,
        'ngrok-skip-browser-warning': 'true'
      },
      success: function(res) {
        console.log(res.data.group_list)
        that.setData({
          groupList: res.data.group_list
        });
      }
  })},
  searchGroup: function(e) {
    const groupName=e.detail.value
    console.log(groupName);
    var that = this;
    wx.request ({
      url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/search_group',
      method: 'GET',
      data: {
        'displayName': groupName,
      },
      header: {
        'Content-type': 'application/json',
        'Cookie': getApp().globalData.cookie,
        'ngrok-skip-browser-warning': 'true'
      },
      success: function(res) {
        console.log(res.data.group_list)
        that.setData({
          searchedGroupList: res.data.group_list
        });
        console.log('searchedGroupList is ' + that.data.searchedGroupList);
      }
  }) 
},
closePopup: function(e) {
  this.setData({
    showOrNot1: !this.data.showOrNot1,
})},
addUserToGroup: function(e) {
  const groupId=e.currentTarget.dataset.id
  const userId=this.data.newList[0].id
  const action=e.currentTarget.dataset.action
  console.log(groupId,userId)
  var that = this;
  if (action == 'add') {
    wx.request({
    url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/add_user_to_group',
    method: 'POST',
    data: {
      'groupId': groupId,
      'userId': userId
    },
    header: {
      'Content-type': 'application/json',
      'Cookie': getApp().globalData.cookie,
      'ngrok-skip-browser-warning': 'true'
    },
    success :(res) => {
      if (res.statusCode == 200){
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        });
      }
      else{
        wx.showToast({
          title: res.data.message,
          icon: 'error',
          duration: 2000
        })
      }
    }
  })}
  else if (action =='remove'){
    wx.request({
      url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/add_user_to_group',
      method: 'DELETE',
      data: {
        'groupId': groupId,
        'userId': userId
      },
      header: {
        'Content-type': 'application/json',
        'Cookie': getApp().globalData.cookie,
        'ngrok-skip-browser-warning': 'true'
      },
      success: (res) =>{
        console.log(res.data.message)
        if (res.statusCode == 200){
          this.setData({
            groupList:null
        });
          console.log('groupList is 123'+ this.data.groupList);
          this.refreshGroupMembership(userId);
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
        }
        else{
          wx.showToast({
            title: res.data.message,
            icon: 'error',
            duration: 2000
          })
        }
      }
  })}
},
refreshGroupMembership: function(userId) {
  const id=userId
  var that = this;
  wx.request ({
    url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/get_user_details',
    method: 'GET',
    data: {
      'id': id
    },
    header: {
      'Content-type': 'application/json',
      'Cookie': getApp().globalData.cookie,
      'ngrok-skip-browser-warning': 'true'
    },
    success: function(res) {
      console.log(res.data.group_list)
      that.setData({
        groupList: res.data.group_list
      });
    }

})},
showUserCreationForm: function(e) {
  this.setData({
    showOrNot2: !this.data.showOrNot2,
})},
formSubmit: function(e) {
  const data=e.detail.value
  const displayName=data.displayName
  const mailNickname=data.mailNickname
  const mail=data.mail
  const usrePrincipalName=data.userPrincipalName
  const firstName=data.firstName
  const lastName=data.lastName
  const password=data.password
  const forceChangePasswordNextSignIn=data.forceChangePasswordNextSignIn
  const accountEnabled=data.accountEnabled
  wx.request({
    url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/get_user',
    method: 'POST',
    data: {
      'displayName': displayName,
      'mailNickname': mailNickname,
      'userPrincipalName': usrePrincipalName,
      'mail': mail,
      'givenName': firstName,
      'surName': lastName,
      'passwordProfile': {
        'forceChangePasswordNextSignIn': forceChangePasswordNextSignIn,
        'password': password
      },
      'accountEnabled': accountEnabled
    },
    header: {
      'Content-type': 'application/json',
      'Cookie': getApp().globalData.cookie,
      'ngrok-skip-browser-warning': 'true'
    },
    success: (res) => {
      if (res.statusCode == 200){
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        });
      }
      else{
        wx.showToast({
          title: res.data.message,
          icon: 'error',
          duration: 2000
        })
      }},
    });},})