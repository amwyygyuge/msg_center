import React, { Component } from 'react'
import { Button, Table, Card, Divider } from 'antd'
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
		dataIndex: "type",
		title: "消息类型"
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
		this.socket = io("http://127.0.0.1:7070/io", {
			query: {
				token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOjUsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lJeE1qTTBOVFkzT0Rrd0lpd2libUZ0WlNJNklrcHZhRzRnUkc5bElpd2lhV0YwSWpveE5URTJNak01TURJeWZRLlNmbEt4d1JKU01lS0tGMlFUNGZ3cE1lSmYzNlBPazZ5SlZfYWRRc3N3NWMiLCJ1c2VyX2lkcyI6MTAwLCJpYXQiOjE1NTc0MDQ5NjR9.SJ_opOKWFX9ARUrtsiEWdgQH5NjVg-5NUahSwJvYtI8"
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

	renderAppTitle = () => {
		return <div>
			应用消息
			<Link ><Button type="primary" href="/post/app_msg" style={{ marginLeft: 15 }} >推送</Button></Link>
		</div>
	}
	renderUserTitle = () => {
		return <div>
			用户消息
			<Link ><Button type="primary" href="/post/user_msg" style={{ marginLeft: 15 }} >推送</Button></Link>
		</div>
	}


	render() {
		const { app_msgs, user_msgs } = this.props
		return (
			<div>
				<Card title={this.renderAppTitle()}>
					<Table columns={appColumns} dataSource={app_msgs} />
				</Card>
				<Card title={this.renderUserTitle()} style={{ marginTop: 25 }}>
					<Table columns={userColumns} dataSource={user_msgs} />
				</Card>
			</div>


		)
	}
}
export default Index
