const userHashMap = {}
interface IoInfo {
	app_id: string
	user_id: string
	socket: any
}
export default {
	socketIn(hash: string, ioInfo: IoInfo): IoInfo {
		if (userHashMap[hash]) {
			return userHashMap[hash]
		} else {
			userHashMap[hash] = ioInfo
			console.log(`${hash} in! count:${Object.keys(userHashMap).length}`)
		}
		return ioInfo
	},
	socketOut(hash: string): void {
		if (userHashMap[hash]) {
			delete userHashMap[hash]
		}
		console.log(`${hash} out! count:${Object.keys(userHashMap).length}`)
	},
	findSocketOnUserId(user_id: number): IoInfo[] | false {
		const hashs: any[] = []
		Object.keys(userHashMap).forEach(hash => {
			if (userHashMap[hash].user_id == user_id) {
				hashs.push(userHashMap[hash])
			}
		})
		if (hashs.length === 0) return false
		return hashs
	},
	findSocketOnAppId(app_id: number): IoInfo[] | false {
		const hashs: any[] = []
		Object.keys(userHashMap).forEach(hash => {
			if (userHashMap[hash].app_id == app_id) {
				hashs.push(userHashMap[hash])
			}
		})
		if (hashs.length === 0) return false
		return hashs
	},
}
