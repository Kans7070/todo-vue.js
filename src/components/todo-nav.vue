<template lang="">
  <div>
    <b-navbar type="dark" variant="success">
      <b-navbar-nav
        class="ml-auto d-flex justify-content-between align-items-center w-100 mx-2"
      >
        <b-navbar-brand class="mr-sm-2" href="#">Todo</b-navbar-brand>

        <!-- Right aligned nav items -->
        <b-nav-form>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
            v-model="searchInput"
          ></b-form-input>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
import { eventBus } from "../main";
export default {
  data() {
    return { searchInput: this.search };
  },

  props: {
    search: {
      type: String,
    },
  },

  updated(){
    eventBus.$emit('search',this.searchInput)
  }
};
</script>
<style lang=""></style>
