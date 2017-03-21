import React from 'react'

export default class Header extends React.Component {
	constructor() {
		super()
		this.state = {
			showForm: '',
			email: '',
			password: '',
			confirm: '',
			success: ''
		}
		this.toShowForm = this.toShowForm.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleSignup = this.handleSignup.bind(this)
		this.handleSignOut = this.handleSignOut.bind(this)
		this.closeForm = this.closeForm.bind(this)
	}
	toShowForm(e) {
		e.preventDefault()
		this.setState({
			showForm: e.target.className
		})
		document.getElementsByClassName('hide')[0].classList.add('overlay')
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
		.then(() => {
			this.setState({
				showForm: "",
				success: 'login'
			})
			window.setTimeout(() => {
				this.setState({
					success: ''
				})
				document.getElementsByClassName('hide')[0].classList.remove('overlay')
			}, 1000)
		})
		.catch(() => {
			alert('Please try again')
		})
	}
	handleSignup(e) {
		e.preventDefault()
		if (this.state.password === this.state.confirm) {
			firebase.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(() => {
				this.setState({
					showForm: "",
					success: 'signup'
				})
				window.setTimeout(() => {
					this.setState({
						success: ''
					})
					document.getElementsByClassName('hide')[0].classList.remove('overlay')
				}, 1000)
			})
			.catch(() => {
				alert('Please try again')
			})
		}
	}
	handleSignOut(e) {
		e.preventDefault()
		document.getElementsByClassName('hide')[0].classList.add('overlay')
		firebase.auth().signOut().then(() => {
			this.setState({
				success: 'signout'
			})
			window.setTimeout(() => {
				this.setState({
					success: ''
				})
				document.getElementsByClassName('hide')[0].classList.remove('overlay')
			}, 3000)
		})
		.catch(() => {
			alert('Please try again')
		})
	}
	closeForm() {
		this.setState({
			showForm: ''
		})
		document.getElementsByClassName('hide')[0].classList.remove('overlay')
	}
	render() {
		let loginForm = ''
		if (this.state.showForm === 'login') {
			loginForm = (
				<form onSubmit={this.handleLogin} className="loginForm">
					<i className="fa fa-times exit" aria-hidden="true" onClick={this.closeForm}></i>
					<h2>Log In to Your Account</h2>
					<label htmlFor="email">Email: </label>
					<input type="email" name="email" onChange={this.handleChange} placeholder="example@mail.com" />
					<label htmlFor="password">Password: </label>
					<input type="password" name="password" onChange={this.handleChange} placeholder="********" />
					<button>Log In</button>
				</form>
			)
		} else if (this.state.showForm === 'signup') {
			loginForm = (
				<form onSubmit={this.handleSignup} className="loginForm">
					<i className="fa fa-times exit" aria-hidden="true" onClick={this.closeForm}></i>
					<h2>Register for an Account</h2>
					<label htmlFor="email">Email: </label>
					<input type="email" name="email" onChange={this.handleChange} placeholder="example@mail.com" />
					<label htmlFor="password">Password: </label>
					<input type="password" name="password" onChange={this.handleChange} placeholder="********" />
					<label htmlFor="confirm">Confirm Password: </label>
					<input type="password" name="confirm" onChange={this.handleChange} placeholder="********" />
					<button>Sign Up</button>
				</form>
			)
		} else if (this.state.success === 'login') {
			loginForm = (
				<div className="loginForm">
					<p>You have been logged in. Enjoy your stay!</p>
				</div>
			)
		} else if (this.state.success === 'signup') {
			loginForm = (
				<div className="loginForm">
					<p>Account has been created. You have been logged in automatically. Thank you for registering!</p>
				</div>
			)
		} else if (this.state.success === 'signout') {
			loginForm = (
				<div className="loginForm">
					<p>You have been signed out. Come back soon!</p>
				</div>
			)
		} else {
			loginForm = ''
		}
		return (
			<div>
				<header>
					<h1>Travel Phrasebook</h1>
					<nav>
						<ul>
							<li><a href="" className="login" onClick={this.toShowForm}>Log In</a></li>
							<li><a href="" className="signup" onClick={this.toShowForm}>Sign Up</a></li>
							<li><a href="" className="signout" onClick={this.handleSignOut}>Sign Out</a></li>
						</ul>
					</nav>
				</header>
				{loginForm}
			</div>
		)
	}
}