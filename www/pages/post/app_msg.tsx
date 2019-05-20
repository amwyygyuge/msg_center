import * as React from 'react'
import { Form, Card, Input, Select, Button, DatePicker } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import EditTable from './../../components/EditTable'
import { postAppMsg } from './../../services/msg'
const Item = Form.Item
export enum Types {
	Common,
	UpdateLog
}
const columns: any[] = [
	{
		title: '更新内容',
		dataIndex: 'log',
		renderFrom: (value: string | undefined, row: any, index: number, onChange: (arg0: string) => void) => <Input value={value} onChange={e => {
			onChange(e.target.value)
		}
		} />,
	},
]
export interface IAppProps extends FormComponentProps {

}
class AppMsg extends React.Component<IAppProps, any> {
	public post = () => {
		const { getFieldsValue } = this.props.form
		const val = getFieldsValue()
		const _val = JSON.parse(JSON.stringify(val))
		_val.data.logs = _val.data.logs.map(({ log }: { log: string }) => log)
		console.log(_val)
		postAppMsg({
			body: _val
		}).then(res => {
			console.log(res)
		})
	}

	renderUpdateInfo = () => {
		const { getFieldDecorator } = this.props.form
		return [
			<Item label="版本号">
				{
					getFieldDecorator('data.version')(
						<Input />
					)
				}
			</Item>,
			<Item label="更新日志">
				{
					getFieldDecorator('data.logs')(
						<EditTable columns={columns} />
					)
				}
			</Item>,
		]
	}

	public render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Card>
				<Form>
					<Item label="应用id">
						{
							getFieldDecorator('app_ids[0]')(
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
					<Item label="有效时间">
						{
							getFieldDecorator('lastTime')(
								<DatePicker />
							)
						}
					</Item>
					<Item label="消息类型">
						{
							getFieldDecorator('type', { initialValue: '1' })(
								<Select disabled>
									<Select.Option key={1}>更新日志</Select.Option>
								</Select>
							)
						}
					</Item>
					{this.renderUpdateInfo()}
					<Item>
						<Button type="primary" onClick={this.post}>推送</Button>
					</Item>
				</Form>
			</Card>

		)
	}
}

export default Form.create<FormComponentProps>()(AppMsg)
