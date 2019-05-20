import { Controller } from 'egg'
// import { MsgBody } from './../interfaces/msg'
export default class AppMsgController extends Controller {
	public async create () {
		const { ctx } = this
		ctx.body = await ctx.service.appMsg.create(ctx.request.body)
	}
	public async read () {
		const { ctx } = this
		ctx.body = await ctx.service.appMsg.check_msg(ctx.request.body)
	}

	public async query () {
		const { ctx } = this
		ctx.body = await ctx.service.appMsg.query(ctx.request.body)
	}
}
