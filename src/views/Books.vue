<template>
  <div class="books spa" v-if="pagedBooks.length">
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
        <td><button @click="modifying=true; modifiedBook=book">Update</button></td>
        <td><button @click="deleteBook(book.bookId)">Delete</button></td>
      </tr>
      </tbody>
    </table>
    <div class="option-buttons">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      <button @click="creating=!creating">Add new Book</button>
    </div>
  </div>
  <div v-else>
    <p>Loading data...</p>
  </div>
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
  <div v-if="modifying">
    <h1>Add New Book</h1>
    <form @submit.prevent="updateBook">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="modifiedBook.title" required>
      <br>
      <label for="pages">Pages:</label>
      <input type="number" id="pages" v-model.number="modifiedBook.pages" required>
      <br>
      <button type="submit">Modify Book</button>
    </form>
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
      modifying:false,
      newBook: {
        title: '',
        pages: null,
        authorId: null
      },
      modifiedBook :{
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
        console.log(this.newBook);
        this.creating = false;
        const response = await fetch('http://localhost:8080/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newBook)
        });
        if (response.ok) {
          // Book added successfully
          console.log('New book added successfully');
          // Reset the form fields
          this.newBook = {
            userId: '',
            firstName: null,
            lastName: null
          };
          await this.fetchData();
        } else {
          // Error handling if the request fails
          console.error('Failed to add new book');
        }
      } catch (error) {
        console.error('Error adding new book:', error);
      }
    },
    async updateBook(){
      try {
        console.log(this.modifiedBook);
        this.modifying = false;
        const response = await fetch('http://localhost:8080/books/'+this.modifiedBook.bookId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"title": this.modifiedBook.title, "pages": this.modifiedBook.pages, "authorId": this.modifiedBook.authorId})
        });
        if (response.ok) {
          // Book added successfully
          console.log('book modified successfully');
          // Reset the form fields
          this.modifiedBook = {
            userId: '',
            firstName: null,
            lastName: null
          };
          await this.fetchData()
        } else {
          // Error handling if the request fails
          console.error('Failed to modify book');
        }
      } catch (error) {
        console.error('Error modifying book:', error);
      }
    },
    async deleteBook(bookId){
      try {
        console.log(bookId);
        const response = await fetch('http://localhost:8080/books/'+bookId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
          // body: JSON.stringify(this.modifiedBook)
        });
        if (response.ok) {
          // Book added successfully
          console.log('book deleted successfully');
          await this.fetchData()
          // Reset the form fields
        } else {
          // Error handling if the request fails
          console.error('Failed to delete book');
        }
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }

  },
  mounted() {
    this.fetchData();
  }
}

</script>

<style scoped>

.option-buttons{
  display: flex;
  place-items: center;
}
</style>
