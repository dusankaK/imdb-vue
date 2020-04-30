<template>
<div class="container">
  <movie-search @change-elastic="changeElastic" @search-movie="searchMovies"></movie-search>
  <div v-if="allMovies.data">
    <div v-if="!useElastic" class="card">
      <div v-for="genre in allGenres" :key="genre.id">
        <input 
          type="checkbox"
          @change="searchMovies(toSearch)"
          :name="genre.name"
          :value="genre.id"
          v-model="selectedGenre">
        <label class="card-text" :for="genre.name">{{ genre.name }}</label>
      </div>
    </div>

    <movies-pagination
    :firstPage="firstPage"
    :lastPage="lastPage"
    :currentPage="currentPage"
    @go-page = "onPage"
    ></movies-pagination>
    <movie-item :allMovies="allMovies.data"></movie-item>
  </div>

  <div v-else>
    <h3 class="alert alert-danger mt-5">There are no movies in our database.</h3>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MovieItem from "../components/MovieItem.vue";
import MoviesPagination from "../components/MoviesPagination.vue";
import MovieSearch from "../components/MovieSearch.vue"
import { PaginationMixin } from "../mixins/Pagination.js"

export default {
  name: "Movies",
  data() {
    return {
      toSearch: "",
      selectedGenre: [],
      useElastic: false
    }
  },
  components: {
    MovieItem,
    MoviesPagination,
    MovieSearch
  },
  mixins: [PaginationMixin],
  created() {
    this.$store.dispatch("fetchAllMovies", { page: 1 , searchTerm : ""})
    this.$store.dispatch("fetchGenres")
  },
  computed: {
    ...mapGetters({
      allMovies: "allMovies",
      allGenres: "allGenres"
    })
  },
  methods: {
    ...mapActions({
      fetchAllMovies: "fetchAllMovies"
    }),
    searchMovies(searchTerm) {
      this.toSearch = searchTerm;
      if(this.useElastic) {
        this.fetchAllMovies({ 
          page: 1, 
          searchTerm: searchTerm, 
          genre: [],
          elastic: true
        });
        return;
      }

      this.fetchAllMovies(
        { page: 1, 
          searchTerm: searchTerm, 
          genre: this.selectedGenre,
          elastic: false
        })
    },
    changeElastic(bool) {
      this.useElastic = bool;
    }
  }
}
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 30vw;
  padding: 8px;
  margin-top: 2vw;
}
.card-text {
  margin-left: 5px;
  margin-right: 10px;
}
</style>
