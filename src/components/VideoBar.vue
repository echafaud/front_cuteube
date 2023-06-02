<template>
    <v-list-item class="w-100">
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
                <subscribe-button v-if="author.username!==username" :id="video.author"
                                  :is-subscriber="author.isSubscribed"></subscribe-button>
            </v-col>
        </v-row>

        <template v-slot:append>

            <div class="justify-self-end">
                <like :video="video"
                      @clickLike="likeHandler"></like>
                <dislike :video="video"
                         @clickDislike="dislikeHandler"></dislike>
            </div>
        </template>
    </v-list-item>
</template>

<script>
import SubscribeButton from "@/components/SubscribeButton.vue";
import {mapState} from "vuex";
import Like from "@/components/Like.vue";
import Dislike from "@/components/Dislike.vue";

export default {
    components: {Dislike, Like, SubscribeButton},
    props: {
        video: null,
    },
    computed: {
        ...mapState({
            username: state => state.authUser.user.username
        })
    },
    data() {
        return {
            author: {
                username: '',
                subscribers: 0,
                isSubscribed: false

            },
        }
    },
    methods: {
        async getUser() {
            this.$errorHandler(async () => {
                return await this.$api.user.getUser({
                    id: this.video.author
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.author.username = value.username
                    this.author.subscribers = value.count_subscribers
                    this.author.isSubscribed = value.is_subscribed
                    console.log('success')
                }
            })
        },
        likeHandler(rate) {
            if (rate) {
                if (this.video.like === false) {
                    this.video.dislikes -= 1
                }
                this.video.like = rate
                this.video.likes += 1
            } else {
                this.video.like = null
                this.video.likes -= 1
            }
        },
        dislikeHandler(rate) {
            if (rate) {
                if (this.video.like) {
                    this.video.likes -= 1
                }
                this.video.like = !rate
                this.video.dislikes += 1
            } else {
                this.video.like = null
                this.video.dislikes -= 1
            }
        }
    },
    mounted() {
        this.getUser()
    }
}
</script>
