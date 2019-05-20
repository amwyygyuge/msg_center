import React, { Component } from 'react'
import { Button, Table, Card, Divider } from 'antd'
import Link from 'next/link'
import io from 'socket.io-client'
import { queryAppMsg, queryUserMsg } from './../services/msg'
interface Props {
	project: any
	app_msgs: any[]
	user_msgs: any[]
}
const appColumns = [
	{
		dataIndex: 'app_id',
		title: 'app_id'
	},
	{
		dataIndex: 'type',
		title: '消息类型'
	},
	{
		dataIndex: 'title',
		title: '标题'
	},
	{
		dataIndex: 'describe',
		title: '描述'
	},
	{
		dataIndex: 'lastTime',
		title: '过期时间'
	},
	{
		dataIndex: 'createdAt',
		title: '创建时间'
	}
]
const userColumns = [
	{
		dataIndex: 'user_id',
		title: 'user_id'
	},
	{
		dataIndex: 'title',
		title: '标题'
	},
	{
		dataIndex: 'describe',
		title: '描述'
	}
]
class Index extends Component<Props> {
	public socket: any = null
	componentDidMount() {
		this.socket = io('http://127.0.0.1:7070/io', {
			query: {
				token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOjUsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lJeE1qTTBOVFkzT0Rrd0lpd2libUZ0WlNJNklrcHZhRzRnUkc5bElpd2lhV0YwSWpveE5URTJNak01TURJeWZRLlNmbEt4d1JKU01lS0tGMlFUNGZ3cE1lSmYzNlBPazZ5SlZfYWRRc3N3NWMiLCJ1c2VyX2lkIjoxMDAsImlhdCI6MTU1NzQ3NTYxOH0.JGQ8OALNGhd00fd4dymAi0f15QTH4jlAl7vypIB-SOQ'
			}
		})
		this.socket.on('res', (res: any) => {
			console.log('返回成功')
			console.log(res)
		})
		this.socket.on('new_app_msg', (data: any) => {
			console.log(data)
		})
		this.socket.on('new_user_msg', (data: any) => {
			console.log(data)
		})
		this.socket.on('check_user_msg', (data: any) => {
			console.log(data)
		})
		this.socket.emit('check_user_msg')
		this.socket.on('check_app_msg', (data: any) => {
			console.log(data)
		})
		this.socket.on('read_app_msg', (data: any) => {
			console.log(data)
		})
		this.socket.emit('check_app_msg')
	}

	componentWillUnmount() {
		this.socket.close()
	}

	static async getInitialProps(): Promise<any> {
		const app_msgs = await queryAppMsg({})
		const user_msgs = await queryUserMsg({})
		return { app_msgs, user_msgs }
	}

	renderAppTitle = () => {
		return <div>
			应用消息
			<Link href="/post/app_msg"><Button type="primary" style={{ marginLeft: 15 }} >推送</Button></Link>
		</div>
	}
	renderUserTitle = () => {
		return <div>
			用户消息
			<Link href="/post/user_msg"><Button type="primary" style={{ marginLeft: 15 }} >推送</Button></Link>
		</div>
	}

	public readAppMsg = (id: string) => {
		console.log(id)
		this.socket.emit('read_app_msg', id)
	}
	public readUserMsg = (id: string) => {
		console.log(id)
		this.socket.emit('read_user_msg', id)
	}

	render() {
		const { app_msgs, user_msgs } = this.props
		const readAppMsg = {
			title: '操作',
			dataIndex: 'handle',
			render: (value: any, row: any, index: number) => {
				return <Button onClick={() => this.readAppMsg(row._id)}>读</Button>
			}
		}
		const readUserMsg = {
			title: '操作',
			dataIndex: 'handle',
			render: (value: any, row: any, index: number) => {
				return <Button onClick={() => this.readUserMsg(row._id)}>读</Button>
			}
		}
		return (
			<div>
				<Card title={this.renderAppTitle()}>
					<Table columns={[readAppMsg, ...appColumns]} dataSource={app_msgs} />
				</Card>
				<Card title={this.renderUserTitle()} style={{ marginTop: 25 }}>
					<Table columns={[readUserMsg, ...userColumns]} dataSource={user_msgs} />
				</Card>
			</div>

		)
	}
}
export default Index
