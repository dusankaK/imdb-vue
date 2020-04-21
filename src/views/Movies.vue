<template>
  <div class="movie-container">
    <div v-for="movie in allMovies" :key="movie.id">
      <h3>{{ movie.title }}</h3>
      <img class="movie-image" :src="movie.image_url" :alt="movie.title">
      <p>{{ movie.description }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Movies",
  created() {
    this.$store.dispatch("fetchAllMovies")
  },
  computed: {
    ...mapGetters({
      allMovies: "allMovies"
    })
  }
}
</script>

<style>
.movie-container {
  border: 1px solid grey;
  border-radius: 3px;
  padding: 10px;
  margin: 15px 0 15px 0;
}
.movie-image {
  max-height: 150px;
}
</style>