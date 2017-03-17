import React from 'react'
import ReactDOM from 'react-dom'
import { ajax } from 'jquery'

const API_KEY = 'trnsl.1.1.20170315T202905Z.6be093cc8dd06cdb.389999d1b18d001916b3e5e72fba8e41712b3386'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			langs: [], // list of languages for dropdown
			langAbbrev: "", // when form is submitted, find the language code key
			translate: "", // when form is submitted, find the translated text
			translated: "",
			saved: [],
			value: '' // to disable the input
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.handleSave = this.handleSave.bind(this)
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
		// console.log(this.state.langs)
		const sortedList = Array.from(this.state.langs).sort((a,b) => {
			if(a.languageName < b.languageName) {
				return -1;
			}
			if(a.languageName > b.languageName) {
				return 1;
			}
			return 0
		});
		// console.log(sortedList);
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
			<main>
				<form action="" onSubmit={this.handleSubmit}>
					<select id="" name="langAbbrev" onChange={this.handleSelect} value={this.state.langAbbrev}>
						{langList}
					</select>

					<input type="text" name="translate" value={this.state.translate} onChange={this.handleChange} />
					<button>Translate</button>
				</form>

				<section>
					{this.state.translated.toString()}
					<button onClick={this.handleSave}>Save</button>
				</section>

				<section>
					<ul>
						{this.state.saved.map((text, i) => {
							return (
								<li key={`text-${i}`}>{text}</li>
							)
						})}
					</ul>
				</section>
			</main>
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
		console.log(this.state.translated)
	}
	handleSave(e) {
		e.preventDefault()
		if (this.state.translated !== "") {
			const savedState = Array.from(this.state.saved)
			savedState.push(this.state.translated)
			this.setState({
				saved: savedState
			})
		}
	}
}

ReactDOM.render(<App />, document.getElementById('app'))


// componentDidMount for dropdown
// new event function to call ajax after submit