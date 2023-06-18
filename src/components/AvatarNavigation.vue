<template>
    <div>
        <v-menu v-if="user.isActive"
                class="mr-4"
                min-width="200px"
                rounded
        >
            <template v-slot:activator="{ props }">
                <div></div>
                <v-btn
                        icon
                        v-bind="props"
                >
                    <v-avatar
                            color="#757575"
                            size="large"
                    >
                        <v-icon icon="mdi-account-circle"></v-icon>
                    </v-avatar>
                </v-btn>
            </template>
            <v-card>
                <v-card-text>
                    <div class="mx-auto text-center">
                        <v-avatar
                                color="#757575"
                        >
                            <v-icon icon="mdi-account-circle"></v-icon>
                        </v-avatar>
                        <v-divider class="my-3"></v-divider>
                        <v-btn
                                variant="text"
                                @click="$router.push({ path: `/user/${user.id}` })"
                        >
                            Мой аккаунт
                        </v-btn>
                        <v-divider class="my-3"></v-divider>
                        <v-btn
                                color="error"
                                variant="text"
                                @click="logout"
                        >
                            Выйти
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-menu>
        <v-btn v-else
               class="mr-4"
               color="success"
               variant="outlined"
               prepend-icon="mdi-login"
               @click="this.$router.push('/login')">
            Войти
        </v-btn>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    computed: {
        ...mapState({
            user: state => state.authUser.user
        })
    },
    methods: {
        ...mapActions({
            userLogout: 'authUser/userLogout'
        }),
        logout() {
            this.userLogout().then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.$router.push('/login').then(() => {
                        this.$router.go()
                    })
                }
            })
            // this.$errorHandler(async () => {
            //     return await this.$api.auth.logout()
            // }).then(value => {
            //     if (value && value.code) {
            //         console.log('error')
            //     } else {
            //         this.$router.push('/login').then(() => {
            //             this.$router.go()
            //         })
            //         this.userLogout()
            //     }
            // })
        },

    }

}
</script>

<style lang="scss" scoped>

</style>