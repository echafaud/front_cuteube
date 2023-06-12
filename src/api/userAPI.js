export default function (instance, baseDataConfig) {
    return {
        getUser(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'get_user'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('user/get_user', newPayload)
        },
        subscribe(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'subscribe'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            console.log(instance.interceptors)
            return instance.post('subscription/subscribe', newPayload)
        },
        unsubscribe(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.method = 'unsubscribe'
            newPayload.params = JSON.parse(JSON.stringify(payload))
            return instance.post('subscription/unsubscribe', newPayload)
        },
    }
}
