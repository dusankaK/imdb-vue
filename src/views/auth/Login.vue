<template>
  <div class="container">
    <div
      v-if="loginErrors" 
      class="alert alert-danger mt-3">
      {{ loginErrors }}  
    </div>
    <form @submit.prevent="submit()">
      <div class="form-group">
        <label for="name">E-mail</label>
        <input v-model="credentials.email" type="email" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="name">Password</label>
        <input v-model="credentials.password" type="password" class="form-control" required />
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  name: "Login",
  computed: {
    ...mapGetters({
      loginErrors: "loginErrors"
    })
  },
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    ...mapActions({
      loginUser: "loginUser"
    }),
    submit() {
      this.loginUser(this.credentials)
      .then(()=> {
          if(!this.loginErrors){
            this.$router.push({ name: 'home' })
          }
        })
    }
  }
}
</script>