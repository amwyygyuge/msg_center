import { IModel } from './base'

export enum Status {
	unread,
	read
}

export enum Levels {
	High,
	Low,
	Mid
}
export interface IUserMsg extends IModel {
	level: Levels
	title: string
	describe?: string
	user_id: number
	status: Status
}

export interface QueryBody {
	user_id: number
	level?: Levels
	status: Status
}

export interface ReadBody {
	user_id: number
}

export interface UserMsgBody {
	level?: Levels
	title: string
	describe: string
	user_ids: number[]
}

export interface ReadOneBody {
	id: any
}
