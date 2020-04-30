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
      <div class="mt-2">
        <input 
          type="checkbox" 
          id="elSearch"
          value="on"
          v-model="useEl"
          @change="changeToElastic"
        />
        <label for="elSearch">Elastic Search</label>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  name: "MovieSearch",
  data() {
    return {
      searchTerm: "",
      useEl: false
    }
  },
  methods: {
    searchMovie: debounce(function() {
      this.$emit("search-movie", this.searchTerm)
    }, 750),
    changeToElastic() {
      this.$emit("change-elastic", this.useEl)
    }
  }
  
}
</script>

<style>
.movies-search {
  margin-top: 15px;
}  
</style>