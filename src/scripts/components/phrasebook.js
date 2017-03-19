import React from 'react'

export default (props) => {
	return (
		<li>{props.translated} <button onClick={() => props.remove(props.index)}>Remove</button></li>
	)
}