import * as React from 'react'
import { Form, Card, Input, Button, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { postUserMsg } from './../../services/msg'
import { queryStaff } from './../../services/staff'

const Option = Select.Option
const Item = Form.Item
export enum Types {
	Common,
	UpdateLog
}

export interface IAppProps extends FormComponentProps {
	staffs: any[]
}
class AppMsg extends React.Component<IAppProps, any> {
	public post = () => {
		const { getFieldsValue } = this.props.form
		const val = getFieldsValue()
		const _val = JSON.parse(JSON.stringify(val))

		postUserMsg({
			body: _val
		}).then(res => {
			console.log(res)
		})
	}
	static async getInitialProps(): Promise<any> {
		const staffs = await queryStaff({ method: 'GET' })
		return { staffs }
	}

	public render() {
		const { getFieldDecorator } = this.props.form
		const { staffs } = this.props
		const _staffs = staffs.map(({ _id, cname }) => <Option key={_id}>{cname}</Option>)
		return (
			<Card>
				<Form>
					<Item label="用户">
						{
							getFieldDecorator('user_ids[0]')(
								<Select showSearch allowClear optionFilterProp="children">
									{_staffs}
								</Select>
							)
						}
					</Item>
					<Item label="消息标题">
						{
							getFieldDecorator('title')(
								<Input />
							)
						}
					</Item>
					<Item label="消息描述">
						{
							getFieldDecorator('describe')(
								<Input.TextArea />
							)
						}
					</Item>
					<Item>
						<Button type="primary" onClick={this.post}>推送</Button>
					</Item>
				</Form>
			</Card>

		)
	}
}

export default Form.create<FormComponentProps>()(AppMsg)
