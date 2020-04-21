<template>
<div class="container">
  <nav class="mt-5">
    <ul class="pagination">
      <li v-if="currentPage !==1" class="page-item">
        <button class="page-link" @click="goPreviousPage">Previous</button>
      </li>
      <li v-else class="page-item disabled">
        <p class="page-link">Previous</p>
      </li>
      <li v-for="index in allMovies.last_page" :key="index" class="page-item">
        <button
          v-if="currentPage !== index"
          class="page-link"
          @click="fetchAllMovies(index)">
          {{index}}</button>
        <div v-else class="page-item disabled">
          <p class="page-link">{{ index }}</p>
        </div>
      </li>
      <li v-if="currentPage !== allMovies.last_page" class="page-item">
        <button class="page-link" @click="goNextPage">Next</button>
      </li>
      <li v-else class="page-item disabled">
        <p class="page-link">Next</p>
      </li>
      <li v-if="currentPage !== allMovies.last_page" class="page-item">
        <button class="page-link" @click="goLastPage">Last</button>
      </li>
      <li v-else class="page-item disabled">
        <p class="page-link">Last</p>
      </li>
    </ul>
</nav>
  <div class="movie-container">
    <div v-for="movie in allMovies.data" :key="movie.id">
      <router-link :to="{ name: 'single-movie', params: {id : movie.id}}">
        <h3>{{ movie.title }}</h3>
      </router-link>
      <img class="movie-image" :src="movie.image_url" :alt="movie.title">
      <p>{{ movie.description }}</p>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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

  }
}
</script>

<style>
.movie-container {
  border: 1px solid rgb(216, 210, 210);
  border-radius: 3px;
  padding: 10px;
  margin: 15px 0 15px 5px ;
  max-width: 70vw;
}
.movie-image {
  max-height: 150px;
}
</style>