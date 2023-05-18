import {createStore} from "vuex";
import {authUser} from "@/store/authUserModule";

const store = createStore({
    modules: {
        authUser: authUser
    }
})

export default store;