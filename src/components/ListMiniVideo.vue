<template>
    <v-list v-if="ready" bg-color="transparent" lines="false" class="pt-0">
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

export default {
    components: {MiniVideo},
    data() {
        return {
            videos: null,
            ready: false
        }
    },
    methods: {
        async fetchVideos() {
            this.$errorHandler(async () => {
                return await this.$api.video.getLatestVideos({limit: 10})
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.videos=value
                    this.ready = true
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

<style lang="scss" scoped>

</style>