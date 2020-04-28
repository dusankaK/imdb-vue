<template>
  <div class="container">
    <div class="movie">
      <h1 class="movie-title">{{ singleMovie.title }}</h1>
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
          <button @click="like" type="button" class="btn btn-success">Like</button>
        </div>
        <div class="d-flex justify-content-between mt-3">
          <div class="d-flex align-items-center">
            <p class="dislikes m-0 mr-2 p-0">Dislikes:</p>
            <span>{{ singleMovie.dislikes }}</span>
          </div>
          <button @click="dislike" type="button" class="btn btn-danger">Dislike</button>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "SingleMovie",
  data() {
    return {
      newComment: "",
      currentPage: 1,
      moreComments: true
    }
  },
  created() {
    this.$store.dispatch("fetchSingleMovie", this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      singleMovie: "singleMovie",
      singleMovieComments: "singleMovieComments" 
    })
  },
  methods: {
    ...mapActions({
      reactToMovie: "reactToMovie",
      addComment: "addComment",
      fetchSingleMovie: "fetchSingleMovie",
      loadMoreComments: "loadMoreComments"
    }),
    like() {
      this.reactToMovie({movie_id: this.$route.params.id, reaction: "like"})
        .then(()=>{
          this.fetchSingleMovie(this.singleMovie.id);
        })
    },
    dislike() {
      this.reactToMovie({movie_id: this.$route.params.id, reaction: "dislike"})
        .then(()=>{
          this.fetchSingleMovie(this.singleMovie.id);
        })
    },
    addNewComment() {
      this.addComment({content: this.newComment, movie_id: this.singleMovie.id})
        .then(()=> {this.fetchSingleMovie(this.singleMovie.id)})
          .then(()=> {this.newComment=""})
    },
    checkMoreComments() {
      if(this.currentPage == this.singleMovie.comments.last_page) {
        this.moreComments = false;
      } else {
        this.moreComments = true;
      }
    },
    loadMore() {
      this.loadMoreComments({id: this.singleMovie.id, page: this.currentPage + 1})
      this.currentPage++;
      this.checkMoreComments();
    }
  }
}
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