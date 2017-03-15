import React from 'react'
import ReactDOM from 'react-dom'
import { ajax } from 'jquery'

const API_KEY = 'trnsl.1.1.20170315T202905Z.6be093cc8dd06cdb.389999d1b18d001916b3e5e72fba8e41712b3386'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			langs: []
		}
	}
	componentDidMount() {
		ajax({
			url: 'https://translate.yandex.net/api/v1.5/tr.json/getLangs',
			method: 'GET',
			dataType: 'json',
			data: {
				key: API_KEY,
				ui: 'en'
			}
		}).then((res) => {
			this.setState({
				langs: Object.values(res.langs)
			})
		})
	}
	render() {
		const languages = this.state.langs.sort().map((lang, i) => {
			return (
				<option value="" key={`lang-${i}`}>
					{lang}
				</option>
			)
		})
		return (
			<main>
				<form action="" onSubmit={handleSubmit}>
					<select name="" id="">
						{languages}
					</select>

					<input type="text"/>
					<button>Translate</button>
				</form>


			</main>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
