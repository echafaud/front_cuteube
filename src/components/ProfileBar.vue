<template>
    <v-list-item v-if="user" class="w-100 pa-0">
        <template v-slot:prepend>
            <v-avatar
                    color="#757575"
                    size="128"
            >
                <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
        </template>
        <v-row>
            <v-col cols="11">
                <v-list-item-title>{{ user.name }}</v-list-item-title>

                <v-list-item-subtitle>{{ user.username }}</v-list-item-subtitle>
            </v-col>
            <v-col cols="1">
                <subscribe-button v-if="user.id!==current_user.id" :author="user"></subscribe-button>
            </v-col>
        </v-row>
    </v-list-item>
</template>

<script>
import SubscribeButton from "@/components/SubscribeButton.vue";
import Like from "@/components/Like.vue";
import {mapState} from "vuex";

export default {
    components: {Like, SubscribeButton},
    computed: {
        ...mapState({
            current_user: state => state.authUser.user,
            user: state => state.video.author
        }),
    },
    mounted() {
        console.log(this.current_user)
        console.log(this.user)
    }
}
</script>

<style lang="scss" scoped>

</style>