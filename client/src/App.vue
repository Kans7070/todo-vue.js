<template>
  <div id="app">
    <div class="p-2">
      <NavBar />
    </div>
    <b-container class="py-5">
      <TodoComponent :todos="todos" :search="search" />
    </b-container>
  </div>
</template>

<script>
import TodoComponent from "./components/todo-component.vue";
import NavBar from "./components/todo-nav.vue";
import { eventBus } from "./main";
import axios from "axios";

export default {
  name: "App",
  components: {
    TodoComponent,
    NavBar,
  },

  data: function () {
    return {
      todos: [],
      search: "",
    };
  },

  created() {
    this.getTodos();
    eventBus.$on("addTodos", (data) => this.addTodos(data));
    eventBus.$on("editTodo", ({ index, data }) => this.editTodo(index, data));
    eventBus.$on("deleteTodo", (index) => this.deleteTodo(index));
    eventBus.$on("search", (data) => (this.search = data));
  },

  updated() {},

  methods: {
    getTodos() {
      axios
        .get("http://192.168.0.164:8080/todo")
        .then(({ data }) => (this.todos = data.data))
        .catch((err) => console.log(err));
    },

    addTodos(data) {
      if (!data.content) return;
      axios
        .post("http://192.168.0.164:8080/todo/create", {
          title: "todo",
          content: data.content,
        })
        .then(() => {
          return this.getTodos();
        })
        .catch((err) => console.log(err));
    },

    editTodo(index, data) {
      if (!data) return;

      this.todos[index].content = data;
    },

    deleteTodo(id) {
      console.log(id);
      axios
        .delete(`http://192.168.0.164:8080/todo/${id}`)
        .then(() => {
          return this.getTodos();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
