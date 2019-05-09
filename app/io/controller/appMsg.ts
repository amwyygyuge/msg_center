import { Controller } from 'egg'
export default class AppMsgController extends Controller {
	public async check_new_app_msg() {
		const { ctx } = this
		const { user_id, app_id } = ctx.socket.handshake.query
		const msgs = await ctx.service.appMsg.read({ user_id: parseInt(user_id), app_id: parseInt(app_id) })
		await ctx.socket.emit('check_new_app_msg', msgs)
	}
}
