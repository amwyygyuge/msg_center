import { Application } from 'egg'

export default (app: Application) => {
	const { controller, router, io } = app
	const app_msg = router.namespace('/api/app_msg')
	app_msg.post('/create', controller.appMsg.create)
	app_msg.post('/query', controller.appMsg.query)
	// app_msg.post('/read', controller.appMsg.read)
	const user_msg = router.namespace('/api/user_msg')
	user_msg.post('/create', controller.userMsg.create)
	user_msg.post('/query', controller.userMsg.query)
	// user_msg.post('/read', controller.userMsg.read)
	const _app = router.namespace('/api/app')
	_app.post('/create', controller.app.create)
	io.of('/io').route('check_new_user_msg', io.controller.userMsg.check_new_user_msg)
	io.of('/io').route('check_new_app_msg', io.controller.appMsg.check_new_app_msg)
}
