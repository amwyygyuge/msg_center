import React, { Component } from 'react'
import { Button, Table, Card, Divider } from 'antd'
import Link from 'next/link'
import io from 'socket.io-client'
import { queryAppMsg } from './../services/msg'

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
class Index extends Component<Props> {
	public socket: any = null
	componentDidMount() {
		this.socket = io('http://127.0.0.1:7070/io', {
			query: {
				token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOjEwMCwidG9rZW4iOiI1YyIsInVzZXJfaWQiOjEwMCwiaWF0IjoxNTU4NDMyNDM2fQ.VtgIFc7UkoSIYiJgxgfc2EKGU5Ej53QME5dbML4jiOM'
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
		return { app_msgs }
	}

	renderAppTitle = () => {
		return <div>
			应用消息
			<Link href="/post/app_msg"><Button type="primary" style={{ marginLeft: 15 }} >推送</Button></Link>
		</div>
	}

	public readAppMsg = (id: string) => {
		console.log(id)
		this.socket.emit('read_app_msg', id)
	}

	render() {
		const { app_msgs } = this.props
		const readAppMsg = {
			title: '操作',
			dataIndex: 'handle',
			render: (value: any, row: any, index: number) => {
				return <Button onClick={() => this.readAppMsg(row._id)}>读</Button>
			}
		}

		return (
			<div>
				<Card title={this.renderAppTitle()}>
					<Table columns={[readAppMsg, ...appColumns]} dataSource={app_msgs} />
				</Card>
			</div>

		)
	}
}
export default Index
