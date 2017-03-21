import React from 'react'
import ReactDOM from 'react-dom'
import { ajax } from 'jquery'

import Header from './components/header.js'
import Translated from './components/translated.js'
import Phrasebook from './components/phrasebook.js'
import Footer from './components/footer.js'

const config = {
	apiKey: "AIzaSyCAcz0upgMCbR_6PUinLzbeiODXNkNBnyQ",
	authDomain: "travel-phrasebook.firebaseapp.com",
	databaseURL: "https://travel-phrasebook.firebaseio.com",
	storageBucket: "travel-phrasebook.appspot.com",
	messagingSenderId: "491743154380"
};
firebase.initializeApp(config);

const API_KEY = 'trnsl.1.1.20170315T202905Z.6be093cc8dd06cdb.389999d1b18d001916b3e5e72fba8e41712b3386'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			langs: [], // list of languages for dropdown
			langAbbrev: "", // when form is submitted, find the language code key
			toTranslate: "", // when form is submitted, find the input text
			translated: "", // translated text
			toLang: "",
			saved: [], // list of saved texts
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

		// maybe put this in the header? dunno
		const dbRef = firebase.database().ref()
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				dbRef.on('value', (data) => {
					const phraseData = data.val()
					const savedPhrases = []
					for (let phraseKey in phraseData) {
						phraseData[phraseKey].key = phraseKey
						savedPhrases.push(phraseData[phraseKey])
					}
					this.setState({
						saved: savedPhrases
					})
				})
			} else {
				
			}
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
				<option key={i} value={lang.languageCode}>
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
					<section className="toTranslate">
						<h2>Translation</h2>
						<form action="" onSubmit={this.handleSubmit}>
							<label htmlFor="langAbbrev">Choose your language: </label>
							<select id="" name="langAbbrev" onChange={this.handleSelect}>
								{langList}
							</select>
							
							<label htmlFor="toTranslate">Enter text here: </label>
							<input type="text" name="toTranslate" onChange={this.handleChange} value={this.state.toTranslate} placeholder="Good Morning!" />
							<button>Translate</button>
						</form>
					
						<Translated text={this.state.translated} translate={this.handleSave} />
					</section>

					<section className="toSave">
						<h2>Phrasebook</h2>
						<ul>
							{this.state.saved.map((text, i) => {
								return <Phrasebook key={text.key} saved={text} remove={this.handleRemove} />
							})}
						</ul>
					</section>
				</main>

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
				text: this.state.toTranslate,
				lang: this.state.langAbbrev
			}
		}).then((data) => {
			this.setState({
				toLang: data.lang,
				translated: data.text
			})
		})
	}
	handleSave(e) {
		e.preventDefault()
		const savedState = {
			langAbbrev: this.state.langAbbrev,
			toTranslate: this.state.toTranslate,
			translated: this.state.translated,
			toLang: this.state.toLang
		}
		this.setState({
			langAbbrev: "",
			toTranslate: "",
			translated: ""
		})
		const dbRef = firebase.database().ref()
		dbRef.push(savedState)
	}
	handleRemove(removePhrase) {
		const dbRef = firebase.database().ref(removePhrase)
		dbRef.remove()
	}
}

ReactDOM.render(<App />, document.getElementById('app'))