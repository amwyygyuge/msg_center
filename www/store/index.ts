import { observable, action, runInAction } from 'mobx'
import { queryApp } from './../services/app'
const queryDict = () =>
	Promise.all([
		queryApp({
			method: 'GET'
		})
	]).then(res => {
		const [ apps ] = res
		return { apps }
	})
class Dict {
	constructor () {
		this.getData()
	}

	@observable.shallow
	public dicts: any = {
		staffs: []
	}
	@action
	public async getData () {
		const dicts = await queryDict()
		runInAction(() => {
			this.dicts = dicts
		})
	}
}
const dictStore = new Dict()
export { dictStore }
