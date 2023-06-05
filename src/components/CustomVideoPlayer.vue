<template>
    <v-row>
        <v-col cols="12">
            <video-player
                    class="video-js vjs-16-9"
                    :sources="videoOptions.sources"
                    @mounted="handleMounted"
                    @play="handlePlayEvent($event)"
                    @pause="handlePauseEvent($event)"
                    controls/>
        </v-col>
    </v-row>
</template>

<script>

import {VideoPlayer} from "@videojs-player/vue";
import 'video.js/dist/video-js.css'
import {mapState} from "vuex";

export default {
    name: 'CustomVideoPlayer',
    components: {VideoPlayer},
    props: {
        videoOptions: null
    },
    computed: {
        ...mapState({
            video: state => state.video.video
        })
    },
    data() {
        return {
            stopWatch: {
                timeBegan: null,
                timeStopped: null,
                stoppedDuration: 0,
                started: null,
                running: false,
                currentTime: null
            },
            player: null
        }
    },
    mounted() {
    },
    methods: {
        startStopWatch() {
            if (this.stopWatch.running) return

            if (this.stopWatch.timeBegan === null) {
                this.resetStopWatch()
                this.stopWatch.timeBegan = new Date()
            }
            if (this.stopWatch.timeStopped !== null) {
                this.stopWatch.stoppedDuration += (new Date() - this.stopWatch.timeStopped);
            }

            this.stopWatch.started = setInterval(this.clockRunning, 10);
            this.stopWatch.running = true;
        },
        stopStopWatch() {
            this.stopWatch.running = false;
            this.stopWatch.timeStopped = new Date();
            clearInterval(this.stopWatch.started);
        },
        resetStopWatch() {
            this.stopWatch.running = false;
            clearInterval(this.stopWatch.started)
            this.stopWatch.stoppedDuration = 0
            this.stopWatch.timeBegan = null
            this.stopWatch.timeStopped = null
        },
        clockRunning() {
            const timeElapsed = new Date(new Date() - this.stopWatch.timeBegan - this.stopWatch.stoppedDuration)
            this.stopWatch.currentTime = timeElapsed.getTime() / 1000
        },
        handlePlayEvent(event) {
            this.startStopWatch()
        },
        handlePauseEvent(event) {
            this.stopStopWatch()
            console.log(this.stopWatch)
        },
        handleMounted(payload) {
            this.player = payload
            this.player.player.currentTime(this.video.stopTimecode)
        }
    }

}
</script>