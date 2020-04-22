<template>
  <div>
    <div class="movie-container" v-for="movie in allMovies" :key="movie.id">
      <router-link :to="{ name: 'single-movie', params: {id : movie.id}}">
        <h3 class="movie-title">{{ movie.title }}</h3>
      </router-link>
      <img class="movie-image" :src="movie.image_url" :alt="movie.title">
      <p class="movie-description">
        {{ movie.description | shortDescription }}
          <router-link :to="{ name: 'single-movie', params: {id : movie.id}}">
            <i>show more</i>
          </router-link>
      </p>
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
  },
  filters: {
    shortDescription(desc) {
      return desc.substr(0, 150) + '...';
    }
  }
}
</script>

<style scoped>
.movie-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid rgb(216, 210, 210);
  border-radius: 3px;
  padding: 10px;
  margin: 15px 0 15px 5px ;
  max-width: 70vw;
}
.movie-title {
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.movie-image {
  margin: auto 20px;
  max-height: 150px;
}
.movie-description {
  margin-left: 20px;
  margin-top: 20px;
}
</style>