export enum Status {
	Done,
	Working
}
export enum Levels {
	Low,
	Mid,
	High
}
export interface IAppMsg {
	status: Status
	level: Levels
	title: string
	describe?: string
	read_user_ids: number[]
	app_id: number
	lastTime: Date
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

export interface AppMsgBody {
	level: Levels
	title: string
	describe: string
	app_ids: number[]
	lastTime: Date
}
