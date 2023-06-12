export default function (instance, baseDataConfig) {
    return {
        rate(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'rate'
            const like = {'like': payload}
            newPayload.params = JSON.parse(JSON.stringify(like))
            return instance.post('like/rate', newPayload)
        },
        removeRating(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'remove_rating'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('remove_rating', newPayload)
        },
    }
}
