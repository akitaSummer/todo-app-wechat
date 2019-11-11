<template>
  <div class="show" :class="{'show-enter-to': selected === null}" :style="{top: top +'px', left: left + 'px', width: width + 'px', height: height + 'px'}">
    <div class="todo-detail" v-if="selected">
      <todo :todo="selected.todo"></todo>
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
        height: 350
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
        }
      },
      unselect (newVal) {
        if (newVal) {
          this.top = 0
          this.left = 0
          this.width = `${newVal.rect.appWidth}`
          this.height = `${newVal.rect.appHeight}`
          setTimeout(() => {
            this.top = `${newVal.rect.top}`
            this.left = `${newVal.rect.left}`
            this.width = `${newVal.rect.width}`
            this.height = `${newVal.rect.height}`
          }, 0)
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
    }
  }
</style>
