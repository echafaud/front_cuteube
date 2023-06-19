<template>
    <v-list v-if="videos" bg-color="transparent" lines="false" class="pt-0">
        <mini-video v-for="video in videos"
                    :video="video"
                    :key="video.id"
        ></mini-video>

    </v-list>
</template>

<script>
import MiniVideo from "@/components/MiniVideo.vue";
import errorHandler from "@/functions/errorHandler";
import {api} from "@/api/api";
import {mapState} from "vuex";

export default {
    components: {MiniVideo},
    computed: {
        ...mapState({
            videoId: state => state.video.video.id,
        })
    },
    data() {
        return {
            videos: null,
            limit: 50
        }
    },
    methods: {
        async fetchVideos() {
            this.$errorHandler(async () => {
                return await this.$api.video.getLatestVideos({limit: this.limit, pagination: 0})
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.videos = value.filter(miniVideo => miniVideo.id !== this.videoId)
                    console.log('success')
                }
            })
        },
    },
    mounted() {
        this.fetchVideos()
    }
}
</script>