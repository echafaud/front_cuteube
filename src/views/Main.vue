<template>
    <v-row>
        <v-col cols="12">
            <main-bar v-model="currentTab" :items="barItems"></main-bar>
        </v-col>
        <v-row>
            <v-col cols="12">
                <list-big-mini-video v-if="currentTab" :videos="videos"></list-big-mini-video>
            </v-col>
        </v-row>
    </v-row>
</template>

<script>
import {defineComponent} from "vue";
import ListMiniVideo from "@/components/ListMiniVideo.vue";
import BigMiniVideo from "@/components/BigMiniVideo.vue";
import ListBigMiniVideo from "@/components/ListBigMiniVideo.vue";
import MainBar from "@/components/MainBar.vue";

export default defineComponent({
    components: {MainBar, ListBigMiniVideo, BigMiniVideo, ListMiniVideo},
    data() {
        return {
            currentTab: null,
            videos: null,
            barItems: [
                {text: "Популярное", value: 1},
                {text: "Недавнее", value: 2},
                {text: "Понравившиеся пользователям", value: 3}
            ],
            limit: 50
        }
    },
    watch: {
        currentTab(newValue) {
            if (this.currentTab[0] === 1) {
                this.fetchPopularVideos()
            } else if (this.currentTab[0] === 2) {
                this.fetchLatestVideos()
            } else {
                this.fetchLikedByUsersVideos()
            }
        }
    },
    methods: {
        async fetchLatestVideos() {
            await this.$errorHandler(async () => {
                return await this.$api.video.getLatestVideos({limit: this.limit, pagination: 0})
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
                return await this.$api.video.getPopularVideos({limit: this.limit, pagination: 0})
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.videos = value
                    console.log('success')
                }
            })
        },
        async fetchLikedByUsersVideos() {
            await this.$errorHandler(async () => {
                return await this.$api.video.getLikedByUsersVideos({limit: this.limit, pagination: 0})
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
    mounted() {
        this.currentTab = [1]
    }
})
</script>