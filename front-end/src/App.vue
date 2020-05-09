<template>
  <div id="app">
    <h1 class="title">TODO LIST</h1>

    <LoadBar :loadBarWidth="loadBarWidth"></LoadBar>

    <div class="div-input">
      <input
        type="text"
        class="input-text"
        placeholder="Digite uma nova tarefa"
        v-model="inputValue"
        v-on:keypress.enter="createNewTask"
      />
      <button type="button" class="btn-append" @click="createNewTask">
        +
      </button>
    </div>

    <div class="tasks-container">
      <template v-for="task in allTasksSorted">
        <CardTask :key="task.id" :task="task" v-on:updateFetch="getAllTasks()">
          <button
            type="button"
            class="btn-close"
            @click.stop="removeTask(task.id)"
          >
            X
          </button>
        </CardTask>
      </template>
    </div>
  </div>
</template>

<script>
import LoadBar from "./components/LoadBar.vue";
import CardTask from "./components/CardTask.vue";
import Fetch from "@/service/Fetch.js";

export default {
  name: "App",
  components: {
    LoadBar,
    CardTask,
  },
  data() {
    return {
      inputValue: "",
      allTasks: [],
    };
  },
  mounted() {
    this.getAllTasks();
  },
  methods: {
    async getAllTasks() {
      this.allTasks = await Fetch.get("/");
    },
    async createNewTask() {
      if (await this.validateNewTask(this.inputValue)) {
        await Fetch.create("/", {
          text: this.inputValue,
          state: false,
        });
        this.inputValue = "";
        await this.getAllTasks();
      }
    },
    async removeTask(id) {
      await Fetch.remove("/" + id);
      await this.getAllTasks();
    },
    validateNewTask(value) {
      const alredyHave =
        this.allTasks.find((task) => task.text == value) != undefined;
      if (value == "" || alredyHave) return false;
      return true;
    },
  },

  computed: {
    loadBarWidth() {
      if (this.allTasks.length === 0) return 0;
      let completedTasks = this.allTasks.filter((task) => task.state);
      return (completedTasks.length / this.allTasks.length) * 100;
    },
    allTasksSorted() {
      let result = this.allTasks;
      return result.sort((a, b) => a.id - b.id);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap");

body {
  background: #5f2c82;
  background: -webkit-linear-gradient(to right, #49a09d, #5f2c82);
  background: linear-gradient(to right, #49a09d, #5f2c82);
  font-family: "Chelsea Market", cursive;
  color: #fff;
  width: 100%;

  height: 100vh;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 5rem;
  align-items: center;
  width: 100%;
}
.title {
  font-size: 4.5rem;
}
.div-input {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
button {
  outline: none;
  cursor: pointer;
}
.btn-append {
  height: 65px;
  width: 65px;
  right: -10px;
  color: #fff;
  font-size: 1.5rem;
  background-color: #2f66fb;
  border: #e6e6e6 solid 4px;
  border-radius: 50px;
  position: absolute;
  transition: all 400ms;
}
.btn-append:hover {
  color: #fff;
  border: #1ccf52 solid 8px;
  background-color: #5885ff;
  transform: rotate(180deg);
}
.btn-append:active {
  border: #1ccf52 solid 4px;
  color: #1ccf52;
  background-color: #ffffff;
  transition: all 100ms;
}
.input-text {
  height: 60px;
  width: 500px;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 14px;
  color: white;
  background: transparent;
  border: #e6e6e6 2px solid;
  outline: none;
}
.input-text::placeholder {
  color: white;
}
.tasks-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  align-items: center;
  margin: 1.5rem;
  transition: all 500ms;
}
</style>
