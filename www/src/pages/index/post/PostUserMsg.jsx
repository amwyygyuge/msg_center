import React from 'react'
import { Form, Card, Input, Button, Select, message } from 'igroot'
import { postUserMsg } from '@/services/msg'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router'

const Option = Select.Option
const Item = Form.Item
@inject('dict')
@observer
@withRouter
class PostUserMsg extends React.Component {
	post = () => {
		const { validateFields } = this.props.form
		validateFields((err, val) => {
			if (err) return false
			postUserMsg(val).then(({ status }) => {
				if (status === 200) {
					message.success('推送成功')
					this.props.history.push('/user_list')
				}
			})
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form
		const { staffs } = this.props.dict.dicts
		const _staffs = staffs.map(({ _id, cname }) => <Option key={_id}>{cname}</Option>)
		return (
			<Card>
				<Form>
					<Item label="用户">
						{getFieldDecorator('user_ids[0]', { rules: [{ required: true }] })(
							<Select showSearch allowClear optionFilterProp="children">
								{_staffs}
							</Select>
						)}
					</Item>
					<Item label="消息标题">
						{getFieldDecorator('title', { rules: [{ required: true }] })(<Input />)}
					</Item>
					<Item label="消息描述">{getFieldDecorator('describe')(<Input.TextArea />)}</Item>
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

export default Form.create()(PostUserMsg)
