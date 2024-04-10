<template>
  <div class="books" v-if="pagedBooks.length">
    <h1>Books</h1>
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Pages</th>
        <th>Author</th>
        <th>Borrowed</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="book in pagedBooks" :key="book.bookId">
        <td>{{ book.title }}</td>
        <td>{{ book.pages }}</td>
        <td>{{ book.author.firstName }} {{ book.author.lastName }}</td>
        <td>{{ book.borrowed }}</td>
      </tr>
      </tbody>
    </table>
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
  <div v-else>
    <p>Loading data...</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      books: [],
      pageSize: 5,
      currentPage: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.books.length / this.pageSize);
    },
    pagedBooks() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.books.slice(startIndex, endIndex);
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://localhost:8080/books');
        this.books = await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>
