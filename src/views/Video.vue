<template>
    <v-row>
        <v-col v-if="ready" cols="9">
            <custom-video-player :video-options="videoOptions" :video="video"></custom-video-player>
            <!--            <video-player v-if="play" :options="videoOptions"/>-->
            <video-below-content v-if="video.author" :video="video"></video-below-content>

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

export default {
    name: 'VideoExample',
    components: {VideoBelowContent, CustomVideoPlayer},
    data() {
        return {
            video: {
                id: this.$route.params.id,
                title: '',
                description: '',
                author: '',
                likes: 0,
                dislikes: 0,
                views: 0,
                like: null,
                stop_timecode: null,
            },
            ready: false,
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
    methods: {
        async getVideoLink() {
            this.$errorHandler(async () => {
                return await this.$api.video.getVideoLink({
                    id: this.video.id
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.videoOptions.sources[0].src = value
                    this.ready = true
                    console.log('success')
                }
            })
        },
        async getVideo() {
            this.$errorHandler(async () => {
                return await this.$api.video.getVideo({
                    id: this.video.id
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.video = value
                    console.log('success')
                }
            })
        },
    },

    mounted() {
        this.getVideo()
        this.getVideoLink()
    }
};
</script>