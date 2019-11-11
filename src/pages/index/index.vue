<template>
  <div class="home">
    <avatar :today="today" :userInfo="userInfo" :isShow="isShow" @scope="getUserInfo"></avatar>
    <Gradient :todos="todos" :currentIndex="currentIndex"></Gradient>
    <div v-if="isShow">
      <todo-list :todos="todos" :currentIndex="currentIndex"></todo-list>
      <TodoDetail></TodoDetail>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Avatar from '../../components/Avatar'
  import Gradient from '../../components/Gradient'
  import TodoList from '../../components/TodoList'
  import TodoDetail from '../../components/TodoDetail'
  export default {
    name: 'index',
    components: {
      Avatar,
      Gradient,
      TodoList,
      TodoDetail
    },
    data () {
      return {
        today: new Date(),
        userInfo: {},
        isShow: false
      }
    },
    computed: {
      ...mapState(['todos', 'currentIndex'])
    },
    methods: {
      getUserInfo (data) {
        this.userInfo = data.mp.detail.userInfo
        this.isShow = true
      }
    },
    mounted () {
      this.today = this.today.toDateString().replace(/(\s\d{4})$/, ', $1')
    },
    created () {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            this.isShow = true
          } else {
            this.isShow = false
          }
          wx.getUserInfo({
            success: (data) => {
              this.userInfo = data.userInfo
              this.isShow = true
            }
          })
        }
      })
    },
    watch: {
      currentIndex () {
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: this.todos[this.currentIndex].colors[1],
          animation: {
            duration: 500,
            timingFunc: 'ease'
          },
          fail: (error) => {
            console.log(error)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .home {
    height: 100%;
    width: 100%;
    overflow: hidden;
    color: black;
  }
</style>
