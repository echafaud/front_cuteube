<template>
    <v-container v-if="!hide">
        <v-app-bar
                prominent
        >
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>My Cuteube</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn variant="text" icon="mdi-magnify"></v-btn>

            <v-btn class="mr-4" variant="text" icon="mdi-video-plus"></v-btn>
            <avatar-navigation></avatar-navigation>

            <!--        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>-->
        </v-app-bar>

        <v-navigation-drawer
                location="left"
                :rail="drawer"
                permanent
        >
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-home" title="Главная" @click="this.$router.push('/')"></v-list-item>
                <v-list-item prepend-icon="mdi-account-group" title="Подписки"
                             @click="this.$router.push('/')"></v-list-item>
                <v-list-item prepend-icon="mdi-history" title="История" @click="this.$router.push('/')"></v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-container>
</template>

<script>
import AvatarNavigation from "@/components/AvatarNavigation.vue";

export default {
    components: {AvatarNavigation},
    data() {
        return {
            drawer: true,
        }
    },
    computed: {
        hide() {
            return this.$route.path === '/login' || this.$route.path === '/register';
        }
    }
}
</script>

<style scoped>

</style>