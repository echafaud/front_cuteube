<template>
    <login-modal v-if="!userActive" text="Хотите подписаться на этот канал?" btn-text="Подписаться" variant="elevated"></login-modal>
    <div v-else>
        <v-btn v-if="!author.isSubscribed"
               @click="subscribe">
            Подписаться
        </v-btn>
        <v-btn v-else
               @click="unsubscribe">
            Отписаться
        </v-btn>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import LoginModal from "@/components/LoginModal.vue";

export default {
    components: {LoginModal},
    computed: {
        ...mapState({
            userActive: state => state.authUser.user.isActive,
            // author: state => state.video.author
        }),
    },
    props:{
        author: null
    },
    data() {
        return {
            location: 'bottom',
        }
    },
    methods: {
        ...mapMutations({
            setSubscription: "video/setSubscription",
            setSubscribers: "video/setSubscribers"
        }),
        async subscribe() {
            this.$errorHandler(async () => {
                return await this.$api.user.subscribe({
                    id: this.author.id
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.setSubscription(true)
                    this.setSubscribers(this.author.subscribers + 1)
                    console.log('success')
                }
            })
        },
        async unsubscribe() {
            this.$errorHandler(async () => {
                return await this.$api.user.unsubscribe({
                    id: this.author.id
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.setSubscription(false)
                    this.setSubscribers(this.author.subscribers - 1)
                    console.log('success')
                }
            })
        }
    }
}
</script>
