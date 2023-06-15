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

export default {
    components: {MainBar, ListBigMiniVideo},
    data() {
        return {
            videos: null,
        }
    },
    methods: {
        async fetchViewedVideos() {
            await this.$errorHandler(async () => {
                return await this.$api.video.getViewedVideos({limit: 10, pagination: 0})
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
}
</script>

<style lang="scss" scoped>

</style>