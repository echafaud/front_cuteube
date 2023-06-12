<template>
    <v-row class="h-100">
        <v-col cols="12">
            <main-bar v-model="currentTab"></main-bar>
            <list-big-mini-video v-if="currentTab" :videos="videos"></list-big-mini-video>
        </v-col>
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
            videos: null
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
                return await this.$api.video.getLatestVideos({limit: 10, pagination: 0})
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
                return await this.$api.video.getPopularVideos({limit: 10, pagination: 0})
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
                return await this.$api.video.getLikedByUsersVideos({limit: 10, pagination: 0})
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