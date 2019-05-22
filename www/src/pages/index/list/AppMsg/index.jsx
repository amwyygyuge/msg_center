import React, { Component } from 'react'
import HocTablePage from '@/components/HocTablePage'
import { Search } from './Search'
import { List } from './List'
import { queryAppMsg } from '@/services/msg'
import { Card } from 'igroot'
@HocTablePage({
	queryData: (params, pageInfo, state, cb) =>
		queryAppMsg().then(res => {
			if (res) {
				cb({
					dataSource: res.data
				})
			} else {
				cb(false)
			}
		}),
	pagination: false
})
class AppMsg extends Component {
	render() {
		return (
			<Card bodyStyle={{ padding: 10 }}>
				<Search />
				<List />
			</Card>
		)
	}
}

export default AppMsg
