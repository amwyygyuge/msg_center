import { Controller } from 'egg'
export default class AuthController extends Controller {
	public async encode() {
		const { ctx } = this
		ctx.body = await ctx.service.auth.encode(ctx.request.body)
	}
}
