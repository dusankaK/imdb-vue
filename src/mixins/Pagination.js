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
    goPreviousPage() {
      if(this.currentPage == 1) {
        return;
      }
      if(this.selectedGenre) {
        this.fetchAllMovies({
          page: this.currentPage - 1,
          searchTerm: this.toSearch,
          genre: this.selectedGenre
        });
        return;
      }
        this.fetchAllMovies({page: this.currentPage - 1, searchTerm: this.toSearch})
      
    },
    goNextPage() {
      if(this.currentPage == this.lastPage) {
        return;
      }
      if(this.selectedGenre) {
        this.fetchAllMovies({
          page: this.currentPage + 1,
          searchTerm: this.toSearch,
          genre: this.selectedGenre
        });
        return;
      }
        this.fetchAllMovies({page: this.currentPage + 1, searchTerm: this.toSearch })
    
    },
    goLastPage() {
      if(this.currentPage == this.lastPage) {
        return;
      } 
      if(this.selectedGenre) {
        this.fetchAllMovies({
          page: this.lastPage,
          searchTerm: this.toSearch,
          genre: this.selectedGenre
        });
        return;
      }
        this.fetchAllMovies({page: this.lastPage, searchTerm: this.toSearch });
    },
    goPageNum(page) {
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
