import request from '../utils/fetch'
export const queryStaff = data => request.get('/staff/query', data)
