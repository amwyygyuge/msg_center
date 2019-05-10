import { Service } from 'egg'
import { EncodeBody } from './../interfaces/auth'
import * as jwt from 'jsonwebtoken'
export default class AuthService extends Service {
	public async encode(encodeBody: EncodeBody) {
		if (Object.keys(encodeBody).length !== 3)
			return {
				code: 1,
				msg: '信息不完整'
			}
		const keys = this.config.keys
		const decode = jwt.sign(encodeBody, keys)

		return {
			code: 0,
			msg: '认证成功',
			data: decode
		}
	}
}
