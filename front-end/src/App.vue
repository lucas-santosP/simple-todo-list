<template>
  <div id="app">
    <h1 class="title">TODO LIST</h1>

    <LoadBar :loadBarWidth="loadBarWidth"></LoadBar>

    <div class="div-input">
      <input
        type="text"
        :class="[{ 'class-erro': inputErro }, 'input-text']"
        placeholder="Digite uma nova tarefa..."
        v-model="inputValue"
        v-on:keypress.enter="createNewTask"
      />
      <button type="button" class="btn-append" @click="createNewTask">
        +
      </button>
    </div>

    <GridTask
      :tasks="allTasksSorted"
      v-on:update-tasks="getAllTasks()"
      v-on:remove-task="removeTask($event)"
    ></GridTask>
  </div>
</template>

<script>
import LoadBar from "./components/LoadBar.vue";
import GridTask from "./components/GridTask.vue";
import Fetch from "@/service/Fetch.js";

export default {
  name: "App",
  components: {
    LoadBar,
    GridTask,
  },
  data() {
    return {
      inputValue: "",
      allTasks: [],
      inputErro: false,
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
      } else {
        this.showError();
      }
    },
    async removeTask(id) {
      await Fetch.remove("/" + id);
      await this.getAllTasks();
    },
    showError() {
      this.inputErro = true;
      setTimeout(() => {
        this.inputErro = false;
      }, 1000);
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
  position: absolute;
  height: 65px;
  width: 65px;
  right: -10px;
  font-size: 1.5rem;
  color: #fff;
  background-color: #2f66fb;
  border: #e6e6e6 solid 6px;
  border-radius: 50px;
  transition: all 400ms;
}
.btn-append:hover {
  color: #fff;
  background-color: #5482ff;
  transform: rotate(180deg);
  transition: all 400ms;
}
.btn-append:active {
  border: #1ccf52 solid 8px;
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
  color: rgba(255, 255, 255, 0.616);
}
.class-erro {
  border-color: #ca2b2b;
  transition: all 200ms;
}
.class-erro::placeholder {
  transition: all 200ms;
}
</style>
