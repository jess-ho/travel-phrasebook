import React from 'react'

export default (props) => {
	return (
		<li>{props.saved.langAbbrev}
			<button onClick={() => props.remove(props.saved.key)}>Remove</button>
		</li>
	)
}