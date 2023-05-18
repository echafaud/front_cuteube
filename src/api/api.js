import defaultInstance from '@/api/instance'
import authAPI from '@/api/authAPI'

const baseDataConfig = {
    jsonrpc: '2.0',
    id: 0,
    method: "",
    params: null
}
export default {
    auth: authAPI(defaultInstance, baseDataConfig),
}
