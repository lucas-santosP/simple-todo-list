<template>
  <div class="loadbar">
    <span class="loadbar-text">{{ RoundedWidth }}%</span>
    <div class="loadbar-content" :style="returnWidth"></div>
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
.loadbar {
  position: relative;
  height: 70px;
  width: 80%;
  margin: 2rem 0;
  border-radius: 14px;
  border: #e6e6e6 3px solid;
  overflow: hidden;
}
.loadbar-text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 1.5rem;
  transform: translate(-50%, -50%);
}
.loadbar-content {
  background: #0fb440;
  height: 100%;
  transition: all 400ms ease;
}
</style>
