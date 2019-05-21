import React from "react"
import Head from "next/head"
import { Layout, Menu, Icon } from "antd"
import Link from 'next/link'
const { Content, Sider } = Layout
interface Props {
	children: JSX.Element
	name: string
}

export default function BaseLayout(props: Props) {
	return (
		<div>
			<Head>
				<title>消息推送</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider>
					<div className="logo" />
					<Menu theme="dark" mode="inline">
						<Menu.Item key="1">
							<Icon type="pie-chart" />
							<Link href="/user_list">
								<span>用户消息</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="2">
							<Icon type="desktop" />
							<Link href="/index">
								<span>应用消息</span>
							</Link>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Content style={{ margin: "15px" }}>
						<div style={{ padding: 24, background: "#fff", minHeight: 360 }}>{props.children}</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}
