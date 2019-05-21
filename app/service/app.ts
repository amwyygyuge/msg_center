import { Service } from 'egg'
import { App } from './../model/app'
import { AppBody } from './../interfaces/app'

export default class AppService extends Service {
	public async create (appBody: AppBody) {
		const { name, app_id } = appBody
		if (name && app_id) {
			return await App.create(appBody)
		} else {
			return { code: 1, msg: '参数缺失' }
		}
	}
	public async query () {
		return await App.find()
	}
}
