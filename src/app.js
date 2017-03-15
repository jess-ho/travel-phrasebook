import React from 'react'
import ReactDOM from 'react-dom'
import { ajax } from 'jquery'

import Header from './components/header.js'
import Footer from './components/footer.js'

const translate = require('google-translate-api');

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			phrase: '',
			phraseLog: []
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount() {
		translate('Ik spreek Engels', {to: 'en'}).then(res => {
		    console.log(res.text);
		    //=> I speak English
		    console.log(res.from.language.iso);
		    //=> nl
		}).catch(err => {
		    console.error(err);
		});
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: [e.target.value]
		})
	}
	handleSubmit(e) {
		e.preventDefault()

	}
	render() {
		return (
			<main>
				<Header />

				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleChange}/>
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
