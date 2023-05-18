import {getCookie} from "@/functions/cookies";


function accessInterceptor(config) {
    const accessExpires = localStorage.getItem('user')['accessExpires']
    if (accessExpires && accessExpires < Date.now()) {
        this.$api.auth.refresh()
    }
    const accessCSRF = getCookie('csrf_access_token')
    if (accessCSRF) {
        config.headers['X-CSRF-Token'] = accessCSRF
    }
    return config
}

function refreshInterceptor(config) {
    const refreshExpires = localStorage.getItem('user')['refreshExpires']
    if (refreshExpires && refreshExpires < Date.now()) {
        this.$api.auth.logout()
    }
    const refreshCSRF = getCookie('csrf_refresh_token')
    if (refreshCSRF) {
        config.headers['X-CSRF-Token'] = refreshCSRF
    }
    return config
}

export {accessInterceptor, refreshInterceptor}