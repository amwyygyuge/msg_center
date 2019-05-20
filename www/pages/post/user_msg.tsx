import * as React from 'react'
import { Form, Card, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { postUserMsg } from './../../services/msg'
const Item = Form.Item
export enum Types {
	Common,
	UpdateLog
}

export interface IAppProps extends FormComponentProps {

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

	public render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Card>
				<Form>
					<Item label="用户id">
						{
							getFieldDecorator('user_ids[0]')(
								<Input />
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
