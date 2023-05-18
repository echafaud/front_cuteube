<template>
    <v-form v-model="form" @submit.prevent="formSubmit">
        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="formData.userCreate.name"
                                  label="Имя"
                                  placeholder="Введите имя"
                                  prepend-inner-icon="mdi-card-account-details"
                                  variant="solo-filled"
                                  :error-messages="v$.formData.userCreate.name.$errors.map(e => e.$message)"
                                  :rules="[false]"
                                  @blur="v$.formData.userCreate.name.$touch"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="formData.userCreate.username"
                                  label="Никнейм"
                                  placeholder="Введите никнейм"
                                  prepend-inner-icon="mdi-account"
                                  variant="solo-filled"
                                  :error-messages="v$.formData.userCreate.username.$errors.map(e => e.$message)"
                                  :rules="[false]"
                                  @blur="v$.formData.userCreate.username.$touch"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="formData.userCreate.email"
                                  type="email"
                                  label="Эл. почта"
                                  placeholder="Введите email"
                                  prepend-inner-icon="mdi-email"
                                  variant="solo-filled"
                                  :error-messages="v$.formData.userCreate.email.$errors.map(e => e.$message)"
                                  :rules="[false]"
                                  @blur="v$.formData.userCreate.email.$touch"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="formData.userCreate.password.main"

                                  label="Пароль"
                                  placeholder="Введите пароль"
                                  prepend-inner-icon="mdi-lock"
                                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  variant="solo-filled"
                                  @click:append-inner="showPassword = !showPassword"
                                  :type="showPassword ? 'text' : 'password'"
                                  :error-messages="v$.formData.userCreate.password.main.$errors.map(e => e.$message)"
                                  :rules="[false]"
                                  @blur="v$.formData.userCreate.password.main.$touch"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="formData.userCreate.password.confirm"

                                  label="Подтверждение пароля"
                                  placeholder="Повторите пароль"
                                  variant="solo-filled"
                                  :type="showConfirm ? 'text' : 'password'"
                                  :prepend-inner-icon="confirmPassword ? 'mdi-lock-check' : 'mdi-lock-remove'"
                                  :append-inner-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                                  :error-messages="v$.formData.userCreate.password.confirm.$errors.map(e => e.$message)"
                                  :rules="[false]"
                                  @blur="v$.formData.userCreate.password.confirm.$touch"

                                  @click:append-inner="showConfirm = !showConfirm"

                                  @update:modelValue="confirmPassword = this.formData.userCreate.password.confirm === this.formData.userCreate.password.main"

                    >
                    </v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="pl-4 pr-4">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-btn
                            :disabled="!form"
                            :loading="loading"
                            color="white"
                            size="large"
                            type="submit"
                            variant="elevated"
                    >
                        Зарегистрироваться
                    </v-btn
                    >
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                    Уже есть аккаунт?&nbsp;
                    <router-link class="login-link" to="/login">
                        Войти!
                    </router-link>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-form>
    <v-snackbar color="green" location="top" v-model="snackbar">
        Поздравляем! Вы успешно зарегистрировались!
    </v-snackbar>
</template>

<script>
import {useVuelidate} from "@vuelidate/core";
import {
    sameAs, validData, minLen, maxLen,
    required,
    nameContains,
    email,
    usernameContains,
    lowerCaseContains,
    upperCaseContains,
    numContains,
    specialContains,
    passwordContains,

} from "@/functions/validators";


export default {
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            formData: {
                userCreate: {
                    name: '',
                    username: '',
                    email: '',
                    password: {
                        main: '',
                        confirm: '',
                    },
                },
            },
            form: false,
            loading: false,
            snackbar: false,
            showPassword: false,
            showConfirm: false,
            confirmPassword: false,
            userExist: false
        }
    },
    validations() {
        return {
            formData: {
                userCreate: {
                    name: {
                        required,
                        minLen: minLen(3),
                        maxLen: maxLen(32),
                        nameContains,

                    },
                    username: {
                        required,
                        minLen: minLen(3),
                        maxLen: maxLen(24),
                        usernameContains,
                        validData: validData(!this.userExist, "Такой никнейм уже существует"),
                    },
                    email: {required, email},
                    password: {
                        main: {
                            required,
                            minLen: minLen(8),
                            maxLen: maxLen(320),
                            lowerCaseContains,
                            upperCaseContains,
                            numContains,
                            specialContains,
                            passwordContains,
                        },
                        confirm: {required, sameAs: sameAs(this.formData.userCreate.password.main)},
                    },
                },
            },
        }
    },
    methods: {
        formSubmit() {
            console.log('submit')
            this.loading = true
            this.register()
        },
        async register() {
            this.$errorHandler(async () => {
                return await this.$api.auth.register(this.formData)
            }).then(value => {
                if (value && value.code) {
                    this.userExist = true
                    this.loading = false
                } else {
                    this.snackbar = true
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 3000)
                }
            })

        }
    },
    watch: {
        formData: {
            handler() {
                if (this.userExist) {
                    this.userExist = false
                }
            },
            deep: true
        }
    }
}
</script>

<style>
.login-link {
    color: #2f81f7;
    text-decoration: none;
}

.login-link:hover {
    text-decoration: underline;
}
</style>