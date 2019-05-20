import { EggAppConfig, PowerPartial } from 'egg'

export default () => {
	const config: PowerPartial<EggAppConfig> = {}
	config.cluster = {
		listen: {
			port: 5432,
			hostname: '0.0.0.0',
			// path: '/var/run/egg.sock',
		},
	}
	config.mongoose = {
		client: {
			url: 'mongodb://msg_center_admin:amwyygyuge@119.29.134.187/msg_center',
			options: {},
		},
	}
	return config
}
