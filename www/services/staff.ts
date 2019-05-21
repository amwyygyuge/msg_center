import { request } from './../utils/domain'
import { RequestInit } from 'node-fetch'
export const queryStaff = (init: RequestInit) => request('/staff/query', init)
