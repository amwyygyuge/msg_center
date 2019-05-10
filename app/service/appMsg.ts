import { Service } from 'egg'
import { AppMsg } from './../model/appMsg'
import { AppMsgBody, QueryBody, ReadBody, Status } from './../interfaces/appMsg'
const moment = require('moment')

export default class AppMsgService extends Service {
	public async create(appMsgBody: AppMsgBody) {
		const { app_ids = [], lastTime, level, title, describe, type, data } = appMsgBody
		const { helper } = this.ctx
		const _lastTime = lastTime ? moment(lastTime) : moment()
		const msgs: any[] = []
		app_ids.forEach(app_id => {
			const msg = {
				app_id,
				lastTime: _lastTime,
				level,
				title,
				describe,
				type,
				data,
				read_user_ids: [ 0 ]
			}
			const sockets = helper.findSocketOnAppId(app_id)
			if (sockets) {
				sockets.forEach(({ socket, user_id }) => {
					msg.read_user_ids.push(parseInt(user_id))
					socket.emit('new_app_msg', msg)
				})
			}
			msgs.push(msg)
		})
		return await AppMsg.insertMany(msgs)
	}

	public async query(queryBody: QueryBody) {
		return await AppMsg.find(queryBody)
	}

	public async read(readBody: ReadBody) {
		const { app_id, user_id } = readBody
		const msgs = await AppMsg.find({
			status: Status['Working'],
			lastTime: { $gt: moment() },
			app_id
		})
		const _msgs = msgs.filter(({ read_user_ids }) => !read_user_ids.includes(user_id))
		_msgs.forEach(msg => {
			msg.read_user_ids.push(user_id)
			msg.save()
		})
		return _msgs
	}

	public async updateStatus() {
		await AppMsg.updateMany(
			{
				status: Status['Working'],
				lastTime: { $lt: moment() }
			},
			{
				status: Status['Done']
			}
		)
		return true
	}
}
