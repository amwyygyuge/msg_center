import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
	const config = {} as PowerPartial<EggAppConfig>

	// override config from framework / plugin
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1557216918313_3472'

	// add your egg config in here
	config.middleware = []
	config.security = {
		csrf: false
	}
	config.io = {
		init: {}, // passed to engine.io
		namespace: {
			'/io': {
				connectionMiddleware: [ 'connection' ],
				packetMiddleware: []
			}
		}
	}

	config.cors = {
		origin: '*',
		maxAge: 3600 * 1000
	}

	config.static = {
		gzip: true
	}

	// add your special config in here
	const bizConfig = {
		sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
	}

	// the return config will combines to EggAppConfig
	return {
		...config,
		...bizConfig
	}
}
