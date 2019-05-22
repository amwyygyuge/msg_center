import { observable, action, runInAction } from 'mobx'
import { queryApp } from '@/services/app'
import { queryStaff } from '@/services/staff'

const queryDict = () =>
	Promise.all([queryApp(), queryStaff()]).then(res => {
		const [{ data: apps }, { data: staffs }] = res
		return {
			apps,
			staffs,
			appMsgTypes: [
				{
					label: '普通消息',
					value: 0
				},
				{
					label: '应用更新',
					value: 1
				}
			]
		}
	})
class Dict {
	constructor() {
		this.getData()
	}

	@observable.shallow
	dicts = {
		apps: [],
		staffs: [],
		appMsgTypes: []
	}

	@action
	async getData() {
		const dicts = await queryDict()
		runInAction(() => {
			this.dicts = dicts
		})
	}
}

const dictStore = new Dict()

export { dictStore }
