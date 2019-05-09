import { Context } from 'egg'
export default function(): any {
	return async (ctx: Context, next: () => Promise<any>) => {
		const { socket, helper } = ctx
		const { app_id, user_id } = socket.handshake.query
		const hash = socket.id
		if (app_id && user_id) {
			socket.emit('res', '链接成功!')
			helper.socketIn(hash, { app_id, user_id, socket })
		} else {
		}
		await next()
		// execute when disconnect.
		helper.socketOut(hash)
		// console.log('disconnection!')
	}
}
