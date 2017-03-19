import React from 'react'

export default class Header extends React.Component {
	render() {
		return (
			<header>
				<h1>Portable Phrasebook</h1>
				<nav>
					<ul>
						<li>Translate</li>
						<li>Phrasebook</li>
					</ul>
				</nav>
			</header>
		)
	}
}