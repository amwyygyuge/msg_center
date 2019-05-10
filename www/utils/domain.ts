export const domain = 'http://127.0.0.1:7070/api'
const prod = 'http://119.29.134.187:5432/api'
import fetch, { RequestInit } from 'node-fetch'

export const request = (url: string, init?: RequestInit) => {
	const defaultInit: RequestInit = {
		method: 'POST'
	}
	Object.assign(defaultInit, init)
	return fetch(`${prod}${url}`, defaultInit).then(res => res.json())
}
