import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
	render() {
		return (
			<header>
				<h1>Hi</h1>  
				<p>This is a paragraph</p>
			</header>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
