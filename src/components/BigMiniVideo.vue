<template>
    <v-card v-if="user && miniPreviewLink" @click="$router.push({ path: `/video/${video.id}` })" class="mb-3 h-100">
        <v-row>
            <v-col cols="12" class="pr-0">
                <v-img
                        class="h-100"
                        aspect-ratio="16/9"
                        cover
                        height="160"
                        :src="miniPreviewLink"
                ></v-img>

            </v-col>
            <v-col cols="12" class="pl-0 pt-0">
                <v-card-title class="pt-0">{{ video.title }}</v-card-title>
                <v-card-subtitle>{{ user.username }}</v-card-subtitle>
                <v-card-subtitle>Просмотров: {{ video.views }}</v-card-subtitle>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
    props: {
        video: null
    },
    data() {
        return {
            user: null,
            miniPreviewLink: ''
        }
    },
    methods: {
        ...mapActions({
            fetchPreviewLink: "video/fetchPreviewLink"
        }),
        async getUser() {
            this.$errorHandler(async () => {
                return await this.$api.user.getUser({
                    id: this.video.owner
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.user = value
                    console.log('success')
                }
            })
        },
    },
    mounted() {
        console.log(this.video)
        this.getUser()
        this.fetchPreviewLink({id: this.video.id}).then(value => {
            if (value && value.code) {
                console.log('error')
            } else {
                this.miniPreviewLink = value
            }
        })
    }
}
</script>