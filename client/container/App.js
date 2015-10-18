import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class App extends Component {
  render() {
    return (
      <h1>Hello world</h1>
    )
  }
}

App.propTypes = {}
App.defaultProps = {}

ReactDOM.render(<App />, document.querySelector('#react-app'))
