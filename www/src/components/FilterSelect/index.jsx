import React, { Component } from 'react'
import { Select } from 'igroot'
const Option = Select.Option
class FilterSelect extends Component {
	static Option = Option

	static defaultProps = {
		filterKeys: []
	}
	createFilterOption = filterKeys => {
		if (filterKeys.length === 0) {
			return (value, option) => option.props.children.includes(value)
		} else {
			const _filterKeys = [ 'children', ...filterKeys ]
			return (value, option) => {
				for (let i = 0; i < _filterKeys.length; ++i) {
					if (option.props[_filterKeys[i]] && option.props[_filterKeys[i]].includes(value)) {
						return true
					}
				}
				return false
			}
		}
	}

	render() {
		const { value, onChange, children, filterKeys } = this.props
		const filterOption = this.createFilterOption(filterKeys)
		return (
			<Select
				{...this.props}
				showSearch
				filterOption={filterOption}
				optionFilterProp='children'
				value={value}
				onChange={onChange || null}
			>
				{children}
			</Select>
		)
	}
}

export default FilterSelect
