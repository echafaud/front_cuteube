export default function (instance, baseDataConfig) {
    return {
        postComment(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'post_comment'
            const comment = {'comment': payload}
            newPayload.params = JSON.parse(JSON.stringify(comment))
            return instance.post('post_comment', newPayload)
        },
        editComment(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'edit_comment'
            const comment = {'comment': payload}
            newPayload.params = JSON.parse(JSON.stringify(comment))
            return instance.post('edit_comment', newPayload)
        },
        removeComment(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'remove_comment'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('remove_comment', newPayload)
        },
        getVideoComments(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_video_comments'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('get_video_comments', newPayload)
        },
    }
}
