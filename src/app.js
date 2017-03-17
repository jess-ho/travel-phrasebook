import React from 'react'
import ReactDOM from 'react-dom'
import { ajax } from 'jquery'

import Header from './components/header.js'
import Translated from './components/translated.js'
import Phrasebook from './components/phrasebook.js'
import Footer from './components/footer.js'

const API_KEY = 'trnsl.1.1.20170315T202905Z.6be093cc8dd06cdb.389999d1b18d001916b3e5e72fba8e41712b3386'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			langs: [], // list of languages for dropdown
			langAbbrev: "", // when form is submitted, find the language code key
			translate: "", // when form is submitted, find the input text
			translated: [], // translated text
			saved: [], // list of saved texts
			value: '' // to disable the input
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleRemove = this.handleRemove.bind(this)
	}
	componentDidMount() {
		ajax({
			url: 'https://translate.yandex.net/api/v1.5/tr.json/getLangs',
			method: 'GET',
			dataType: 'jsonp',
			data: {
				key: API_KEY,
				ui: 'en'
			}
		}).then((res) => {
			const languages = []
			for (let lang in res.langs) {
				languages.push({
					languageCode: lang,
					languageName: res.langs[lang]
				})
			}
			this.setState({
				langs: languages
			})
		})
	}
	render() {
		const sortedList = Array.from(this.state.langs).sort((a,b) => {
			if(a.languageName < b.languageName) {
				return -1;
			}
			if(a.languageName > b.languageName) {
				return 1;
			}
			return 0
		});
		const langList = sortedList.map((lang, i) => {
			return (
				<option key={`lang-${i}`} value={lang.languageCode}>
					{lang.languageName}
				</option>
			)
		})	
		// const translatedText
		/*disabled={!this.state.value}*/
		return (
			<div>
				<Header />

				<main>
					<form action="" onSubmit={this.handleSubmit}>
						<select id="" name="langAbbrev" onChange={this.handleSelect} value={this.state.langAbbrev}>
							{langList}
						</select>

						<input type="text" name="translate" value={this.state.translate} onChange={this.handleChange} />
						<button>Translate</button>
					</form>
				</main>

				<Translated text={this.state.translated.toString()} translate={this.handleSave} />

				<section>
					<ul>
						{this.state.saved.map((text, i) => {
							return (
								<Phrasebook key={`text-${i}`} translated={text} index={i} remove={this.handleRemove} />
							)
						})}
					</ul>
				</section>

				<Footer />
			</div>
		)
	}
	handleSelect(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleSubmit(e) {
		e.preventDefault()
		ajax({
			url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
			method: 'GET',
			dataType: 'jsonp',
			data: {
				key: API_KEY,
				text: this.state.translate,
				lang: this.state.langAbbrev
			}
		}).then((data) => {
			this.setState({
				translated: data.text
			})
		})
	}
	handleSave(e) {
		e.preventDefault()
		if (this.state.translated !== []) {
			const savedState = Array.from(this.state.saved)
			savedState.push(`${this.state.translated} (${this.state.translate})`)
			this.setState({
				// translate: "",
				translated: [],
				saved: savedState 
			})
		}
	}
	handleRemove(index) {
		const savedState = Array.from(this.state.saved)
		savedState.splice(index, 1)
		this.setState({
			saved: savedState
		})
	}
}

ReactDOM.render(<App />, document.getElementById('app'))