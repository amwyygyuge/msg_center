import React, { Component } from 'react'
import { Row, Col, Table, Button, message, Popconfirm } from 'igroot'
import { Link } from 'react-router-dom'
import { resolveId } from '@/utils/tool'
import { observer, inject } from 'mobx-react'
@inject('dict')
@observer
export class List extends Component {
	state = {
		expandKeys: [],
		columns: [
			{
				dataIndex: 'user_id',
				title: '用户id'
			},
			{
				dataIndex: 'user_name',
				title: '用户名'
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
	}

	render () {
		const { staffs } = this.props.dict.dicts
		const { dataSource } = this.props.tableProps
		const { columns } = this.state
		const _dataSource = resolveId({
			source: dataSource,
			sourceKey: 'user_id',
			sourceValueKey: 'user_name',
			dict: staffs,
			dictKey: '_id',
			dictValueKey: 'cname'
		})
		return (
			<Row>
				<Col span={24} style={{ textAlign: 'right' }}>
					<Link to="/post_user_msg">
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
