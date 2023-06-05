<template>
    <v-menu
            :location="location"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                    :variant="variant"
                    :icon="icon"
                    v-bind="props"
            >
                <template v-if="btnText" v-slot>
                    {{ btnText }}
                </template>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="text-h5">
                {{ text }}
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
</template>

<script>
export default {
    props: {
        text: null,
        btnText: null,
        icon: null,
        variant: null
    },
    data() {
        return {
            location: 'bottom',
        }
    },
}
</script>
