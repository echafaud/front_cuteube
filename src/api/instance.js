import axios from "axios";


const defaultInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/jsonrpc/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})
const authInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/jsonrpc/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})
export default defaultInstance