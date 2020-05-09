<template>
  <div class="LoadBar">
    <span class="bar-text">{{ RoundedWidth }}%</span>
    <div class="barLoaded" :style="returnWidth"></div>
  </div>
</template>

<script>
export default {
  name: "LoadBar",
  props: {
    loadBarWidth: { type: Number, default: 0 },
  },

  computed: {
    returnWidth() {
      return `width: ${this.loadBarWidth}%`;
    },
    RoundedWidth() {
      return this.loadBarWidth.toFixed(0);
    },
  },
};
</script>

<style scoped>
.LoadBar {
  height: 70px;
  width: 80%;
  border: #e6e6e6 3px solid;
  overflow: hidden;
  margin: 2rem 0;
  border-radius: 14px;
  position: relative;
}
.bar-text {
  position: absolute;
  font-size: 1.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.barLoaded {
  background: #0fb440;
  height: 75px;
  transition: all 400ms ease;
}
</style>
