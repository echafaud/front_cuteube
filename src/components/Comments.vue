<template>
    <comment-input></comment-input>
    <comment-list v-if="ready"></comment-list>
</template>

<script>
import CommentList from "@/components/CommentList.vue";
import CommentInput from "@/components/CommentInput.vue";
import Comment from "@/components/Comment.vue";
import {mapActions, mapState} from "vuex";

export default {
    components: {Comment, CommentList, CommentInput},
    data() {
        return {
            ready: false
        }
    },
    methods: {
        ...mapActions({
            fetchComments: "comments/fetchComments"
        }),
        editComment(editedComment) {
            this.comments = this.comments.map(comment => comment.id !== editedComment.id ? comment : editedComment)
        },
        removeComment(removedComment,) {
        }
    },
    computed: {
        ...mapState({
            video: state => state.video.video
        }),
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => {
                this.fetchComments({id: this.$route.params.id}).then(value => {
                    if (value && value.code) {
                        console.log('error')
                    } else {
                        this.ready = true
                        console.log('success')
                    }
                })
            }, {immediate: true})
    }
}
</script>