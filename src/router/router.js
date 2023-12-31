import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Main from "@/views/Main.vue";
import Video from "@/views/Video.vue";
import {createRouter, createWebHistory} from "vue-router";
import Profile from "@/views/Profile.vue";
import Verify from "@/views/Verify.vue";
import ViewedVideos from "@/views/ViewedVideos.vue";
import SubscribedUserVideos from "@/views/SubscribedUserVideos.vue";
import LikedVideos from "@/views/LikedVideos.vue";


const routes = [
    {path: '/', component: Main},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/video/:id', component: Video},
    {path: '/user/:id', component: Profile},
    {path: '/verify/:id/:token', component: Verify},
    {path: '/history', component: ViewedVideos},
    {path: '/liked', component: LikedVideos},
    {path: '/subscribed', component: SubscribedUserVideos},
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;