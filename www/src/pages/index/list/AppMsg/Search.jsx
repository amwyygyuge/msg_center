import React, { Component } from 'react'
import { Row, Col, Input } from 'igroot'
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 }
}
class Search extends Component {
	render() {
		const { getFieldDecorator } = this.props.form
		const { Item } = this.props
		return (
			<Row>
				<Col span={24}>{this.props.renderButtons()}</Col>
			</Row>
		)
	}
}
export { Search }
