import React, { Component } from 'react'

import FrameLayout from 'igroot-frame-layout'
import { siderMenuConfig } from '@/config/menu'

import { domain } from '@/utils/fetch'

export class BasicLayout extends Component {
	render() {
		const { history } = this.props

		return (
			<FrameLayout
				apiDomain={domain}
				appName="消息推送"
				// logo='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
				mode="header" // 三种可选的布局模式：sider+header;sider;header(其中默认模式为：sider+header)
				myHistory={history} // 自定义 history 对象
				menus={siderMenuConfig} // 菜单名数据(在接入sso之后这个属性可以去掉)
			>
				{this.props.children}
			</FrameLayout>
		)
	}
}
