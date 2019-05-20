const Subscription = require('egg').Subscription

class UpdateAppMsgStatus extends Subscription {
	// 通过 schedule 属性来设置定时任务的执行间隔等配置
	static get schedule() {
		return {
			interval: '24h', // 1 分钟间隔
			type: 'worker', // 指定所有的 worker 都需要执行
		}
	}

	// subscribe 是真正定时任务执行时被运行的函数
	async subscribe() {
		console.log('执行定时任务')

		await this.ctx.service.appMsg.updateStatus()
	}
}

module.exports = UpdateAppMsgStatus
