import axios from "axios";
import {accessInterceptor} from "@/functions/interceptors";

const baseConfig = {
    baseURL: 'http://localhost:8000/api/v1/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
}
const defaultInstance = axios.create(baseConfig)
const authInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/jsonrpc/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})
defaultInstance.interceptors.request.use(accessInterceptor)
export {defaultInstance, baseConfig}