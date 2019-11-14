<template>
  <div class="edit">
    <div class="todo-editing" :style="{top: !!editing ? 0 : '100%'}">
      <div class="todo-editing_head">
        <p>What tasks are you planning to perform?</p>
      </div>
      <div class="todo-editing_body" v-if="!!editing" >
        <textarea v-model="editing.text"></textarea>
        <p class="todo-editing_meta">
          <i :class="['fa', 'fa-'+selected.todo.icon]"></i>
          {{ selected.todo.name }}
        </p>
        <p class="todo-editing_meta">
          <i class="fa fa-calendar"></i>
          Today
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    name: 'TodoEditing',
    computed: {
      ...mapState(['selected', 'editing'])
    },
    methods: {
      ...mapMutations(['toggleEditing'])
    }
  }
</script>

<style scoped lang="scss">
  .todo-editing {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    background-color: white;
    color: #666;
    transition: top 0.5s ease;
  }
  .todo-editing textarea {
    margin: 6px 0;
    border: none;
    outline: none;
    width: 100%;
    resize: none;
    color: #666;
    font-size: 32px;
    line-height: 1.2em;
  }
  .todo-editing_head {
    padding: 40px 40px 0;
    color: #999;
  }
  .todo-editing_body {
    padding: 0 40px;
  }
  .todo-editing_meta {
    display: flex;
    height: 44px;
    align-items: center;
    border-bottom: 1px solid #eee;
    color: #999;
    i {
      padding-right: 10px;
    }
  }
  .edit {
    transition: all 0.5s ease;
  }
</style>
