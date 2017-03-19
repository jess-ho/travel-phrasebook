import React from 'react'

export default class Translated extends React.Component {
	render() {
		return (
			<section>
				<p>{this.props.text}</p>
				<button onClick={this.props.translate}>Save</button>
			</section>
		)
	}
}