<template>

  <component :is="layout">
    <router-view :layout.sync="layout"/>
  </component>


</template>
<script>
import LayoutDefault from "@/layouts/LayoutDefault.vue";

export default {
  name: 'App',
  data() {
    return {
      layout: LayoutDefault,
    };
  },
};
</script>

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
  footer {
    //display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  footer .wrapper {
    display: flex;
    place-items: flex-end;
    flex-wrap: wrap;
  }
}


</style>
