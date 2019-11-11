<template>
  <div class="todo" :class="{todo_selected: selected}">
    <div class="todo_head"  @click="handleClick">
      <div class="todo_icon" :style="{color}">
        <i :class="['fa', 'fa-'+todo.icon]"></i>
      </div>
      <div class="todo_menu">
        <i class="fa fa-ellipsis-v"></i>
      </div>
    </div>
    <div class="todo_body">
      <p class="todo_tip">{{todo.tasks.length}} Task</p>
      <h3 class="todo_title">{{todo.name}}</h3>
      <div class="todo_progress">
        <span class="todo_progress_line">
          <div :style="{width: progress, backgroundImage: progressColor}"></div>
        </span>
        <span class="todo_progress_num">{{progress}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Todo',
    props: {
      todo: {
        type: Object,
        required: true
      },
      selected: {
        type: Boolean
      }
    },
    computed: {
      color () {
        return this.todo.colors[0]
      },
      progress () {
        const totalCount = this.todo.tasks.filter(task => !task.deleted).length
        const doneCount = this.todo.tasks.filter(task => !task.deleted && task.done).length
        let progress = Math.round(doneCount / totalCount * 100)
        progress = isNaN(progress) ? 100 : progress

        return `${progress}%`
      },
      progressColor () {
        const colorBottom = `color-stop(30%, ${this.todo.colors[0]})`
        const colorTop = `to(${this.todo.colors[1]})`
        return `-webkit-gradient(linear, left bottom, right bottom, ${colorBottom}, ${colorTop})`
      }
    },
    methods: {
      handleClick () {
        const query = wx.createSelectorQuery()
        const appRect = {}
        const elRect = {}
        const rect = {}
        const p1 = new Promise((resolve) => {
          query.select('.home').boundingClientRect().exec((rect) => {
            appRect.top = rect[0].top
            appRect.left = rect[0].left
            appRect.right = rect[0].right
            appRect.bottom = rect[0].bottom
            appRect.width = rect[0].width
            appRect.height = rect[0].height
            resolve()
          })
        })
        p1.then(() => {
          const p2 = new Promise((resolve) => {
            query.select('.todo').boundingClientRect().exec((rect) => {
              elRect.top = rect[1].top
              elRect.left = rect[1].left
              elRect.right = rect[1].right - rect[1].width
              elRect.bottom = rect[1].bottom - rect[1].height
              elRect.width = rect[1].width
              elRect.height = rect[1].height
              resolve()
            })
          })
          p2.then(() => {
            rect.top = elRect.top - appRect.top
            rect.left = elRect.left - appRect.left
            rect.right = elRect.right
            rect.bottom = elRect.bottom
            rect.width = elRect.width
            rect.height = elRect.height
            rect.appWidth = appRect.width
            rect.appHeight = appRect.height
            this.$emit('select', {rect, todo: this.todo})
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  .todo {
    flex: 1;
    margin:0 8px;
    overflow: hidden;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    color: #666;
  }
  .todo_selected {
    visibility: hidden;
  }
  .todo_head{
    display: flex;
    padding: 20px;
    height:44px;
    justify-content: space-between;
    align-item: flex-start;
    transform: translate3d(0, 0, 0);
    will-change: transform;
  }
  .todo_body {
    padding: 0 20px;
    transform: translate3d(0, 139px, 0);
    will-change: transform;
  }
  .todo_icon {
    display: flex;
    width: 44px;
    height: 44px;
    border: 1px solid #eee;
    border-radius: 100%;
    justify-content: center;
    align-items: center;
  }
  .todo_menu {
    color: #eee;
  }
  .todo_tips {
    opacity: 0.6;
    font-size: 13px;
    font-weight: 600;
  }
  .todo_title {
    margin-top: 6px;
    font-size: 32px;
  }
  .todo_progress {
    display: flex;
    align-items: center;
    margin-top:30px;
  }
  .todo_progress_line {
    margin_right: 10px;
    flex: 1;
    height: 3px;
    background-color: #eee;
    div {
      dispaly: block;
      height: 100%;
      transition: all 0.3s ease;
    }
  }
  .todo_progress_num {
    font-size: 12px;
  }
</style>
