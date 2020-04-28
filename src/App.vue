<template>
  <div class="container-fluid m-0 p-0">
    <Header />
    <div class="container d-flex flex-row justify-content-between">
      <router-view></router-view>
      <sidebar v-if="$route.name == 'home'" class="sidebar-movie"/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar
  }
}
</script>

<style>
.sidebar-movie {
  width: 20vw;
}
</style>
