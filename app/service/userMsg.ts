import { Service } from 'egg'
import { UserMsg } from './../model/userMsg'
import { UserMsgBody, QueryBody, ReadBody, Status, ReadOneBody } from './../interfaces/userMsg'

export default class UserMsgService extends Service {
	public async create (userMsgBody: UserMsgBody) {
		const { user_ids = [], level, title, describe } = userMsgBody
		const { helper } = this.ctx
		const msgs: any[] = []
		user_ids.forEach(user_id => {
			const msg = {
				user_id,
				level,
				title,
				describe,
				status: Status.unread
			}
			const sockets = helper.findSocketOnUserId(user_id)
			if (sockets) {
				sockets.forEach(({ socket }) => {
					socket.emit('new_user_msg', msg)
				})
			}
			msgs.push(msg)
		})
		return await UserMsg.insertMany(msgs)
	}

	public async query (queryBody: QueryBody) {
		return await UserMsg.find(queryBody)
	}

	public async check_msg (readBody: ReadBody) {
		const { user_id } = readBody
		const msgs = await UserMsg.find({
			status: Status.unread,
			user_id
		})
		// await UserMsg.updateMany({ user_id }, { status: Status.read })
		return msgs
	}

	public async readOne (readOneBody: ReadOneBody) {
		const { id } = readOneBody
		const isOK = await UserMsg.findByIdAndUpdate(id, { status: Status.read })
		if (isOK) {
			return { isOK: true, id }
		} else {
			return { isOK: false, id }
		}
	}
}
