<template>
  <div class="show" :class="{'show-enter-to': selected === null}" :style="{top: top +'px', left: left + 'px', width: width + 'px', height: height + 'px'}">
    <div class="todo-detail" v-if="flag">
      <todo v-if="selected" :todo="selected.todo"></todo>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import Todo from './Todo'
  export default {
    name: 'TodoDetail',
    components: {
      Todo
    },
    data () {
      return {
        top: 225,
        left: 40,
        width: 295,
        height: 350,
        flag: false
      }
    },
    computed: {
      ...mapState(['selected', 'unselect'])
    },
    methods: {
      ...mapMutations(['unselectTodo'])
    },
    watch: {
      selected (newVal) {
        if (newVal) {
          this.top = `${newVal.rect.top}`
          this.left = `${newVal.rect.left}`
          this.width = `${newVal.rect.width}`
          this.height = `${newVal.rect.height}`
          setTimeout(() => {
            this.top = 0
            this.left = 0
            this.width = `${newVal.rect.appWidth}`
            this.height = `${newVal.rect.appHeight}`
          }, 0)
          this.flag = true
          wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: '#ffffff',
            animation: {
              duration: 500,
              timingFunc: 'ease'
            },
            fail: (error) => {
              console.log(error)
            }
          })
        }
      },
      unselect (newVal) {
        if (newVal) {
          this.top = 0
          this.left = 0
          this.width = `${newVal.rect.appWidth}`
          this.height = `${newVal.rect.appHeight}`
          setTimeout(() => {
            this.top = 225
            this.left = 40
            this.width = `${newVal.rect.width}`
            this.height = `${newVal.rect.height}`
          }, 0)
          setTimeout(() => {
            this.flag = false
          }, 500)
        }
      }
    }
  }
</script>

<style lang="scss">
  .show-enter-to {
    border-radius: 0;
    z-index: -1;
  }
  .show {
    position: fixed;
    transition: all 0.5s ease;
    .todo-detail {
      border-radius: 0;
      background-color: white;
      color: #666;
      width: 100%;
      height: 100%;
      .todo {
        border-radius: 0;
        box-shadow: none;
        margin: 0;
        width: 100%;
        height: 100%;
        .todo-detail,
        .todo,
        .todo_head,
        .todo_body {
          transition: all 0.5s ease;
        }
      }
      .todo_body {
        transform: translate3d(0, 44px, 0);
      }
      .todo_tasks {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
    }
  }
</style>
