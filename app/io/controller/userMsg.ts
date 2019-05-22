import { Controller } from 'egg'
import * as jwt from 'jsonwebtoken'
export default class UserMsgController extends Controller {
	public async check_user_msg () {
		const { ctx } = this
		const keys = this.app.config.keys
		const { token } = ctx.socket.handshake.query
		const decode: any = jwt.verify(token, keys)
		const { user_id } = decode
		const msgs = await ctx.service.userMsg.check_msg({ user_id })
		await ctx.socket.emit('check_user_msg', msgs)
	}

	public async read_user_msg () {
		const [ id ] = this.ctx.args
		const { readOne } = this.ctx.service.userMsg
		const res = await readOne({ id })
		await this.ctx.socket.emit('read_user_msg', res)
	}
}
