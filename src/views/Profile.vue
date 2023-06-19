<template>
    <profile-header class="mb-2"></profile-header>
    <profile-bar :user="user"></profile-bar>
    <profile-tabs v-model="currentTab"></profile-tabs>
    <main-bar v-model="currentBarTab" :items="barItems"></main-bar>
    <v-row>
        <v-col cols="12" v-if="currentTab">
            <list-big-mini-video :videos="videos"></list-big-mini-video>
        </v-col>
    </v-row>
</template>

<script>
import ProfileHeader from "@/components/ProfileHeader.vue";
import ProfileBar from "@/components/ProfileBar.vue";
import ProfileTabs from "@/components/ProfileTabs.vue";
import MainBar from "@/components/MainBar.vue";
import ListBigMiniVideo from "@/components/ListBigMiniVideo.vue";

export default {
    components: {ListBigMiniVideo, MainBar, ProfileTabs, ProfileBar, ProfileHeader},
    data() {
        return {
            currentTab: null,
            currentBarTab: null,
            videos: null,
            user: null,
            barItems: [
                {text: "Популярное", value: 1},
                {text: "Недавнее", value: 2},
            ],
            limit: 50,
        }
    },
    methods: {
        async getUser() {
            this.$errorHandler(async () => {
                return await this.$api.user.getUser({
                    id: this.$route.params.id
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.user = value
                    console.log('success')
                }
            })
        },
        async fetchLatestVideos() {
            await this.$errorHandler(async () => {
                return await this.$api.video.getLatestUserVideos({id: this.$route.params.id, limit: this.limit, pagination: 0})
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.videos = value
                    console.log('success')
                }
            })
        },
        async fetchPopularVideos() {
            await this.$errorHandler(async () => {
                return await this.$api.video.getPopularUserVideos({id: this.$route.params.id, limit: this.limit, pagination: 0})
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.videos = value
                    console.log('success')
                }
            })
        },
    },
    watch: {
        currentBarTab(newValue) {
            if (this.currentBarTab[0] === 1) {
                this.fetchPopularVideos()
            } else if (this.currentBarTab[0] === 2) {
                this.fetchLatestVideos()
            }
        }
    },
    mounted() {
        this.getUser()
        this.currentBarTab = [1]

    }
}

</script>

<style lang="scss" scoped>

</style>