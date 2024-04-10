<script setup>
import {computed, ref, watch} from 'vue'
import { useRoute } from 'vue-router'
import { getBooks } from './booksFetch.js'

const route = useRoute()

const loading = ref(false)
const post = ref(null)
const error = ref(null)
const currentPage = ref(1)
const pageSize = ref(5)


// watch the params of the route to fetch the data again
watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id) {
  error.value = post.value = null
  loading.value = true

  try {
    // replace `getPost` with your data fetching util / API wrapper
    const res = await getBooks(id)
    console.log(res)
    post.value = res
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

const pagedBooks = computed(() => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return post.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(post.value.length / pageSize);
});

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
