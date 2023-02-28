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
              v-model="todo.complete"
              class="d-flex align-items-center"
            ></b-form-checkbox>
            <b-form-input
              v-model.lazy="todo.content"
              placeholder="todo"
              class="add-box"
              v-if="!todo.complete"
            >
            </b-form-input>
            <p v-else class="add-box d-flex align-items-center column-p">
              <del>
                {{ todo.content }}
              </del>
            </p>

            <b-button
              size="sm"
              class="my-2 my-sm-0"
              type="submit"
              @click="deleteTodo(todo._id)"
              ><b-icon icon="trash"></b-icon
            ></b-button>
          </b-list-group-item>
        </b-list-group>
        <div v-else>Add todo</div>
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
      eventBus.$emit("addTodos", { content: this.text, complete: false });
      this.text = "";
    },

    deleteTodo(index) {
      eventBus.$emit("deleteTodo", index);
    },
  },

  computed: {
    filteredTodo() {
      if (!this.search) {
        return this.todos;
      }

      return this.todos.filter((d) =>
        d.content.toLowerCase().match(this.search.toLowerCase())
      );
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
