import { Controller } from 'egg'
// import { MsgBody } from './../interfaces/msg'
export default class UserMsgController extends Controller {
	public async create() {
		const { ctx } = this
		ctx.body = await ctx.service.userMsg.create(ctx.request.body)
	}
	public async read() {
		const { ctx } = this
		ctx.body = await ctx.service.userMsg.read(ctx.request.body)
	}

	public async query() {
		const { ctx } = this
		ctx.body = await ctx.service.userMsg.query(ctx.request.body)
	}
}
