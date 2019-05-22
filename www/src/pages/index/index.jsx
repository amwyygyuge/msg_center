import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'

// App
import App from './App'
import { LocaleProvider } from 'igroot'
import zh_CN from 'igroot/lib/locale-provider/zh_CN'

const render = App =>
	ReactDOM.render(
		<LocaleProvider locale={zh_CN}>
			<App />
		</LocaleProvider>,
		document.getElementById('-container')
	)

render(App)

if (module.hot) {
	module.hot.accept('./App', () => render(App))
}
