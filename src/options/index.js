import React from 'react'
import ReactDOM from 'react-dom'

class Options extends React.Component {
  constructor (props) {
    super(props);
    this.displayName = 'Options';
    this.state = {
      options: {
        auth_key: null,
        auth_hash_id: null
      },
      savedOptions: {

      }
    }
  }

  componentDidMount () {
    chrome.storage.sync.get(null, (items) => {this.setState({options:items, savedOptions:items})})
  }

  handleChange (valueName) {
    let setState = ::this.setState
    return function optionsChangeHandler (newValue) {
      setState(previousState => {
        return {options:
          {...previousState.options, [valueName]: newValue}
        }
      })
    }
  }

  valueLink (valueName) {
    let optionsComp = this
    return {
      value: optionsComp.state.options[valueName],
      requestChange: optionsComp.handleChange(valueName)
    }
  }

  handleSave () {
    console.log('saving', this.state.options)
    chrome.storage.sync.set(this.state.options, this.handleOptionsSet.bind(this))
  }

  handleOptionsSet () {
    chrome.storage.sync.get(null, (items) => {this.setState({savedOptions:items})})
  }

  render () {
    return (<section id='options'>
      <h1>API Credentials</h1>
      <label>
        auth key:
        <input id="auth_key" valueLink={this.valueLink('auth_key')} type="text"/>
      </label>
      <br/>
      <label>
        project hash id
        <input type="text" id="hash_id" valueLink={this.valueLink('auth_hash_id')}/>
      </label>
      <br/>
      <button type="submit" onClick={this.handleSave.bind(this)}>Save</button>
      <br/>
      auth key: {this.state.savedOptions.auth_key} | hash_id: {this.state.savedOptions.auth_hash_id}
    </section>)
  }
}


ReactDOM.render(
  <Options />,
  document.getElementById('content')
);
