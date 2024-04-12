<template>
  <div class="authors spa" v-if="pagedAuthors.length">
    <h1>Authors</h1>
    <table>
      <thead>
      <tr>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="author in pagedAuthors" :key="author.id">
        <td>{{ author.authorId }}</td>
        <td>{{ author.firstName }}</td>
        <td>{{ author.lastName }}</td>
        <td><button @click="modifying=true; modifiedAuthor=author">Update</button></td>
        <td><button @click="deleteAuthor(author.id)">Delete</button></td>
      </tr>
      </tbody>
    </table>
    <div class="option-buttons">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      <button @click="creating=!creating">Add new author</button>
    </div>
  </div>
  <div v-if="creating">
    <h1>Add New Author</h1>
    <form @submit.prevent="addAuthor">
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" v-model="newAuthor.firstName" required>
      <br>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model="newAuthor.lastName" required>
      <button type="submit">Add Author</button>
    </form>
  </div>
  <div v-if="modifying">
    <h1>Modify Author</h1>
    <form @submit.prevent="updateAuthor">
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" v-model="modifiedAuthor.firstName" required>
      <br>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model="modifiedAuthor.lastName" required>
      <br>
      <button type="submit">Modify author</button>
    </form>
  </div>
</template>
<script>
import LayoutDefault from "@/layouts/LayoutDefault.vue";

export default {
  data() {
    return {
      authors: [],
      pageSize: 5,
      currentPage: 1,
      creating: false,
      modifying:false,
      newAuthor: {
        firstName: null,
        lastName: null
      },
      modifiedAuthor :{
        firstName: null,
        lastName: null
      }
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.authors.length / this.pageSize);
    },
    pagedAuthors() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.authors.slice(startIndex, endIndex);
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://localhost:8080/authors');
        this.authors = await response.json();
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
    async addAuthor() {
      try {
        console.log(this.newAuthor);
        this.creating = false;
        const response = await fetch('http://localhost:8080/authors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newAuthor)
        });
        if (response.ok) {
          // author added successfully
          console.log('New author added successfully');
          // Reset the form fields
          this.newAuthor = {
            firstName: null,
            lastName: null
          };
          await this.fetchData();
        } else {
          // Error handling if the request fails
          console.error('Failed to add new author');
        }
      } catch (error) {
        console.error('Error adding new author:', error);
      }
    },
    async updateAuthor(){
      try {
        console.log(this.modifiedAuthor);
        this.modifying = false;
        const response = await fetch('http://localhost:8080/authors/'+this.modifiedAuthor.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"authorId": this.modifiedAuthor.authorId, "firstName": this.modifiedAuthor.firstName, "lastName": this.modifiedAuthor.lastName})
        });
        if (response.ok) {
          // author added successfully
          console.log('author modified successfully');
          // Reset the form fields
          this.modifiedAuthor = {
            authorId: '',
            firstName: null,
            lastName: null
          };
          await this.fetchData()
        } else {
          // Error handling if the request fails
          console.error('Failed to modify author');
        }
      } catch (error) {
        console.error('Error modifying author:', error);
      }
    },
    async deleteAuthor(authorId){
      try {
        console.log(authorId);
        const response = await fetch('http://localhost:8080/authors/'+authorId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
          // body: JSON.stringify(this.modifiedauthor)
        });
        if (response.ok) {
          // author added successfully
          console.log('author deleted successfully');
          await this.fetchData()
          // Reset the form fields
        } else {
          // Error handling if the request fails
          console.error('Failed to delete author');
        }
      } catch (error) {
        console.error('Error deleting author:', error);
      }
    }

  },
  mounted() {
    this.fetchData();
  },
  name: 'Authors',
  created() {
    this.$emit('update:layout', LayoutDefault);
  },
}

</script>

<style scoped>
template{
  padding: 3rem;
}
.option-buttons{
  display: flex;
  place-items: center;
}
</style>
