<template>
    <v-app>
        <wrapper-auth-form :loginForm="true" :formName="'Авторизация'">
        </wrapper-auth-form>
    </v-app>
</template>

<script>
import WrapperAuthForm from "@/components/WrapperAuthForm.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
    components: {WrapperAuthForm,},
}
</script>
<style>

</style>