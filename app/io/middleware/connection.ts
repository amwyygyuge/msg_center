import { Context } from 'egg'
import * as jwt from 'jsonwebtoken'
export default function(): any {
	return async (ctx: Context, next: () => Promise<any>) => {
		const { socket, helper, app: { config: { keys } } } = ctx
		const { token = '' } = socket.handshake.query
		const hash = socket.id
		try {
			// console.log(jwt.verify(token, keys))
			const decode: any = jwt.verify(token, keys)
			const { app_id, user_id } = decode
			socket.emit('res', '链接成功!')
			helper.socketIn(hash, { app_id, user_id, socket })
		} catch (error) {
			const outHash = socket.disconnect().id
			console.log('认证失败,断开连接', outHash)
			// helper.socketOut(outHash)
		}

		await next()
		// execute when disconnect.
		helper.socketOut(hash)
		// console.log('disconnection!')
	}
}
