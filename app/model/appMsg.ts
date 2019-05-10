import { Document, Schema, Model, model } from 'mongoose'
import { IAppMsg, Levels, Status, Types } from './../interfaces/appMsg'
export interface AppMsgModel extends IAppMsg, Document {}

export const AppMsgSchema: Schema = new Schema(
	{
		levels: { type: Number, default: Levels['Low'] },
		title: String,
		describe: String,
		read_user_ids: { type: [ Number ], default: [ 0 ] },
		app_id: Number,
		lastTime: Date,
		status: { type: Number, default: Status['Working'] },
		type: { type: Number, default: Types['Common'] },
		data: Schema.Types.Mixed
	},
	{
		timestamps: true,
		versionKey: false
	}
)

export const AppMsg: Model<AppMsgModel> = model<AppMsgModel>('AppMsg', AppMsgSchema)
