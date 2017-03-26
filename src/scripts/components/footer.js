import React from 'react'

export default class Footer extends React.Component {
	render() {
		return (
			<footer>
				<div>
					<p className="credit">Powered by <a href="http://translate.yandex.com/">Yandex.Translate</a></p>
					<div className="endNote">
					<p>&copy; Jessica Ho | Front-End Web Dev</p>
					<div>
						<a href="https://twitter.com/thisisJessHo"><i className="fa fa-twitter" aria-hidden="true"></i></a>
						<a href="https://github.com/jess-ho/travel-phrasebook"><i className="fa fa-github-alt" aria-hidden="true"></i></a>
						<a href="http://codepen.io/kaistelle/"><i className="fa fa-codepen" aria-hidden="true"></i></a>
					</div>
					</div>
				</div>
			</footer>
		)
	}
}