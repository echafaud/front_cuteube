<template>
    <v-form v-model="form" @submit.prevent="formSubmit">
        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="formData.credentials.username"
                                  label="Никнейм"
                                  placeholder="Введите никнейм/e-mail"
                                  prepend-inner-icon="mdi-account"
                                  variant="solo-filled"
                                  :error-messages="v$.formData.credentials.username.$errors.map(e => e.$message)"
                                  :rules="[false]"
                                  @blur="v$.formData.credentials.username.$touch"
                    >

                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="formData.credentials.password"
                                  :type="showPassword ? 'text' : 'password'"
                                  label="Пароль"
                                  placeholder="Введите пароль"
                                  prepend-inner-icon="mdi-lock"
                                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  variant="solo-filled"
                                  :error-messages="v$.formData.credentials.password.$errors.map(e => e.$message)"
                                  :rules="[false]"
                                  @click:append-inner="showPassword = !showPassword"
                                  @blur="v$.formData.credentials.password.$touch"


                    >
                    </v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="pl-4 pr-4">
            <v-row>
                <v-col cols="12">
                    <v-btn
                            :disabled="!form"
                            :loading="loading"
                            color="success"
                            size="large"
                            type="submit"
                            variant="elevated"
                            class="w-100"
                    >
                        Войти
                    </v-btn>
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                    У Вас нет аккаунта?&nbsp;
                    <router-link class="register-link" to="/register">
                        Зарегистрироваться!
                    </router-link>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-form>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {useVuelidate} from '@vuelidate/core'
import {required, validData} from "@/functions/validators"

export default {
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            formData: {
                credentials: {
                    username: '',
                    password: '',
                }
            },
            form: false,
            showPassword: false,
            loading: false,
            badCredentials: false
        }
    },
    validations() {
        return {
            formData: {
                credentials: {
                    username: {
                        required,
                        validData: validData(!this.badCredentials, "Неверный логин или пароль"),
                    },
                    password: {
                        required,
                        validData: validData(!this.badCredentials, "Неверный логин или пароль"),
                    },
                }
            }
        }
    },
    methods: {
        ...mapActions({
            userLogin: 'authUser/userLogin'
        }),
        formSubmit() {
            this.loading = true
            this.login()
        },
        async login() {
            this.userLogin(this.formData).then(value => {
                if (value && value.code) {
                    this.badCredentials = true
                    this.loading = false
                } else {
                    this.$router.push('/')
                }
            })
            // this.$errorHandler(async () => {
            //     return await this.$api.auth.login(this.formData)
            // }).then(value => {
            //     if (value && value.code) {
            //         this.badCredentials = true
            //         this.loading = false
            //     } else {
            //         this.userLogin(value)
            //         this.$router.push('/')
            //     }
            // })
        },
    },
    watch: {
        formData: {
            handler() {
                if (this.badCredentials) {
                    this.badCredentials = false
                }
            },
            deep: true
        }
    },
}
</script>
<style>
.register-link {
    color: #2f81f7;
    text-decoration: none;
}

.register-link:hover {
    text-decoration: underline;
}
</style>