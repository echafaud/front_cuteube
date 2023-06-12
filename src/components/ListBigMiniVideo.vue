<template>
    <v-list v-if="videos" bg-color="transparent" lines="false" class="d-flex pt-0">
        <v-col cols="2" v-for="video in videos" class="pa-2">
            <big-mini-video
                    :video="video"
                    :key="video.id"
            ></big-mini-video>
        </v-col>
    </v-list>
</template>

<script>
import BigMiniVideo from "@/components/BigMiniVideo.vue";

export default {
    components: {BigMiniVideo},
    props: {
        videos: Array
    },

    // mounted() {
    //     this.fetchLatestVideos()
    // }
}
</script>