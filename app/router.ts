import { Application } from 'egg'

export default (app: Application) => {
	const { controller, router, io } = app
	const appRouter = router.namespace('/api/app')
	appRouter.get('/query', controller.app.query)
	appRouter.post('/create', controller.app.create)
	router.get('/api/staff/query', controller.staff.query)
	router.post('/api/auth', controller.auth.encode)
	const app_msg = router.namespace('/api/app_msg')
	app_msg.post('/create', controller.appMsg.create)
	app_msg.post('/query', controller.appMsg.query)

	const user_msg = router.namespace('/api/user_msg')
	user_msg.post('/create', controller.userMsg.create)
	user_msg.post('/query', controller.userMsg.query)

	const _app = router.namespace('/api/app')
	_app.post('/create', controller.app.create)

	io.of('/io').route('check_user_msg', io.controller.userMsg.check_user_msg)
	io.of('/io').route('check_app_msg', io.controller.appMsg.check_app_msg)
	io.of('/io').route('read_app_msg', io.controller.appMsg.read_app_msg)
	io.of('/io').route('read_user_msg', io.controller.userMsg.read_user_msg)
	router.get('*', controller.view.index)
}
