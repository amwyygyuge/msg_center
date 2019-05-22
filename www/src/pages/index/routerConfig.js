/**
 * 该模块主要用于路由配置
 */

// 引入要使用的布局组件

// 引入渲染的页面模块
import { AppMsg, UserMsg } from './list'
import { PostAppMsg, PostUserMsg } from './post'

import { NotFound } from './NotFound'

/**
 * @path 路由
 * @layout 布局
 * @component 组件
 */
const routerConfig = [
	{
		path: '/',
		component: AppMsg
	},
	{
		path: '/user_list',
		component: UserMsg
	},
	{
		path: '/post_user_msg',
		component: PostUserMsg
	},
	{
		path: '/post_app_msg',
		component: PostAppMsg
	},
	{
		path: '/user_list',
		component: UserMsg
	},
	{
		path: '*',
		component: NotFound
	}
]

export default routerConfig
