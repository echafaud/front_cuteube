export default function (instance, baseDataConfig) {
    return {
        getVideo(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_video'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('get_video', newPayload)
        },
        getVideoLink(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_video_link'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('get_video_link', newPayload)
        },
    }
}
