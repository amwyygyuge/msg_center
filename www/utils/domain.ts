const dev = 'http://127.0.0.1:7070'
const prod = 'http://119.29.134.187:5432'
import fetch, { RequestInit } from 'node-fetch'
let domain = dev
if (process.env.NODE_ENV !== 'development') {
	domain = prod
}
export const getDomain = () => {
	if (process.env.NODE_ENV !== 'development') {
		return prod
	} else {
		return dev
	}
}
export const request = (url: string, init?: RequestInit) => {
	if (init && init.body) {
		init.body = JSON.stringify(init.body)
		init.headers = { 'Content-Type': 'application/json' }
	}
	const defaultInit: RequestInit = {
		method: 'POST'
	}
	Object.assign(defaultInit, init)
	return fetch(`${domain}/api${url}`, defaultInit).then(res => res.json())
}
