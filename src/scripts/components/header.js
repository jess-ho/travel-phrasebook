import React from 'react'

export default class Header extends React.Component {
	constructor() {
		super()
		this.state = {
			showForm: '',
			email: '',
			password: '',
			confirm: ''
		}
		this.loginForm = this.loginForm.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleSignup = this.handleSignup.bind(this)
	}
	toShowForm(e) {
		e.preventDefault()
		this.setState({
			showForm: e.target.className
		})
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
		console.log(this.state.email)
		console.log(this.state.password)
	}
	handleLogin(e) {
		e.preventDefault()
		firebase.auth()
		.signInWithEmailAndPassword(this.state.email, this.state.password)
		.then((user) => {
			console.log(user)
		})
	}
	render() {
		let loginForm = ''
		if (this.state.showForm === 'login') {
			loginForm = (
				<form onSubmit={this.handleLogin}>
					<label htmlFor="email">Email: </label>
					<input type="email" name="email" onChange={this.handleChange} />
					<label htmlFor="password">Password: </label>
					<input type="password" name="password" onChange={this.handleChange} />
					<button>Log In</button>

					<div>
						<p>Don't have an account? <a href="">Sign Up</a></p>
					</div>
				</form>
			)
		} 
		return (
			<header>
				<h1>Portable Phrasebook</h1>
				<nav>
					<ul>
						<li><a href="">Translate</a></li>
						<li><a href="">Phrasebook</a></li>
						<li><a href="" className="login" onClick={this.toShowForm}>Log In</a></li>
						<li><a href="" className="signup" onClick={this.toShowForm}>Sign Up</a></li>
					</ul>
				</nav>
				{loginForm}
			</header>
		)
	}
}