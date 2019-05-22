/**
 * 应用入口
 */
import React, { Component } from 'react'
import RouterConfig from './../../components/RouterConfig'
import { BasicLayout } from '@/components/BasicLayout'
import { Provider } from 'mobx-react'
import { dictStore } from '@/store'
import { hot } from '#'
// 路由配置
import config from './routerConfig'
// 接入登录的时候取消下面这一行的注释
// @hot(module)
class App extends Component {
	render() {
		return (
			<Provider dict={dictStore}>
				<RouterConfig config={config} Container={BasicLayout} />
			</Provider>
		)
	}
}

export default App
