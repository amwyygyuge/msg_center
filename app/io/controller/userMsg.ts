import { Controller } from 'egg'
import * as jwt from 'jsonwebtoken'
export default class UserMsgController extends Controller {
	public async check_new_user_msg() {
		const { ctx } = this
		const keys = this.app.config.keys
		const { token } = ctx.socket.handshake.query
		const decode: any = jwt.verify(token, keys)
		const { user_id } = decode
		const msgs = await ctx.service.userMsg.read({ user_id })
		await ctx.socket.emit('check_new_user_msg', msgs)
	}
}
