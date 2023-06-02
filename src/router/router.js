import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Main from "@/views/Main.vue";
import Video from "@/views/Video.vue";
import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {path: '/', component: Main},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/video/:id', component: Video},
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;