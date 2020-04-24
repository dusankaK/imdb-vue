<template>
  <nav class="mt-5">
    <ul class="pagination">
      <li v-if="currentPage !==1" class="page-item">
        <button class="page-link" @click="goPage(firstPage)" :disabled='currentPage == 1'>First</button>
      </li>
      <li v-if="currentPage !==1" class="page-item">
        <button class="page-link" @click="goPage(currentPage - 1)" :disabled='currentPage == 1'>Previous</button>
      </li>
      <button class="page-link"><span>{{currentPage}}</span></button>
      <li v-if="currentPage !== lastPage" class="page-item">
        <button class="page-link" @click="goPage(currentPage + 1)" :disabled='currentPage == lastPage'>Next</button>
      </li>
      <li v-if="currentPage !== lastPage" class="page-item">
        <button class="page-link" @click="goPage(lastPage)" :disabled='currentPage == lastPage'>Last</button>
      </li>
    </ul>
</nav>
</template>

<script>
export default {
  name: "MoviesPagination",
  props: {
    firstPage: {
      required: true
    },
    lastPage: {
      required: true
    },
    currentPage: {
      required: true
    }
  },
  methods: {
    goPage(page) {
      this.$emit("go-page", page)
    }
  }
}
</script>