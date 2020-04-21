<template>
   <div class="container-fluid m-0 p-0">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="nav-link" :to ="{ name: 'home'}">Pocket IMDB</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div 
          v-if="!isUserLoggedIn"
          class="collapse navbar-collapse" 
          id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
          <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
        </div>
      </div>
      <div 
        v-else
        class="collapse navbar-collapse" 
        id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" href="#" @click.prevent="logout()">Logout</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      isUserLoggedIn: "isUserLoggedIn"
    })
  },
  methods: {
    ...mapActions({
      logoutUser: "logoutUser"
    }),
    logout() {
      this.logoutUser()
        .then(() => {
          this.$router.push({ name: "login"})
        })
    }
  }
}
</script>