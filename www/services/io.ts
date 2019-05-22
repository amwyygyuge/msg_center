import { getDomain } from './../utils/domain'
import io from 'socket.io-client'
const domain = `${getDomain()}/io`
export const init = () => {
	const socket = io(domain, {
		query: {
			token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOjEwMCwidG9rZW4iOiI1YyIsInVzZXJfaWQiOjEwMCwiaWF0IjoxNTU4NDMyNDM2fQ.VtgIFc7UkoSIYiJgxgfc2EKGU5Ej53QME5dbML4jiOM'
		}
	})
	socket.on('res', (res: any) => {
		console.log('返回成功')
		console.log(res)
	})
	socket.on('new_app_msg', (data: any) => {
		console.log(data)
	})
	socket.on('new_user_msg', (data: any) => {
		console.log(data)
	})
	socket.on('check_user_msg', (data: any) => {
		console.log(data)
	})
	socket.emit('check_user_msg')
	socket.on('check_app_msg', (data: any) => {
		console.log(data)
	})
	socket.on('read_app_msg', (data: any) => {
		console.log(data)
	})
	socket.emit('check_app_msg')
	return socket
}
