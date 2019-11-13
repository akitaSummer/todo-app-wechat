<template>
  <div class="grow" :style="{transform : !!selected? 'scale(1)' : 'scale(0)'}">
    <button
      class="floating-button"
      v-if="!!selected"
      :class="{ 'floating-button_editing': !!editing,  'floating-button-add': btnType === 'add', 'floating-button-back': btnType === 'back'}"
      :style="{ background: gradientColor }"
      @click="btnType === 'back'? $store.commit('unselectTodo') : $store.commit('toggleEditing')"
    ></button>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  export default {
    props: {
      btnType: {
        type: String
      }
    },
    computed: {
      ...mapState(['selected', 'editing']),
      ...mapGetters(['currentTodo']),
      gradientColor () {
        const colorLeft = `color-stop(30%, ${this.currentTodo.colors[0]})`
        const colorRight = `to(${this.currentTodo.colors[1]})`
        return `-webkit-gradient(linear, left bottom, right top, ${colorLeft}, ${colorRight})`
      }
    },
    methods: {
      ...mapMutations(['toggleEditing', 'unselectTodo'])
    }
  }
</script>

<style scoped lang="scss">
  .floating-button {
    position: fixed;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    border-radius: 44px;
    width: 44px;
    height: 44px;
    color: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.5s ease;
  }
  .floating-button-add {
    right: 44px;
    bottom: 64px;
  }
  .floating-button-add::before,
  .floating-button-add::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 20px;
    height: 2px;
    background-color: white;
    transform: translate(-50%, -50%);
  }
  .floating-button-add::after {
    transform: rotate(90deg) translate(-50%, -50%) ;
  }
  .floating-button-back {
    right: 44px;
    bottom: 128px;
  }
  .floating-button-back::after {
    content: '\f053';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 20px;
    height: 16px;
    background-color: transparent;
    transform: translate(-50%, -50%);
    font: normal normal normal 14px/1 FontAwesome;
    border-color: transparent;
  }
  .floating-button__editing {
    right: 0;
    bottom: 0;
    width: 100%;
    border-radius: 0;
  }
  .grow {
    transition: all 0.3s ease;
  }
</style>
