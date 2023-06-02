<template>
    <v-menu v-if="!userActive"
            :location="location"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                    v-bind="props"
            >
                Подписаться
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="text-h5">
                Хотите подписаться на этот канал?
            </v-card-title>
            <v-card-text>Тогда войдите в аккаунт.
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="success"
                        variant="outlined"
                        @click="this.$router.push('/login')">
                    Войти
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
    <v-container v-else>
        <v-btn v-if="!isSubscribe"
               @click="subscribe">
            Подписаться
        </v-btn>
        <v-btn v-else
               @click="unsubscribe">
            Отписаться
        </v-btn>
    </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
    computed: {
        ...mapState({
            userActive: state => state.authUser.user.isActive
        }),
    },
    props: {
        id: String,
        isSubscriber: Boolean
    },
    data() {
        return {
            location: 'bottom',
            isSubscribe: this.isSubscribe
        }
    },
    methods: {
        async subscribe() {
            this.$errorHandler(async () => {
                return await this.$api.user.subscribe({
                    id: this.id
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.isSubscribe = true
                    console.log('success')
                }
            })
        },
        async unsubscribe() {
            this.$errorHandler(async () => {
                return await this.$api.user.unsubscribe({
                    id: this.id
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.isSubscribe = false
                    console.log('success')
                }
            })
        }
    }
}
</script>
