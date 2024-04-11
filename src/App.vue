<script setup>

</script>

<template>
    <header>
<!--      <div id="nav">-->
<!--        -->
<!--      </div>-->
      <h1>Admin Panel</h1>
      <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/books">Books</router-link>
        <router-link to="/users">Users</router-link>
        <router-link to="/authors">Authors</router-link>
      </div>
    </header>

  <router-view></router-view>
    <footer>
      <p>Made by Jakub Cebula & Jakub Kozanecki</p>
    </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    //display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
