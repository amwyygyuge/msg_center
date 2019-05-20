import { IModel } from './base'
export enum Status {
	Done,
	Working
}
export enum Levels {
	Low,
	Mid,
	High
}
export enum Types {
	Common,
	UpdateLog
}
interface UpdateLog {
	version: string
	logs: string[]
}

type data = UpdateLog | string

export interface IAppMsg extends IModel {
	status: Status
	level: Levels
	title: string
	describe?: string
	read_user_ids: number[]
	app_id: number
	lastTime: Date
	type: Types
	data: data
}

export interface QueryBody {
	app_id?: number
	level?: Levels
	lastTime: Date
	status: Status
}

export interface ReadBody {
	app_id: number
	user_id: number
}

export interface ReadOneBody {
	id: any
	user_id: number
}

export interface AppMsgBody {
	level?: Levels
	title: string
	describe: string
	app_ids: number[]
	lastTime: Date
	type?: Types
	data?: data
}
