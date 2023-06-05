import errorHandler from "@/functions/errorHandler";
import {api} from "@/api/api";

export const authUser = {
    namespaced: true,
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || {
            id: null,
            name: null,
            username: null,
            email: null,
            isActive: null,
            isSuperUser: null,
            isVerified: null,
            accessExpires: null,
        },
    }),
    getters: {
        getUserUser: (state) => state.user,
    },
    mutations: {
        setAuth(state, auth) {
            state.isAuth = auth
        },
        setName(state, name) {
            state.user.name = name
        },
        setUsername(state, username) {
            state.user.username = username
        },
        setEmail(state, email) {
            state.user.email = email
        },
        setUserRole(state, userRole) {
            state.user.isSuperUser = userRole
        },
        setActivity(state, activity) {
            state.user.isActive = activity
        },
        setVerification(state, verification) {
            state.user.isVerified = verification
        },
        setAccessExpires(state, accessExpires) {
            state.user.accessExpires = accessExpires
        },
        setRefreshExpires(state, refreshExpires) {
            state.user.refreshExpires = refreshExpires
        },

        setUser(state, {id, name, username, email, is_active, is_superuser, is_verified}) {
            state.user.id = id
            state.user.name = name
            state.user.username = username
            state.user.email = email
            state.user.isActive = is_active
            state.user.isSuperUser = is_superuser
            state.user.isVerified = is_verified
            state.user.accessExpires = Date.now() + 15 * 60000
            state.user.refreshExpires = Date.now() + 60 * 86400000
            localStorage.setItem('user', JSON.stringify(state.user))
            console.log(state.user)
        },
        deleteUser(state) {
            state.user = {
                id: null,
                name: null,
                username: null,
                email: null,
                isActive: null,
                isSuperUser: null,
                isVerified: null,
                accessExpires: null,
            }
            localStorage.removeItem('user')
        }
    },
    actions: {
        async userLogin({commit}, formData) {
            return errorHandler(async () => {
                return await api.auth.login(formData)
            }).then(value => {
                if (value && value.code) {
                    return value
                } else {
                    commit('setUser', JSON.parse(JSON.stringify(value)))
                    return value
                }
            })
        },
        userLogout({commit}) {
            return errorHandler(async () => {
                return await api.auth.logout()
            }).then(value => {
                if (value && value.code) {
                    return value
                } else {
                    commit('deleteUser')
                    return value
                }
            })
        }
    }
}