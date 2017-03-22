import React from 'react'

export default class Footer extends React.Component {
	render() {
		return (
			<footer>
				<div>
					<p>&copy; Jessica Ho | HackerYou Student</p>
					<div>
						<a href="https://twitter.com/thisisJessHo"><i className="fa fa-twitter" aria-hidden="true"></i></a>
						<a href="https://github.com/jess-ho/travel-phrasebook"><i className="fa fa-github-alt" aria-hidden="true"></i></a>
						<a href="http://codepen.io/kaistelle/"><i className="fa fa-codepen" aria-hidden="true"></i></a>
					</div>
				</div>
			</footer>
		)
	}
}