export const resolveId = options => {
	const { source, sourceKey, sourceValueKey, dict, dictKey, dictValueKey } = options
	return source.map(item => {
		const sValue = item[sourceKey]
		const match = dict.find(dictItem => dictItem[dictKey] == sValue)
		if (match) {
			item[sourceValueKey] = match[dictValueKey]
		}
		return item
	})
}
