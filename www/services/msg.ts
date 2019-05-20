import { request } from './../utils/domain'
import { RequestInit } from 'node-fetch'

export const queryAppMsg = (init: RequestInit) => request('/app_msg/query', init)
export const queryUserMsg = (init: RequestInit) => request('/user_msg/query', init)
export const postAppMsg = (init: RequestInit) => request('/app_msg/create', init)
export const postUserMsg = (init: RequestInit) => request('/user_msg/create', init)
