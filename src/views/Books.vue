<script setup>
import {computed, defineProps, onMounted, ref} from "vue";

const { books, pageSize, currentPage } = defineProps({

  books: function (){computed(() => this.fetchData())},
  pageSize: Number,
  currentPage: Number,
  pagedBooks:
      function() {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return books.slice(startIndex, endIndex);
      },
  totalPages:
      function() {
        return Math.ceil(books.length / pageSize);
      },
  fetchData:
      async function () {
        try {
          const response = await fetch('http://localhost:8080/api/books');
          return await response.json();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
});

// const books = computed(() => fetchData())





function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

onMounted(() => fetchData());

</script>

<template>
  <div class="books">
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
</template>

<style scoped>
/* Add your scoped styles here */
</style>
