<template>
  <div class="users spa" v-if="pagedUsers.length">
    <h1>Users</h1>
    <table>
      <thead>
      <tr>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in pagedUsers" :key="user.userId">
        <td>{{ user.userId }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td><button @click="modifying=true; modifiedUser=user">Update</button></td>
        <td><button @click="deleteUser(user.userId)">Delete</button></td>
      </tr>
      </tbody>
    </table>
    <div class="option-buttons">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      <button @click="creating=!creating">Add new user</button>
    </div>
  </div>
  <div v-if="creating">
    <h1>Add New User</h1>
    <form @submit.prevent="addUser">
      <label for="title">First Name:</label>
      <input type="text" id="title" v-model="newUser.firstName" required>
      <br>
      <label for="pages">Last Name:</label>
      <input type="text" id="pages" v-model="newUser.lastName" required>
      <button type="submit">Add User</button>
    </form>
  </div>
  <div v-if="modifying">
    <h1>Modify User</h1>
    <form @submit.prevent="updateUser">
      <label for="title">First Name:</label>
      <input type="text" id="title" v-model="modifiedUser.firstName" required>
      <br>
      <label for="pages">Last Name:</label>
      <input type="text" id="pages" v-model="modifiedUser.lastName" required>
      <br>
      <button type="submit">Modify user</button>
    </form>
  </div>
</template>
<script>
import LayoutDefault from "@/layouts/LayoutDefault.vue";

export default {
  data() {
    return {
      users: [],
      pageSize: 5,
      currentPage: 1,
      creating: false,
      modifying:false,
      newUser: {
        userId: '',
        firstName: null,
        lastName: null
      },
      modifiedUser :{
        userId: '',
        firstName: null,
        lastName: null
      }
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.pageSize);
    },
    pagedUsers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.users.slice(startIndex, endIndex);
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://localhost:8080/users');
        this.users = await response.json();
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
    async addUser() {
      try {
        console.log(this.newUser);
        this.creating = false;
        const response = await fetch('http://localhost:8080/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newUser)
        });
        if (response.ok) {
          // user added successfully
          console.log('New user added successfully');
          // Reset the form fields
          this.newUser = {
            userId: '',
            firstName: null,
            lastName: null
          };
          await this.fetchData();
        } else {
          // Error handling if the request fails
          console.error('Failed to add new user');
        }
      } catch (error) {
        console.error('Error adding new user:', error);
      }
    },
    async updateUser(){
      try {
        console.log(this.modifiedUser);
        this.modifying = false;
        const response = await fetch('http://localhost:8080/users/'+this.modifiedUser.userId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"userId": this.modifiedUser.userId, "firstName": this.modifiedUser.firstName, "lastName": this.modifiedUser.lastName})
        });
        if (response.ok) {
          // user added successfully
          console.log('user modified successfully');
          // Reset the form fields
          this.modifiedUser = {
            userId: '',
            firstName: null,
            lastName: null
          };
          await this.fetchData()
        } else {
          // Error handling if the request fails
          console.error('Failed to modify user');
        }
      } catch (error) {
        console.error('Error modifying user:', error);
      }
    },
    async deleteUser(userId){
      try {
        console.log(userId);
        const response = await fetch('http://localhost:8080/users/'+userId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
          // body: JSON.stringify(this.modifieduser)
        });
        if (response.ok) {
          // user added successfully
          console.log('user deleted successfully');
          await this.fetchData()
          // Reset the form fields
        } else {
          // Error handling if the request fails
          console.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }

  },
  mounted() {
    this.fetchData();
  },
  name: 'Users',
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
