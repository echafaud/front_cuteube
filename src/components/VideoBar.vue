<template>
    <v-col cols="12">
        <v-list-item class="w-100 pa-0">
            <template v-slot:prepend>
                <v-avatar
                        color="#757575"
                >
                    <v-icon icon="mdi-account-circle"></v-icon>
                </v-avatar>
            </template>
            <v-row>
                <v-col cols="auto">
                    <v-list-item-title>{{ author.username }}</v-list-item-title>

                    <v-list-item-subtitle>Подписчиков: {{ author.subscribers }}</v-list-item-subtitle>
                </v-col>
                <v-col cols="auto">
                    <subscribe-button v-if="author.id!==user.id" :author="author"></subscribe-button>
                </v-col>
            </v-row>

            <template v-slot:append>

                <div class="justify-self-end">
                    <like color="success" icon="mdi-thumb-up" :status="true"></like>
                    <like color="error" icon="mdi-thumb-down" :status="false"></like>
                </div>
                <v-menu v-if="user.id===author.id || user.isSuperUser">
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                    </template>
                    <v-list class="pa-0">
                        <v-list-item
                                prepend-icon="mdi-delete"
                                @click="removeComment">Удалить
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </v-list-item>
    </v-col>

</template>

<script>
import SubscribeButton from "@/components/SubscribeButton.vue";
import {mapState} from "vuex";
import Like from "@/components/Like.vue";
import Dislike from "@/components/Dislike.vue";

export default {
    components: {Dislike, Like, SubscribeButton},
    computed: {
        ...mapState({
            user: state => state.authUser.user,
            author: state => state.video.author,
            videoId: state => state.video.video.id,
        })
    },
    methods: {
        removeComment() {
            if (this.user.isSuperUser) {
                this.$errorHandler(async () => {
                    return await this.$api.video.adminRemoveVideo({id: this.videoId})
                }).then(value => {
                    if (value && value.code) {
                        console.log('error')
                    } else {
                        console.log('success')
                    }
                    this.$router.push('/')
                })
            } else {
                this.$errorHandler(async () => {
                    return await this.$api.video.removeVideo({id: this.videoId})
                }).then(value => {
                    if (value && value.code) {
                        console.log('error')
                    } else {
                        console.log('success')
                    }
                    this.$router.push('/')
                })
            }

        },
    }
}
</script>
