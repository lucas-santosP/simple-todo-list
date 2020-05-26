<template>
  <div class="tasks-container">
    <template v-if="tasks.length">
      <div
        v-for="task in tasks"
        :key="task.id"
        :class="[task.state ? 'completed' : 'incompleted', 'card']"
        @click.prevent="changeState(task)"
      >
        <button
          type="button"
          class="btn-close"
          @click.stop="$emit('remove-task', task.id)"
        >
          X
        </button>
        <div class="card-body">
          <p class="card-text">{{ task.text }}</p>
        </div>
      </div>
    </template>
    <p v-else class="card-text">Sua vida está em dia :)</p>
  </div>
</template>

<script>
import Fetch from "@/service/Fetch.js";

export default {
  props: {
    tasks: Array,
  },
  methods: {
    async changeState(task) {
      await Fetch.update("/tasks/" + task.id, {
        state: !task.state,
      });
      await this.$emit("update-tasks");
    },
  },
};
</script>

<style scoped>
.tasks-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  align-items: center;
  margin: 1.5rem;
  transition: all 500ms;
}
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 300px;
  height: 120px;
  margin: 0.75rem;
  user-select: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 200ms linear;
}
.card-body {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem;
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
  top: -5px;
  right: -5px;
  height: 30px;
  width: 30px;
  font-size: 0.75rem;
  font-weight: bold;
  color: #3d3d3d;
  border-radius: 25px;
  border: none;
  z-index: 3;
}
.btn-close:hover {
  border: 2px #3d3d3d solid;
  border: #fff solid 3px;
  color: #fff;
  background-color: #3d3d3d;
  transition: all 300ms;
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
