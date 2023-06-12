export default function (instance, baseDataConfig) {
    return {
        getVideo(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_video'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/get_video', newPayload)
        },
        getVideoLink(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_video_link'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/get_video_link', newPayload)
        },
        getPreviewLink(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_preview_link'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/get_preview_link', newPayload)
        },
        getLatestVideos(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_latest_videos'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/get_latest_videos', newPayload)
        },
        getPopularVideos(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_popular_videos'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/get_popular_videos', newPayload)
        },
        getLikedByUsersVideos(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_liked_by_users'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/get_liked_by_users', newPayload)
        },
        recordView(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'record_view'
            const view = {view:payload}
            newPayload.params = JSON.parse(JSON.stringify(view))
            return instance.post('view/record_view', newPayload)
        },
    }
}
