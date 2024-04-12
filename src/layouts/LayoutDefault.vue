<script setup>

</script>

<template>
  <header class="LayoutDefault__header">
    <h1>Admin Panel</h1>
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/books">Books</router-link>
      <router-link to="/users">Users</router-link>
      <router-link to="/authors">Authors</router-link>
    </div>
  </header>
  <main class="LayoutDefault__main">
    <slot/>
  </main>
  <footer class="LayoutDefault__footer">
    <p>&copy; Jakub Cebula & Jakub Kozanecki</p>
  </footer>
</template>

<style scoped>

</style>