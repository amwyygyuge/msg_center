import { Service } from 'egg'
import { Staff } from './../model/staff'
export default class StaffService extends Service {
	public async query () {
		return await Staff.find().select('_id').select('cname')
	}
}
