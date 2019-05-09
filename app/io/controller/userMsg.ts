import { Controller } from 'egg'
export default class UserMsgController extends Controller {
	public async check_new_user_msg() {
		const { ctx } = this
		const { user_id } = ctx.socket.handshake.query
		const msgs = await ctx.service.userMsg.read({ user_id })
		await ctx.socket.emit('check_new_user_msg', msgs)
	}
}
