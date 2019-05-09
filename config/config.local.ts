import { EggAppConfig, PowerPartial } from 'egg'

export default () => {
	const config: PowerPartial<EggAppConfig> = {}
	config.mongoose = {
		client: {
			url: 'mongodb://127.0.0.1/msg_center',
			options: {}
		}
	}
	config.cluster = {
		listen: {
			port: 7070,
			hostname: 'localhost'
			// path: '/var/run/egg.sock',
		}
	}
	return config
}
