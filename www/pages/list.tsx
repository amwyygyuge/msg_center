import * as React from 'react'
import io from 'socket.io-client';

export interface IAppProps { }
export default class IApp extends React.Component<IAppProps, any> {
	public render() {
		return 'dwadaw'
	}
	public socket: any = null

	componentDidMount() {
		this.socket = io("http://localhost:7070/io", {
			query: {
				user_id: 200,
				app_id: 100
			}
		})
		this.socket.on("res", (res: any) => {
			console.log("返回成功");
			console.log(res);
		})
		this.socket.on("new_app_msg", (data: any) => {
			console.log(data);
		})
		this.socket.on("new_user_msg", (data: any) => {
			console.log(data);
		})
		this.socket.on("check_new_user_msg", (data: any) => {
			console.log(data);
		})
		this.socket.emit("check_new_user_msg")
		this.socket.on("check_new_app_msg", (data: any) => {
			console.log(data);
		})
		this.socket.emit("check_new_app_msg")
	}

}
