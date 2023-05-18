<template>
    <v-app>
        <wrapper-auth-form :registerForm="true" :formName="'Регистрация'">
        </wrapper-auth-form>
    </v-app>
</template>

<script>
import WrapperAuthForm from "@/components/WrapperAuthForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

export default {
    components: {WrapperAuthForm,},
}
</script>
<style>

</style>