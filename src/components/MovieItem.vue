<template>
  <div>
    <div class="movie-container">
    <div v-for="movie in allMovies" :key="movie.id">
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
export default {
  name: "MovieItem",
  props: {
    allMovies: {
      required: true
    } 
  }

}
</script>

<style scoped>
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