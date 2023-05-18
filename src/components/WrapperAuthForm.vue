<template>
    <v-container fluid class="fill-height">
        <v-row>
            <v-col class="d-flex justify-center">

                <v-card class="d-flex flex-column flex-shrink-1 flex-grow-1" max-width="420">
                    <v-card-title class="d-flex justify-center">
                        {{ formName }}
                    </v-card-title>
                    <login-form v-if="loginForm"></login-form>
                    <register-form v-else-if="registerForm" @register="register"></register-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

export default {
    components: {RegisterForm, LoginForm},
    props: {
        formName: {
            type: String,
            required: true
        },
        loginForm: {
            type: Boolean
        },
        registerForm: {
            type: Boolean
        },
    },
}
</script>