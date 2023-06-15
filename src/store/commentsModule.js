import errorHandler from "@/functions/errorHandler";
import {api} from "@/api/api";

export const comments = {
    namespaced: true,
    state: () => ({
        comments: null,
    }),
    getters: {
        getComments: (state) => state.comments,
    },
    mutations: {
        setComments(state, comments) {
            state.comments = comments.map(comment => ({id: comment.id, text: comment.text, author: comment.author_id}))
        },
        addComment(state, comment) {
            console.log('addComment')
            state.comments.push({id: comment.id, text: comment.text, author: comment.author_id})
        },
        editComment(state, editedComment) {
            state.comments = state.comments.map(comment => (comment.id !== editedComment.id ? comment : {
                id: editedComment.id,
                text: editedComment.text,
                author: editedComment.author_id
            }))
        },
        removeComment(state, removedComment) {
            state.comments = state.comments.filter(comment => comment.id !== removedComment)
        },
    },
    actions: {
        async fetchComments({commit}, id) {
            return errorHandler(async () => {
                return await api.comment.getVideoComments(id)
            }).then(value => {
                if (value && value.code) {
                    return value
                } else {
                    commit('setComments', value)
                    return value
                }
            })
        },
        async postComment({commit}, payload) {
            return errorHandler(async () => {
                return await api.comment.postComment(payload)
            }).then(value => {
                if (value && value.code) {
                    return value
                } else {
                    commit('addComment', value)
                    return value
                }
            })
        },
        async editComment({commit}, payload) {
            return errorHandler(async () => {
                return await api.comment.editComment(payload)
            }).then(value => {
                if (value && value.code) {
                    return value
                } else {
                    commit('editComment', value)
                    return value
                }
            })
        },
        async removeComment({commit}, id) {
            return errorHandler(async () => {
                return await api.comment.removeComment(id)
            }).then(value => {
                if (value && value.code) {
                    return value
                } else {
                    commit('removeComment', id.id)
                    return value
                }
            })
        },
        async adminRemoveComment({commit}, id) {
            return errorHandler(async () => {
                return await api.comment.adminRemoveComment(id)
            }).then(value => {
                if (value && value.code) {
                    return value
                } else {
                    commit('removeComment', id.id)
                    return value
                }
            })
        },
    }
}