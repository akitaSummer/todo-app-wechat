<template>
  <div class="home">
    <avatar :today="today" :userInfo="userInfo"></avatar>
    <Gradient :colors="colors" :index="index"></Gradient>
  </div>
</template>

<script>
  import Avatar from '../../components/Avatar'
  import Gradient from '../../components/Gradient'
  export default {
    name: 'index',
    components: {
      Avatar,
      Gradient
    },
    data () {
      return {
        today: new Date(),
        userInfo: {},
        colors: [['#ff6262', '#ffa947'], ['#5b9df9', '#47bfff'], ['#2c7d59', '#3ba776']],
        index: 0
      }
    },
    mounted () {
      wx.getUserInfo({
        success: (data) => {
          this.userInfo = data.userInfo
        }
      })
      this.today = this.today.toDateString().replace(/(\s\d{4})$/, ', $1')
    },
    created () {
      setInterval(() => {
        if (this.index < 2) {
          this.index++
        } else {
          this.index = 0
        }
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: this.colors[this.index][1],
          animation: {
            duration: 500,
            timingFunc: 'ease'
          },
          fail: (error) => {
            console.log(error)
          }
        })
      }, 3000)
    }
  }
</script>

<style scoped lang="scss">
  .home {
    height: 100%;
    width: 100%;
    overflow: hidden;
    color: black;
  }
</style>
