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
        getLikedVideos(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_liked_videos'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/get_liked_videos', newPayload)
        },
        getSubscribedVideos(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_subscribed_videos'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/get_subscribed_videos', newPayload)
        },
        getLatestUserVideos(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_latest_user_videos'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/get_latest_user_videos', newPayload)
        },
        getPopularUserVideos(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_popular_user_videos'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/get_popular_user_videos', newPayload)
        },
        getViewedVideos(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_viewed_videos'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/get_viewed_videos', newPayload)
        },
        recordView(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'record_view'
            const view = {view: payload}
            newPayload.params = JSON.parse(JSON.stringify(view))
            return instance.post('view/record_view', newPayload)
        },
        removeVideo(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'remove_video'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/remove_video', newPayload)
        },
        adminRemoveVideo(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'admin_remove_video'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('video/admin_remove_video', newPayload)
        },
        uploadVideo(payload) {
            const newPayload = new FormData()
            newPayload.append('title', payload.title)
            newPayload.append('description', payload.description)
            newPayload.append('permission', payload.permission)
            newPayload.append('preview_file', payload.preview_file[0])
            newPayload.append('video_file', payload.video_file[0])
            return instance.post('video/upload_video', newPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }
    }
}
