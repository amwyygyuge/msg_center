import { Service } from 'egg'
import { AppMsg } from './../model/appMsg'
import { AppMsgBody, QueryBody, ReadBody, Status, ReadOneBody } from './../interfaces/appMsg'
import { Types } from 'mongoose'
import moment = require('moment')

export default class AppMsgService extends Service {
	public async create (appMsgBody: AppMsgBody) {
		const { app_ids = [], lastTime, level, title, describe, type, data } = appMsgBody
		const { helper } = this.ctx
		const _lastTime = lastTime ? moment(lastTime) : moment()
		const msgs: any[] = []
		app_ids.forEach(app_id => {
			const msg = {
				_id: Types.ObjectId(),
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
				sockets.forEach(({ socket }) => {
					socket.emit('new_app_msg', msg)
				})
			}
			msgs.push(msg)
		})
		return await AppMsg.insertMany(msgs)
	}

	public async query (queryBody: QueryBody) {
		return await AppMsg.find(queryBody)
	}

	/**
	 * @param readBody
	 * @description 已读用户的指定应用的所有信息
	 */
	public async check_msg (readBody: ReadBody) {
		const { app_id, user_id } = readBody
		const msgs = await AppMsg.find({
			status: Status.Working,
			lastTime: { $gt: moment() },
			app_id
		})
		const _msgs = msgs.filter(({ read_user_ids }) => !read_user_ids.includes(user_id))
		// _msgs.forEach(msg => {
		// 	msg.read_user_ids.push(user_id)
		// 	msg.save()
		// })
		return _msgs
	}

	/**
	 * @param readOneBody
	 * @description 已读用户的指定信息
	 */
	public async readOne (readOneBody: ReadOneBody) {
		const { id, user_id } = readOneBody
		const msg = await AppMsg.findById(id)
		if (msg) {
			msg.read_user_ids.push(user_id)
			msg.save()
			return { isOK: true, id }
		} else {
			return { isOK: false, id }
		}
	}

	public async updateStatus () {
		await AppMsg.updateMany(
			{
				status: Status.Working,
				lastTime: { $lt: moment() }
			},
			{
				status: Status.Done
			}
		)
		return true
	}
}
