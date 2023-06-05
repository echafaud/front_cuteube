import {defaultInstance} from '@/api/instance'
import authAPI from '@/api/authAPI'
import videoAPI from "@/api/videoAPI";
import userAPI from "@/api/userAPI";
import likeAPI from "@/api/likeAPI";
import commentAPI from "@/api/commentAPI";

const baseDataConfig = {
    jsonrpc: '2.0',
    id: 0,
    method: "",
    params: null
}
const api = {
    auth: authAPI(defaultInstance, baseDataConfig),
    video: videoAPI(defaultInstance, baseDataConfig),
    user: userAPI(defaultInstance, baseDataConfig),
    like: likeAPI(defaultInstance, baseDataConfig),
    comment: commentAPI(defaultInstance, baseDataConfig),
}
export {
    api, baseDataConfig
}
