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
			translated: "Translation here", // translated text
			toLang: "",
			saved: [], // list of saved texts
			loggedin: false
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

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.database().ref(`users/${user.uid}/phrases`).on('value', (data) => {
					const phraseData = data.val()
					const savedPhrases = []
					for (let phraseKey in phraseData) {
						phraseData[phraseKey].key = phraseKey
						savedPhrases.push(phraseData[phraseKey])
					}
					this.setState({
						saved: savedPhrases,
						loggedin: true
					})
				})
			} else {
				this.setState({
					saved: [],
					loggedin: false
				})
			}
		})
	}
	phrasebook() {
		if (this.state.loggedin === true) {
			return this.state.saved.map((text, i) => {
				return <Phrasebook key={text.key} saved={text} remove={this.handleRemove} />
			})
		} else {
			return (
				<p>Log in to save your favourite phrases!</p>
			)
		}
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
		return (
			<div>
				<Header />

				<main>
					<div className="hide"></div>
					<section className="toTranslate">
						<form action="" onSubmit={this.handleSubmit}>
							<h2>Original Text</h2>
							<div>
								<label htmlFor="langAbbrev">Choose your language: </label>
								<select id="" name="langAbbrev" onChange={this.handleSelect}>
									{langList}
								</select>
							</div>
							
							<div>
								<label htmlFor="toTranslate">Enter text here: </label>
								<input type="text" name="toTranslate" onChange={this.handleChange} value={this.state.toTranslate} placeholder="i.e. Good Morning!" />
							</div>
							<button>Translate</button>
						</form>
					
						<Translated text={this.state.translated} translate={this.handleSave} />
					</section>

					<section className="toSave">
						<h2>Phrasebook</h2>
						<ul>
							{this.phrasebook()}
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
		}).fail(() => {
			alert('Try again!')
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
			toTranslate: "",
			translated: "Translation here"
		})
		if (this.state.langAbbrev !== "" && this.state.toTranslate !== "" && this.state.translated !== "" && this.state.toLang !== "") {
			const userId = firebase.auth().currentUser.uid
			const dbRef = firebase.database().ref(`users/${userId}/phrases`)
			dbRef.push(savedState)
		} else {
			alert('Try again')
		}
	}
	handleRemove(removePhrase) {
		const userId = firebase.auth().currentUser.uid
		const dbRef = firebase.database().ref(`users/${userId}/phrases/${removePhrase}`)
		dbRef.remove()
	}
}

ReactDOM.render(<App />, document.getElementById('app'))