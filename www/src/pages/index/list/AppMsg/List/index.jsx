import React, { Component } from 'react'
import { Row, Col, Table, Button, message, Popconfirm } from 'igroot'
import { observer, inject } from 'mobx-react'
import { resolveId } from '@/utils/tool'
import { Link } from 'react-router-dom'
@inject('dict')
@observer
export class List extends Component {
	state = {
		expandKeys: [],
		columns: [
			{
				dataIndex: 'app_id',
				title: '应用id'
			},
			{
				dataIndex: 'app_name',
				title: '应用名'
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
	}

	render () {
		const { apps } = this.props.dict.dicts
		const { dataSource } = this.props.tableProps
		const { columns } = this.state
		const _dataSource = resolveId({
			source: dataSource,
			sourceKey: 'app_id',
			sourceValueKey: 'app_name',
			dict: apps,
			dictKey: 'app_id',
			dictValueKey: 'name'
		})
		return (
			<Row>
				<Col span={24} style={{ textAlign: 'right' }}>
					<Link to="/post_app_msg">
						<Button type="primary" style={{ marginRight: 8 }}>
							推送新消息
						</Button>
					</Link>
				</Col>
				<Col span={24} style={{ marginTop: 8 }}>
					<Table
						columns={columns}
						// 组件接收到了父级的tableProps 的属性
						{...this.props.tableProps}
						dataSource={_dataSource}
					/>
				</Col>
			</Row>
		)
	}
}
