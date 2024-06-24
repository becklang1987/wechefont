Page({
  data: {
    focus: false,
    cookie:null,
    pList:null,
    vList:null,
    newList:null,
    newList2:null,
    groupList:null,
    showOrNot1: false,
    searchedGroupList:null,
    searchedGroupList2:null,
    showOrNot2: false,
    showOrNot3: false,
    showOrNot4: false,
    showOrNot5: false,
    showOrNot6: false,
    groupMembershipList:null,
    securityGroupSwitch:true,
    M365GroupSwitch:false,
    owner:null,
    password:null,
    newUser:null,
    
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
      success: (res) =>{
        console.log(res.data.list)
        if (res.statusCode == 200){
        this.setData({
          newList: res.data.list,
          showOrNot1:!this.data.showOrNot1
        });
        wx.showToast({
          title: 'User found',
          icon:'success',
          duration: 2000})
        console.log('NewList is ' + that.data.newList);
      }
      else{
        wx.showToast({
          title: 'User not found',
          icon:'error',
          duration: 2000
        })
    }}
  }) 
},
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
  },
  goBack_To_Home: function(e) {
    if (e.currentTarget.dataset.location == 'userPage') {
    this.setData({
      showOrNot1:!this.data.showOrNot1,
      newList:null,
      groupList:null,
      searchedGroupList:null,
      showOrNot4:!this.data.showOrNot4,
    });}
    else if (e.currentTarget.dataset.location == 'groupPage') {
      this.setData({
        showOrNot3:!this.data.showOrNot3,
        searchedGroupList:null,
        searchedGroupList2:null,
      });
    }

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
    console.log(e.currentTarget.dataset.location)
    var that = this;
    if (e.currentTarget.dataset.location == 'home') {
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
        success: (res) =>{
          console.log(res.data.group_list)
          if (res.data.group_list.length === 0) {
            wx.showToast({
              title: 'No group found',
              icon: 'error',
              duration: 2000
            })
          }
          else if(res.data.group_list.length > 0){
          wx.showToast({
            title: 'Group found',
            icon:'success',
            duration: 2000
          })
          this.setData({
            searchedGroupList: res.data.group_list,
            showOrNot3:!this.data.showOrNot3
          });
          console.log('searchedGroupList is ' + this.data.searchedGroupList);
        }}
    }) 
    }
    else if (e.currentTarget.dataset.location == 'groupModal') {
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
        success: (res) =>{
          console.log(res.data.group_list)
          if (res.data.group_list.length === 0) {
            wx.showToast({
              title: 'No group found',
              icon: 'error',
              duration: 2000
            })
          }
          else if(res.data.group_list.length > 0){
          this.setData({
            searchedGroupList2: res.data.group_list
          });
          console.log('searchedGroupList2 is ' + this.data.searchedGroupList2);
        }}
    })
    }
    else if (e.currentTarget.dataset.location == 'userModal') {
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
        success: (res) =>{
          console.log(res.data.group_list)
          if (res.data.group_list.length === 0) {
            wx.showToast({
              title: 'No group found',
              icon: 'error',
              duration: 2000
            })
          }
          else if(res.data.group_list.length > 0){
          wx.showToast({
            title: 'Group found',
            icon:'success',
            duration: 2000
          });
          this.setData({
            searchedGroupList: res.data.group_list
          });
          console.log('searchedGroupList2 is ' + this.data.searchedGroupList);
        }}
    })
    }
},
closePopup: function(e) {
  this.setData({
    showOrNot1: !this.data.showOrNot1,
})},
addMemberToGroup: function(e) {
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
addMemberToGroup: function(e) {
  const userId=e.currentTarget.dataset.id
  const groupId=this.data.searchedGroupList[0].id
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
formSubmit :function(e) {
  if (e.currentTarget.dataset.location ==="userCreationForm"){
    this.setData({
      newUser: e.detail.value.displayName,
    })
    const data=e.detail.value
    const displayName=data.displayName
    const mailNickname=data.mailNickname
    const firstName=data.firstName
    const lastName=data.lastName
    const forceChangePasswordNextSignIn=data.forceChangePasswordNextSignIn
    const accountEnabled=data.accountEnabled
    wx.request({
      url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/get_user',
      method: 'POST',
      data: {
      'displayName': displayName,
      'mailNickname': mailNickname,
      'userPrincipalName': mailNickname+'@yinzhaji23gmail.onmicrosoft.com',
      'mail': mailNickname+'@yinzhaji23gmail.onmicrosoft.com',
      'givenName': firstName,
      'surName': lastName,
      'passwordProfile': {
        'forceChangePasswordNextSignIn': forceChangePasswordNextSignIn,
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
        this.setData({
          password:res.data.password,
        })
      }
      else{
        wx.showToast({
          title: res.data.message,
          icon: 'error',
          duration: 2000
        })
      }},
    });
  }
  else if (e.currentTarget.dataset.location ==="groupCreationForm"){
    const data=e.detail.value
    console.log(data)
    const securityEnabled=data.SecurityGroup
    const displayName=data.displayName 
    const mailNickname=data.mailNickname
    const M365=data.M365Group
    const description=data.description  
    const DL=data.DL
    const owner=this.data.owner
    console.log(securityEnabled, M365,DL,owner,displayName,mailNickname)
    if (owner){
      if(securityEnabled === true && DL===false && M365 === false){
        wx.request({
          url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/create_group',
          method: 'POST',
          data: {
          'displayName': displayName,
          'mailNickname': mailNickname,
          "description": description,
          "owners@odata.bind":["https://graph.microsoft.com/v1.0/users/"+ owner +""],
          'groupTypes': [],
          'securityEnabled': securityEnabled,
          'mailEnabled': false,
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
        });
      }
      else if(securityEnabled === false && DL===false && M365 === true){
        wx.request({
          url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/create_group',
          method: 'POST',
          data: {
          'displayName': displayName,
          'mailNickname': mailNickname,
          "description": description,
          "owners@odata.bind":["https://graph.microsoft.com/v1.0/users/"+ owner +""],
          'groupTypes': ['Unified'],
          'securityEnabled': securityEnabled,
          'mailEnabled': true,
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
        });
      }
      else{
        wx.showToast({
          title: 'Only one group type can be selected',
          icon: 'error',
          duration: 2000
        })
      }
    }
    else{      
      wx.showToast({
        title: 'Please select an owner',
        icon: 'error',
        duration: 2000
      })}}

},
  goBack_To_Home_group: function(e) {
    this.setData({
      showOrNot3:!this.data.showOrNot3,
      searchedGroupList:null,
      newList:null,
      groupMembershipList:null,
      searchGroupList2:null,
    });

  },
  memberShipManagement: function(e) {
    const groupId=e.currentTarget.dataset.id
    var that = this;
    this.setData({
      searchedGroupList:this.data.searchedGroupList.filter(item => item.id == groupId)
    })
    wx.request({
      url: 'https://b6a0-240e-39a-edf-bc80-bd26-acca-49dd-3bb2.ngrok-free.app/list_group_members',
      method: 'GET',
      data: {
        'groupId': groupId
      },
      header: {
        'Content-type': 'application/json',
        'Cookie': getApp().globalData.cookie,
        'ngrok-skip-browser-warning': 'true'
      },
      success :(res) => {
        if (res.statusCode == 200){
          that.setData({
            groupMembershipList: res.data.group_member_list
        });
        console.log('groupMembershipList is ' + that.data.groupMembershipList);
        }
        else{
          wx.showToast({
            title: res.data.message,
            icon: 'error',
            duration: 2000
          })
        } }
    })
  },
  showUserManagementForm: function(e) {
    this.setData({
      showOrNot4: !this.data.showOrNot4,
    })
  },
  showGroupCreationForm: function(e) {
    this.setData({
      showOrNot5: !this.data.showOrNot5,  
    })
    },
  getInfo_Of_User2: function(e) {
      const name=e.detail.value
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
        success: (res) =>{
          console.log(res.data.list)
          if (res.statusCode == 200){
          this.setData({
            newList2: res.data.list,
            showOrNot6:!this.data.showOrNot6
          });
          wx.showToast({
            title: 'User found',
            icon:'success',
            duration: 2000})
          console.log('NewList is ' + this.data.newList2);
        }
        else{
          wx.showToast({
            title: 'User not found',
            icon:'error',
            duration: 2000
          })
      }}
    }) 
  },
  setAsOwner: function(e) {
    this.setData({
      owner: e.currentTarget.dataset.owner,
    })
  },
  copyPassword: function(e) {
    wx.setClipboardData({
      data: this.data.password,
      success: function(res) {
        wx.showToast({
          title: 'Copied',
          icon: 'success',
          duration: 2000
        })
      }})
  },
  clearPassword: function(e) {
    this.setData({
      password: null, 
    })
  },
})
