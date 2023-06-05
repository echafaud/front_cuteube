import {createStore} from "vuex";
import {authUser} from "@/store/authUserModule";
import {video} from "@/store/videoModule";
import {comments} from "@/store/commentsModule";
const store = createStore({
    modules: {
        authUser: authUser,
        video: video,
        comments: comments
    }
})

export default store;