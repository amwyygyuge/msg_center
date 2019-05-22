import request from '../utils/fetch'
export const queryAppMsg = data => request.post('/app_msg/query', data)
export const queryUserMsg = data => request.post('/user_msg/query', data)
export const postAppMsg = data => request.post('/app_msg/create', data)
export const postUserMsg = data => request.post('/user_msg/create', data)
