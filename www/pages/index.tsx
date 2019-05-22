import React, { Component } from 'react'
import { Button, Table, Card } from 'antd'
import Link from 'next/link'
import { init } from './../services/io'
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
		this.socket = init()
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
			render: (_value: any, row: any) => {
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
