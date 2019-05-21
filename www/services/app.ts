import { request } from './../utils/domain'
import { RequestInit } from 'node-fetch'

export const queryApp = (init: RequestInit) => request('/app/query', init)
export const createApp = (init: RequestInit) => request('/app/create', init)
