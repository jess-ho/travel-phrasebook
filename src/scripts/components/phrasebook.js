import React from 'react'

export default (props) => {
	return (
		<li><p>{`${props.saved.toLang}: ${props.saved.translated} (${props.saved.toTranslate})`}</p>
			<button onClick={() => props.remove(props.saved.key)} className="remove">Remove</button>
		</li>
	)
}