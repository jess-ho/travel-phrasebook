import React from 'react'
import ReactDOM from 'react-dom'
import { ajax } from 'jquery'

import Header from './components/header.js'
import Footer from './components/footer.js'

class App extends React.Component {
	render() {
		return (
			<main>
				<Header />

				<form>
					<input />
					<input />

					<div></div>
					<div></div>

					<button>Submit</button>
					<button>Save</button>
				</form>

				<section>
					<ul>
						<li></li>
					</ul>
				</section>

				<Footer />
			</main>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
