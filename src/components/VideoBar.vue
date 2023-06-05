<template>
    <v-col cols="12">
        <v-list-item class="w-100 pa-0">
            <template v-slot:prepend>
                <v-avatar
                        color="#757575"
                >
                    <v-icon icon="mdi-account-circle"></v-icon>
                </v-avatar>
            </template>
            <v-row>
                <v-col cols="auto">
                    <v-list-item-title>{{ author.username }}</v-list-item-title>

                    <v-list-item-subtitle>Подписчиков: {{ author.subscribers }}</v-list-item-subtitle>
                </v-col>
                <v-col cols="auto">
                    <subscribe-button v-if="author.id!==userId"></subscribe-button>
                </v-col>
            </v-row>

            <template v-slot:append>

                <div class="justify-self-end">
                    <like color="success" icon="mdi-thumb-up" :status="true"></like>
                    <like color="error" icon="mdi-thumb-down" :status="false"></like>
                </div>
            </template>
        </v-list-item>
    </v-col>

</template>

<script>
import SubscribeButton from "@/components/SubscribeButton.vue";
import {mapState} from "vuex";
import Like from "@/components/Like.vue";
import Dislike from "@/components/Dislike.vue";

export default {
    components: {Dislike, Like, SubscribeButton},
    computed: {
        ...mapState({
            userId: state => state.authUser.user.id,
            author: state => state.video.author
        })
    },
}
</script>
