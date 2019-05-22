import React from 'react'
import { Form, Card, Input, Select, Button, DatePicker, message } from 'igroot'
import EditTable from 'igroot-edit-table'
import { postAppMsg } from '@/services/msg'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import CreateApp from './CreateApp'
import { withRouter } from 'react-router'
const Item = Form.Item
const Option = Select.Option

const columns = [
	{
		title: '更新内容',
		dataIndex: 'log',
		renderForm: (value, _row, _index, onChange) => (
			<Input
				value={value}
				onChange={e => {
					onChange(e.target.value)
				}}
			/>
		)
	}
]
@inject('dict')
@observer
@withRouter
class PostAppMsg extends React.Component {
	state = {
		type: '1'
	}

	post = () => {
		const { validateFields } = this.props.form
		validateFields((err, val) => {
			if (err) return false
			val.data.logs = val.data.logs.map(({ log }) => log)
			postAppMsg(val).then(({ status }) => {
				if (status === 200) {
					message.success('推送成功')
					this.props.history.push('/')
				}
			})
		})
	}

	typeChange = type => {
		this.setState({ type })
		const { setFieldsValue } = this.props.form
		setFieldsValue({
			data: undefined
		})
	}

	renderUpdateInfo = () => {
		const { getFieldDecorator } = this.props.form
		return [
			<Item key={1} label="版本号">
				{getFieldDecorator('data.version', { rules: [{ required: true }] })(<Input />)}
			</Item>,
			<Item key={2} label="更新日志">
				{getFieldDecorator('data.logs', { rules: [{ required: true }] })(
					<EditTable columns={columns} />
				)}
			</Item>
		]
	}

	render() {
		const { type } = this.state
		const { getFieldDecorator } = this.props.form
		const { apps, appMsgTypes } = this.props.dict.dicts
		const _apps = apps.map(({ app_id, name }) => <Option key={app_id}>{name}</Option>)
		const _appMsgTypes = appMsgTypes.map(({ label, value }) => <Option key={value}>{label}</Option>)
		return (
			<Card>
				<CreateApp getCreateFunction={func => (this.createApp = func)} />
				<Form>
					<Item label="应用">
						{getFieldDecorator('app_ids[0]', { rules: [{ required: true }] })(
							<Select
								showSearch
								allowClear
								optionFilterProp="children"
								style={{ width: '50%', marginRight: 15 }}
							>
								{_apps}
							</Select>
						)}
						<Button type="primary" onClick={this.createApp}>
							添加应用
						</Button>
					</Item>

					<Item label="消息标题">
						{getFieldDecorator('title', { rules: [{ required: true }] })(<Input />)}
					</Item>
					<Item label="消息描述">{getFieldDecorator('describe')(<Input.TextArea />)}</Item>
					<Item label="有效时间">
						{getFieldDecorator('lastTime', {
							initialValue: moment().add(1, 'years'),
							rules: [{ required: true }]
						})(<DatePicker />)}
					</Item>
					<Item label="消息类型">
						{getFieldDecorator('type', { initialValue: '1' })(
							<Select onChange={this.typeChange}>{_appMsgTypes}</Select>
						)}
					</Item>
					{type === '1' ? this.renderUpdateInfo() : null}
					<Item>
						<Button type="primary" onClick={this.post}>
							推送
						</Button>
					</Item>
				</Form>
			</Card>
		)
	}
}

export default Form.create()(PostAppMsg)
