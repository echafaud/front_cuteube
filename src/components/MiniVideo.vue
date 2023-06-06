<template>
    <v-card v-if="user && previewLink" @click="$router.push({ path: `/video/${video.id}` })" class="mb-3"
            height="160">
        <v-row>
            <v-col cols="6" class="pr-0">
                <v-img
                        class="h-100"
                        aspect-ratio="16/9"
                        cover
                        height="160"
                        :src="previewLink"
                ></v-img>

            </v-col>
            <v-col cols="6" class="pl-0">
                <v-card-title>{{ video.title }}</v-card-title>
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
            previewLink: ''
        }
    },
    methods: {
        ...mapActions({
            fetchPreviewLink: "video/fetchPreviewLink"
        }),
        async getUser() {
            this.$errorHandler(async () => {
                return await this.$api.user.getUser({
                    id: this.video.author
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
        this.getUser()
        this.fetchPreviewLink({id: this.video.id}).then(value => {
            if (value && value.code) {
                console.log('error')
            } else {
                this.previewLink = value
            }
        })
    }
}
</script>