<template>
  <div class="avatar" :class="{avatar_selected: !!selected}">
    <div class="avatar_face">
      <img :src="userInfo.avatarUrl" alt="">
    </div>
    <h2 class="avatar_name" v-if="isShow">Hello, {{userInfo.nickName}}</h2>
    <button class="no_avatar" v-else open-type="getUserInfo" @getuserinfo="handleClick">点此授权</button>
    <p class="avatar_tips">
      Looks like feed good.<br/>
      You have {{todayTasks.length}} tasks to do today
    </p>
    <p class="avatar_date">TODAY : {{today}}</p>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
    name: 'Avatar',
    props: {
      today: {
        type: String
      },
      userInfo: {
        type: Object
      },
      isShow: {
        type: Boolean
      }
    },
    computed: {
      ...mapState(['selected']),
      ...mapGetters(['todayTasks'])
    },
    methods: {
      handleClick (data) {
        this.$emit('scope', data)
      }
    }
  }
</script>

<style scoped lang="scss">
  .avatar {
    display: flex;
    padding: 0 40px;
    height: 225px;
    justify-items: flex-end;
    flex-direction: column;
    transition: all .5s ease;
  }
  .avatar_selected {
    transform: translate3d(0, 20px, 0);
    opacity: 0;
  }
  .avatar_face {
    width: 44px;
    height: 44px;
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .avatar_name {
     margin-top: 32rpx;
     padding: 0 6px;
     font-size: 32px;
     letter-spacing: 1px;
     font-weight: 300;
   }
  .no_avatar {
    margin-top: 32rpx;
    padding: 0 6px;
    font-size: 22px;
    letter-spacing: 1px;
    font-weight: 300;
    text-align: center;
    border: 1px solid black;
    border-radius: 10px;
    background-color: transparent;
  }
  .avatar_tips {
    margin-top: 16rpx;
    padding: 0 6px;
    font-size: 13px;
    font-weight: 100;
    opacity: 0.8;
    line-height: 1.6em;
  }
  .avatar_date {
    margin-top: 44rpx;
    margin-bottom: 16rpx;
    padding: 0 6px;
    font-size: 14px;
  }
</style>
