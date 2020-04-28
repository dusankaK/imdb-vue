<template>
  <div class="container m-0 p-0">
    <div class="movies-search">
      <input
        class="form-control"
        placeholder="Type to search..."
        type="text"
        v-model="searchTerm"
        @keyup="searchMovie"
      />
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  name: "MovieSearch",
  data() {
    return {
      searchTerm: ""
    }
  },
  methods: {
    searchMovie: debounce(function() {
      this.$emit("search-movie", this.searchTerm)
    }, 750)
  }
  
}
</script>

<style>
.movies-search {
  margin-top: 15px;
}  
</style>