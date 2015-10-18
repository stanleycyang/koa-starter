import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Koa Starter Kit</h1>
        <p>Courtesy of Stanley Yang</p>
      </div>
    )
  }
}

App.propTypes = {}
App.defaultProps = {}

ReactDOM.render(<App />, document.querySelector('#react-app'))
