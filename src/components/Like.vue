<template>
    <login-modal v-if="!userActive" :text="status ? 'Понравилось видео?':'Не понравилось видео?'" variant="plain"
                 :icon="icon"></login-modal>
    <v-btn v-else :icon="icon" variant="text" @click="rate">
        <template v-slot>
            <v-icon :color="likeColor"></v-icon>
        </template>
    </v-btn>
    <span>{{ status ? video.likes : video.dislikes }}</span>
</template>

<script>

import LoginModal from "@/components/LoginModal.vue";
import {mapActions, mapState} from "vuex";

export default {
    components: {LoginModal},
    props: {
        status: Boolean,
        color: String,
        icon: String
    },
    methods: {
        ...mapActions({
            putRating: "video/rate"
        }),
        rate() {
            const status = this.video.like !== this.status ? this.status : null
            this.putRating({status: status, video_id: this.video.id})
        },
    },
    computed: {
        likeColor() {
            return this.video.like === this.status ? this.color : "grey-lighten-2"
        },
        ...mapState({
            userActive: state => state.authUser.user.isActive,
            video: state => state.video.video
        }),
    }
}
</script>
