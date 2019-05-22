import React, { Component } from 'react'
import { Modal, Form, Input, Upload, Button, Tooltip, Icon, message } from 'igroot'
import { domain } from '@/utils/fetch'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import request from '@/api/request'
const Item = Form.Item
const updateUrl = `${domain}/api/file/upload`
function getBlobBydataURI(dataURI, type) {
	var binary = atob(dataURI.split(',')[1])
	var array = []
	for (var i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i))
	}
	return new Blob([ new Uint8Array(array) ], { type: type })
}

class PlatformModal extends Component {
	state = {
		id: undefined,
		iconUrl: '',
		iconBase64: '',
		visible: false,
		confirmLoading: false,
		crop: {}
	}

	componentWillMount() {
		this.props.getEditFunc && this.props.getEditFunc(this.open)
	}

	renderReactCrop = () => {
		const { iconUrl, crop } = this.state

		const loadImage = imgSrc =>
			new Promise((resolve, reject) => {
				const img = new Image()
				img.setAttribute('crossOrigin', 'anonymous')
				img.src = imgSrc
				img.onload = e => {
					resolve(img)
				}
			})

		const cropImage = async (imgSrc, crop) => {
			const img = await loadImage(imgSrc)
			let canvas, cropX, cropY, cropWidth, cropHeight
			// return this.loadImage(imgSrc, cropAfterLoad.bind(this))
			const imageWidth = img.naturalWidth
			const imageHeight = img.naturalHeight
			cropX = crop.x / 100 * imageWidth
			cropY = crop.y / 100 * imageHeight
			cropWidth = crop.width / 100 * imageWidth
			cropHeight = crop.height / 100 * imageHeight
			canvas = document.createElement('canvas')
			canvas.width = cropWidth
			canvas.height = cropHeight
			const _2d = canvas.getContext('2d')
			_2d.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)
			return canvas.toDataURL('image/jpeg')
		}

		const handleCropComplete = (crop, pixelCrop) => {
			cropImage(iconUrl, crop)
				.then(result => {
					message.success('裁剪成功！')
					this.setState({
						iconBase64: result,
						crop
					})
				})
				.catch(err => {
					message.error(err.message)
				})
		}
		const handleCropChange = crop => {
			this.setState({ crop })
		}
		return (
			<ReactCrop
				src={iconUrl}
				onComplete={handleCropComplete.bind(this)}
				onChange={handleCropChange}
				crop={crop}
			/>
		)
	}

	renderUpdate = () => {
		const uploadProps = {
			name: 'icon',
			action: updateUrl,
			headers: {
				Authorization: `Bearer ${window.localStorage.getItem('JWT_TOKEN')}`
			},
			onChange: info => {
				if (info.file.status !== 'uploading') {
					console.log(info.file, info.fileList)
				}
				if (info.file.status === 'done') {
					message.success(`${info.file.name} LOGO 上传成功！`)
					let url = info.file.response.data.url
					if (/\.(jpeg|img|jpg)$/.test(url)) {
						url = `${domain}${url}`
					}
					this.setState({
						iconUrl: url,
						crop: {}
					})
				} else if (info.file.status === 'error') {
					message.error(`${info.file.name} LOGO 上传失败！`)
				}
			}
		}
		return (
			<Upload {...uploadProps}>
				<Button>
					<Icon type='upload' />选择图片
				</Button>
			</Upload>
		)
	}

	open = platform => {
		if (platform) {
			const { description, name, url, icon, id, owner, owner_phone, owner_qq } = platform
			const { setFieldsValue } = this.props.form
			setFieldsValue({ description, name, url, owner, owner_phone, owner_qq })
			this.setState({ iconBase64: icon.url, iconUrl: icon.url, visible: true, id })
		} else {
			this.setState({ visible: true, id: undefined })
		}
	}
	cancel = () => {
		this.setState({
			visible: false,
			iconUrl: '',
			crop: {},
			iconBase64: ''
		})
	}

	handleSubmit = e => {
		e.preventDefault()
		const { validateFields } = this.props.form
		validateFields((err, values) => {
			if (!err) {
				const { name, url, description, owner, owner_qq, owner_phone } = values
				const { iconBase64, id } = this.state
				// const icon = logoUpload.file.response.iconPath
				if (iconBase64 === '') {
					message.error('请裁剪图片')
					return
				}
				// this.setState({ confirmLoading: true })
				const blob = getBlobBydataURI(iconBase64, 'image/png')
				const formData = new FormData()
				formData.append('files', blob, `${name}_${Date.parse(new Date())}_icon.png`)
				fetch(updateUrl, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${window.localStorage.getItem('JWT_TOKEN')}`
					},
					body: formData
				}).then(res => {
					res.json().then(json => {
						if (id) {
							const _platform = {
								id,
								name,
								url,
								description,
								icon: json.data.url,
								owner,
								owner_qq,
								owner_phone
							}
							request.graphql.updatePlatform(_platform).then(({ Platform: { update: { code } } }) => {
								if (code === 0) {
									this.cancel()
									this.props.reload()
								} else {
									message.error('更新失败')
								}
							})
						} else {
							const _platform = {
								name,
								url,
								description,
								icon: json.data.url,
								owner,
								owner_qq,
								owner_phone
							}
							request.graphql.createPlatform(_platform).then(({ Platform: { create: { code } } }) => {
								if (code === 0) {
									this.cancel()
									this.props.reload()
								} else {
									message.error('新增失败')
								}
							})
						}
					})
				})
			}
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form
		const { visible, confirmLoading } = this.state
		return (
			<Modal
				maskClosable={false}
				visible={visible}
				onCancel={this.cancel}
				onOk={this.handleSubmit}
				confirmLoading={confirmLoading}
			>
				<Form>
					<Item label='平台名称' hasFeedback>
						{getFieldDecorator('name', {
							rules: [ { required: true, message: '请输入平台名称' } ]
						})(<Input placeholder='请输入...' />)}
					</Item>
					<Item label='平台地址' hasFeedback>
						{getFieldDecorator('url', {
							rules: [ { required: true, message: '请输入平台 URL' } ]
						})(<Input placeholder='请输入...' />)}
					</Item>
					<Item label='负责人' hasFeedback>
						{getFieldDecorator('owner', {
							rules: [ { required: true, message: '请输入平台负责人' } ]
						})(<Input placeholder='请输入...' />)}
					</Item>

					<Item label='负责人电话' hasFeedback>
						{getFieldDecorator('owner_phone', {
							rules: [ { required: true, message: '请输入平台负责人电话' } ]
						})(<Input placeholder='请输入...' />)}
					</Item>

					<Item label='负责人QQ' hasFeedback>
						{getFieldDecorator('owner_qq', {
							rules: [ { required: true, message: '请输入平台负责人QQ' } ]
						})(<Input placeholder='请输入...' />)}
					</Item>
					<Item label='平台简介' hasFeedback>
						{getFieldDecorator('description', {
							rules: [ { required: true, message: '请输入平台简介' } ]
						})(<Input.TextArea placeholder='请输入平台简介' rows={6} />)}
					</Item>
					<Item label='裁剪图片'>{this.renderReactCrop()}</Item>
					<Item
						label={
							<span>
								平台 LOGO&nbsp;
								<Tooltip title='上传图片后进行裁剪'>
									<Icon type='question-circle-o' />
								</Tooltip>
							</span>
						}
					>
						{getFieldDecorator('logoUpload', {})(this.renderUpdate())}
					</Item>
				</Form>
			</Modal>
		)
	}
}

export default Form.create()(PlatformModal)
