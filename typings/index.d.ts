import 'egg'
import ExportUserMsg from './../app/io/controller/userMsg'
import ExportAppMsg from './../app/io/controller/appMsg'

import { Socket, Server as SocketServer, Namespace as SocketNameSpace } from 'socket.io'

declare module 'egg' {
	interface EggSocketIO {
		middleware: CustomMiddleware
		controller: {
			userMsg: ExportUserMsg
			appMsg: ExportAppMsg
		}
	}
	interface Context {
		socket: Socket
	}
}
