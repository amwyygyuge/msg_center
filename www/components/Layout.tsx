import React from 'react'
import Head from 'next/head'
import { Layout, Menu, Icon } from 'antd'

const { Content, Sider } = Layout
const SubMenu = Menu.SubMenu
interface Props {
	children: JSX.Element
	name: string
}

export default function BaseLayout(props: Props) {
	return (
		<div>
			<Head>
				<title>消息推送</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Layout style={{ minHeight: '100vh' }}>
				{/* <Sider>
					<div className='logo' />
					<Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
						<Menu.Item key='1'>
							<Icon type='pie-chart' />
							<span>Option 1</span>
						</Menu.Item>
						<Menu.Item key='2'>
							<Icon type='desktop' />
							<span>Option 2</span>
						</Menu.Item>
						<SubMenu
							key='sub1'
							title={
								<span>
									<Icon type='user' />
									<span>User</span>
								</span>
							}
						>
							<Menu.Item key='3'>Tom</Menu.Item>
							<Menu.Item key='4'>Bill</Menu.Item>
							<Menu.Item key='5'>Alex</Menu.Item>
						</SubMenu>
						<SubMenu
							key='sub2'
							title={
								<span>
									<Icon type='team' />
									<span>Team</span>
								</span>
							}
						>
							<Menu.Item key='6'>Team 1</Menu.Item>
							<Menu.Item key='8'>Team 2</Menu.Item>
						</SubMenu>
						<Menu.Item key='9'>
							<Icon type='file' />
							<span>File</span>
						</Menu.Item>
					</Menu>
				</Sider> */}
				<Layout>
					<Content style={{ margin: '15px' }}>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{props.children}</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}
