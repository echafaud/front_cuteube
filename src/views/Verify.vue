<template>
    <v-card :loading="loading">
        <v-card-title>
            Подтверждение почты
        </v-card-title>
        <v-card-text>
            Подождите идет подтверждение почты...
        </v-card-text>
        <v-card-actions>
            <v-btn
                    :disabled="disabled"
                    @click="sendEmail">
                Отправить письмо заново
            </v-btn>
        </v-card-actions>
    </v-card>
    <v-snackbar :color="snackbarColor" location="top" v-model="snackbar">
        {{ snackbarText }}
    </v-snackbar>
</template>

<script>
import {mapActions} from "vuex";

export default {
    data() {
        return {
            loading: true,
            disabled: true,
            snackbar: false,
            snackbarColor: null,
            snackbarText: null,
        }
    },
    methods: {
        ...mapActions({
            userVerify: 'authUser/verify'
        }),
        sendEmail() {
            this.disabled = true
            this.updateVerify()
        },
        async verify() {
            this.userVerify({
                id: this.$route.params.id,
                token: this.$route.params.token
            }).then(value => {
                if (value && value.code) {
                    this.disabled = false
                    this.loading = false
                    this.snackbarText = "Во время верификации произошла ошибка, обновите страницу или запросите новое письмо"
                    this.snackbarColor = 'red'
                } else {
                    this.loading = false
                    this.snackbarText = "Поздравляем! Вы прошли верификацию!"
                    this.snackbarColor = 'green'
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 3000)
                }
                this.snackbar = true
            })
        },
        async updateVerify() {
            this.$errorHandler(async () => {
                return await this.$api.auth.updateVerify({
                    id: this.$route.params.id
                })
            }).then(value => {
                if (value && value.code) {
                    this.disabled = false
                    this.loading = false
                    this.snackbarText = "Во время отправки письма произошла ошибка - запросите новое письмо"
                    this.snackbarColor = 'red'
                } else {
                    this.loading = false
                    this.snackbarText = "Письмо было отправлено Вам на почту"
                    this.snackbarColor = 'green'
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 3000)
                }
                this.snackbar = true
            })
        }
    },
    mounted() {
        this.verify()
    }
}
</script>
