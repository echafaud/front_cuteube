<template>
    <v-row>
        <v-col cols="12" class="pt-0">
            <v-card-title class="text-h5 pa-0">{{ video.title }}</v-card-title>
        </v-col>
        <video-bar class="pt-0"></video-bar>
        <v-col class="pt-0" cols="12">
            <v-card>
                <v-card-subtitle>Просмотров: {{ video.views }}</v-card-subtitle>
                <v-card-text>{{ video.description }}</v-card-text>
            </v-card>
        </v-col>
        <v-col class="pt-0" cols="12">
            <comments></comments>
        </v-col>
    </v-row>
</template>

<script>
import SubscribeButton from "@/components/SubscribeButton.vue";
import {mapState} from "vuex";
import VideoBar from "@/components/VideoBar.vue";
import CommentInput from "@/components/CommentInput.vue";
import Comments from "@/components/Comments.vue";

export default {
    components: {Comments, CommentInput, VideoBar, SubscribeButton},
    computed: {
        ...mapState({
            video: state => state.video.video
        })
    },
}
</script>