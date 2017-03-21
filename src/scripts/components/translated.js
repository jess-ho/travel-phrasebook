import React from 'react'

export default class Translated extends React.Component {
	render() {
		return (
			<div className="translated">
				<h2>Translation</h2>
				<p className="credit">Powered by <a href="http://translate.yandex.com/">Yandex.Translate</a></p>
				<p className="translation">{this.props.text}</p>
				<button onClick={this.props.translate}>Save</button>
			</div>
		)
	}
}