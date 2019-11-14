<template>
  <div class="todo-list" :class="{'todo-list_selected': selected}" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
    <ul :style="{width: todos.length * 100+'%'}">
      <li v-for="todo in todos" :key="todo.name" :style="{transform: translate}">
        <todo :todo="todo" :selected="selected && selected.todo === todo" @select="selectTodo"></todo>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import Todo from './Todo'
  export default {
    name: 'TodoList',
    props: {
      colors: {
        type: Array
      },
      active: {
        type: Boolean
      },
      todos: {
        type: Array
      }
    },
    components: {
      Todo
    },
    data () {
      return {
        touch: {}
      }
    },
    computed: {
      ...mapState(['selected', 'currentIndex']),
      translate () {
        return 'translate3d(-' + (this.currentIndex * 100) + '%, 0, 0)'
      }
    },
    methods: {
      ...mapMutations(['selectTodo', 'nextTodo', 'prevTodo']),
      touchstart (event) {
        this.touch.startX = event.clientX
        this.touch.endX = 0
      },
      touchmove (event) {
        this.touch.endX = event.clientX
      },
      touchend (event) {
        if (!this.touch.endX || Math.abs(this.touch.endX - this.touch.startX) < 10) {
          return
        }
        if (this.touch.endX < this.touch.startX) {
          this.nextTodo()
        } else {
          this.prevTodo()
        }
      }
    }
  }
</script>

<style lang="scss">
  .todo-list {
    padding: 0 32px 10px;
    height: 350px;
    transition: all 0.5s ease;
    > ul,
    > ul > li {
      display: flex;
      height: 100%;
    }
    > ul > li {
      flex: 1;
      transition: transform 0.5s ease;
    }
    .todo {
      border-radius: 8px;
      background: white;
    }
  }
  .todo-list_selected {
    transform: scaleX(1.25);
  }
</style>
