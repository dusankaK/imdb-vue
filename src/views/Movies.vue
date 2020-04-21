<template>
<div class="container">
  <div v-if="allMovies.data">
    <movies-pagination
    :firstPage="firstPage"
    :lastPage="lastPage"
    :currentPage="currentPage"
    @go-previous-page = "goPreviousPage"
    @go-last-page = "goLastPage"
    @go-next-page = "goNextPage"
    @go-page-num = "fetchAllMovies"
    ></movies-pagination>
    <movie-item :allMovies="allMovies.data"></movie-item>
  </div>

  <div v-else>
    <h3 class="alert alert-danger">There are no movies in our database.</h3>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MoviesPagination from "../components/MoviesPagination.vue";
import MovieItem from "../components/MovieItem.vue";

export default {
  name: "Movies",
  created() {
    this.$store.dispatch("fetchAllMovies", 1)
  },
  computed: {
    ...mapGetters({
      allMovies: "allMovies"
    }),
    firstPage() {
      return this.allMovies.first_page;
    },
    lastPage() {
      return this.allMovies.last_page;
    },
    currentPage() {
      return this.allMovies.current_page;
    }
  },

  methods: {
    ...mapActions({
      fetchAllMovies: "fetchAllMovies"
    }),
    goPreviousPage() {
      if(this.currentPage === 1) {
        return
      } else {
        return this.fetchAllMovies(this.currentPage - 1)
      }
    },
    goNextPage() {
      if(this.currentPage == this.lastPage) {
        return
      } else {
        return this.fetchAllMovies(this.currentPage + 1)
      }
    },
    goLastPage() {
      if(this.currentPage == this.lastPage) {
        return
      } else {
        return this.fetchAllMovies(this.lastPage);
      }
    }
  },
  components: {
    MoviesPagination,
    MovieItem
  }
}
</script>
