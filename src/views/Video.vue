<template>
    <v-row v-if="currentLink && !loading">
        <v-col cols="9">

            <custom-video-player v-if="videoOptions.sources[0].src" :video-options="videoOptions"
                                 :previewLink="currentPreviewLink"></custom-video-player>
            <!--            <video-player v-if="play" :options="videoOptions"/>-->
            <video-below-content></video-below-content>
        </v-col>
        <v-col cols="3">
            <list-mini-video></list-mini-video>
        </v-col>
    </v-row>


</template>

<script>
// import VideoPlayer from '@/components/CustomVideoPlayer.vue';
import {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import {mapActions, mapState} from "vuex";
import SubscribeButton from "@/components/SubscribeButton.vue";
import CustomVideoPlayer from "@/components/CustomVideoPlayer.vue";
import VideoBelowContent from "@/components/VideoBelowContent.vue";
import MiniVideo from "@/components/MiniVideo.vue";
import ListMiniVideo from "@/components/ListMiniVideo.vue";

export default {
    components: {ListMiniVideo, MiniVideo, VideoBelowContent, CustomVideoPlayer},

    data() {
        return {
            loading: true,
            videoOptions: {
                sources: [
                    {
                        src: '',
                        type: 'video/mp4'
                    }
                ]
            },
        };
    },
    computed: {
        ...mapState({
            currentLink: state => state.video.video.link,
            currentPreviewLink: state => state.video.video.previewLink
        })
    },
    methods: {
        ...mapActions({
            fetchVideo: "video/fetchVideo",
            fetchVideoLink: "video/fetchLink",
            fetchPreviewLink: "video/fetchPreviewLink"
        }),
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => {
                this.loading = true
                this.fetchVideo({
                    id: this.$route.params.id
                }).then(value => {
                    if (value && value.code) {
                        console.log('error')
                    }
                })
                this.fetchVideoLink({
                    id: this.$route.params.id
                }).then(value => {
                    if (value && value.code) {
                        console.log('error')
                    } else {
                        this.videoOptions.sources[0].src = this.currentLink
                    }
                })
                this.fetchPreviewLink({
                    id: this.$route.params.id
                }).then(value => {
                    if (value && value.code) {
                        console.log('error')
                    } else {
                        this.loading = false
                    }
                })
            }, {immediate: true})
    },
}
</script>