<template>
  <div id="todo">
    <b-container>
      <div class="d-flex gap-2 flex-column">
        <div class="add-box d-flex gap-2">
          <b-form-input v-model.lazy="text" placeholder="todo"></b-form-input>
          <b-button
            size="sm"
            class="my-2 my-sm-0"
            type="submit"
            @click="createTodo"
            >+</b-button
          >
        </div>
        <b-list-group v-if="filteredTodo.length">
          <b-list-group-item
            v-for="(todo, index) in filteredTodo"
            :key="index"
            class="d-flex flex-row gap-2"
          >
            <b-form-checkbox
              v-model="todo.isDone"
              class="d-flex align-items-center"
            ></b-form-checkbox>
            <b-form-input
              v-model.lazy="todo.todo"
              placeholder="todo"
              class="add-box"
              v-if="!todo.isDone"
            >
            </b-form-input>
            <p v-else class="add-box d-flex align-items-center column-p">
              <del>
                {{ todo.todo }}
              </del>
            </p>

            <b-button
              size="sm"
              class="my-2 my-sm-0"
              type="submit"
              @click="deleteTodo(index)"
              ><b-icon icon="trash"></b-icon
            ></b-button>
          </b-list-group-item>
        </b-list-group>
        <div v-else>Add todo</div>
        <button @click="logData()">console.log</button>
      </div>
    </b-container>
  </div>
</template>

<script>
import { eventBus } from "@/main";

export default {
  name: "TodoComponent",
  data() {
    return {
      text: "",
    };
  },

  props: {
    todos: {
      type: Array,
    },
    search: {
      type: String,
    },
  },

  methods: {
    createTodo() {
      eventBus.$emit("addTodos", { todo: this.text, isDone: false });
      this.text = "";
    },

    deleteTodo(index) {
      eventBus.$emit("deleteTodo", index);
    },

    logData() {
      console.log(
        this.todos.map((element) => {
          const todo = element.todo;
          const isDone = element.isDone;
          return { todo, isDone };
        })
      );
    },
  },

  computed: {
    filteredTodo() {
      if (!this.search) {
        return this.todos;
      }

      return this.todos.filter((d) => d.todo.match(this.search));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-box {
  max-width: 400px;
  margin: 0px;
  height: 38px;
}
.column-p {
  padding: 0 12px;
}
</style>
