import {accessInterceptor} from "@/functions/interceptors";

export default function (instance, baseDataConfig) {
    return {
        login(payload) {
            const credentials = structuredClone(baseDataConfig)
            credentials.method = 'login'
            credentials.params = JSON.parse(JSON.stringify(payload))
            return instance.post('login', credentials).then(value => {
                    if (value && !value.data.error) {
                        instance.interceptors.request.use(accessInterceptor)
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
            return instance.post('register', newUser)
        },
        refresh() {
            const payload = structuredClone(baseDataConfig)
            payload.params = {}
            payload.method = 'refresh'
            return instance.post('register', payload)
        },
        logout() {
            const payload = structuredClone(baseDataConfig)
            payload.params = {}
            payload.method = 'logout'
            return instance.post('logout', payload).then(value => {
                    console.log(value)
                    if (value && !value.data.error) {
                        instance.interceptors.request.clear()
                    }
                    return value
                }
            )
        }
    }
}
