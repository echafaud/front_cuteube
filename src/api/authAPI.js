import {accessInterceptor} from "@/functions/interceptors";
import {refreshInterceptor} from "@/functions/interceptors"

export default function (instance, baseDataConfig) {
    return {
        login(payload) {
            const credentials = structuredClone(baseDataConfig)
            credentials.method = 'login'
            credentials.params = JSON.parse(JSON.stringify(payload))
            return instance.post('user/login', credentials).then(value => {
                    if (value && !value.data.error) {
                        // instance.interceptors.request.use(accessInterceptor)
                        console.log(instance.interceptors)
                    }
                    return value
                }
            )
        },
        register(payload) {
            const newUser = structuredClone(baseDataConfig)
            newUser.method = 'register'
            newUser.params = JSON.parse(JSON.stringify(payload))
            Object.defineProperty(newUser.params, 'user_create',
                Object.getOwnPropertyDescriptor(newUser.params, 'userCreate'))
            delete newUser.params['userCreate']
            newUser.params.user_create.password = payload.userCreate.password.main
            return instance.post('user/register', newUser)
        },
        refresh() {
            const payload = structuredClone(baseDataConfig)
            payload.params = {}
            payload.method = 'refresh'
            return instance.post('user/refresh', payload)
        },
        verify(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.params = payload
            newPayload.method = 'verify'
            return instance.post('user/verify', newPayload)
        },
        updateVerify(payload) {
            const newPayload = structuredClone(baseDataConfig)
            newPayload.params = payload
            newPayload.method = 'update_verify'
            return instance.post('user/update_verify', newPayload)
        },
        logout() {
            const payload = structuredClone(baseDataConfig)
            payload.params = {}
            payload.method = 'logout'
            console.log(instance.interceptors)
            return instance.post('user/logout', payload).then(value => {
                    if (value && !value.data.error) {
                        // instance.interceptors.request.clear()
                    }
                    return value
                }
            )
        }
    }
}
