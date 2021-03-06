<template>
  <div class="container d-flex">
    <div class="movie">
      <div class="d-flex flex-row align-items-center">
        <h1 class="movie-title">{{ singleMovie.title }}</h1>
        <div class="ml-3 mb-5">
          <button
            class="btn"
            :class="[hasWatched ? 'btn-danger' : 'btn-success']"
            @click="handleWatchlistClick"
            type="button"
          >
            {{ hasWatched ? 'Mark as unwatched' : 'Mark as watched' }}
          </button>
        </div>
      </div>
      <img class="movie-image" :src="singleMovie.image_url" :alt="singleMovie.title" />
      <div class="movie-genre" v-if="singleMovie.genres">
        <p>Genres:</p>
        <p class="ml-2" v-for="genre in singleMovie.genres" :key="genre.id">
          <i>{{ genre.name }}</i>
        </p>
      </div>
      <p class="movie-description">{{ singleMovie.description }}</p>
      <div class="like-dislike-container">
        <div class="d-flex justify-content-between mt-3">
          <div class="d-flex align-items-center">
            <p class="likes m-0 mr-2 p-0">Likes:</p>
            <span>{{ singleMovie.likes }}</span>
          </div>
          <button @click="rating('like')" type="button" class="btn btn-success">Like</button>
        </div>
        <div class="d-flex justify-content-between mt-3">
          <div class="d-flex align-items-center">
            <p class="dislikes m-0 mr-2 p-0">Dislikes:</p>
            <span>{{ singleMovie.dislikes }}</span>
          </div>
          <button @click="rating('dislike')" type="button" class="btn btn-danger">Dislike</button>
        </div>
      </div>
      <div class="d-flex flex-row mt-3">
        <p>Visit count:</p>
        <span class="ml-2">{{ singleMovie.visit_count }}</span>
      </div>

      <div class="comment-container mt-4 mb-5">
        <form @submit.prevent="addNewComment" class="d-flex flex-row align-items-center">
          <input
            class="comment-input form-control mt-3 mb-3"
            type="text"
            placeholder="This is my comment!"
            v-model="newComment"
            required
          />
          <button class="btn btn-success ml-3" type="submit">
            <strong>Add comment</strong>
          </button>
        </form>

        <div v-if="singleMovieComments">
          <ul class="list-group">
            <li
              class="comment-body list-group-item"
              v-for="comment in singleMovieComments"
              :key="comment.id"
            >{{ comment.content }}</li>
          </ul>
          <button
            class="btn btn-primary mt-2"
            type="button"
            @click="loadMore"
            :disabled="!moreComments"
          >
          <strong>Load More</strong>
          </button>
        </div>
          <h4 v-else class="alert alert-danger">No comments.</h4>
        </div>
    </div>
        <related-movies :genres="genres" />

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import RelatedMovies from "../components/RelatedMovies.vue"

export default {
  name: "SingleMovie",
  components: {
    RelatedMovies
  },
  async created() {
    const response = await this.fetchSingleMovie(this.$route.params.id);
    console.log(response.data.watched);
    this.hasWatched = response.data.watched;
    this.$store.dispatch("fetchRelatedMovies", this.genres);
  },
  data() {
    return {
      newComment: "",
      currentPage: 1,
      moreComments: true,
      hasWatched: false,
    }
  },
  computed: {
    ...mapGetters({
      singleMovie: "singleMovie",
      singleMovieComments: "singleMovieComments" 
    }),
    genres() {
      return this.singleMovie.genres;
    }
  },
  methods: {
    ...mapActions({
      reactToMovie: "reactToMovie",
      addComment: "addComment",
      fetchSingleMovie: "fetchSingleMovie",
      loadMoreComments: "loadMoreComments",
      handleWatchlist: "handleWatchlist"
    }),
    rating(type) {
      this.reactToMovie({movie_id: this.$route.params.id, reaction: type}).then(() => {
        this.fetchSingleMovie(this.singleMovie.id);
    })
    },
    addNewComment() {
      this.addComment({content: this.newComment, movie_id: this.singleMovie.id})
        .then(()=> {
          this.fetchSingleMovie(this.singleMovie.id)
          this.newComment=""
          })
    },
    checkMoreComments() {
      if(this.currentPage == this.singleMovie.comments.last_page) this.moreComments = false;
    },
    loadMore() {
      this.loadMoreComments({id: this.singleMovie.id, page: this.currentPage + 1})
      this.currentPage++;
      this.checkMoreComments();
    },
    handleWatchlistClick() {
      this.handleWatchlist(this.$route.params.id).then(r => {
        this.hasWatched = r.data.watched;
      });
  }
}}
</script>

<style scoped>
.movie {
  display: flex;
  flex-direction: column;
  margin-top: 4vw;
}
.movie-title {
  margin: 10px 0 50px 0;
}
.movie-image {
  max-width: 10vw;
}
.movie-genre {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.movie-description {
  margin-top: 20px;
  margin-bottom: 40px;
  max-width: 60vw;
}
.like-dislike-container {
  width: 200px;
}
.likes {
  color: green;
}
.dislikes {
  color: red;
}
</style>