<template>
  <div class="fade">
    <div class="task" v-if="!task.deleted">
      <checkbox-group  @change="checkboxChange">
        <checkbox :id="id" :checked="task.done"/>
        <label :for="id">{{task.title}}</label>
      </checkbox-group>
      <div class="fade" :style="{opacity: task.done ? 1 : 0 }">
        <span class="task_delete" v-show="task.done" @click="deleteTask({task})">
          <i class="fa fa-trash"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  let GID = 1
  export default {
    name: 'Task',
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        id: `task-${GID++}`
      }
    },
    methods: {
      ...mapMutations(['deleteTask']),
      checkboxChange (e) {
        if (e.mp.detail.value.length > 0) {
          this.task.done = true
        } else {
          this.task.done = false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .task {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    checkbox {
      width: 25px;
      height: 25px;
    }
    label {
      flex: 1;
      line-height: 25px;
    }
  }
  .task_delete {
    padding: 0 10px;
    color: #ccc;
    font-size: 16px;
  }
  .fade {
    display:block;
    transition: all 0.3s ease;
  }
</style>
