import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
	// static: true,
	// nunjucks: {
	//   enable: true,
	//   package: 'egg-view-nunjucks',
	// },
	routerPlus: {
		enable: true,
		package: 'egg-router-plus'
	},
	cors: {
		enable: true,
		package: 'egg-cors'
	},
	io: {
		enable: true,
		package: 'egg-socket.io'
	},
	nunjucks: {
		enable: true,
		package: 'egg-view-nunjucks'
	}
}

export default plugin
