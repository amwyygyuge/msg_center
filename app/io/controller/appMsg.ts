import { Controller } from 'egg'
import * as jwt from 'jsonwebtoken'
export default class AppMsgController extends Controller {
	public async check_app_msg () {
		const { ctx } = this
		const keys = this.app.config.keys
		const { token } = ctx.socket.handshake.query
		const decode: any = jwt.verify(token, keys)
		const { app_id, user_id } = decode
		const msgs = await ctx.service.appMsg.check_msg({
			user_id: parseInt(user_id),
			app_id: parseInt(app_id)
		})
		await ctx.socket.emit('check_app_msg', msgs)
	}

	public async read_app_msg () {
		const { ctx } = this
		const [ id ] = this.ctx.args
		const keys = this.app.config.keys
		const { token } = ctx.socket.handshake.query
		const decode: any = jwt.verify(token, keys)
		const { user_id } = decode
		const { readOne } = this.ctx.service.appMsg
		const res = await readOne({ user_id, id })
		await ctx.socket.emit('read_app_msg', res)
	}
}
