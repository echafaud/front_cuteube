<template>
    <v-list-item v-if="ready && !edit" class="pa-0 mb-3">
        <template v-slot:prepend>
            <v-avatar
                    color="#757575"
            >
                <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
        </template>
        <v-list-item-title>{{ user.username }}</v-list-item-title>
        <v-list-item-subtitle class="comment-text">{{ comment.text }}</v-list-item-subtitle>
        <!--                <v-list-item-subtitle>Выложено: {{  }}</v-list-item-subtitle>-->
        <template v-if="user.id===comment.author || user.isSuperUser" v-slot:append>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                </template>
                <v-list class="pa-0">
                    <v-list-item v-if="user.id===comment.author"
                                 prepend-icon="mdi-pencil"
                                 @click="()=>edit = true">Редактировать
                    </v-list-item>
                    <v-list-item
                            prepend-icon="mdi-delete"
                            @click="removeComment">Удалить
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
    </v-list-item>
    <comment-input v-else-if="edit" v-model:edit="edit" :edited-comment="comment"></comment-input>
</template>

<script>
import SubscribeButton from "@/components/SubscribeButton.vue";
import CommentInput from "@/components/CommentInput.vue";
import {mapActions, mapState} from "vuex";

export default {
    components: {SubscribeButton, CommentInput},
    props: {
        comment: null
    },
    computed: {
        ...mapState({
            user: state => state.authUser.user
        })
    },
    data() {
        return {
            user: null,
            ready: false,
            edit: false
        }
    },
    methods: {
        removeComment() {
            if (this.user.isSuperUser) {
                this.adminDeleteComment({id: this.comment.id}).then(value => {
                    if (value && value.code) {
                        console.log('error')
                    } else {
                        console.log('success')
                    }
                })
            } else {
                this.deleteComment({id: this.comment.id}).then(value => {
                    if (value && value.code) {
                        console.log('error')
                    } else {
                        console.log('success')
                    }
                })
            }
        },
        async getUser() {
            this.$errorHandler(async () => {
                return await this.$api.user.getUser({
                    id: this.comment.author
                })
            }).then(value => {
                if (value && value.code) {
                    console.log('error')
                } else {
                    this.user = value
                    this.ready = true
                    console.log('success')
                }
            })
        },
        ...mapActions({
            deleteComment: "comments/removeComment",
            adminDeleteComment: "comments/adminRemoveComment"
        }),
    },

    mounted() {
        this.getUser()
    }
}
</script>
<style scoped>
.comment-text {
    word-break: break-all;
}
</style>
