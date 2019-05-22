import domainList from '../config/domain'
import axios from 'axios'
/**
 * 获取后端服务主域
 */
function getDomain() {
	const location = window.location.host
	const domain = domainList.find(({ host }) => host.test(location))
	if (domain) {
		return domain.domain
	} else {
		throw new Error('Can not match the domain! Please check your domain config.')
	}
}
const domain = getDomain()
export const request = axios.create({
	baseURL: `${domain}/api`,
	timeout: 2000
})
// export const request = (url, init) => {
// 	if (init && init.body) {
// 		init.body = JSON.stringify(init.body)
// 		init.headers = { 'Content-Type': 'application/json' }
// 	}
// 	const defaultInit = {
// 		method: 'POST'
// 	}
// 	Object.assign(defaultInit, init)
// 	return fetch(`${domain}/api${url}`, defaultInit).then(res => res.json())
// }

export default request
export { domain }
