<template>
    <v-row>
        <v-col cols="12">
            <list-big-mini-video v-if="videos" :videos="videos"></list-big-mini-video>
        </v-col>
    </v-row>
</template>

<script>
import ListBigMiniVideo from "@/components/ListBigMiniVideo.vue";
import MainBar from "@/components/MainBar.vue";
import {mapState} from "vuex";

export default {
    components: {MainBar, ListBigMiniVideo},
    data() {
        return {
            videos: null,
            limit: 50
        }
    },
    methods: {
        async fetchLikedVideos() {
            await this.$errorHandler(async () => {
                return await this.$api.video.getLikedVideos({limit: this.limit, pagination: 0})
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
        this.fetchLikedVideos()
    }
}
</script>
