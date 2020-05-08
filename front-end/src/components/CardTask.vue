<template>
  <div
    class="card"
    :class="task.state ? 'completed' : 'incompleted'"
    @click.prevent="changeState"
  >
    <slot></slot>
    <div class="card-body">
      <p class="card-text">{{ task.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardTask",
  props: {
    task: Object,
  },
  methods: {
    changeState() {
      console.log("Change state...");
      fetch("http://127.0.0.1:1414/" + this.task.id + "&" + !this.task.state, {
        method: "put",
      }).then(() => this.$emit("updateFetch"));
    },
  },
};
</script>

<style scoped>
.card {
  cursor: pointer;
  width: 300px;
  height: 120px;
  margin: 0.75rem;
  border-radius: 15px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: all 200ms linear;
}
.card-body {
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  /* margin-top: 1rem; */
}
.card-text {
  width: 100%;
  max-width: 250px;
  font-size: 1.3rem;
  color: #fff;
  text-align: center;
  word-break: break-all;
}

.btn-close {
  position: absolute;
  height: 30px;
  width: 30px;
  color: #3d3d3d;
  border-radius: 25px;
  font-size: 0.75rem;
  font-weight: bold;
  border: none;
  z-index: 3;
  top: -5px;
  right: -5px;
}
.btn-close:hover {
  border: 2px #3d3d3d solid;
  color: #fff;
  background-color: #3d3d3d;
}
.incompleted {
  background-color: #ce5353;
  border-left: 15px solid #943838;
}
.completed {
  background-color: #0fb440;
  border-left: 15px solid #328f32;
  text-decoration: line-through;
}
</style>
