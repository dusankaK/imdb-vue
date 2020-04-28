export var PaginationMixin = {
  computed: {
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
    onPage(page) {
      if(this.selectedGenre) {
        this.fetchAllMovies({
          page: page,
          searchTerm: this.toSearch,
          genre: this.selectedGenre
        });
        return;
      }
      
      this.fetchAllMovies({page: page, searchTerm: this.toSearch})
    }
  }
}
