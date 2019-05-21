import { Controller } from 'egg'
// import { MsgBody } from './../interfaces/msg'

export default class StaffController extends Controller {
	public async query () {
		const { ctx } = this
		ctx.body = await ctx.service.staff.query()
	}
}
