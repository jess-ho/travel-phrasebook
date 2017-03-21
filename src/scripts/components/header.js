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
		this.toShowForm = this.toShowForm.bind(this)
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
	}
	handleLogin(e) {
		e.preventDefault()
		firebase.auth()
		.signInWithEmailAndPassword(this.state.email, this.state.password)
		.then((user) => {
			console.log(user)
		})
	}
	handleSignup(e) {
		e.preventDefault()
		if (this.state.password === this.state.confirm) {
			firebase.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then((data) => {
				console.log(data)
			})
		}
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
				</form>
			)
		} else if (this.state.showForm === 'signup') {
			loginForm = (
				<form onSubmit={this.handleSignup}>
					<label htmlFor="email">Email: </label>
					<input type="email" name="email" onChange={this.handleChange} />
					<label htmlFor="password">Password: </label>
					<input type="password" name="password" onChange={this.handleChange} />
					<label htmlFor="confirm">Confirm Password: </label>
					<input type="password" name="confirm" onChange={this.handleChange} />
					<button>Sign Up</button>
				</form>
			)
		}
		return (
			<div>
				<header>
					<h1>Porta-Phrase</h1>
					<nav>
						<ul>
							<li><a href="" className="login" onClick={this.toShowForm}>Log In</a></li>
							<li><a href="" className="signup" onClick={this.toShowForm}>Sign Up</a></li>
						</ul>
					</nav>
				</header>
				{loginForm}
			</div>
		)
	}
}