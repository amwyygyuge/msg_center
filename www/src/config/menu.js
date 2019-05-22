/**
 * 用于配置菜单栏
 * @name 标题
 * @path 路由
 * @icon 图标
 * @children 子菜单
 */

const siderMenuConfig = [
	{
		name: '应用消息',
		to: '/',
		iconType: 'home',
		key: '/'
	},
	{
		name: '用户消息',
		to: '/user_list',
		iconType: 'home',
		key: '/user_list'
	}
]

export { siderMenuConfig }
