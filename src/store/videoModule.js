import errorHandler from "@/functions/errorHandler";
import {api} from "@/api/api";

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
            stopTimecode: null
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
            author,
            likes,
            dislikes,
            views,
            stop_timecode,
            like,
        }) {
            state.video.id = id
            state.video.title = title
            state.video.description = description
            state.video.authorId = author
            state.video.likes = likes
            state.video.dislikes = dislikes
            state.video.views = views
            state.video.like = like
            state.video.stopTimecode = stop_timecode
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
                    dispatch('fetchAuthor', {id: video.author})
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