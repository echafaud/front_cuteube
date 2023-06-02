<template>
    <v-card-title class="text-h5">{{ video.title }}</v-card-title>
    <video-bar :video="video"></video-bar>

    <v-col>
        <v-card>
            <v-card-subtitle>Просмотров: {{ video.views }}</v-card-subtitle>
            <v-card-text>{{ video.description }}</v-card-text>
        </v-card>
    </v-col>
</template>

<script>
import SubscribeButton from "@/components/SubscribeButton.vue";
import {mapState} from "vuex";
import VideoBar from "@/components/VideoBar.vue";

export default {
    components: {VideoBar, SubscribeButton},
    props: {
        video: null,
    },
}
</script>
