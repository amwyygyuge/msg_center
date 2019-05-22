import React from 'react'
import './index.css'
const Line = props => (
	<div>
		<h2 className='igroot-line'>{props.title}</h2>
		<div className='igroot-line-wrapper'>{props.children}</div>
	</div>
)

export default Line
