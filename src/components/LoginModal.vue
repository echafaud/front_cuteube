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
                {{ titleText }}
            </v-card-title>
            <v-card-text>{{ mainText }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        v-if="!disable"
                        color="success"
                        variant="outlined"
                        @click="this.$router.push('/login')">
                    {{ bottomBtnText }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    props: {
        titleText: null,
        mainText: null,
        btnText: null,
        bottomBtnText: null,
        disable: null,
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
