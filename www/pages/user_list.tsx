import React, { Component } from 'react'
import { Button, Table, Card } from 'antd'
import Link from 'next/link'
import io from 'socket.io-client'
import { queryUserMsg } from './../services/msg'
import { queryStaff } from './../services/staff'
interface Props {
	project: any
	app_msgs: any[]
	user_msgs: any[]
}
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
		const user_msgs = await queryUserMsg({})
		const staffs = await queryStaff({ method: 'GET' })
		return { user_msgs, staffs }
	}

	renderUserTitle = () => {
		return <div>
			用户消息
			<Link href="/post/user_msg"><Button type="primary" style={{ marginLeft: 15 }} >推送</Button></Link>
		</div>
	}

	public readUserMsg = (id: string) => {
		console.log(id)
		this.socket.emit('read_user_msg', id)
	}

	render() {
		const { user_msgs } = this.props

		const readUserMsg = {
			title: '操作',
			dataIndex: 'handle',
			render: (_value: any, row: any) => {
				return <Button onClick={() => this.readUserMsg(row._id)}>读</Button>
			}
		}
		return (
			<div>
				<Card title={this.renderUserTitle()} style={{ marginTop: 25 }}>
					<Table columns={[ readUserMsg, ...userColumns ]} dataSource={user_msgs} />
				</Card>
			</div>

		)
	}
}
export default Index
