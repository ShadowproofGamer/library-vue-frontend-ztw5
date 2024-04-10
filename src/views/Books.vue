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
    <button @click="creating=!creating" v-if="!creating">Dodaj nową książkę</button>
    <div v-if="creating">

      <h1>Add New Book</h1>
      <form @submit.prevent="addBook">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="newBook.title" required>
        <br>
        <label for="pages">Pages:</label>
        <input type="number" id="pages" v-model.number="newBook.pages" required>
        <br>
        <label for="authorId">Author ID:</label>
        <input type="number" id="authorId" v-model.number="newBook.authorId" required>
        <br>
        <button type="submit">Add Book</button>
      </form>
    </div>
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
      currentPage: 1,
      creating: false,
      newBook: {
        title: '',
        pages: null,
        authorId: null
      }
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
    },
    async addBook() {
      try {
        this.creating = false;
        const response = await fetch('http://localhost:8080/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newBook.value)
        });
        if (response.ok) {
          // Book added successfully
          console.log('New book added successfully');
          // Reset the form fields
          this.newBook.value = {
            title: '',
            pages: null,
            authorId: null
          };
        } else {
          // Error handling if the request fails
          console.error('Failed to add new book');
        }
      } catch (error) {
        console.error('Error adding new book:', error);
      }
    },
    //   addNew(text, pages, authorId) {
    //     // Example POST method implementation:
    //     async function postData(url = "http://localhost:8080/books", data = {text, pages, authorId}) {
    //       // Default options are marked with *
    //       const response = await fetch(url, {
    //         method: "POST", // *GET, POST, PUT, DELETE, etc.
    //         mode: "cors", // no-cors, *cors, same-origin
    //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: "same-origin", // include, *same-origin, omit
    //         headers: {
    //           "Content-Type": "application/json",
    //           // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         redirect: "follow", // manual, *follow, error
    //         referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //         body: JSON.stringify(data), // body data type must match "Content-Type" header
    //       });
    //       return response.json(); // parses JSON response into native JavaScript objects
    //     }
    //
    //     postData("http://localhost:8080/books", {text: text, pages: pages, authorId: authorId}).then((data) => {
    //       console.log(data); // JSON data parsed by `data.json()` call
    //     });
    //   }
    // },
  },
  mounted() {
    this.fetchData();
  }
}

</script>

<style scoped>
/* Add your scoped styles here */
</style>
