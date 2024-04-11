import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/views/Home.vue";
import Books from "@/views/Books.vue";
import Authors from "@/views/Authors.vue";
import Users from "@/views/Users.vue";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/books', name: 'Books', component: Books},
    {path: '/authors', name: 'Authors', component: Authors},
    {path: '/users', name: 'Users', component: Users}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;