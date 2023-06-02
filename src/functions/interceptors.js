import {getCookie} from "@/functions/cookies";
import {baseDataConfig} from "@/api/api";
import {baseConfig} from "@/api/instance";
import axios from "axios";
import authAPI from "@/api/authAPI";


async function accessInterceptor(config) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
        const accessExpires = user['accessExpires']
        if (accessExpires && accessExpires < Date.now()) {
            const refreshInstance = axios.create(baseConfig)
            refreshInstance.interceptors.request.use(refreshInterceptor)
            await authAPI(refreshInstance, baseDataConfig).refresh()
        }

        const accessCSRF = getCookie('csrf_access_token')
        if (accessCSRF) {
            config.headers['X-CSRF-Token'] = accessCSRF
        }
    }
    return config
}

function refreshInterceptor(config) {
    const user = JSON.parse(localStorage.getItem('user'))
    const refreshExpires = user['refreshExpires']
    if (refreshExpires && refreshExpires < Date.now()) {
        localStorage.clear()
        location.reload()
    }
    const refreshCSRF = getCookie('csrf_refresh_token')
    if (refreshCSRF) {
        config.headers['X-CSRF-Token'] = refreshCSRF
    }
    user.accessExpires = Date.now() + 15 * 60000
    user.refreshExpires = Date.now() + 60 * 86400000
    localStorage.setItem('user', JSON.stringify(user))
    return config
}

export {accessInterceptor, refreshInterceptor}