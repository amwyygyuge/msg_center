import request from '../utils/fetch'
export const queryApp = data => request.get('/app/query')
export const createApp = data => request.post('/app/create', data)
