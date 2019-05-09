import { Controller } from 'egg'
// import { MsgBody } from './../interfaces/msg'

export default class AppController extends Controller {
	public async create() {
		const { ctx } = this
		ctx.body = await ctx.service.app.create(ctx.request.body)
	}
}
