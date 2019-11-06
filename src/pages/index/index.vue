<template>
  <div class="indexContainer">
    <img class="avatar" v-if="isShow" :src="userInfo.avatarUrl" alt="">
    <div class="noAvatar" v-else>请先授权</div>
    <p class="userName">hello {{userInfo.nickName}}</p>
    <div class="goStudy" @tap="toTodoApp" v-if="isShow">
      <p>开启小程序之旅</p>
    </div>
    <Button class="btn" v-else open-type="getUserInfo" @getuserinfo="handleGetUserInfo">获取用户登录信息</Button>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        userInfo: {},
        isShow: false
      }
    },
    mounted () {
      this.getUserInfo()
    },
    methods: {
      getUserInfo () {
        wx.getSetting({
          success: (data) => {
            if (data.authSetting['scope.userInfo']) {
              // 用户已授权
              this.isShow = true
            } else {
              // 用户未授权
              this.isShow = false
            }
          }
        })
        wx.getUserInfo({
          success: (data) => {
            this.userInfo = data.userInfo
          }
        })
      },
      handleGetUserInfo (data) {
        if (data.mp.detail.rawData) {
          this.getUserInfo()
        }
      },
      toTodoApp () {
        wx.redirectTo({
          url: '/pages/todo_app/main',
          fail: (error) => {
            console.log(error)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  page{
    background: #8ED145;
    height: 100%;
  }

  .indexContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    font-size: 32rpx;
    border: 1px solid #999;
    background: #8ED145;
    margin: 100rpx 0;
  }

  .avatar{
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin: 100rpx 0;
  }

  .userName{
    font-size: 32rpx;
    font-weight: bold;
    margin: 100rpx 0;
  }

  .goStudy{
    width: 200rpx;
    height: 80rpx;
    font-size: 28rpx;
    border: 1rpx solid #999;
    border-radius: 10rpx;
    text-align: center;
    line-height: 80rpx;
  }

  .noAvatar{
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin: 100rpx 0;
    background: white;
    line-height: 200rpx;
    text-align: center;
  }
</style>
