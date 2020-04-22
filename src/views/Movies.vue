<template>
<div class="container">
  <div v-if="allMovies.data">
    <movie-search @search-movie="searchMovie"></movie-search>
    <movies-pagination
    :firstPage="firstPage"
    :lastPage="lastPage"
    :currentPage="currentPage"
    @go-previous-page = "goPreviousPage"
    @go-last-page = "goLastPage"
    @go-next-page = "goNextPage"
    @go-page-num = "goPageNum"
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

export default {
  name: "Movies",
  data() {
    return {
      toSearch: ""
    }
  },
  components: {
    MovieItem,
    MoviesPagination,
    MovieSearch
  },
  created() {
    this.$store.dispatch("fetchAllMovies", { page: 1 , searchTerm : ""})
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
    searchMovie(searchTerm) {
      this.toSearch = searchTerm
      this.fetchAllMovies({page: 1, searchTerm: searchTerm})
    },
    goPreviousPage() {
      if(this.currentPage === 1) {
        return
      } else {
        return this.fetchAllMovies(
          {page: this.currentPage - 1,
           searchTerm: this.toSearch 
          })
      }
    },
    goNextPage() {
      if(this.currentPage == this.lastPage) {
        return
      } else {
        return this.fetchAllMovies(
          {page: this.currentPage + 1,
           searchTerm: this.toSearch 
          })
      }
    },
    goLastPage() {
      if(this.currentPage == this.lastPage) {
        return
      } else {
        return this.fetchAllMovies(
          {page: this.lastPage,
          searchTerm: this.toSearch 
          });
      }
    },
    goPageNum(page) {
      return this.fetchAllMovies({
        page: page,
        searchTerm: this.toSearch
      })
    }
  }
}
</script>
