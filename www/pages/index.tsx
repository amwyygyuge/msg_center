import React, { Component } from 'react'
import { Button, Table, Card } from 'antd'
import Link from 'next/link'
import io from 'socket.io-client';
import { queryAppMsg, queryUserMsg } from './../services/msg';
interface Props {
	project: any
	app_msgs: any[]
	user_msgs: any[]
}
const appColumns = [
	{
		dataIndex: "app_id",
		title: "app_id"
	},
	{
		dataIndex: "title",
		title: "标题"
	},
	{
		dataIndex: "describe",
		title: "描述"
	},
	{
		dataIndex: "lastTime",
		title: "过期时间"
	}
]
const userColumns = [
	{
		dataIndex: "user_id",
		title: "user_id"
	},
	{
		dataIndex: "title",
		title: "标题"
	},
	{
		dataIndex: "describe",
		title: "描述"
	}
]
class Index extends Component<Props> {
	public socket: any = null
	componentDidMount() {
		this.socket = io("http://localhost:7070/io", {
			query: {
				user_id: 100,
				app_id: 200
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


	static async getInitialProps(): Promise<any> {
		const app_msgs = await queryAppMsg()
		const user_msgs = await queryUserMsg()
		return { app_msgs, user_msgs }
	}

	render() {
		const { app_msgs, user_msgs } = this.props
		console.log(user_msgs);
		return (
			<Card>
				<Table title={() => "应用消息"} columns={appColumns} dataSource={app_msgs} />
				<Table title={() => "用户消息"} columns={userColumns} dataSource={user_msgs} />
			</Card>
		)
	}
}
export default Index
