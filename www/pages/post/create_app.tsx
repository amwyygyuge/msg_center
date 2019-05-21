import * as React from 'react'
import { Form, Card, Input, Button, InputNumber, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { createApp } from './../../services/app'
import Router from 'next/router'
const Item = Form.Item
export enum Types {
	Common,
	UpdateLog
}

export interface IAppProps extends FormComponentProps {
	staffs: any[]
}
class AppMsg extends React.Component<IAppProps, any> {
	public create = () => {
		const { validateFields } = this.props.form
		validateFields((err, val) => {
			if (err) return
			const _val = JSON.parse(JSON.stringify(val))
			createApp({
				body: _val
			}).then(res => {
				console.log(res)
				message.success('新建成功')
				setTimeout(() => {
					Router.back()
				}, 1500)
			})
		})

	}

	public render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Card>
				<Form>

					<Item label="应用名">
						{
							getFieldDecorator('name', {
								rules: [{ required: true }]
							})(
								<Input />
							)
						}
					</Item>
					<Item label="应用id">
						{
							getFieldDecorator('app_id', {
								rules: [{ required: true }]
							})(
								<InputNumber />
							)
						}
					</Item>
					<Item>
						<Button type="primary" onClick={this.create}>创建</Button>
					</Item>
				</Form>
			</Card>

		)
	}
}

export default Form.create<FormComponentProps>()(AppMsg)
