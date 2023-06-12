<template>
    <v-textarea
            v-model="comment"
            rows="1"
            auto-grow
            variant="underlined"
            label="Комментарий"
            :error-messages="v$.comment.$errors.map(e => e.$message)"
            @blur="v$.comment.$touch"
    >
        <template v-slot:prepend>
            <v-avatar class="mt-n2"
                      color="#757575"
            >
                <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
        </template>
        <template v-slot:append-inner>
            <v-btn v-if="edit" icon="mdi-cancel" class="mt-n3"
                   variant="plain"
                   :disabled="!comment || comment.length > maxLen"
                   @click="()=>$emit('update:edit', false)">
            </v-btn>
            <login-modal v-if="!userActive" text="Хотите оставить комментарий?" variant="plain"
                         icon="mdi-send"></login-modal>
            <v-btn v-else :icon="!edit ? 'mdi-send': 'mdi-check-bold'" class="mt-n3"
                   variant="plain"
                   :disabled="!comment || comment.length > maxLen"
                   @click="leaveComment">
            </v-btn>
        </template>
    </v-textarea>
</template>

<script>
import {useVuelidate} from "@vuelidate/core";
import {maxLen} from "@/functions/validators";
import {mapActions, mapState} from "vuex";
import LoginModal from "@/components/LoginModal.vue";

export default {
    components: {LoginModal},
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    props: {
        editedComment: null,
        edit: Boolean
    },
    computed: {
        ...mapState({
            video: state => state.video.video,
            userActive: state => state.authUser.user.isActive
        }),
    },
    data() {
        return {
            comment: '',
            loading: false,
            maxLen: 512
        }
    },
    validations() {
        return {
            comment: {
                maxLen: maxLen(this.maxLen),
            }
        }
    },
    methods: {
        ...mapActions({
            postComment: "comments/postComment",
            editComment: "comments/editComment"
        }),
        leaveComment() {
            if (this.edit) {
                this.editComment({
                    text: this.comment,
                    id: this.editedComment.id
                }).then(value => {
                    if (value && value.code) {
                        console.log('error')
                    } else {
                        this.$emit('update:edit', false)
                        console.log('success')
                    }
                })
            } else {
                this.postComment({
                    text: this.comment,
                    video_id: this.video.id
                }).then(value => {
                    if (value && value.code) {
                        console.log('error')
                    } else {
                        this.comment = ''
                        console.log('success')
                    }
                })
            }
        },
        // async editComment() {
        //     this.$errorHandler(async () => {
        //         return await this.$api.comment.postComment({
        //             text: this.comment,
        //             id: this.editedComment.id
        //         })
        //     }).then(value => {
        //         if (value && value.code) {
        //             console.log('error')
        //         } else {
        //             const editedComment = {
        //                 id: value.id,
        //                 text: value.text,
        //                 author_id: value.author_id
        //             }
        //             this.$emit('editComment', editedComment)
        //             console.log('success')
        //         }
        //     })
        // },
        cancelEditComment() {
            this.$emit('cancelEditComment', false)
        }
    },
    mounted() {
        this.comment = this.editedComment ? this.editedComment.text : ''
    }
}
</script>