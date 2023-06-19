<template>
    <v-container v-if="!hide">
        <v-app-bar
                prominent
        >
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>My Cuteube</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn variant="text" icon="mdi-magnify"></v-btn>

            <!--            <v-btn class="mr-4" variant="text" icon="mdi-video-plus"></v-btn>-->
            <upload-video></upload-video>
            <avatar-navigation class="pr-4"></avatar-navigation>

            <!--        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>-->
        </v-app-bar>

        <v-navigation-drawer
                location="left"
                :rail="drawer"
                permanent
        >
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-home" title="Главная" @click="this.$router.push('/')"></v-list-item>
                <!--                <v-list-item prepend-icon="mdi-account-group" title="Подписки"-->
                <!--                             @click="this.$router.push('/subscribed')"></v-list-item>-->
                <v-list-item v-if="user.id" prepend-icon="mdi-thumb-up" title="Понравившиеся"
                             @click="this.$router.push('/liked')"></v-list-item>
                <v-list-item v-if="user.id" prepend-icon="mdi-account-group" title="Подписки"
                             @click="this.$router.push('/subscribed')"></v-list-item>
                <v-list-item v-if="user.id" prepend-icon="mdi-history" title="История"
                             @click="this.$router.push('/history')"></v-list-item>

            </v-list>
        </v-navigation-drawer>
    </v-container>
</template>

<script>
import AvatarNavigation from "@/components/AvatarNavigation.vue";
import UploadVideo from "@/components/UploadVideo.vue";
import {mapState} from "vuex";

export default {
    components: {AvatarNavigation, UploadVideo},
    data() {
        return {
            drawer: true,
        }
    },
    computed: {
        ...mapState({
            user: state => state.authUser.user
        }),
        hide() {
            return this.$route.path === '/login' || this.$route.path === '/register';
        }
    }
}
</script>

<style scoped>

</style>