import { Service } from 'egg'
import { App } from './../model/app'
import { AppBody } from './../interfaces/app'

export default class AppService extends Service {
	public async create(appBody: AppBody) {
		return await App.create(appBody)
	}
}
