import { Controller } from 'egg'
// import { MsgBody } from './../interfaces/msg'

export default class ViewController extends Controller {
	public async index () {
		const { ctx } = this
		await ctx.render('index.html')
	}
}
