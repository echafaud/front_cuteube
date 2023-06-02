<template>
    <v-btn icon="mdi-thumb-up" variant="text" @click="like">
        <template v-slot>
            <v-icon :color="likeColor"></v-icon>
        </template>
    </v-btn>
    <span>{{ video.likes }}</span>
</template>

<script>

export default {
    props: {
        video: null
    },
    emits: {
        clickLike: null,
    },
    data() {
        return {
            isLiked: this.video.like
        }
    },
    methods: {
        like() {
            if (!this.video.like) {
                this.rate()
            } else {
                this.removeRating()
            }

        },
        async rate() {
            this.$errorHandler(async () => {
                return await this.$api.video.rate({
                    status: true,
                    video_id: this.video.id
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.isLiked = true
                    this.$emit('clickLike', this.isLiked)
                    console.log('success')
                }
            })
        },
        async removeRating() {
            this.$errorHandler(async () => {
                return await this.$api.video.removeRating({
                    id: this.video.id,
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.isLiked = false
                    this.$emit('clickLike', this.isLiked)
                    console.log('success')
                }
            })
        },
    },
    computed: {
        likeColor() {
            const curr_rate = this.video.like
            return curr_rate ? "success" : "grey-lighten-2"
        },
    }
}
</script>
