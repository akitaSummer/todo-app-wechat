<template>
  <div class="gradient">
    <div class="gradient_color" :class="{gradient_color_active: true}" :style="{backgroundImage: gradientColor}"></div>
  </div>
</template>

<script>
  export default {
    name: 'Gradient',
    props: {
      colors: {
        type: Array
      },
      index: {
        type: Number
      }
    },
    computed: {
      gradientColor () {
        const colorBotton = `color-stop(38%, ${this.colors[this.index][0]})`
        const colorTop = `to(${this.colors[this.index][1]})`
        return `-webkit-gradient(linear, left bottom, left top , ${colorBotton}, ${colorTop})`
      }
    }
  }
</script>

<style scoped lang="scss">
.gradient{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
.gradient_color{
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.gradient_color_active {
  opacity: 1;
}
</style>
