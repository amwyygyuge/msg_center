import * as React from 'react'
import { Form, Card, Input, Select, Button, DatePicker } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import EditTable from './../../components/EditTable'
import { postAppMsg } from './../../services/msg'
import { queryApp } from './../../services/app'
import Link from 'next/link'
import moment from 'moment'
const Item = Form.Item
const Option = Select.Option
export enum Types {
	Common,
	UpdateLog
}
const columns: any[] = [
	{
		title: '更新内容',
		dataIndex: 'log',
		renderFrom: (value: string | undefined, _row: any, _index: number, onChange: (arg0: string) => void) => <Input value={value} onChange={e => {
			onChange(e.target.value)
		}
		} />,
	},
]
export interface IAppProps extends FormComponentProps {
	apps: any[]
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

	static async getInitialProps(): Promise<any> {
		const apps = await queryApp({ method: 'GET' })
		return { apps }
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

	public createApp = () => {

	}

	public render() {
		const { getFieldDecorator } = this.props.form
		const { apps } = this.props
		const _apps = apps.map(({ app_id, name }) => <Option key={app_id}>{name}</Option>)

		return (
			<Card>
				<Form>
					<Item label="应用">
						{
							getFieldDecorator('app_ids[0]')(
								<Select showSearch allowClear optionFilterProp="children" style={{ width: '50%', marginRight: 15 }}>
									{_apps}
								</Select>
							)
						}
						<Link href="/post/create_app"><Button type="primary" onClick={this.createApp} >添加应用</Button></Link>
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
							getFieldDecorator('lastTime', { initialValue: moment().add(1, 'years') })(
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
