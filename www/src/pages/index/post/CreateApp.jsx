import React, { Component } from 'react'
import HocModal, { Item } from '@/components/HocEditModal/'
import { Input, InputNumber } from 'igroot'

import { createApp } from '@/services/app'
@HocModal({
	modalProps: {
		title: '应用',
		width: 600
	},
	create: (parmas, state, cb) => {
		createApp(parmas).then(res => {
			if (res.data._id) {
				cb(true)
			} else {
				cb(false)
			}
		})
	},
	formOptions: {
		formKey: 'id'
	}
})
class CreateApp extends Component {
	render() {
		const { getFieldDecorator } = this.props.form

		return (
			<div>
				<Item label="应用名">
					{getFieldDecorator('name', {
						rules: [{ required: true }]
					})(<Input />)}
				</Item>
				<Item label="应用id">
					{getFieldDecorator('app_id', {
						rules: [{ required: true }]
					})(<InputNumber />)}
				</Item>
			</div>
		)
	}
}

export default CreateApp
