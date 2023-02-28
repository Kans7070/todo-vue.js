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
    eventBus.$on("addTodos", (data) => this.addTodos(data));
    eventBus.$on("editTodo", ({ index, data }) => this.editTodo(index, data));
    eventBus.$on("deleteTodo", (index) => this.deleteTodo(index));
    eventBus.$on("search", (data) => (this.search = data));
  },

  updated() {},

  methods: {
    addTodos(data) {
      if (!data.todo) return;
      this.todos.push(data);
    },

    editTodo(index, data) {
      if (!data) return;

      this.todos[index].todo = data;
    },

    deleteTodo(index) {
      console.log(index);
      this.todos.splice(index, 1);
    },

    logUpdate() {
      console.log("log");
    },
  },
};
</script>

<style></style>
