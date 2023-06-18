import errorHandler from "@/functions/errorHandler";
import {api} from "@/api/api";
import router from "@/router/router";

export const video = {
    namespaced: true,
    state: () => ({
        video: {
            id: null,
            title: null,
            description: null,
            authorId: null,
            likes: null,
            dislikes: null,
            views: null,
            like: null,
            link: null,
            previewLink: null,
            stopTimecode: null,
            uploadedAt: null,
        },
        author: {
            id: null,
            username: null,
            subscribers: null,
            isSubscribed: null,
        }
    }),
    getters: {
        getVideo: (state) => state.video,
        getAuthor: (state) => state.author,
    },
    mutations: {
        setStopTimecode(state, stopTimecode) {
            state.video.stopTimecode = stopTimecode
        },
        setPreviewLink(state, link) {
            state.video.previewLink = link
        },
        setLike(state, status) {
            state.video.like = status
        },
        setDislikes(state, dislikes) {
            state.video.dislikes = dislikes
        },
        setLikes(state, likes) {
            state.video.likes = likes
        },
        setSubscribers(state, subscribers) {
            state.author.subscribers = subscribers
        },
        setSubscription(state, status) {
            state.author.isSubscribed = status
        },
        setVideoLink(state, link) {
            state.video.link = link
        },
        setAuthor(state, {
            id,
            username,
            count_subscribers,
            is_subscribed,
        }) {
            state.author.id = id
            state.author.username = username
            state.author.subscribers = count_subscribers
            state.author.isSubscribed = is_subscribed
        },
        setVideo(state, {
            id,
            title,
            description,
            owner,
            likes,
            dislikes,
            views,
            stop_timecode,
            uploaded_at,
            like,
        }) {
            state.video.id = id
            state.video.title = title
            state.video.description = description
            state.video.authorId = owner
            state.video.likes = likes
            state.video.dislikes = dislikes
            state.video.views = views
            state.video.like = like
            state.video.stopTimecode = stop_timecode
            state.video.uploadedAt = uploaded_at
        },
    },
    actions: {
        async fetchVideo({commit, dispatch}, id) {
            return errorHandler(async () => {
                return await api.video.getVideo(id)
            }).then(value => {
                if (value && value.code) {
                    return value
                } else {
                    const video = JSON.parse(JSON.stringify(value))
                    dispatch('fetchAuthor', {id: video.owner})
                    commit('setVideo', video)
                    return value
                }
            })
        },
        async fetchLink({commit}, id) {
            return errorHandler(async () => {
                return await api.video.getVideoLink(id)
            }).then(value => {
                if (value && value.code) {
                    return value
                } else {
                    commit('setVideoLink', value)
                    return value
                }
            })
        },
        async fetchPreviewLink({commit, state}, id) {
            return errorHandler(async () => {
                return await api.video.getPreviewLink(id)
            }).then(value => {
                if (value && value.code) {
                    return value
                } else {
                    if (router.currentRoute._value.params.id === id.id) {
                        commit('setPreviewLink', value)
                    }
                    return value
                }
            })
        },
        async fetchAuthor({commit}, id) {
            return errorHandler(async () => {
                return await api.user.getUser(id)
            }).then(value => {
                if (value && value.code) {
                    return value
                } else {
                    commit('setAuthor', value)
                    return value
                }
            })
        },
        async rate({commit, state}, payload) {
            return errorHandler(async () => {
                return await api.like.rate(payload)
            }).then(value => {

                if (value && value.code) {
                    return value
                } else {
                    if (payload.status !== null) {
                        if (payload.status) {
                            commit('setLikes', state.video.likes + 1)
                        } else {
                            commit('setDislikes', state.video.dislikes + 1)
                        }
                    }
                    if (state.video.like) {
                        commit('setLikes', state.video.likes - 1)
                    } else if (state.video.like === false) {
                        commit('setDislikes', state.video.dislikes - 1)

                    }
                    commit('setLike', payload.status)
                    return value
                }
            })
        },
    }
}