export const authUser = {
    namespaced: true,
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || {
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

        setUser(state, {name, username, email, is_active, is_superuser, is_verified}) {
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
                name: null,
                username: null,
                email: null,
                isActive: null,
                isSuperUser: null,
                isVerified: null,
                accessExpires: null,
            }
        }
    },
    actions: {
        userLogin({commit}, user) {
            console.log(user)
            commit('setUser', JSON.parse(JSON.stringify(user)))
        },
        userLogout({commit}) {
            commit('deleteUser')
            localStorage.removeItem('user')
        }
    }
}