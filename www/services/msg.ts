import { request } from './../utils/domain'
export const queryAppMsg = () => request('/app_msg/query')
export const queryUserMsg = () => request('/user_msg/query')
