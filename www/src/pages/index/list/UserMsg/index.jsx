import React, { Component } from 'react'
import HocTablePage from '@/components/HocTablePage'
import { Search } from './Search'
import { List } from './List'
import { queryUserMsg } from '@/services/msg'
import { Card } from 'igroot'
@HocTablePage({
	queryData: (params, pageInfo, state, cb) =>
		queryUserMsg().then(res => {
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
class UserMsg extends Component {
	render() {
		return (
			<Card bodyStyle={{ padding: 10 }}>
				<Search />
				<List />
			</Card>
		)
	}
}

export default UserMsg
