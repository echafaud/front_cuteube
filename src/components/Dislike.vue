<template>
    <v-btn icon="mdi-thumb-down" variant="text" @click="dislike">
        <template v-slot>
            <v-icon :color="dislikeColor"></v-icon>
        </template>
    </v-btn>
    <span>{{ video.dislikes }}</span>
</template>

<script>

export default {
    props: {
        video: null
    },
    emits: {
        clickDislike: null,
    },
    data() {
        return {
            isDisliked: this.video.like === false ? !this.video.like : false
        }
    },
    methods: {
        dislike() {
            if (this.video.like || this.video.like === null) {
                this.rate()
            } else {
                this.removeRating()
            }
        },
        async rate() {
            this.$errorHandler(async () => {
                return await this.$api.like.rate({
                    status: false,
                    video_id: this.video.id
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.isDisliked = true
                    this.$emit('clickDislike', this.isDisliked)
                    console.log('success')
                }
            })
        },
        async removeRating() {
            this.$errorHandler(async () => {
                return await this.$api.like.removeRating({
                    id: this.video.id,
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.isDisliked = false
                    this.$emit('clickDislike', this.isDisliked)
                    console.log('success')
                }
            })
        },
    },
    computed: {
        dislikeColor() {
            const curr_rate = this.video.like === false ? !this.video.like : false
            return curr_rate ? "error" : "grey-lighten-2"
        },
    }
}
</script>
