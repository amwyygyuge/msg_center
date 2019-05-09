import { Document, Schema, Model, model } from 'mongoose'
import { IUserMsg, Status } from './../interfaces/userMsg'
export interface UserMsgModel extends IUserMsg, Document {}

export const UserMsgSchema: Schema = new Schema(
	{
		levels: Number,
		title: String,
		describe: String,
		user_id: Number,
		status: { type: Number, default: Status['unread'] }
	},
	{
		timestamps: true,
		versionKey: false
	}
)

export const UserMsg: Model<UserMsgModel> = model<UserMsgModel>('UserMsg', UserMsgSchema)
